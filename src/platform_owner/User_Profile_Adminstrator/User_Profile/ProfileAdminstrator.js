import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
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
                            <Headings MainHeading={"Create User Profile"} HeadButton={<SharedButton onClick={handleCreateAccount} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='my-md-4'>
                                <AdminstratorForm setLoder={setLoder} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
