import { useState } from 'react';
import { PoSidebar } from '../PO_Sidebar'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { TrainingForm } from './TrainingForm';
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';

export const Training = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState('home');
    const handleCreateAccount = () =>{
        navigate('/traininglist');
    }
    return (
        <>
            <div className='Training'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Training Module"} HeadButton={<SharedButton onClick={handleCreateAccount} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }}/>}/>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="Create Training Module">
                                    <TrainingForm />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
