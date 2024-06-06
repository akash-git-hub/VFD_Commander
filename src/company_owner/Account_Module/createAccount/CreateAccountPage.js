import { useState } from 'react';
import { CoSidebar } from '../../CO_Sidebar'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { CreateForm } from './CreateForm';


export const CreateAccountPage = () => {
    const [key, setKey] = useState('home');
    return (
        <>
            <div className='CreateAccount'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <CoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Create Account"} SubHeading={"Manage Account"}/>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="Create Account">
                                    <CreateForm/>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
