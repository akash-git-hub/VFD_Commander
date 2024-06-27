import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import Select from '../../../components/Select';
import { UploadFile } from '../../../components/UploadFile';
import { create_modal_account_api, getRollsAll_API } from '../../../api_services/Apiservices';
import { successAlert } from '../../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { statusArray } from '../../../helper/Helper';


export const AdminstratorForm = ({ setLoder }) => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [rolelist, setRolelist] = useState([]);

    const getrolls = async () => {
        const resp = await getRollsAll_API();
        if (resp) {
            const findata = resp.data;
            const mydata = findata.map(e => ({ name: e.role, value: e._id }));
            setRolelist(mydata);
        }
    }

    const addNewHandler = (e) => {
        const { name, value } = e.target;
        const field = [...fields];
        const index = field.findIndex((item) => item.title === name);
        if (index !== -1) {
            field[index] = {
                ...field[index],
                value: value
            };
        }
        setFields(field);
    }

    useEffect(() => { getrolls(); }, []);

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
        let isValid = 0;
        if (!indata.first_name) { setError(prev => ({ ...prev, "first_name": "First Name is required" })); isValid = 1; }
        if (!indata.last_name) { setError(prev => ({ ...prev, "last_name": "Last Name is required" })); isValid = 2; }
        if (!indata.start_date) { setError(prev => ({ ...prev, "start_date": "Start Date is required" })); isValid = 3; }
        if (!indata.email) { setError(prev => ({ ...prev, "email": "Email is required" })); isValid = 4; }
        if (!indata.supervisor) { setError(prev => ({ ...prev, "supervisor": "Supervisor is required" })); isValid = 5; }
        if (!indata.role) { setError(prev => ({ ...prev, "role": "Role is required" })); isValid = 6; }
        if (!indata.position) { setError(prev => ({ ...prev, "position": "Position is required" })); isValid = 7; }
        if (!indata.address_1) { setError(prev => ({ ...prev, "address_1": "Address 1 is required" })); isValid = 8; }
        if (!indata.address_2) { setError(prev => ({ ...prev, "address_2": "Address 2 is required" })); isValid = 9; }
        if (!indata.city) { setError(prev => ({ ...prev, "city": "City is required" })); isValid = 10; }
        if (!indata.state) { setError(prev => ({ ...prev, "state": "State is required" })); isValid = 11; }
        if (!indata.term_date) { setError(prev => ({ ...prev, "term_date": "Term Date is required" })); isValid = 12; }
        if (!indata.zip_code) { setError(prev => ({ ...prev, "zip_code": "Zip Code is required" })); isValid = 13; }
        if (!indata.phone_no) { setError(prev => ({ ...prev, "phone_no": "Phone Number is required" })); isValid = 14; }
        if (!indata.emergency_contact_name) { setError(prev => ({ ...prev, "emergency_contact_name": "Emergency Contact Name is required" })); isValid = 15; }
        if (!indata.emergency_contact_number) { setError(prev => ({ ...prev, "emergency_contact_number": "Emergency Contact Number is required" })); isValid = 16; }
        if (!indata.status) { setError(prev => ({ ...prev, "status": "Status is required" })); isValid = 17; }
        // If all fields are valid, submit the form
        console.log("---------",isValid);
        if (isValid==0) {

            setLoder(true);

            const formData = new FormData();
            formData.append('checkUserType', 2);
            formData.append('create_by_id', localStorage.getItem('id'));
            formData.append('first_name', indata.first_name);
            formData.append('last_name', indata.last_name);
            formData.append('start_date', indata.start_date);
            formData.append('email', indata.email);
            formData.append('supervisor', indata.supervisor);
            formData.append('role', indata.role);
            formData.append('position', indata.position);
            formData.append('billing_address', indata.address_1);
            formData.append('billing_addres2', indata.address_2);
            formData.append('city', indata.city);
            formData.append('state', indata.state);
            formData.append('zip_code', indata.zip_code);
            formData.append('term_date', indata.term_date);
            formData.append('image', indata.image);
            formData.append('mobile_no', indata.phone_no);
            formData.append('emergency_contact_name', indata.emergency_contact_name);
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
                                    FormLabel="Upload Profile"
                                    name="image"
                                    controlId="formProfilePic"
                                    onChange={imageHanlder}
                                />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"First Name"} onChange={inputHandler} error={error.first_name} name='first_name' FormPlaceHolder={"Jenny"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Last Name"} onChange={inputHandler} error={error.last_name} name='last_name' FormPlaceHolder={"Wilson"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'email'} FormLabel={"Email"} onChange={inputHandler} error={error.email} name='email' FormPlaceHolder={"example@gmail.com"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'tel'} FormLabel={"Phone No"} max='10' onChange={inputHandler} error={error.phone_no} name='phone_no' FormPlaceHolder={"8989898989"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'date'}
                                    FormLabel={"Start Date"}
                                    name='start_date'
                                    error={error.start_date}
                                  onChange={inputHandler} 
                                />
                            </Col>
                          
                            <Col md={4}>
                                <InputField FormType={'date'} FormLabel={"Term Date"} onChange={inputHandler} error={error.term_date} name='term_date' FormPlaceHolder={"DD/MM/YYYY"} />
                            </Col>
                            <Col md={4}>
                                <Select FormLabel='Role' Array={rolelist} FormPlaceHolder='Adminstrator Staff' onChange={inputHandler} error={error.role} name='role' />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Supervisor"} onChange={inputHandler} error={error.supervisor} name='supervisor' FormPlaceHolder={"Enter Supervisor"} />
                            </Col>
                          
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Position"} onChange={inputHandler} error={error.position} name='position' FormPlaceHolder={"Enter Position"} />
                                {/* <Select FormLabel='Position' FormPlaceHolder='Software Employee' /> */}
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Address 1"} onChange={inputHandler} error={error.address_1} name='address_1' FormPlaceHolder={"scheme 24 - Vijay Nagar"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Address 2"} onChange={inputHandler} error={error.address_2} name='address_2' FormPlaceHolder={"scheme 24 - Vijay Nagar"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"State"} onChange={inputHandler} error={error.state} name='state' FormPlaceHolder={"Madhya Pradesh"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"City"} onChange={inputHandler} error={error.city} name='city' FormPlaceHolder={"Indore"} />
                            </Col>
                          
                            <Col md={4}>
                                <InputField FormType={'tel'} FormLabel={"Zip Code"} max={6} onChange={inputHandler} error={error.zip_code} name='zip_code' FormPlaceHolder={"452001"} />
                            </Col>
                         
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Emergency Contact Name"} onChange={inputHandler} error={error.emergency_contact_name} name='emergency_contact_name' FormPlaceHolder={"Contact Name"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'tel'} FormLabel={"Emergency Contact Number"} max='10' onChange={inputHandler} error={error.emergency_contact_number} name="emergency_contact_number" FormPlaceHolder={"Contact Number"} />
                            </Col>
                            <Col md={4}>
                                <Select FormLabel='Status' Array={statusArray} FormPlaceHolder='Status' onChange={inputHandler} error={error.status} name='status' />
                            </Col>
                            {fields.map((e, i) => (
                                <Col md={4} key={i}>
                                    <InputField FormType={'text'} FormLabel={e.title} onChange={addNewHandler} name={e.title} FormPlaceHolder={e.placeholder} />
                                </Col>
                            ))}
                            <Col md={4}>
                                <SharedButton type={'button'} BtnLabel={"Add Field"} BtnVariant={'outline-dark'} BtnClass={"w-100 AddFieldBtn"} onClick={handleShowModal} />
                            </Col>
                        </Row>
                        <hr />
                        <Row className='mb-2 mt-4'>
                            <Col md={4}>
                                <SharedButton type={'submit'} BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
            <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
        </>
    )
}
