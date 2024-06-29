
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { PoSidebar } from '../PO_Sidebar'
import { AdminstratorTableList } from './AdminstratorTableList';
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { useEffect, useState } from 'react';
import { getAccount_API, update_actice_inactive_API } from '../../api_services/Apiservices';
import Swal from 'sweetalert2';
import { SearchPanel } from '../../components/SearchPanel';
import { IoSearch } from 'react-icons/io5';

export const AdminstratorProfileList = () => {
    const navigate = useNavigate();
    const [loder, setLoder] = useState(false);
    const [maindata, setMaindata] = useState([]);
    const [pagination, setPagination] = useState()

    const get_account_list = async (page,key="") => {
        const data = { "page": page, userTypes: 3,"srkey":key }
     
        const resp = await getAccount_API(data);
        if (resp) {
            const data = resp.data;
            setLoder(false);

            let filterddata = data.map((e) => ({
                id: e._id,
                first_name: e.first_name,
                last_name: e.last_name,
                email: e.email,
                supervisor: e.supervisor,
                position: e.position,
                start_date: e.start_date,
                term_date: e.term_date,
                role: e.role.role,
                mobile_no: e.mobile_no,
                status: e.status,
                full_data: e
            }))
            setMaindata(filterddata);
            setPagination(resp.pagination);
        }
        setLoder(false);
    }

    useEffect(() => { get_account_list(); }, [])

    const actionHandler = (id, status) => {
        // Initial language status (example)
        let languageStatus = status; // Assume 'active' as defaultata
        const fdata = { 'id': id, 'status': status };

        // Show confirmation dialog
        Swal.fire({
            title: "Change Language Status",
            text: `Are you sure you want to change the status to ${languageStatus === 'active' ? 'inactive' : 'active'}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Toggle language status
                languageStatus = languageStatus === 'active' ? 'inactive' : 'active';

                // Display success message
                Swal.fire({
                    title: "Status Changed!",
                    text: `Language status is now ${languageStatus}.`,
                    icon: "success"
                });
                const resp = await update_actice_inactive_API(fdata); // Example function to update status
                if (resp) {
                    get_account_list();
                }
            }
        });
    }

    const pageHanlder = (pdata) => { get_account_list(pdata) }

    const handleCreateAccount = () => {
        navigate('/profileadminstrator');
    }

    const searchandler = (e)=>{
        const key = e.target.value;
        get_account_list("",key);
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
                            <Headings MainHeading={"User Profile"} HeadButton={<SharedButton onClick={handleCreateAccount} BtnLabel={"Create"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />

                            <Tabs
                                id="controlled-tab-example"
                                activeKey={"home"}
                                className="my-4"
                            >
                                <Tab eventKey="home" title="User Info">
                                    <SearchPanel  StartIcon={<IoSearch />} FormPlaceHolder={"Search by Name"} onChange={searchandler}/>
                                    <AdminstratorTableList pagination={pagination} maindata={maindata} actionHandler={actionHandler} pageHanlder={pageHanlder} />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
