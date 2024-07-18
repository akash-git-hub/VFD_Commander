import React, { useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { PoSidebar } from '../../PO_Sidebar'
import { AdminstratorForm } from './AdminstratorForm'
import { SharedButton } from '../../../components/Button'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../../components/Loader'

export const ProfileAdminstrator = () => {
    const [loder, setLoder] = useState(false);
    const navigate = useNavigate();
    const handleCreateAccount = () => {
        navigate('/adminstratorprofilelist');
    }
    return (
        <>
            <Loader show={loder} />
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"User Profile"} HeadButton={<SharedButton onClick={()=>window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='my-md-4'>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={"home"}
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="User Info">
                                    <AdminstratorForm setLoder={setLoder} />
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
