import React, { useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { PoSidebar } from '../../PO_Sidebar'
import { AdminstratorTableList } from '../AdminstratorTableList'
import { AdminstratorForm } from './AdminstratorForm'
import { SharedButton } from '../../../components/Button'
import { GearForm } from './GearForm'

export const ProfileAdminstrator = () => {
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
                            <Headings MainHeading={"Profile Administration"} HeadButton={<SharedButton BtnLabel={"Edit"} BtnVariant={'danger'} style={{
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
                                    <AdminstratorForm />
                                </Tab>
                                <Tab eventKey="quali" title="Qualifications">
                                    {/* <AdminstratorTableList /> */}
                                </Tab>
                                <Tab eventKey="gear" title="Gear">
                                    <GearForm />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
