import { useState } from 'react';
import { PoSidebar } from '../PO_Sidebar'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { ListView } from './ListView';
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { TrackTraining } from './TrackTraining';

export const TrainingList = () => {
    const [key, setKey] = useState('home');

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/training');
    };

  return (
    <>
         <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Training Module"} HeadButton={<SharedButton BtnLabel={"Create Training "} BtnVariant={'primary'} onClick={handleNavigation}/>}/>
                            <div className='my-md-5'>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="Training List">
                                   <ListView/>
                                </Tab>
                                <Tab eventKey="tracking" title="Track Trainy">
                                   <TrackTraining/>
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
