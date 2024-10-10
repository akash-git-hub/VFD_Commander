import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import { GearList } from './Gear_Information/GearList'
import { ApparatusList } from './Apparatus_Information/ApparatusList'
import { SharedButton } from '../../components/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { Loader } from '../../components/Loader'
import { GroupsListTable } from '../Groups/GroupsListTable'
import { getGroups_API } from '../../api_services/Apiservices'

export const InventoryModuleList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loder, setLoder] = useState(false);
    const [key, setKey] = useState('gear');
    const [trdata, setTrdata] = useState([]);

    const getdata = async () => {
        setLoder(true);
        const resp = await getGroups_API();
        if (resp && resp.success) {
            const fdata = resp.data;
            setTrdata(fdata);
            setLoder(false);
        }
        setLoder(false);
    }

    useEffect(() => {
        if (location && location.state && location.state.eventKey) {
            setKey(location.state.eventKey)
        }
    }, [location])
    useEffect(() => { getdata(); }, [])

    const handleCreateAccount = (data) => { navigate(data); }

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
                            {key === "gear" &&
                                < Headings MainHeading={"Gear and Apparatus Administration"} HeadButton={
                                    <SharedButton
                                        onClick={() => handleCreateAccount("/cgaForm")}
                                        BtnLabel={"Create"}
                                        BtnVariant={'primary'}
                                        style={{ background: '#00285D' }}
                                    />} />
                            }
                            {key === "apparatus" &&
                                < Headings MainHeading={"Gear and Apparatus Administration"} HeadButton={
                                    <SharedButton
                                        onClick={() => handleCreateAccount("/cgaForm")}
                                        BtnLabel={"Create"}
                                        BtnVariant={'primary'}
                                        style={{ background: '#00285D' }}
                                    />} />
                            }
                            {key === "group" &&
                                < Headings MainHeading={"Gear and Apparatus Administration"}
                                 HeadButton={<SharedButton onClick={() => handleCreateAccount("/groupsadd")}  BtnLabel={"Create"} BtnVariant={'primary'} style={{ background: '#00285D' }} />}
                                 HeadButton2={<SharedButton onClick={() => handleCreateAccount("/assignGroupForm")}  BtnLabel={"Assign"} BtnVariant={'primary'} style={{ background: '#00285D' }} />}
                                  />
                            }
                            
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="gear" title="Gear Information">
                                        <GearList setLoder={setLoder} />
                                    </Tab>
                                    <Tab eventKey="apparatus" title="Apparatus Information">
                                        <ApparatusList setLoder={setLoder} />
                                    </Tab>
                                    <Tab eventKey="group" title="Groups">
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
