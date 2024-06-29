
import { PoSidebar } from '../PO_Sidebar'
import { Container, Row, Col } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { TrainingDetail } from './TrainingDetail';

export const UserTrainingDetail = () => {

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/training');
    };

    return (
        <>
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Training"} HeadButton={<SharedButton BtnLabel={"CREATE "} BtnVariant={'primary'} onClick={handleNavigation} />} />
                            <div className='my-md-4'>
                                <TrainingDetail />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
