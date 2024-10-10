import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { PoSidebar } from '../PO_Sidebar'
import { SharedButton } from '../../components/Button'
import { Loader } from '../../components/Loader'
import { useLocation } from 'react-router-dom'
import { GuestProfile } from './GuestProfile'

export const MyGuestProfile = () => {
    const location = useLocation();
    const [key, setKey] = useState('home');
    const [useData, setUseData] = useState();

    const [loder, setLoder] = useState(false);

    useEffect(() => {
        const data = location?.state?.data;
        setUseData(data);
    }, [location])

    return (
        <>
            <Loader show={loder} />
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar img={useData && useData.image} />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"My Profile"} HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />

                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Information">
                                        <GuestProfile useData={useData} />
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
