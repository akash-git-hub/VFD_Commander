import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { PoSidebar } from '../PO_Sidebar'
import { ProfileForm } from './ProfileForm'
import { SharedButton } from '../../components/Button'
import { MyPlans } from './MyPlans'
import { getAccount_by_id_API, getSubscriptonData_API } from '../../api_services/Apiservices'
import { Loader } from '../../components/Loader'

export const MyProfile = () => {
    const [key, setKey] = useState('home');
    const [usedata, setUsedata] = useState();
    const [plan, setPlan] = useState();
    const [loder, setLoder] = useState(false);

    const getplan = async () => {
        const subscription_id = JSON.parse(localStorage.getItem('userData')).subscription_id;
        if (subscription_id) {
            setLoder(true);
            const resp = await getSubscriptonData_API({ "id": subscription_id });
            if (resp && resp.success) {
                setLoder(false);
                const prefdata = resp.data;
                setPlan(prefdata);
            }
            setLoder(false);
        }
    }


    const getmydata = async () => {
        const userID = JSON.parse(localStorage.getItem('userData'))._id;
        if (userID) {
            const data = { "id": userID }
            const resp = await getAccount_by_id_API(data);

            if (resp && resp.success) {
                const data = resp.data;
                if(data.image){
                    const img = data.image || "";
                    localStorage.setItem('proimage',img);
                }
             
                setUsedata(data);
            }
        }
    }


    useEffect(() => { getplan();getmydata(); }, [])

    return (
        <>
            <Loader show={loder} />
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar img={usedata && usedata.image}/>
                        </Col>
                        <Col md={9}>
                        <Headings MainHeading={"My Profile"} HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            {/* <Headings MainHeading={"My Profile"} HeadButton={
                                <SharedButton BtnLabel={"Back"} BtnVariant={'primary'} onClick={() => window.history.back()} style={{
                                    background: '#FEF2F2',
                                    color: '#991B1B',
                                    borderColor: '#FEF2F2',
                                    fontWeight: '500'
                                }} />} /> */}
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Information">
                                        <ProfileForm usedata={usedata} setLoder={setLoder} getmydata={getmydata}/>
                                    </Tab>
                                    <Tab eventKey="quali" title="Subscriptions">
                                        <MyPlans plan={plan} />
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
