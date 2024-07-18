import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import { GearList } from './Gear_Information/GearList'
import { ApparatusList } from './Apparatus_Information/ApparatusList'
import { SharedButton } from '../../components/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { GearTypeTable } from './Gear_Information/GearTypeTable'
import { Loader } from '../../components/Loader'

export const InventoryModuleList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loder,setLoder] = useState(false);
    const [key, setKey] = useState('apparatus');

    

    useEffect(() => {
        if (location && location.state && location.state.eventKey) {
            setKey(location.state.eventKey)
        }
    }, [location])

    const handleCreateAccount = (data) => {
        navigate(data);
        // navigate('/inventorymodule');
    }
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
                                < Headings MainHeading={"Inventory"} HeadButton={<SharedButton onClick={() => handleCreateAccount("/CreateGear")} BtnLabel={"Create"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            }
                            {key === "apparatus" &&
                                < Headings MainHeading={"Inventory"} HeadButton={<SharedButton onClick={() => handleCreateAccount("/CreateApparatus")} BtnLabel={"Create"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            }
                           
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                       <Tab eventKey="apparatus" title="Inventory Info">
                                        <ApparatusList setLoder={setLoder} />
                                    </Tab>
                                    <Tab eventKey="gear" title="Gear Info">
                                        <GearList setLoder={setLoder} />
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
