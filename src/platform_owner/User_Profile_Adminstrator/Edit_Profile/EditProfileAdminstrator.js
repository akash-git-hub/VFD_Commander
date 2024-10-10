import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { PoSidebar } from '../../PO_Sidebar'
import { SharedButton } from '../../../components/Button'
import { EditGearForm } from './EditGearForm'
import { EditAdminstratorForm } from './EditAdminstratorForm'
import { useLocation } from 'react-router-dom'
import { Loader } from '../../../components/Loader'
import { getGear_API, getPosition_API, getSupervisor_API, getTrainingByUserID_API, getUserAccountById_API, getUserGear_API, getUserQualification_API } from '../../../api_services/Apiservices'
import { UserQuilification } from './UserQuilification'
import IndividualTraining from '../IndividualTraining'
import { HeadingUserProfile } from '../../../components/HeadingUserProfile'

export const EditProfileAdminstrator = () => {
    const location = useLocation();
    const [pre, setPre] = useState();
    const [loder, setLoder] = useState(false);
    const [key, setKey] = useState('home');
    const [totalTime, setTotalTime] = useState({ "totalHours": "", "remainingMinutes": "" });
    const [myId, setMyId] = useState("");

    const [grdata, setGrdata] = useState([]);
    const [quadata, setQuadata] = useState([]);
    const [grtype, setGrtype] = useState([]);
    const [trainingData, setTrainingData] = useState([]);

    const getgr = async (id) => {
        const resp = await getUserGear_API({ "id": id });
        if (resp && resp.success) {
            setLoder(false);
            setGrdata(resp.data);
        }
        setLoder(false);
    }


    const getdata = async () => {
        setLoder(true);
        const resp = await getGear_API();
        if (resp && resp.success) {
            setLoder(false);
            const prefdata = resp.data;
            const fdata = prefdata.map((e) => ({ "name": e.gear_item_name, "value": e._id }));
            setGrtype(fdata);
        }
        setLoder(false);
    }

    const getqua = async (id) => {
        const resp = await getUserQualification_API({ "id": id });
        if (resp && resp.success) {
            setLoder(false);
            setQuadata(resp.data);
        }
        setLoder(false);
    }

    const [superOp, setSuperOp] = useState([]);
    const [positionOp, setPositionOp] = useState([]);

    const getSuper = async () => {
        const resp = await getSupervisor_API();
        if (resp) {
            const findata = resp.data;
            const mydata = findata.map(e => ({ name: e.first_name ? e.first_name + " " + e.last_name : e.accountName, value: e._id }));

            setSuperOp(mydata);
        }
    }

    const getposition = async () => {
        const resp = await getPosition_API();
        if (resp) {
            const findata = resp.data;
            const mydata = findata.map(e => ({ name: e.name, value: e._id }));
            setPositionOp(mydata);
        }
    }

    const get_My_Training = async (id) => {
        setLoder(true)
        const resp = await getTrainingByUserID_API(id);
        if (resp && resp.success) {
            setLoder(false);
            let pre = resp.data;
            pre = pre.filter((e) => e.training_id && e.training_id.event_type_id && e.training_id.event_type_id.event_name === "Training");
            pre = pre.filter((e) => e.current_status === "planning_to_attend" || e.current_status === "completed")
            let totalCredit = 0
            let usName = "";
            let sum = 0;
            pre.forEach(e => {
                if (e.credit_duration) {
                    sum = parseFloat(e.credit_duration);
                    totalCredit += Math.round(sum * 100) / 100;
                }
                usName = e.user_name;
            });
            setTotalTime({ "totalHours": totalCredit });
            setTrainingData(pre);
        }
        setLoder(false);
    }

    const getAccountById = async (myId) => {
        setLoder(true);
        const resp = await getUserAccountById_API(myId);
        if (resp) {
            const data = resp.data[0];
            setLoder(false);
            setPre(data);
        }
        setLoder(false);
    }

    useEffect(() => {
        if (location && location.state) {
            getSuper();
            getposition();
            getdata();
            // setPre(location.state.data);
            const id = location.state && location.state.data && location.state.data._id;
            setMyId(id);
        }
    }, [location, key])

    const refreshHandler = (id) => {
        if (!id) id = myId || '';
        if (id) { getgr(id); getqua(id); get_My_Training(id); getAccountById(id) }
    }

    useEffect(() => {
        if (myId) { refreshHandler(myId); }
    }, [myId])




    return (
        <>
            <Loader show={loder} />
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <HeadingUserProfile
                                MainHeading={"User Profile Administration"}
                                image={pre && pre.image}
                                prName={pre && pre.last_name + " " + pre.first_name}
                                HeadButton={<SharedButton BtnLabel={"Back"} onClick={() => window.history.back()} BtnVariant={'primary'}
                                 />}
                            />
                            {/* <Headings MainHeading={"User Profile Administration"} HeadButton={<SharedButton BtnLabel={"Back"} onClick={() => window.history.back()} BtnVariant={'primary'} />} /> */}
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="User Information ">
                                        <EditAdminstratorForm pre={pre} setLoder={setLoder} grdata={grdata} quadata={quadata} superOp={superOp} grtype={grtype} positionOp={positionOp} refreshHandler={refreshHandler} />
                                    </Tab>
                                    <Tab eventKey="gear" title="Gear Information">
                                        <EditGearForm pre={pre} setLoder={setLoder} setKey={setKey} grdata={grdata} getgr={getgr} refreshHandler={refreshHandler} />
                                    </Tab>
                                    <Tab eventKey="quali" title="Qualification Information" >
                                        <UserQuilification pre={pre} setLoder={setLoder} setKey={setKey} quadata={quadata} getqua={getqua} refreshHandler={refreshHandler} />

                                    </Tab>
                                    <Tab eventKey="IndividualTraining" title="Training">
                                        <IndividualTraining preData={trainingData} totalTime={totalTime} refreshHandler={refreshHandler} />
                                    </Tab>

                                </Tabs>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
