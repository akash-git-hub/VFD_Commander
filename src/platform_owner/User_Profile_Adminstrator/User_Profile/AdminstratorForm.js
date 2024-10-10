import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import Select from '../../../components/Select';
import { UploadFile } from '../../../components/UploadFile';
import { create_modal_account_api, getAddNewField_API, getPosition_API, getRollsAll_API, getSupervisor_API } from '../../../api_services/Apiservices';
import { successAlert } from '../../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { stateList, statusArray } from '../../../helper/Helper';


export const AdminstratorForm = ({ setLoder, positionOp, getposition }) => {
    const [fields, setFields] = useState([]);
    const navigate = useNavigate();
    const [rolelist, setRolelist] = useState([]);
    const [superOp, setSuperOp] = useState([]);

    const getrolls = async () => {
        const resp = await getRollsAll_API();
        if (resp) {
            const findata = resp.data;
            const mydata = findata.map(e => ({ name: e.role, value: e._id }));
            setRolelist(mydata);
        }
    }

    const addNewHandler = (e, i) => {
        const { value } = e.target;
        let data = [...fields];
        if (i >= 0 && i < data.length) {
            data[i] = { ...data[i], value: value };
            setFields(data);
        }
    }

    const newFieldData = async () => {
        const resp = await getAddNewField_API("User");
        if (resp && resp.success) {
            let finData = resp.data;
            finData = finData.map((e) => ({ id: e._id, title: e.formLabel, type: e.formType, options: e.OptionArray, value: '' }));            
            setFields(finData);
        }
    }


    const getSuper = async () => {
        const resp = await getSupervisor_API();
        if (resp) {
            const findata = resp.data;
            const mydata = findata.map(e => ({ name: e.first_name ? e.first_name + " " + e.last_name : e.accountName, value: e._id }));

            setSuperOp(mydata);
        }
    }

    useEffect(() => { newFieldData(); getrolls(); getSuper(); }, []);

    const [indata, setIndata] = useState({
        "first_name": "", "last_name": "",
        "start_date": "", "email": "",
        "supervisor": "", "role": "",
        "position": "", "address_1": "",
        "address_2": "", "city": "",
        "state": "", "zip_code": "",
        "term_date": "", "image": "",
        "phone_no": "", "emergency_contact_name": "",
        "emergency_contact_number": "", "status": ""
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
        "emergency_contact_number": "", "status": ""
    });



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



    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = 0;

        // Email validation
        if (!indata.email || !/^\S+@\S+\.\S+$/.test(indata.email)) {
            setError((e) => ({ ...e, "email": "* Valid email is required" }));
            isValid = 10;
        }

        // Mobile number validation (accept only numbers)
        if (!indata.phone_no || !/^\d+$/.test(indata.phone_no)) {
            setError((e) => ({ ...e, "phone_no": "* Contact number must contain only digits" }));
            isValid = 11;
        }

        if (indata && indata.phone_no) {
            const phoneNoStr = indata.phone_no.toString();
            // Check if the length is exactly 10 digits
            if (phoneNoStr.length !== 10 || isNaN(Number(phoneNoStr))) {
                setError((e) => ({
                    ...e,
                    phone_no: "* Contact number must contain 10 digits"
                }));
                isValid = 11; // or any appropriate invalid state value
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
                isValid = 11; // or any appropriate invalid state value
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
                isValid = 13;
            }
        }

        if (!indata.first_name) { setError(prev => ({ ...prev, "first_name": "First Name is required" })); isValid = 1; }
        if (!indata.last_name) { setError(prev => ({ ...prev, "last_name": "Last Name is required" })); isValid = 2; }
        if (!indata.start_date) { setError(prev => ({ ...prev, "start_date": "Start Date is required" })); isValid = 3; }
        if (!indata.email) { setError(prev => ({ ...prev, "email": "Email is required" })); isValid = 4; }
        if (!indata.supervisor) { setError(prev => ({ ...prev, "supervisor": "Supervisor is required" })); isValid = 5; }
        if (!indata.role) { setError(prev => ({ ...prev, "role": "Role is required" })); isValid = 6; }
        if (!indata.position) { setError(prev => ({ ...prev, "position": "Position is required" })); isValid = 7; }
        if (!indata.phone_no) { setError(prev => ({ ...prev, "phone_no": "Phone Number is required" })); isValid = 14; }
        if (!indata.status) { setError(prev => ({ ...prev, "status": "Status is required" })); isValid = 17; }


        // if (!indata.address_1) { setError(prev => ({ ...prev, "address_1": "Address 1 is required" })); isValid = 8; }
        // if (!indata.city) { setError(prev => ({ ...prev, "city": "City is required" })); isValid = 10; }
        // if (!indata.state) { setError(prev => ({ ...prev, "state": "State is required" })); isValid = 11; }
        // if (!indata.zip_code) { setError(prev => ({ ...prev, "zip_code": "Zip Code is required" })); isValid = 13; }


        let sup_name = superOp.find((e) => e.value === indata.supervisor);
        if (sup_name) { sup_name = sup_name.name }

        let position_name = positionOp.find((e) => e.value === indata.position);
        if (position_name) { position_name = position_name.name }

        const st_name = stateList.find((e) => e.value === indata.state);
        let state_name = "";
        if (st_name) {
            state_name = st_name.name;
        }

        if (isValid == 0) {
            setLoder(true);
            const formData = new FormData();
            formData.append('checkUserType', 2);
            formData.append('create_by_id', localStorage.getItem('id'));
            formData.append('first_name', indata.first_name);
            formData.append('last_name', indata.last_name);
            formData.append('start_date', indata.start_date);
            formData.append('email', indata.email);
            formData.append('supervisor', sup_name);
            formData.append('supervisor_id', indata.supervisor);
            formData.append('role', indata.role);
            formData.append('position', position_name);
            formData.append('position_id', indata.position);
            formData.append('billing_address', indata.address_1);
            formData.append('billing_addres2', indata.address_2);
            formData.append('city', indata.city);
            formData.append('state', state_name);
            formData.append('state_code', indata.state);
            formData.append('zip_code', indata.zip_code);
            formData.append('term_date', indata.term_date);
            formData.append('image', indata.image);
            formData.append('mobile_no', indata.phone_no);
            if (indata.emergency_contact_number) {
                formData.append('emergency_contact_name', indata.emergency_contact_name);
            }
            formData.append('emergency_contact_number', indata.emergency_contact_number);
            formData.append('status', indata.status);
            formData.append('add_field', JSON.stringify(fields));

            const resp = await create_modal_account_api(formData);
            if (resp && resp.success) {
                e.target.reset();
                setFields([]);
                setLoder(false);
                successAlert(resp.message);
                navigate("/adminstratorprofilelist");
            }
            setLoder(false);
        }
    };




    return (
        <>
            <div className='CreateAccountForm'>
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={2}>
                                <UploadFile
                                    FormLabel="Upload"
                                    name="image"
                                    controlId="formProfilePic"
                                    onChange={imageHanlder}
                                />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={4}>
                                <InputField FormType={'text'} required={true} FormLabel={"First Name"} onChange={inputHandler} error={error.first_name} name='first_name' />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} required={true} FormLabel={"Last Name"} onChange={inputHandler} error={error.last_name} name='last_name' />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'email'} required={true} FormLabel={"Email"} onChange={inputHandler} error={error.email} name='email' />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'tel'} required={true} FormLabel={"Phone No"} max={10} onChange={inputHandler} error={error.phone_no} name='phone_no' />
                            </Col>
                            <Col md={4}>
                                <Select FormLabel='Supervisor' required={true} Array={superOp} value={indata.supervisor} onChange={inputHandler} error={error.supervisor} name='supervisor' />
                            </Col>
                            <Col md={4}>
                                <Select FormLabel='Position' required={true} Array={positionOp} value={indata.position} onChange={inputHandler} error={error.position} name='position' />
                            </Col>
                            <Col md={4}>
                                <Select FormLabel='Role' required={true} Array={rolelist} value={indata.role} onChange={inputHandler} error={error.role} name='role' />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'date'} required={true} FormLabel={"Start Date"} name='start_date' error={error.start_date} onChange={inputHandler} />
                            </Col>

                            <Col md={4}>
                                <InputField FormType={'date'} FormLabel={"Term Date"} onChange={inputHandler} error={error.term_date} name='term_date' />
                            </Col>

                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Address 1"} onChange={inputHandler} error={error.address_1} name='address_1' />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Address 2"} onChange={inputHandler} error={error.address_2} name='address_2' />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"City"} onChange={inputHandler} error={error.city} name='city' />
                            </Col>
                            <Col md={4}>
                                <Select Array={stateList} name="state" FormLabel={"State"} error={error.state} value={indata.state} onChange={inputHandler} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'tel'} FormLabel={"Zip Code"} max={5} onChange={inputHandler} error={error.zip_code} name='zip_code' />
                            </Col>

                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Emergency Contact Name"} onChange={inputHandler} error={error.emergency_contact_name} name='emergency_contact_name' />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'tel'} FormLabel={"Emergency Contact Number"} max='10' onChange={inputHandler} error={error.emergency_contact_number} name="emergency_contact_number" />
                            </Col>
                            <Col md={4}>
                                <Select FormLabel='Status' required={true} Array={statusArray} value={indata.status} onChange={inputHandler} error={error.status} name='status' />
                            </Col>
                            {fields.map((e, i) => (
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
                        <Row className='mb-2 mt-4'>
                            <Col md={4}>
                                <SharedButton type={'submit'} BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                    <Row className='mt-3'>
                        <span className='error'>Note: Fields marked with an asterisk (*) are mandatory and must be filled out before submitting the form .</span>
                    </Row>
                </Container>
            </div>

        </>
    )
}
