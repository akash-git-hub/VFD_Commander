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
    const handleCreateAccount = () => {
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
                            <Headings MainHeading={"Create Training"} HeadButton={<SharedButton onClick={handleCreateAccount} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='my-md-5'>
                                <TrainingForm />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
