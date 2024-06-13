import React, { useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import { GearList } from './Gear_Information/GearList'
import { ApparatusList } from './Apparatus_Information/ApparatusList'

export const InventoryModuleList = () => {
    const [key, setKey] = useState('gear');
    return (
        <>
            <div className='InventoryList'>
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
                                    <GearList/>
                                </Tab>
                                <Tab eventKey="apparatus" title="Apparatus Information">
                                    <ApparatusList/>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
