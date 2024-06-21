import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { PoSidebar } from '../../PO_Sidebar'
import { SharedButton } from '../../../components/Button'
import { EditGearForm } from './EditGearForm'
import { EditAdminstratorForm } from './EditAdminstratorForm'
import { useLocation } from 'react-router-dom'

export const EditProfileAdminstrator = () => {
    const location = useLocation();
    const [pre, setPre] = useState();
   

    useEffect(() => {
        if (location && location.state) {
            setPre(location.state.data);
        }
    }, [location])


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
                            <Headings MainHeading={"Profile Administration"} HeadButton={<SharedButton BtnLabel={"Back"} onClick={() => window.history.back()} BtnVariant={'primary'} style={{

                            }} />} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="User Profile Module">
                                        <EditAdminstratorForm pre ={pre}/>
                                    </Tab>
                                    <Tab eventKey="quali" title="Qualifications">
                                        {/* <AdminstratorTableList /> */}
                                    </Tab>
                                    <Tab eventKey="gear" title="Gear">
                                        <EditGearForm />
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
