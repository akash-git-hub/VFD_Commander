
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
                if (e.User_Profile_Module) { modules.push('User Profile'); }
                if (e.Training_Module) { modules.push('Training'); }
                if (e.Inventory_Module) { modules.push('Inventory'); }
                if (e.Availability_Module) { modules.push('Availability'); }
                if (e.Qualification_Module) { modules.push('Qualifications'); }
                if (e.Reporting_Module) { modules.push('Reporting'); }
                const modulesString = modules.join(', ');
                mydata.push({ name: e.role, modules: modulesString ,fulldata:e});
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
                            <Headings MainHeading={"Role"} HeadButton={<SharedButton onClick={handleCreateAccount} BtnLabel={"Create"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={"home"}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Role info ">
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
