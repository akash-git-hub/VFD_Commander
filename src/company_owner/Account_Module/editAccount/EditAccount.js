import { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { EditForm } from './EditForm';
import { Cosidebar } from '../../CO_Sidebar';
import { SharedButton } from '../../../components/Button';
import { useLocation } from 'react-router-dom';


export const EditAccount = () => {
    const [key, setKey] = useState('home');
    const location = useLocation();
    const [data, setData] = useState();

    useEffect(() => {
        if (location && location.state && location.state.data) {
            setData(location.state.data);
        
        }
    }, [location])
    return (
        <>
            <div className='CreateAccount'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <Cosidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Edit Account"} SubHeading={"Update Your Account"} HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />

                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="Edit Account">
                                    <EditForm mydata={data} />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
