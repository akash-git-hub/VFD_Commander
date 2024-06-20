import { useState } from 'react';
import { PoSidebar } from '../PO_Sidebar'
import { Container, Row, Col } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { CreateRole } from './CreateRole';
import { Loader } from '../../components/Loader';
import { SharedButton } from '../../components/Button';

export const RoleAdminstrator = () => {
    const [loder,setLoder] = useState(false);
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
                            <Headings MainHeading={"Create Role"} HeadButton={<SharedButton onClick={()=>window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />}/>
                            <div className='my-md-4'>
                            <CreateRole setLoder={setLoder}/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
