import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'

import { SharedButton } from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../components/Loader'
import { getQtype_API, getQualification_API } from '../../api_services/Apiservices'
import QualificationListDetail from './QualificationListDetail'



export const QualificationDetail = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState('gear');
    const [predata, setPredata] = useState([]);
    const [trdata, setTrdata] = useState([]);
    const [loder, setLoder] = useState(false);

    const getdata = async () => {
        setLoder(true);
        const resp = await getQualification_API();
        if (resp && resp.success) {
            setLoder(false);
            const fdata = resp.data;
            setPredata(fdata);
            setTrdata(resp.data);
        }
        setLoder(false);
    }


    useEffect(() => { getdata(); }, [])
    
    const handleCreateAccount = () => {
        navigate('/qualification');
    }


    const [qtypeop, setQtypeop] = useState([]);
    const gettypes = async () => {
        const resp = await getQtype_API();
        if (resp) {
            let findata = resp.data;
            findata = findata.filter((e) => e.status === "Active");
            const mydata = findata.map(e => ({ name: e.name, value: e._id }));
            setQtypeop(mydata);
        }
    }

    useEffect(() => { gettypes(); }, [])
    return (
        <>
            <Loader show={loder} />
            <div className='InventoryList'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Qualification Administration"} HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="gear" title="Qualification Information">
                                        <QualificationListDetail predata={predata} qtypeop={qtypeop} setLoder={setLoder}/>
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
