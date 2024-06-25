
import { PoSidebar } from '../PO_Sidebar'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { RoleAdminstratorTable } from './RoleAdminstratorTable';
import { useEffect, useState } from 'react';
import { getRolls_API } from '../../api_services/Apiservices';

export const RoleList = () => {
    const navigate = useNavigate();
    const [rolldata, setRolldata] = useState([]);
    const [pagination, setPagination] = useState();

    const getrolls = async (page = 1) => {
        const resp = await getRolls_API({ "page": page });
        if (resp) {
            const findata = resp.data;
            setPagination(resp.pagination);

            const mydata = [];
            findata.map((e) => {
                const modules = [];
                if (e.User_Profile_Module) { modules.push('User_Profile_Module'); }
                if (e.Training_Module) { modules.push('Training_Module'); }
                if (e.Inventory_Module) { modules.push('Inventory_Module'); }
                if (e.Availability_Module) { modules.push('Availability_Module'); }
                if (e.Qualification_Module) { modules.push('Qualification_Module'); }
                if (e.Reporting_Module) { modules.push('Reporting_Module'); }
                const modulesString = modules.join(', ');
                mydata.push({ name: e.role, modules: modulesString });
            });
            setRolldata(mydata);
        }
    }

    useEffect(() => { getrolls(); }, []);
    const handleCreateAccount = () => { navigate('/roleadminstrator'); }
    const pageHanlder = (page) => { getrolls(page); }
    return (
        <>
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Role Module"} HeadButton={<SharedButton onClick={handleCreateAccount} BtnLabel={"Create Role"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={"home"}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Role Administration">
                                        <RoleAdminstratorTable rolldata={rolldata} pagination={pagination} pageHanlder={pageHanlder} />
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
