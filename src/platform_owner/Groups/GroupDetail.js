import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import { SharedButton } from '../../components/Button'
import { useLocation } from 'react-router-dom'
import { Loader } from '../../components/Loader'
import { GroupMemberTable } from './GroupMemberTable'


export const GroupDetail = () => {
    const [predata, setPredata] = useState();
    const [loder, setLoder] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location && location.state) {
            setPredata(location.state.data);
        }
    }, [location])


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
                                    activeKey={"gear"}
                                    className="mb-3"
                                >
                                    <Tab eventKey="gear" title="Group Information">
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
