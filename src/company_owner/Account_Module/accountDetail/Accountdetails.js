import { useState } from 'react';
import { Row, Col, Tab, Tabs, Container } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { SharedButton } from '../../../components/Button'
import { UserDetail } from './UserDetail';
import { useNavigate } from 'react-router-dom';
import { Cosidebar } from '../../CO_Sidebar';


export const Accountdetails = () => {
    const [key, setKey] = useState('home');

    const navigate = useNavigate();
    const handleCreateAccount = () =>{
        navigate('/createaccount');
    }


    return (
        <>
            <div className='AccountDetailPage'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <Cosidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Account Management"} SubHeading={"Manage your Manage Account"} HeadButton={<SharedButton onClick={handleCreateAccount} BtnLabel={"Create Account"} BtnVariant={'primary'} style={{ background: '#00285D' }}/>} />
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="Details Overview">
                                    <UserDetail />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
