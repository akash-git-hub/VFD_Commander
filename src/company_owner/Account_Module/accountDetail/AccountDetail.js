import { useState } from 'react';
import { CoSidebar } from '../../CO_Sidebar'
import { Row, Col, Tab, Tabs, Container } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { SharedButton } from '../../../components/Button'
import { UserDetail } from './UserDetail';


export const AccountDetail = () => {
    const [key, setKey] = useState('home');
    return (
        <>
            <div className='AccountDetailPage'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <CoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Account Management"} SubHeading={"Manage your Manage Account"} HeadButton={<SharedButton BtnLabel={"Create Account"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
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
