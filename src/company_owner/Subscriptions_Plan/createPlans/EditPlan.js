import { useState } from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { SubscriptionForm } from './SubscriptionForm'
import { Cosidebar } from '../../CO_Sidebar';
import { Loader } from '../../../components/Loader';
import { SharedButton } from '../../../components/Button';
import { EditForm } from './EditForm';
import { useLocation } from 'react-router-dom';

export const EditPlan = () => {
    const [predata, setPredata] = useState();
    const location = useLocation();

    useState(() => {
        if (location && location.state && location.state.data) {
            const data = location.state.data;
            setPredata(data);
        }
    }, [location])



    const [loder, setLoder] = useState(false)
    const [key, setKey] = useState('home');
    return (
        <>
            <Loader show={loder} />
            <div className='CreateSubscription AccountModulePage'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <Cosidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Subscriptions"}
                                HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />

                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="Information">
                                    <EditForm setLoder={setLoder} predata ={predata}/>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
