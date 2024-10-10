
import { PoSidebar } from '../PO_Sidebar'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { TrainingForm } from './TrainingForm';
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { useState } from 'react';

export const Training = () => {
    const navigate = useNavigate();
    const [loder, setLoder] = useState(false);
   
    return (
        <>
            <Loader show={loder} />
            <div className='Training'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Event Administration"} HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={"home"}
                                className="my-4"
                            >
                                <Tab eventKey="home" title="Event Information">
                                    <TrainingForm setLoder={setLoder} />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
