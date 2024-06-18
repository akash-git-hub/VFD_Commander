import React, { useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import { QualificationList } from './Qualification_Information/QualificationList'
import { SharedButton } from '../../components/Button'
import { useNavigate } from 'react-router-dom'


export const QualificationModuleList = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState('gear');
    const handleCreateAccount = () =>{
        navigate('/qualification');
    }
    return (
        <>
            <div className='InventoryList'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Qualifications Module"} SubHeading={"Manage all qualifications and proficiencies for each user."} HeadButton={<SharedButton onClick={handleCreateAccount} BtnLabel={"Create Qualification"} BtnVariant={'primary'} style={{ background: '#00285D' }}/>}/>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="gear" title="Qualifications Data Elements">
                                    <QualificationList/>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
