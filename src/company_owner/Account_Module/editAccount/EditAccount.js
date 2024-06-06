import { useState } from 'react';
import { CoSidebar } from '../../CO_Sidebar'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { EditForm } from './EditForm';


export const EditAccount = () => {
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
                            <Headings MainHeading={"Edit Account"} SubHeading={"Update Your Account"}/>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="Edit Account">
                                    <EditForm/>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
