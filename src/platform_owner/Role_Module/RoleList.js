
import { PoSidebar } from '../PO_Sidebar'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { RoleAdminstratorTable } from './RoleAdminstratorTable';
import { useEffect, useState } from 'react';
import { getQualification_API, getRolls_API } from '../../api_services/Apiservices';
import { QualificationListTable } from '../Qualification_Module/Qualification_Information/QualificationListTable';
import { Loader } from '../../components/Loader';

export const RoleList = () => {
    const navigate = useNavigate();
    const [rolldata, setRolldata] = useState([]);
    const [pagination, setPagination] = useState();
    const [predata, setPredata] = useState([]);
    const [trdata, setTrdata] = useState([]);
    const [loder, setLoder] = useState(false);
    const [key, setKey] = useState('role');

    const getrolls = async (page = 1) => {
        const resp = await getRolls_API({ "page": page });
        if (resp) {
            const findata = resp.data;
            setPagination(resp.pagination);

            const mydata = [];
            findata.map((e) => {
                const modules = [];
                if (e.Role_Administration) { modules.push('Role Administration'); }
                if (e.Qualification_Module) { modules.push('Qualification Administration'); }
                if (e.User_Profile_Module) { modules.push('User Profile Module'); }
                if (e.Training_Module) { modules.push('Training Administration'); }
                if (e.Inventory_Module) { modules.push('Inventory Administration'); }
                if (e.Gear_Administration) { modules.push('Gear Administration'); }
                if (e.Availability_Module) { modules.push('Availability'); }              
                if (e.Reporting_Module) { modules.push('Reporting'); }             
                if (e.Dashboard) { modules.push('Dashboard'); }             
                const modulesString = modules.join(', ');
                mydata.push({ name: e.role, modules: modulesString, fulldata: e });
            });
            setRolldata(mydata);
        }
    }


    const getdata = async () => {
        setLoder(true);
        const resp = await getQualification_API();
        if (resp && resp.success) {
            setLoder(false);
            const fdata = resp.data;
            setPredata(fdata);
            setTrdata(resp.data);
        }
        setLoder(false);
    }
    useEffect(() => { getdata(); }, [])

    useEffect(() => { getrolls(); }, []);
    const handleCreateAccount = (key) => { if (key == "role") { navigate('/roleadminstrator'); } else { navigate('/qualification'); } }
    const pageHanlder = (page) => { getrolls(page); }


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
                            <Headings MainHeading={"Role and Qualifications Administration"} HeadButton={<SharedButton onClick={()=>handleCreateAccount(key)} BtnLabel={"Create"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />

                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="role" title="Role Information">
                                        <RoleAdminstratorTable rolldata={rolldata} pagination={pagination} pageHanlder={pageHanlder} />
                                    </Tab>

                                    <Tab eventKey="qualifications" title="Qualifications Information">
                                        <QualificationListTable trdata={trdata} />
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
