import { useState } from 'react';
import { PoSidebar } from '../PO_Sidebar'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { CreateRole } from './CreateRole';
import { Loader } from '../../components/Loader';
import { SharedButton } from '../../components/Button';

export const RoleAdminstrator = () => {
    const [loder, setLoder] = useState(false);
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
                            <Headings MainHeading={"Role"} HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={"home"}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Role Info">
                                        <CreateRole setLoder={setLoder} />
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
