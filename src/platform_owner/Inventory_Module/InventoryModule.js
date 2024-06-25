import React, { useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import { GearInformationForm } from './Gear_Information/GearInformationForm'
import {  ApparatusInformationForm } from './Apparatus_Information/ApparatusInformationForm'
import { SharedButton } from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { GearType } from './Gear_Information/GearType'

export const InventoryModule = () => {

      const navigate = useNavigate();
    const [key, setKey] = useState('gear');
    const handleCreateAccount = () =>{
        navigate('/inventorymodulelist');
    }

    return (
        <>
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings  MainHeading={"Create Inventory"} HeadButton={<SharedButton onClick={handleCreateAccount} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }}/>}/>
                            <div className='my-md-4'>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="gear" title="Create Gear">
                                    <GearInformationForm/>
                                </Tab>
                                <Tab eventKey="apparatus" title="Create Apparatus">
                                    <ApparatusInformationForm/>
                                </Tab>
                                <Tab eventKey="typegear" title="Create Gear Type">
                                    <GearType/>
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
