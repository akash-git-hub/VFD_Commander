import { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { EditForm } from './EditForm';
import { Cosidebar } from '../../CO_Sidebar';
import { SharedButton } from '../../../components/Button';
import { useLocation } from 'react-router-dom';
import { Loader } from '../../../components/Loader';


export const EditAccount = () => {
    const [key, setKey] = useState('home');
    const location = useLocation();
    const [data, setData] = useState();
    const [loder,setLoder] = useState(false);

    useEffect(() => {
        if (location && location.state && location.state.data) {
            setData(location.state.data);
        
        }
    }, [location])
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
                            <Headings MainHeading={"Accounts"} HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />

                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="Information">
                                    <EditForm mydata={data} setLoder={setLoder} />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
