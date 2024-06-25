import React, { useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import { QualificationForm } from './Qualification_Information/QualificationForm';
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
export const QualificationAdminstrator = () => {
    const navigate = useNavigate();
    const [loder,setLoder] = useState(false);
    const [key, setKey] = useState('gear');
    const handleCreateAccount = () => {
        navigate('/qualificationlist');
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
                            <Headings MainHeading={"Qualifications Module"} SubHeading={""} HeadButton={<SharedButton onClick={handleCreateAccount} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="gear" title="Qualifications Data Elements">
                                        <QualificationForm setLoder={setLoder} />
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
