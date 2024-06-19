import React, { useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { PoSidebar } from '../PO_Sidebar'
import {ProfileForm } from './ProfileForm'
import { SharedButton } from '../../components/Button'
import { MyPlans } from './MyPlans'

export const MyProfile = () => {
    const [key, setKey] = useState('home');
    return (
        <>
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"My Profile"} HeadButton={
                                <SharedButton BtnLabel={"Back"} BtnVariant={'primary'} onClick={()=>window.history.back()} style={{
                                background: '#FEF2F2',
                                color: '#991B1B',
                                borderColor: '#FEF2F2',
                                fontWeight: '500'
                            }} />} />
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="User Profile Module">
                                    <ProfileForm />
                                </Tab>
                                <Tab eventKey="quali" title="Subscriptions">
                                 <MyPlans/>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
