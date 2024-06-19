import { useState } from 'react';
import { PoSidebar } from '../PO_Sidebar'
import { Container, Row, Col } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { RoleAdminstratorTable } from './RoleAdminstratorTable';

export const RoleList = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState('home');

    const handleCreateAccount = () => {
        navigate('/roleadminstrator');
    }
    return (
        <>
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Role Administration"} HeadButton={<SharedButton onClick={handleCreateAccount} BtnLabel={"Create Role"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='my-md-5'>
                                <RoleAdminstratorTable />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
