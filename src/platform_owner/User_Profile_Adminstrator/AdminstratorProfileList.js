import { useState } from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { PoSidebar } from '../PO_Sidebar'
import { AdminstratorTableList } from './AdminstratorTableList';
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';

export const AdminstratorProfileList = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState('home');
    const handleCreateAccount = () =>{
        navigate('/profileadminstrator');
    }
    return (
        <>
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"User Profile Administration"} SubHeading={"Manage User Profiles"} HeadButton={<SharedButton onClick={handleCreateAccount} BtnLabel={"Create User Profile"} BtnVariant={'primary'} style={{ background: '#00285D' }}/>}/>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="Overview">
                                   <AdminstratorTableList/>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
