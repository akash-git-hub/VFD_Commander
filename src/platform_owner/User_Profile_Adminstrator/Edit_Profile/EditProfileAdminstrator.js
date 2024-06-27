import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { PoSidebar } from '../../PO_Sidebar'
import { SharedButton } from '../../../components/Button'
import { EditGearForm } from './EditGearForm'
import { EditAdminstratorForm } from './EditAdminstratorForm'
import { useLocation } from 'react-router-dom'
import { Loader } from '../../../components/Loader'
import { getUserGear_API, getUserQualification_API } from '../../../api_services/Apiservices'
import { AdminstratorTableList } from '../AdminstratorTableList'
import { UserQuilification } from './UserQuilification'

export const EditProfileAdminstrator = () => {
    const location = useLocation();
    const [pre, setPre] = useState();
    const [loder, setLoder] = useState(false);
    const [key, setKey] = useState('home');

    const [grdata, setGrdata] = useState([]);
    const [quadata,setQuadata] = useState([]);

    const getgr = async (id) => {
        const resp = await getUserGear_API({ "id": id });
        if (resp && resp.success) {
            setLoder(false);
            setGrdata(resp.data);
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


    useEffect(() => {
        if (location && location.state) {
            setPre(location.state.data);
            const id = location.state.data._id;
            if (id) { getgr(id);getqua(id); }
        }
    }, [location,key])



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
                            <Headings MainHeading={"Profile Administration"} HeadButton={<SharedButton BtnLabel={"Back"} onClick={() => window.history.back()} BtnVariant={'primary'} />} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="User Profile Module">
                                        <EditAdminstratorForm pre={pre} setLoder={setLoder} grdata={grdata} quadata={quadata}/>
                                    </Tab>
                                    <Tab eventKey="quali" title="Qualifications" >
                                        <UserQuilification pre={pre} setLoder={setLoder} setKey={setKey} quadata={quadata} getqua={getqua} />
                                        
                                    </Tab>
                                    <Tab eventKey="gear" title="Gear Info">
                                        <EditGearForm pre={pre} setLoder={setLoder} setKey={setKey} grdata={grdata} getgr={getgr}/>
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
