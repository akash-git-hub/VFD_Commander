import { useState } from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { CreateForm } from './CreateForm';
import { Cosidebar } from '../../CO_Sidebar';
import { Loader } from '../../../components/Loader';
import { SharedButton } from '../../../components/Button';


export const CreateAccountPage = () => {
    const [key, setKey] = useState('home');
    const [loder, setLoder] = useState(false);
    return (
        <>
            <Loader show={loder} />
            <div className='CreateAccount AccountModulePage'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <Cosidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Account"}
                                HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />

                            <Tabs
                                id="controlled-tab-example"
                                activeKey={"home"}
                                className="mb-3 mt-3"
                            >
                                <Tab eventKey="home"
                                    title="Information"
                                >
                                    <CreateForm setLoder={setLoder} />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
