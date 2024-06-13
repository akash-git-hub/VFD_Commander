import { useState } from 'react';
import { PoSidebar } from '../PO_Sidebar'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { ListView } from './ListView';
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';

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
                            <Headings MainHeading={"Training Module"} SubHeading={"This module allows for data entry of Gear and Apparatus information"}  HeadButton={<SharedButton BtnLabel={"Create Training "} BtnVariant={'primary'} onClick={handleNavigation}/>}/>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="Training Information">
                                   <ListView/>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
    </>
  )
}
