import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Tab, Table, Tabs, } from 'react-bootstrap';
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import Swal from 'sweetalert2';
import { Loader } from '../../../components/Loader';
import { InputField } from '../../../components/InputField';
import { Textareanew } from '../../../components/Textareanew';
import { SharedButton } from '../../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { errorAlert, successAlert } from '../../../components/Alert';
import { PoSidebar } from '../../PO_Sidebar';
import { Headings } from '../../../components/Headings';
import Select from '../../../components/Select';
import { createMultiUserGear_API, gearUsersList_API, getAddNewField_API, getAllUsers_API, getGearAndApparatusType_API, getGearById_API, getGearType_API, getUserGearByGearId_API, updateGear_API } from '../../../api_services/Apiservices';
import moment from 'moment';
import { itemsStatus, statusArray, statusArrayEdit } from '../../../helper/Helper';
import GearUserTable from './GearUserTable';
import { SharedMultiSelect } from '../../../components/SharedMultiSelect';


export default function GearInfoDetails() {
    const [indata, setIndata] = useState({ "gear_item_name": "", "gearttype_id": "", "recevied_date": "", "description": "", "add_field": "", "id": "", "item_cost": "", "gearttype_name": "", "location": "", "item_status": "", "inventory_status": "" });
    const [error, setError] = useState({ "gear_item_name": "", "gearttype_id": "", "recevied_date": "", "description": "", "add_field": "", "id": "", "item_cost": "", "gearttype_name": "" });
    const [isedit, setIsedit] = useState(false);
    const [loder, setLoder] = useState(false);
    const location = useLocation();
    const [fields, setFields] = useState([]);
    const navigate = useNavigate();
    const [grtype, setGrtype] = useState([]);
    const [preId, setPreId] = useState();
    const [tableData, setTableData] = useState([]);
    const [users_option, setUsers_option] = useState([]);
    const [usersID, setUsersID] = useState();
    const [listUser, setListUser] = useState([]);

    const [newAddField, setNewAddField] = useState([]);
    const newFieldData = async () => {
        const resp = await getAddNewField_API("GearApparatus");
        if (resp && resp.success) {
            let finData = resp.data;
            finData = finData.map((e) => ({ id: e._id, title: e.formLabel, type: e.formType, options: e.OptionArray, value: '' }));
            setNewAddField(finData);
        }
    }
    useEffect(() => { newFieldData(); }, []);

    const getDataById = async (id) => {
        if (id) {
            const resp = await getGearById_API(id);
            if (resp && resp.success) {
                setLoder(false);
                let { _id, gear_item_name, recevied_date, description, item_cost, gearttype_id, location, item_status, inventory_status, add_field } = resp.data;


                let check = add_field.filter(cr => newAddField.some(newItem => newItem.id === cr.id));
                const check1 = newAddField.filter(cr => !add_field.some(newItem => newItem.id === cr.id));
                let customFiled = [];
                if (check1.length > 0) { customFiled = check.concat(check1); } else { customFiled = check; }

                setFields(customFiled);
                setIndata({
                    "Id": _id,
                    "gear_item_name": gear_item_name,
                    "recevied_date": recevied_date,
                    "description": description,
                    "id": _id,
                    "item_cost": item_cost,
                    "gearttype_id": gearttype_id && gearttype_id._id,
                    "gearttype_name": gearttype_id && gearttype_id.type,
                    "location": location,
                    "item_status": item_status,
                    "inventory_status": inventory_status,
                    "add_field": customFiled,
                });
                setLoder(false);
            }
            setLoder(false);
        }
        setLoder(false);

    }


    const getUserGearData = async (id) => {
        if (id) {
            const resp = await getUserGearByGearId_API(id);
            if (resp && resp.success) {
                setLoder(false);
                let data = resp.data;
                data = data.map((e) => ({ "user_id": e.user_id && e.user_id._id, "id": e._id, "name": e.user_id && e.user_id.last_name + " " + e.user_id.first_name, "issue_date": e.issue_date }));
                setTableData(data);
            }
        }

    }

    useEffect(() => {
        if (location && location.state && location.state.data) {
            const data = location.state.data;
            if (data) {
                const myid = data._id;
                setPreId(myid);
                getDataById(myid);
                getUserGearData(myid);
            }
        }
    }, [location, newAddField])


    const addNewHandler = (e, i) => {
        const { value } = e.target;
        let data = [...fields];
        if (i >= 0 && i < data.length) {
            data[i] = { ...data[i], value: value };
            setFields(data);
        }
    }


    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }
    const getdata = async () => {
        setLoder(true);
        const resp = await getGearAndApparatusType_API();
        if (resp && resp.success) {
            setLoder(false);
            const fdata = resp.data;
            const mydata = fdata.map(e => ({ name: e.type, value: e._id }));
            setGrtype(mydata);
        }
        setLoder(false);
    }




    const getUsersOption = async (id) => {
        const resp = await getAllUsers_API(id)
        if (resp) {
            setLoder(false);
            const data = resp.data;
            setListUser(data);
        }

    }

    useEffect(() => { getdata(); getUsersOption(); }, []);

    const userOptionsSet = (list1, list2) => {
        if (list1 && list1.length > 0) {
            const idsSet = new Set(list2.map(item => item.user_id));
            const filteredList1 = list1.filter(item => !idsSet.has(item._id));
            if (filteredList1 && filteredList1.length > 0) {
                const myData = filteredList1.map(e => ({ label: e.first_name + " " + e.last_name, value: e._id }));
                setUsers_option(myData);
            }
        }

    }

    useEffect(() => {
        userOptionsSet(listUser, tableData);
    }, [listUser, tableData])

    const updateHandler = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!indata.gear_item_name) { setError(prev => ({ ...prev, "gear_item_name": "Required" })); isValid = false; }
        if (!indata.gearttype_id) { setError(prev => ({ ...prev, "gearttype_id": "Required" })); isValid = false; }
        if (!indata.item_status) { setError(prev => ({ ...prev, "item_status": "Required" })); isValid = false; }
        if (!indata.inventory_status) { setError(prev => ({ ...prev, "inventory_status": "Required" })); isValid = false; }

        if (isValid) {
            Swal.fire({
                title: "Are you sure?",
                text: "Gear Information has been modified. Save changes?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then(async (result) => {
                if (result.isConfirmed) {

                    setLoder(true);
                    const fadat = {
                        "id": indata.id,
                        'gear_item_name': indata.gear_item_name,
                        "gearttype_id": indata.gearttype_id,
                        "recevied_date": indata.recevied_date,
                        "location": indata.location,
                        "item_cost": indata.item_cost,
                        "description": indata.description,
                        "item_status": indata.item_status,
                        "inventory_status": indata.inventory_status,
                        "add_field": fields
                    }
                    const resp = await updateGear_API(fadat);
                    if (resp && resp.success) {
                        e.target.reset();
                        setFields([]);
                        setLoder(false);
                        successAlert(resp.message);
                        getDataById(preId);
                        setIsedit(false);
                    }
                    setLoder(false);
                }
                setLoder(false);
            });
        }
        setLoder(false);
    }

    const deleteHandler = (id) => {
        if (!id) { errorAlert("Something wrong"); return; }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const fadat = {
                    "id": id,
                    "is_delete": 'yes'
                }
                const resp = await updateGear_API(fadat);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/inventorymodulelist", { state: { eventKey: "gear" } });
                        }
                    })
                }
            }
        });
    }

    const cancelHandler = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to exit with no changes?",
            icon: "question"
        }).then((result) => {
            if (result.isConfirmed) { setIsedit(false); }
        });
    }

    const clickHandler = async () => {

        if (!preId) {
            errorAlert("The 'preId' is missing or invalid. Please provide a valid 'preId'.");
            return;
        }
        if (!usersID || usersID.length === 0) {
            errorAlert("The 'Users' is missing or invalid. Please provide a valid 'users"); return;
        }

        setLoder(true);
        const toDay = moment().unix();
        const fData = {
            "user_id": usersID,
            "gear_id": preId,
            "replacement_date": '',
            "issue_date": toDay,
        }
        const resp = await createMultiUserGear_API(fData);
        if (resp && resp.success) {
            setLoder(false);
            setUsersID();
            successAlert(resp.message);
            getDataById(preId);
            getUserGearData(preId);
        }
        setLoder(false);
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
                            <Headings MainHeading={"Gear and Apparatus Administration"} HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />

                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={"home"}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Gear Information">
                                        <div className='RoleAdminstrator'>
                                            <Container fluid>
                                                <Row>
                                                    <Col md={12}>
                                                        {isedit ?
                                                            <>
                                                                <div className='CreateAccountForm'>
                                                                    <div className='TrainingForm'>
                                                                        <Container fluid>
                                                                            <Row style={{ justifyContent: 'end' }}>
                                                                                <Col md={2} style={{ textAlign: "end" }}>
                                                                                    <Button variant="danger" size="sm"
                                                                                        onClick={cancelHandler} >Cancel
                                                                                    </Button>
                                                                                </Col>
                                                                            </Row>
                                                                            <Form onSubmit={updateHandler}>
                                                                                <Row className='mb-2'>
                                                                                    <Col md={6}>
                                                                                        <InputField required={true} FormType={'text'} FormLabel={"Name"} name='gear_item_name' error={error.gear_item_name} value={indata.gear_item_name} onChange={inputHandler} />
                                                                                    </Col>
                                                                                    <Col md={6}>
                                                                                        <Select required={true} FormLabel='Type' Array={grtype} onChange={inputHandler} error={error.gearttype_id} value={indata.gearttype_id} name='gearttype_id' />
                                                                                    </Col>

                                                                                    <Col md={6}>
                                                                                        <InputField FormType={'date'} FormLabel={"Received Date"} onChange={inputHandler} name='recevied_date'
                                                                                            value={indata.recevied_date} error={error.recevied_date} />
                                                                                    </Col>
                                                                                    <Col md={6}>
                                                                                        <InputField FormType={'text'} FormLabel={"Location"} name='location' error={error.location} value={indata.location} onChange={inputHandler} />
                                                                                    </Col>
                                                                                    <Col md={6}>
                                                                                        <InputField min={0} FormType={'number'} FormLabel={"Cost"} onChange={inputHandler} name='item_cost' value={indata.item_cost} error={error.item_cost} />
                                                                                    </Col>
                                                                                    <Col md={12}>
                                                                                        <Textareanew FormType={'text'} FormLabel={"Description"} rows={2} value={indata.description} onChange={inputHandler} name="description" error={error.description} />
                                                                                    </Col>
                                                                                    <Col md={6}>
                                                                                        <Select required={true} FormLabel='Item Status' Array={itemsStatus} onChange={inputHandler} error={error.item_status} value={indata.item_status} name='item_status' />
                                                                                    </Col>
                                                                                    <Col md={6}>
                                                                                        <Select required={true} FormLabel='Inventory Status' Array={statusArrayEdit} onChange={inputHandler} error={error.inventory_status} value={indata.inventory_status} name='inventory_status' />
                                                                                    </Col>
                                                                                    {fields && fields.map((e, i) => (
                                                                                        <Col md={6} key={i} className='mt-3'>
                                                                                            {e.type == "text" ?
                                                                                                <InputField FormType={'text'} FormLabel={e.title} value={e.value} onChange={(e) => addNewHandler(e, i)} name={e.title} />
                                                                                                :
                                                                                                <Select FormLabel={e.title} Array={e.options} value={e.value} onChange={(e) => addNewHandler(e, i)} name={e.title} />
                                                                                            }
                                                                                        </Col>
                                                                                    ))}
                                                                                </Row>
                                                                                <Row className='mb-2'>
                                                                                    <Col md={12}>
                                                                                        <SharedButton BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100 mt-4"} />
                                                                                    </Col>
                                                                                </Row>
                                                                            </Form>
                                                                            <Row className='mt-3'>
                                                                                <span className='error'>Note: Fields marked with an asterisk (*) are mandatory and must be filled out before submitting the form .</span>
                                                                            </Row>
                                                                        </Container>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            :
                                                            <>
                                                                <div className='CreateAccountForm UseDetailPages'>
                                                                    <Container>
                                                                        <Row className='mb-2' style={{ justifyContent: 'end' }}>
                                                                            <Col md={2} style={{ textAlign: "end" }}>
                                                                                <Button variant="success" size="sm"
                                                                                    onClick={() => setIsedit(true)} style={{
                                                                                        fontWeight: '500',
                                                                                        marginRight: '1rem'
                                                                                    }}><TbEdit />
                                                                                </Button>
                                                                            </Col>
                                                                        </Row>

                                                                        <Row className='mb-2 mt-3'>
                                                                            {indata &&
                                                                                <Col md={6} className='mb-2'>
                                                                                    <h6>Name</h6>
                                                                                    <p>{indata.gear_item_name}</p>
                                                                                </Col>
                                                                            }
                                                                            {indata &&
                                                                                <Col md={6} className='mb-2'>
                                                                                    <h6>Type</h6>
                                                                                    <p>{indata.gearttype_name}</p>
                                                                                </Col>
                                                                            }
                                                                            {indata &&
                                                                                <Col md={6} className='mb-2'>
                                                                                    <h6>Received Date</h6>
                                                                                    <p>{indata.recevied_date && moment.unix(indata.recevied_date).format("MM-DD-YYYY")}</p>
                                                                                </Col>
                                                                            }
                                                                            {indata &&
                                                                                <Col md={6} className='mb-2'>
                                                                                    <h6>Location</h6>
                                                                                    <p>{indata.location}</p>
                                                                                </Col>
                                                                            }
                                                                            {indata &&
                                                                                <Col md={6} className='mb-2'>
                                                                                    <h6>Cost</h6>
                                                                                    <p>{indata.item_cost && `$ ${indata.item_cost}`}</p>
                                                                                </Col>
                                                                            }
                                                                            {indata &&
                                                                                <Col md={12} className='mb-2'>
                                                                                    <h6>Description</h6>
                                                                                    <p>{indata.description}</p>
                                                                                </Col>
                                                                            }

                                                                            {indata &&
                                                                                <Col md={6} className='mb-2'>
                                                                                    <h6>Item Status</h6>
                                                                                    <p>{indata.item_status === "in_service" ? "In Service" : "Out of Service"}</p>
                                                                                </Col>
                                                                            }
                                                                            {indata &&
                                                                                <Col md={6} className='mb-2'>
                                                                                    <h6>Inventory Status</h6>
                                                                                    <p>{indata.inventory_status === "Active" ? "Active" : "InActive"}</p>
                                                                                </Col>
                                                                            }

                                                                            {indata && indata.add_field && indata.add_field.map((e, i) => (
                                                                                <Col md={6} className='mb-3' key={i}>
                                                                                    {e.type === "text" ?
                                                                                        <> <h6>{e.title}</h6> <p>{e.value}</p> </>
                                                                                        :
                                                                                        <> <h6>{e.title}</h6>
                                                                                            <p>
                                                                                                {e.options && e.value
                                                                                                    ? e.options.find((d) => d.value === e.value)?.name || "No match"
                                                                                                    : "No options"}
                                                                                            </p>
                                                                                        </>
                                                                                    }
                                                                                </Col>
                                                                            ))}
                                                                        </Row>

                                                                        <Row className='mt-5 mb-5'>
                                                                            <Col md={12} className='mb-3' style={{ textAlign: "center" }}><h5 style={{ textTransform: "uppercase" }}>Currently Issued To</h5></Col>
                                                                            <Col md={12}>
                                                                                <GearUserTable tableData={tableData} />
                                                                            </Col>
                                                                        </Row>

                                                                        <Row className='mt-5 mb-5'>
                                                                            <Col md={12} style={{ textAlign: "center" }}><h5 style={{ textTransform: "uppercase" }}>Issue To NEW Users</h5></Col>
                                                                            <Col md={12} className='mt-4'>
                                                                                <Row>
                                                                                    <Col md={6} className='mb-2'>
                                                                                        <SharedMultiSelect
                                                                                            isRequire={true}
                                                                                            labelText="Select Users"
                                                                                            setSkillsdata={setUsersID}
                                                                                            name="gears"
                                                                                            options={users_option}
                                                                                        />
                                                                                    </Col>
                                                                                    <Col md={6} className='mt-4'>
                                                                                        <SharedButton type={'button'} onClick={clickHandler} BtnLabel={"Add"} BtnVariant={'primary'} BtnClass={"w-100 mt-1"} />
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    </Container>
                                                                </div>
                                                            </>
                                                        }
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </div>
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
