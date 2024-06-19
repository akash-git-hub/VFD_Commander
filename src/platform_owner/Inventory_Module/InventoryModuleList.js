import React, { useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import { GearList } from './Gear_Information/GearList'
import { ApparatusList } from './Apparatus_Information/ApparatusList'
import { SharedButton } from '../../components/Button'
import { useNavigate } from 'react-router-dom'

export const InventoryModuleList = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState('gear');

    const handleCreateAccount = () =>{
        navigate('/inventorymodule');
    }
    return (
        <>
            <div className='InventoryList'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                        <Headings MainHeading={"Inventory Module"}  HeadButton={<SharedButton onClick={handleCreateAccount} BtnLabel={"Create Inventory"} BtnVariant={'primary'} style={{ background: '#00285D' }}/>}/>
                         <div className='my-md-5'>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="gear" title="Gear Information">
                                    <GearList/>
                                </Tab>
                                <Tab eventKey="apparatus" title="Apparatus Information">
                                    <ApparatusList/>
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
