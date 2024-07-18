import { useEffect, useState } from 'react';
import { Row, Col, Tab, Tabs, Container } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { SharedButton } from '../../../components/Button'
import { UserDetail } from './UserDetail';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cosidebar } from '../../CO_Sidebar';
import { Loader } from '../../../components/Loader';


export const Accountdetails = () => {
    const [key, setKey] = useState('home');
    const location = useLocation(); 
    const [data ,setData] = useState();
    const navigate = useNavigate();
    const [loder,setLoder] = useState(false);

    useEffect(()=>{
        if(location && location.state && location.state.data){ setData(location.state.data); }
    },[location])  

    const handleCreateAccount = () =>{ navigate('/createaccount'); }


    return (
        <>
        <Loader show ={loder} />
            <div className='AccountDetailPage AccountModulePage'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <Cosidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Accounts"} HeadButton={<SharedButton onClick={()=>window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }}/>} />
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="Accounts List">
                                    <UserDetail data={data} setLoder={setLoder} />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
