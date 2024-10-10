import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import { SharedButton } from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../components/Loader'
import { getGroups_API } from '../../api_services/Apiservices'
import { GroupsListTable } from './GroupsListTable'


export const GroupsListing = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState('gear');
    
    const [trdata, setTrdata] = useState([]);
    const [loder, setLoder] = useState(false);

    const getdata = async () => {
        setLoder(true);
        const resp = await getGroups_API();
        if (resp && resp.success) {
            setLoder(false);
            const fdata = resp.data;            
            setTrdata(fdata);
        }
        setLoder(false);
    }
    useEffect(() => { getdata(); }, [])


    
   
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
                            <Headings MainHeading={"Gear and Apparatus Administration"} HeadButton={<SharedButton onClick={()=>window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="gear" title="Group Information">
                                        <GroupsListTable trdata={trdata} getdata={getdata} setLoder={setLoder} />
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
