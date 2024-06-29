import React from 'react'
import { UnavailabilityTableList } from './UnavailabilityTableList'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { PoSidebar } from '../PO_Sidebar'

export const UnavailabilityModule = () => {
    return (
        <>
            <div className='UnavailabilityModule'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Unavailability"} />
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={"home"}
                                className="my-4"
                            >
                                <Tab eventKey="home" title="Information">
                                    <UnavailabilityTableList />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
