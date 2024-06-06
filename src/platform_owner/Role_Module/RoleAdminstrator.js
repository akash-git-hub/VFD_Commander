import { useState } from 'react';
import { PoSidebar } from '../PO_Sidebar'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { Headings } from '../../components/Headings'

export const RoleAdminstrator = () => {
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
                            <Headings MainHeading={"Role Administration"} SubHeading={"Role Account"}  />
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="Role Administration">
                                    {/* <UserDetail /> */}
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
