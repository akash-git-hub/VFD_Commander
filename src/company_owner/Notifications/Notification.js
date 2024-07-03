import React from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { NotificationList } from './NotificationList'
import { Cosidebar } from '../CO_Sidebar'
import { Headings } from '../../components/Headings'
import { Loader } from '../../components/Loader'

export const Notification = () => {
    return (
        <>
            {/* <Loader show={loder} /> */}
            <div className='CreateSubscription AccountModulePage'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <Cosidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Notifications"} />
                            <Tabs
                                id="controlled-tab-example"
                                // activeKey={key}
                                // onSelect={(k) => setKey(k)}
                                className="mb-3 mt-3">
                                <Tab eventKey="home"
                                    title="You have a notification">
                                    <NotificationList />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
