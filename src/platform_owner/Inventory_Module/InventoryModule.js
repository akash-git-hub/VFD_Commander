import React, { useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import { GearInformationForm } from './Gear_Information/GearInformationForm'
import {  ApparatusInformationForm } from './Apparatus_Information/ApparatusInformationForm'

export const InventoryModule = () => {
    const [key, setKey] = useState('gear');

    return (
        <>
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Inventory Module"} SubHeading={"This module allows for data entry of Gear and Apparatus information"} />
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="gear" title="Gear Information">
                                    <GearInformationForm/>
                                </Tab>
                                <Tab eventKey="apparatus" title="Apparatus Information">
                                    <ApparatusInformationForm/>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
