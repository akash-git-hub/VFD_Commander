import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import { SharedButton } from '../../components/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { Loader } from '../../components/Loader'
import { getQualification_API } from '../../api_services/Apiservices'
import { GroupMemberTable } from './GroupMemberTable'


export const GroupDetail = () => {
    const navigate = useNavigate();
    const [predata, setPredata] = useState();
    const [loder, setLoder] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location && location.state) {
            setPredata(location.state.data);
        }
    }, [location])



    const [key, setKey] = useState('gear');

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
                            <Headings MainHeading={"Group"} HeadButton={<SharedButton onClick={()=>window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={"gear"}
                                    className="mb-3"
                                >
                                    <Tab eventKey="gear" title="Group Info">
                                        <GroupMemberTable predata={predata} setLoder={setLoder} />
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
