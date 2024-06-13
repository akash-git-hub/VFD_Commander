import React, { useState } from 'react'
import { UnavailabilityTableList } from './UnavailabilityTableList'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { PoSidebar } from '../PO_Sidebar'

export const UnavailabilityModule = () => {
    const [key, setKey] = useState('home');
  return (
    <>
     <div className='UnavailabilityModule'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Unavailability Module"} SubHeading={"This module allows users to communicate their availability to work for a specified date range by day of week and specified hours."} />
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="Unavailability">
                                   <UnavailabilityTableList/>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
    </>
  )
}
