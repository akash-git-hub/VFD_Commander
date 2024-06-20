
import { Container, Row, Col} from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { PoSidebar } from '../PO_Sidebar'
import { AdminstratorTableList } from './AdminstratorTableList';
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';

export const AdminstratorProfileList = () => {
    const navigate = useNavigate();
    const handleCreateAccount = () =>{
        navigate('/profileadminstrator');
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
                            <Headings MainHeading={"User Profile Administration"} HeadButton={<SharedButton onClick={handleCreateAccount} BtnLabel={"Create User Profile"} BtnVariant={'primary'} style={{ background: '#00285D' }}/>}/>
                            <div className='my-md-5'></div>
                            <AdminstratorTableList/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
