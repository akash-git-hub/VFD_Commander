
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { PoSidebar } from '../PO_Sidebar'
import { AdminstratorTableList } from './AdminstratorTableList';
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { useEffect, useState } from 'react';
import { getAccount_API, getPosition_API, unavailableUsers_API, update_actice_inactive_API } from '../../api_services/Apiservices';
import Swal from 'sweetalert2';
import { SearchPanel } from '../../components/SearchPanel';
import { IoSearch } from 'react-icons/io5';
import { UnavailabilityTableList } from '../Unavailability_Module/UnavailabilityTableList';
import { PosiotinForm } from './PosiotinForm';
import { sortEventName } from '../../helper/Helper';

export const AdminstratorProfileList = () => {
    const navigate = useNavigate();
    const [loder, setLoder] = useState(false);
    const [maindata, setMaindata] = useState([]);
    const [pagination, setPagination] = useState()
    const [key, setKey] = useState('user');
    const [preData, setpreData] = useState([]);
    const [positionOp, setPositionOp] = useState([]);
    const [orderFirstName, setOrderFirstName] = useState(true);
    const [orderLastName, setOrderLastName] = useState(true);

    const get_account_list = async (
        page,
        key = "",
        sortBy = "No",
        order = false,
    ) => {
        const data = {
            "page": page,
            userTypes: 3,
            'srkey': key,
            'sortBy': sortBy,
            'order': order,
        }
        setLoder(true);

        const resp = await getAccount_API(data);
        if (resp) {
            const data = resp.data;
            setLoder(false);

            let filterData = data.map((e) => ({
                id: e._id,
                name: e.first_name + " " + e.last_name,
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
            const sortData = sortEventName(filterData, true);
            setMaindata(sortData);
            setPagination(resp.pagination);
        }
        setLoder(false);
    }

    useEffect(() => { get_account_list(); }, [])

    const actionHandler = (id, status) => {
        return false;
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

    const searchandler = (e) => {
        const key = e.target.value;
        get_account_list("", key);
    }


    const getdata = async () => {
        setLoder(true);
        const resp = await unavailableUsers_API();
        if (resp && resp.success) {
            setLoder(false);
            const prefdata = resp.data;
            setpreData(prefdata);
        }
        setLoder(false);
    }
    useEffect(() => { getdata(); }, [])



    const getposition = async () => {
        const resp = await getPosition_API();
        if (resp) {
            const findata = resp.data;
            const mydata = findata.map(e => ({ name: e.name, value: e._id }));
            setPositionOp(mydata);
        }
    }

    useEffect(() => {
        getposition();
    }, [])

    const sortNameHandler = (data) => {
        if (data === "fname") {
            setOrderFirstName(!orderFirstName);
            let data = !orderFirstName;
            get_account_list("", "", "fname", data);
        } else if (data === "lname") {
            setOrderLastName(!orderLastName);
            let data = !orderLastName;
            get_account_list("", "", "lname", data);
        }

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
                            {key == "user" ?
                                <Headings MainHeading={"User Profile Administration"} HeadButton={<SharedButton onClick={handleCreateAccount} BtnLabel={"Create"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                                :
                                <Headings MainHeading={"User Profile Administration"} />
                            }

                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="my-4"
                            >
                                <Tab eventKey="user" title="User Information">
                                    <SearchPanel StartIcon={<IoSearch />} FormPlaceHolder={"Search by Name"} onChange={searchandler} />
                                    <AdminstratorTableList
                                        pagination={pagination}
                                        maindata={maindata}
                                        actionHandler={actionHandler}
                                        pageHanlder={pageHanlder}
                                        sortNameHandler={sortNameHandler}
                                        orderFirstName={orderFirstName}
                                        orderLastName={orderLastName}
                                    />
                                </Tab>
                                <Tab eventKey="unavailability" title="Availability">
                                    <UnavailabilityTableList preData={preData} />
                                </Tab>
                                <Tab eventKey="position" title="Position Information">
                                    <PosiotinForm setLoder={setLoder} positionOp={positionOp} getposition={getposition} />
                                </Tab>

                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
