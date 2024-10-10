import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, Button, Tabs, Tab, } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';

import { UploadFile } from '../../../components/UploadFile';
import { deleteUserGear_API, deleteUserQualification_API, getAddNewField_API, getRollsAll_API, getSupervisor_API, resetPassword_API, update_modal_account_api } from '../../../api_services/Apiservices';
import { errorAlert, successAlert } from '../../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import moment from 'moment';
import Swal from 'sweetalert2';
import { stateList, statusArray } from '../../../helper/Helper';
import Select from '../../../components/Select';
import { EditQuelification } from './EditQuelification';
import { MyGearEditModal } from './MyGearEditModal';



export const EditAdminstratorForm = ({ setLoder, pre, grdata, quadata, superOp, positionOp, grtype, refreshHandler }) => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isdelete, setIsdelete] = useState(false);
    const navigate = useNavigate();
    const [rolelist, setRolelist] = useState([]);
    const [isedit, setIsedit] = useState(false);
    const [premain, setPremain] = useState();
    const [newAddField, setNewAddField] = useState([]);

    const [indata, setIndata] = useState({
        "first_name": "", "last_name": "",
        "start_date": "", "email": "",
        "supervisor": "", "role": "",
        "position": "", "address_1": "",
        "address_2": "", "city": "",
        "state": "", "zip_code": "",
        "term_date": "", "image": "",
        "phone_no": "", "emergency_contact_name": "",
        "emergency_contact_number": "", "status": "",
        "supervisor_id": "", "position_id": "", "add_field": ""
    });


    const [error, setError] = useState({
        "first_name": "", "last_name": "",
        "start_date": "", "email": "",
        "supervisor": "", "role": "",
        "position": "", "address_1": "",
        "address_2": "", "city": "",
        "state": "", "zip_code": "",
        "term_date": "", "image": "",
        "phone_no": "", "emergency_contact_name": "",
        "emergency_contact_number": "", "status": "",
        "supervisor_id": "", "position_id": "",
    });


    const getrolls = async () => {
        const resp = await getRollsAll_API();
        if (resp) {
            const findata = resp.data;
            const mydata = findata.map(e => ({ name: e.role, value: e._id }));
            setRolelist(mydata);
        }
    }

    const newFieldData = async () => {
        const resp = await getAddNewField_API("User");
        if (resp && resp.success) {
            let finData = resp.data;
            finData = finData.map((e) => ({ id: e._id, title: e.formLabel, type: e.formType, options: e.OptionArray, value: '' }));
            setNewAddField(finData);
        }
    }


    useEffect(() => { getrolls(); newFieldData(); }, []);

    const setupHandler = (pre,newData) => {
        if (pre) {
            let roleId = "";
            let { _id, first_name, last_name, start_date, email, supervisor_id, position_id, supervisor, position, billing_address, billing_addres2, city, state_code, state, zip_code, term_date, image, mobile_no, emergency_contact_name, emergency_contact_number, status, add_field, password } = pre;

            let check = add_field.filter(cr => newAddField.some(newItem => newItem.id === cr.id));
            const check1 = newAddField.filter(cr => !add_field.some(newItem => newItem.id === cr.id));

            let customFiled = [];
            if (check1.length > 0) { customFiled = check.concat(check1); } else { customFiled = check; }

            if (pre.role && pre.role.role) { roleId = pre.role && pre.role.role; }
            let pre1 = { ...pre };
            pre1.add_field = customFiled;
            setPremain(pre1);

            setIndata({
                "id": _id,
                "first_name": first_name, "last_name": last_name,
                "start_date": start_date, "email": email,
                "supervisor_id": supervisor_id, "position_id": position_id,
                "supervisor": supervisor, "role": roleId,
                "position": position, "address_1": billing_address,
                "address_2": billing_addres2, "city": city,
                "state": state_code, "state_name": state, "zip_code": zip_code,
                "term_date": term_date, "image": "", "preimage": image,
                "phone_no": mobile_no, "emergency_contact_name": emergency_contact_name,
                "emergency_contact_number": emergency_contact_number, "status": status,
                "add_field": customFiled,
                "password": password,
            });
            setFields(customFiled);
        }
    }

    useEffect(() => {
        setupHandler(pre,newAddField)
    }, [pre, newAddField])


    const addNewHandler = (e, i) => {
        const { value } = e.target;
        let data = [...fields];
        if (i >= 0 && i < data.length) {
            data[i] = { ...data[i], value: value };
            setFields(data);
        }
    }



    const handleAddField = (title, placeholder) => {
        setFields([...fields, { title, placeholder }]);
    };

    const imageHanlder = (data) => {
        const { name, value } = data;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }


    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate each field
        let isValid = true;

        if (!indata.phone_no || !/^\d+$/.test(indata.phone_no)) {
            setError((e) => ({ ...e, "phone_no": "* Contact number must contain only digits" }));
            isValid = false;
        }
        if (indata && indata.phone_no) {
            const phoneNoStr = indata.phone_no.toString();
            // Check if the length is exactly 10 digits
            if (phoneNoStr.length !== 10 || isNaN(Number(phoneNoStr))) {
                setError((e) => ({
                    ...e,
                    phone_no: "* Contact number must contain 10 digits"
                }));
                isValid = false; // or any appropriate invalid state value
            }
        }

        if (indata && indata.emergency_contact_number) {
            const phoneNoStr = indata.emergency_contact_number.toString();
            // Check if the length is exactly 10 digits
            if (phoneNoStr.length !== 10 || isNaN(Number(phoneNoStr))) {
                setError((e) => ({
                    ...e,
                    emergency_contact_number: "* Contact number must contain 10 digits"
                }));
                isValid = false; // or any appropriate invalid state value
            }
        }

        if (indata && indata.zip_code) {
            const z_code = indata.zip_code.toString();
            // Check if the length is exactly 10 digits
            if (z_code.length !== 5 || isNaN(Number(z_code))) {
                setError((e) => ({
                    ...e,
                    zip_code: "* ZIP code must contain 5 digits"
                }));
                isValid = false; // or any appropriate invalid state value
            }
        }

        if (!indata.first_name) { setError(prev => ({ ...prev, "first_name": "First Name is required" })); isValid = false; }
        if (!indata.last_name) { setError(prev => ({ ...prev, "last_name": "Last Name is required" })); isValid = false; }
        if (!indata.email) { setError(prev => ({ ...prev, "email": "Email is required" })); isValid = false; }
        if (!indata.phone_no) { setError(prev => ({ ...prev, "phone_no": "Phone Number is required" })); isValid = false; }
        if (!indata.role) { setError(prev => ({ ...prev, "role": "Role is required" })); isValid = false; }
        if (!indata.start_date) { setError(prev => ({ ...prev, "start_date": "Start Date is required" })); isValid = false; }
        if (!indata.status) { setError(prev => ({ ...prev, "status": "Status is required" })); isValid = false; }
        if (!indata.supervisor_id) { setError(prev => ({ ...prev, "supervisor_id": "Supervisor is required" })); isValid = false; }
        if (!indata.position_id) { setError(prev => ({ ...prev, "position_id": "Position is required" })); isValid = false; }

        // if (!indata.address_1) { setError(prev => ({ ...prev, "address_1": "Address 1 is required" })); isValid = false; }
        // if (!indata.city) { setError(prev => ({ ...prev, "city": "City is required" })); isValid = false; }
        // if (!indata.state) { setError(prev => ({ ...prev, "state": "State is required" })); isValid = false; }
        // if (!indata.zip_code) { setError(prev => ({ ...prev, "zip_code": "Zip Code is required" })); isValid = false; }

        let st_name = stateList.find((e) => e.value === indata.state);

        if (st_name) {
            st_name = st_name.name;
        }

        // If all fields are valid, submit the form
        if (isValid) {

            Swal.fire({
                title: "Are you sure?",
                text: "User Information has been modified. Save changes?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then(async (result) => {
                if (result.isConfirmed) {

                    let sup_name = superOp.find((e) => e.value === indata.supervisor_id);
                    if (sup_name) { sup_name = sup_name.name }

                    let position_name = positionOp.find((e) => e.value === indata.position_id);
                    if (position_name) { position_name = position_name.name }

                    setLoder(true);

                    const formData = new FormData();
                    formData.append('checkUserType', 2);
                    formData.append('id', indata.id);
                    formData.append('create_by_id', localStorage.getItem('id'));
                    formData.append('first_name', indata.first_name);
                    formData.append('last_name', indata.last_name);
                    formData.append('start_date', indata.start_date);
                    formData.append('email', indata.email);
                    formData.append('role', indata.role);
                    formData.append('supervisor_id', indata.supervisor_id);
                    formData.append('position_id', indata.position_id);
                    formData.append('supervisor', sup_name);
                    formData.append('position', position_name);
                    formData.append('billing_address', indata.address_1);
                    formData.append('billing_addres2', indata.address_2);
                    formData.append('city', indata.city);
                    formData.append('state', st_name);
                    formData.append('state_code', indata.state);
                    formData.append('zip_code', indata.zip_code);
                    formData.append('term_date', indata.term_date);
                    formData.append('image', indata.image);
                    formData.append('mobile_no', indata.phone_no);
                    formData.append('emergency_contact_name', indata.emergency_contact_name);
                    if (indata.emergency_contact_number) {
                        formData.append('emergency_contact_number', indata.emergency_contact_number);
                    }
                    formData.append('status', indata.status);
                    formData.append('add_field', JSON.stringify(fields));
                    const resp = await update_modal_account_api(formData);
                    if (resp && resp.success) {
                        e.target.reset();
                        setFields([]);
                        setLoder(false);
                        successAlert(resp.message);
                        refreshHandler();
                        setIsedit(false);
                        // navigate("/adminstratorprofilelist");
                    }
                    setLoder(false);
                }
            });
            setLoder(false);
        }
        setLoder(false);
    };


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
                const resp = await update_modal_account_api(fadat);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/adminstratorprofilelist");
                        }
                    })
                }
            }
        });
    }


    const deleteUserGear = (id) => {
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
                const fadat = { "id": id, }
                const resp = await deleteUserGear_API(fadat);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/adminstratorprofilelist");
                        }
                    })
                }
            }
        });
    }

    const deleteUserQualificationHandler = (id) => {
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
                const fadat = { "id": id, }
                const resp = await deleteUserQualification_API(fadat);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/adminstratorprofilelist");
                        }
                    })
                }
            }
        });
    }

    const cancelHandler = () => {
        Swal.fire({
            title: "Changes have been made",
            text: "Are you sure you want to exit with no changes?",
            icon: "question"
        }).then((result) => {
            if (result.isConfirmed) { setIsedit(false); }
        });
    }

    const [showmygear, setShowmygear] = useState(false);
    const [showmyqu, setShowmyqu] = useState(false);
    const [prequ, setPrequ] = useState();
    const [pregr, setPregr] = useState();

    const editgrHandler = (data) => {
        setShowmygear(true);
        setPregr(data);
    }

    const editquHandler = (data) => {
        setShowmyqu(true);
        setPrequ(data);
    }

    const resetPasswordHandler = (id) => {
        if (!id) { errorAlert("Something wrong"); return; }
        Swal.fire({
            "title": "Are you sure?",
            "text": "Do you want to reset the password ",
            "icon": "warning",
            "showCancelButton": true,
            "confirmButtonColor": "#3085d6",
            "cancelButtonColor": "#d33",
            "confirmButtonText": "Yes, reset it!",
            "cancelButtonText": "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const abcd = { "id": id };
                setLoder(true);
                const resp = await resetPassword_API(abcd);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Reset!",
                        text: "The password has been sent successfully to the registered email address",
                        icon: "success"
                    })
                }
            }
        });
    }


    return (
        <>
            {isedit ?
                <>
                    <div className='CreateAccountForm'>
                        <Container>
                            <Form onSubmit={handleSubmit}>
                                <Row style={{ justifyContent: "space-between" }}>
                                    <Col md={6}>
                                        <Row>
                                            <Col md={6}>
                                                <img src={indata.preimage ? indata.preimage : 'assets/images/avatar.png'} alt="Profile Preview" className='img-fluid' style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    border: "1px solid",
                                                    borderRadius: "50px",
                                                }} />
                                            </Col>
                                            <Col md={6}>
                                                <UploadFile
                                                    FormLabel="Upload"
                                                    name="image"
                                                    controlId="formProfilePic"
                                                    onChange={imageHanlder}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={1}>
                                        <Button variant="danger" size="sm"
                                            onClick={cancelHandler} style={{
                                                fontWeight: '500'
                                            }}>Cancel
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className='mb-2 mt-3'>
                                    <Col md={4}>
                                        <InputField required={true} FormType={'text'} FormLabel={"First Name"} onChange={inputHandler} error={error.first_name} value={indata.first_name} name='first_name' />
                                    </Col>
                                    <Col md={4}>
                                        <InputField required={true} FormType={'text'} FormLabel={"Last Name"} onChange={inputHandler} error={error.last_name} value={indata.last_name} name='last_name' />
                                    </Col>
                                    <Col md={4}>
                                        <InputField required={true} FormType={'email'} FormLabel={"Email"} onChange={inputHandler} readOnly={true} error={error.email} value={indata.email} name='email' />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'tel'} required={true} FormLabel={"Phone No"} max={10} onChange={inputHandler} error={error.phone_no} value={indata.phone_no} name='phone_no' />
                                    </Col>
                                    <Col md={4}>
                                        <Select FormLabel='Supervisor' required={true} Array={superOp} value={indata.supervisor_id} onChange={inputHandler} error={error.position_id} name='supervisor_id' />
                                    </Col>

                                    <Col md={4}>
                                        <Select FormLabel='Position' required={true} Array={positionOp} value={indata.position_id} onChange={inputHandler} error={error.position_id} name='position_id' />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'text'} required={true} FormLabel={"Role"} readOnly={true} onChange={inputHandler} value={indata.role} name={'role'} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'date'} required={true} FormLabel={"Start Date"} onChange={inputHandler} error={error.start_date} value={indata.start_date} name='start_date' />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'date'} FormLabel={"Term Date"} onChange={inputHandler} error={error.term_date} value={indata.term_date} name='term_date' />
                                    </Col>

                                    <Col md={4}>
                                        <InputField FormType={'text'} FormLabel={"Address 1"} onChange={inputHandler} error={error.address_1} value={indata.address_1} name='address_1' />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'text'} FormLabel={"Address 2"} onChange={inputHandler} error={error.address_2} value={indata.address_2} name='address_2' />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'text'} FormLabel={"City"} onChange={inputHandler} error={error.city} value={indata.city} name='city' />
                                    </Col>
                                    <Col md={4}>
                                        <Select Array={stateList} name="state" FormLabel={"State"} error={error.state} value={indata.state} onChange={inputHandler} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'tel'} FormLabel={"Zip Code"} max={5} min={5} onChange={inputHandler} error={error.zip_code} value={indata.zip_code} name='zip_code' />
                                    </Col>

                                    <Col md={4}>
                                        <InputField FormType={'text'} FormLabel={"Emergency Contact Name"} onChange={inputHandler} error={error.emergency_contact_name} value={indata.emergency_contact_name} name='emergency_contact_name' />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'tel'} FormLabel={"Emergency Contact Number"} max='10' onChange={inputHandler} error={error.emergency_contact_number} value={indata.emergency_contact_number} name="emergency_contact_number" />
                                    </Col>
                                    <Col md={4}>
                                        <Select FormLabel='Status' required={true} Array={statusArray} value={indata.status} onChange={inputHandler} error={error.status} name='status' />
                                    </Col>
                                    {fields && fields.map((e, i) => (
                                        <Col md={4} key={i}>
                                            {e.type == "text" ?
                                                <InputField FormType={'text'} FormLabel={e.title} value={e.value} onChange={(e) => addNewHandler(e, i)} name={e.title} />
                                                :
                                                <Select FormLabel={e.title} Array={e.options} value={e.value} onChange={(e) => addNewHandler(e, i)} name={e.title} />
                                            }
                                        </Col>
                                    ))}
                                </Row>
                                <hr />
                                <Row className='mb-2'>
                                    <Col md={4}>
                                        <SharedButton type={'submit'} BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100"} />
                                    </Col>
                                </Row>
                            </Form>
                            <Row className='mt-3'>
                                <span className='error'>Note: Fields marked with an asterisk (*) are mandatory and must be filled out before submitting the form .</span>
                            </Row>
                        </Container>
                    </div>
                </>
                :

                <>
                    <div className='CreateAccountForm UseDetailPages'>
                        <Container>
                            <Row className="my-3" style={{ justifyContent: "space-between" }}>
                                <Col md={6} className='mb-3'>
                                    <img src={indata.preimage ? indata.preimage : 'assets/images/avatar.png'} alt="Profile Preview" className='img-fluid' style={{
                                        width: "100px",
                                        height: '100px',
                                        border: "1px solid",
                                        borderRadius: "50px",
                                    }} />
                                </Col>
                                <Col md={4} style={{ textAlign: "end" }}>
                                    <Button variant="success" size="sm" className='m-2'
                                        onClick={() => setIsedit(true)} style={{
                                            fontWeight: '500',
                                        }}><TbEdit />
                                    </Button>
                                    {/* <Button variant="danger" size="sm"
                                        onClick={() => deleteHandler(indata.id)} style={{
                                            fontWeight: '500',
                                            marginRight:'1rem',
                                        }}><RiDeleteBinLine />
                                    </Button> */}
                                    <Button variant="primary" size="sm"
                                        onClick={() => resetPasswordHandler(indata.id)}
                                        style={{
                                            fontWeight: '500'
                                        }}>Reset password
                                    </Button>
                                </Col>
                            </Row>
                            <Row className='mb-5 mt-3'>
                                {indata && indata.first_name &&
                                    <Col md={4} className='mb-3'>
                                        <h6>First Name</h6>
                                        <p>{indata.first_name}</p>
                                    </Col>
                                }
                                {indata && indata.last_name &&
                                    <Col md={4} className='mb-3'>
                                        <h6>Last Name</h6>
                                        <p>{indata.last_name}</p>
                                    </Col>
                                }
                                {indata && indata.email &&
                                    <Col md={4} className='mb-3'>
                                        <h6>Email</h6>
                                        <p>{indata.email}</p>
                                    </Col>
                                }
                                {indata && indata.phone_no &&
                                    <Col md={4} className='mb-3'>
                                        <h6>Phone No</h6>
                                        <p>{indata.phone_no}</p>
                                    </Col>
                                }
                                {indata && indata.supervisor &&
                                    <Col md={4} className='mb-3'>
                                        <h6>Supervisor</h6>
                                        <p>{indata.supervisor}</p>
                                    </Col>
                                }
                                {indata && indata.position &&
                                    <Col md={4} className='mb-3'>
                                        <h6>Position</h6>
                                        <p>{indata.position}</p>
                                    </Col>
                                }
                                {indata && indata.role &&
                                    <Col md={4} className='mb-3'>
                                        <h6>Role</h6>
                                        <p>{indata.role}</p>
                                    </Col>
                                }
                                {indata && indata.start_date &&
                                    <Col md={4} className='mb-3'>
                                        <h6>Start Date</h6>
                                        <p>{moment.unix(indata.start_date).format("MM-DD-YYYY")}</p>
                                    </Col>
                                }
                                {indata && indata.term_date &&
                                    <Col md={4} className='mb-3'>
                                        <h6>Term Date</h6>
                                        <p>{moment.unix(indata.term_date).format('MM-DD-YYYY')}</p>
                                    </Col>
                                }
                                {indata && indata.address_1 &&
                                    <Col md={4} className='mb-3'>
                                        <h6>Address 1</h6>
                                        <p>{indata.address_1}</p>
                                    </Col>
                                }
                                {indata && indata.address_2 &&
                                    <Col md={4} className='mb-3'>
                                        <h6>Address 2</h6>
                                        <p>{indata.address_2}</p>
                                    </Col>
                                }
                                {indata && indata.city &&
                                    <Col md={4} className='mb-3'>
                                        <h6>City</h6>
                                        <p>{indata.city}</p>
                                    </Col>
                                }
                                {indata && indata.state_name &&
                                    <Col md={4} className='mb-3'>
                                        <h6>State</h6>
                                        <p>{indata.state_name}</p>
                                    </Col>
                                }
                                {indata && indata.zip_code &&
                                    <Col md={4} className='mb-3'>
                                        <h6>Zip Code</h6>
                                        <p>{indata.zip_code}</p>
                                    </Col>
                                }
                                {indata && indata.emergency_contact_name &&
                                    <Col md={4} className='mb-3'>
                                        <h6>Emergency Contact Name</h6>
                                        <p>{indata.emergency_contact_name}</p>
                                    </Col>
                                }
                                {indata && indata.emergency_contact_number &&
                                    <Col md={4} className='mb-3'>
                                        <h6>Emergency Contact Number</h6>
                                        <p>{indata.emergency_contact_number}</p>
                                    </Col>
                                }
                                {indata && indata.status &&
                                    <Col md={4} className='mb-3'>
                                        <h6>Status</h6>
                                        <p>{indata.status}</p>
                                    </Col>
                                }
                                {premain && premain.add_field && premain.add_field.map((e, i) => (
                                    <Col md={4} className='mb-3' key={i}>
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
                            <h5>Gear</h5>
                            <hr />
                            {grdata && grdata.map((e, index) => ( // Added 'index' for unique keys
                                <React.Fragment key={index}> {/* Added key prop for each fragment */}
                                    <Row className='mb-4'>
                                        <Col md={10}>
                                            <Row>
                                                <Col md={3}>
                                                    <h6>Gear Name</h6>
                                                    <p>{e.gear_id && e.gear_id.gear_item_name}</p>
                                                </Col>

                                                <Col md={3}>
                                                    <h6>Issue Date</h6>
                                                    {e.issue_date &&
                                                        <p>{moment.unix(e.issue_date).format("MM-DD-YYYY")}</p>
                                                    }
                                                </Col>
                                                <Col md={3}>
                                                    <h6>Replacement Date</h6>
                                                    {e.replacement_date &&
                                                        <p>{moment.unix(e.replacement_date).format("MM-DD-YYYY")}</p>
                                                    }
                                                </Col>
                                                {e.add_field && e.add_field.map((inField, idx) => ( // Added 'idx' for unique keys
                                                    <Col md={3} key={idx}> {/* Added key prop for each column */}
                                                        <h6>{inField.title}</h6>
                                                        <p>{inField.value}</p>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Col>
                                        <Col md={2} className="text-center">
                                            <Button variant="success" size="sm"
                                                onClick={() => editgrHandler(e)} style={{
                                                    fontWeight: '500'
                                                }}><TbEdit />
                                            </Button>
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            ))}
                            <h5>Qualifications</h5>
                            <hr />
                            {quadata && quadata.map((e, index) => ( // Added 'index' for unique keys
                                <React.Fragment key={index}> {/* Added key prop for each fragment */}
                                    <Row className='mb-4'>
                                        <Col md={10}>
                                            <Row>
                                                <Col md={3}>
                                                    <h6>Qualification Name</h6>
                                                    <p>{e.qualifications_id && e.qualifications_id.name}</p>
                                                </Col>
                                                {e.exp_date &&
                                                    <Col md={3}>
                                                        <h6>Expiration Date</h6>
                                                        <p>{moment.unix(e.exp_date).format("MM-DD-YYYY")}</p>
                                                    </Col>
                                                }
                                                {e.add_field && e.add_field.map((inField, idx) => ( // Added 'idx' for unique keys
                                                    <Col md={3} key={idx}> {/* Added key prop for each column */}
                                                        <h6>{inField.title}</h6>
                                                        <p>{inField.value}</p>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Col>
                                        <Col md={2} className="text-center">
                                            <Button variant="success" size="sm"
                                                onClick={() => editquHandler(e)} style={{
                                                    fontWeight: '500'
                                                }}><TbEdit />
                                            </Button>
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            ))}
                        </Container>
                    </div>
                    <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
                </>

            }
            <EditQuelification show={showmyqu} handleClose={() => { setShowmyqu(false); setPrequ(); }} setLoder={setLoder} predata={prequ} prName={pre && pre.last_name + pre.first_name} image={pre && pre.image} refreshHandler={refreshHandler} />
            <MyGearEditModal show={showmygear} handleClose={() => { setShowmygear(false); setPregr() }} grtype={grtype} setLoder={setLoder} pregr={pregr} prName={pre && pre.last_name + pre.first_name} image={pre && pre.image} refreshHandler={refreshHandler} />
        </>
    )
}
