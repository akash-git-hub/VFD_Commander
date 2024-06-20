import React, { useState } from 'react'
import { Col, Container, Row, Form, } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import Select from '../../../components/Select';
import { UploadFile } from '../../../components/UploadFile';


export const AdminstratorForm = () => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);

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

    // const getUploadFileDetail = (event) => {
    //     if (event.target.files.length > 0) {
    //         setSelectedFile(event.target.files[0]);
    //         var mimeType = event.target.files[0].type;
    //         if (mimeType.match(/image\/*/) == null) {
    //             errorAlert("Only images are supported.");
    //             return;
    //         }
    //         const file = event.target.files[0];

    //         if (file) {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file);

    //             reader.onload = (e) => {
    //                 const result = e.target.result;
    //                 setImgURL(result);
    //                 setImagePath(file);
    //             };
    //         }
    //     }
    // }

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate each field
        let isValid = true;
        if (!indata.first_name) { setError(prev => ({ ...prev, "first_name": "First Name is required" })); isValid = false; }
        if (!indata.last_name) { setError(prev => ({ ...prev, "last_name": "Last Name is required" })); isValid = false; }
        if (!indata.start_date) { setError(prev => ({ ...prev, "start_date": "Start Date is required" })); isValid = false; }
        if (!indata.email) { setError(prev => ({ ...prev, "email": "Email is required" })); isValid = false; }
        if (!indata.supervisor) { setError(prev => ({ ...prev, "supervisor": "Supervisor is required" })); isValid = false; }
        if (!indata.role) { setError(prev => ({ ...prev, "role": "Role is required" })); isValid = false; }
        if (!indata.position) { setError(prev => ({ ...prev, "position": "Position is required" })); isValid = false; }
        if (!indata.address_1) { setError(prev => ({ ...prev, "address_1": "Address 1 is required" })); isValid = false; }
        if (!indata.address_2) { setError(prev => ({ ...prev, "address_2": "Address 2 is required" })); isValid = false; }
        if (!indata.city) { setError(prev => ({ ...prev, "city": "City is required" })); isValid = false; }
        if (!indata.state) { setError(prev => ({ ...prev, "state": "State is required" })); isValid = false; }
        if (!indata.term_date) { setError(prev => ({ ...prev, "term_date": "Term Date is required" })); isValid = false; }
        if (!indata.zip_code) { setError(prev => ({ ...prev, "zip_code": "Zip Code is required" })); isValid = false; }
        if (!indata.phone_no) { setError(prev => ({ ...prev, "phone_no": "Phone Number is required" })); isValid = false; }
        if (!indata.emergency_contact_name) { setError(prev => ({ ...prev, "emergency_contact_name": "Emergency Contact Name is required" })); isValid = false; }
        if (!indata.emergency_contact_number) { setError(prev => ({ ...prev, "emergency_contact_number": "Emergency Contact Number is required" })); isValid = false; }
        if (!indata.status) { setError(prev => ({ ...prev, "status": "Status is required" })); isValid = false; }
        // If all fields are valid, submit the form
        if (isValid) {

            const formData = new formData();
            formData.append('first_name', indata.first_name);
            formData.append('last_name', indata.last_name);
            formData.append('start_date', indata.start_date);
            formData.append('email', indata.email);
            formData.append('supervisor', indata.supervisor);
            formData.append('role', indata.role);
            formData.append('position', indata.position);
            formData.append('address_1', indata.address_1);
            formData.append('address_2', indata.address_2);
            formData.append('city', indata.city);
            formData.append('state', indata.state);
            formData.append('zip_code', indata.zip_code);
            formData.append('term_date', indata.term_date);
            formData.append('image', indata.image);
            formData.append('phone_no', indata.phone_no);
            formData.append('emergency_contact_name', indata.emergency_contact_name);
            formData.append('emergency_contact_number', indata.emergency_contact_number);
            formData.append('status', indata.status);


            // Perform form submission logic here
            console.log("Form submitted successfully");
        }
    };



    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
    }
    return (
        <>
            <div className='CreateAccountForm'>
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={2}>
                                <UploadFile
                                    FormLabel="Upload Profile"
                                    name="profilePic"
                                    controlId="formProfilePic"
                                />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"First Name"} onClick={inputHandler} error={error.first_name} name='first_name' FormPlaceHolder={"Jenny"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Last Name"} onClick={inputHandler} error={error.last_name} name='last_name' FormPlaceHolder={"Wilson"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'date'} FormLabel={"Start Date"} onClick={inputHandler} error={error.start_date} name='start_date' FormPlaceHolder={"DD/MM/YYYY"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'email'} FormLabel={"Email"} onClick={inputHandler} error={error.email} name='email' FormPlaceHolder={"example@gmail.com"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'date'} FormLabel={"Term Date"} onClick={inputHandler} error={error.term_date} name='term_date' FormPlaceHolder={"DD/MM/YYYY"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Supervisor"} onClick={inputHandler} error={error.supervisor} name='supervisor' FormPlaceHolder={"Enter Supervisor"} />
                            </Col>
                            <Col md={4}>
                                <Select FormLabel='Role' FormPlaceHolder='Adminstrator Staff' onClick={inputHandler} error={error.role} name='role' />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Position"} onClick={inputHandler} error={error.position} name='position' FormPlaceHolder={"Enter Position"} />
                                {/* <Select FormLabel='Position' FormPlaceHolder='Software Employee' /> */}
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Address 1"} onClick={inputHandler} error={error.address_1} name='address_1' FormPlaceHolder={"scheme 24 - Vijay Nagar"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Address 2"} onClick={inputHandler} error={error.address_2} name='address_2' FormPlaceHolder={"scheme 24 - Vijay Nagar"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"City"} onClick={inputHandler} error={error.city} name='city' FormPlaceHolder={"Indore"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"State"} onClick={inputHandler} error={error.state} name='state' FormPlaceHolder={"Madhya Pradesh"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Zip Code"} onClick={inputHandler} error={error.zip_code} name='zip_code' FormPlaceHolder={"452001"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'number'} FormLabel={"Phone No"} max='10' onClick={inputHandler} error={error.phone_no} name='phone_no' FormPlaceHolder={"+91 - 8989898989"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Emergency Contact Name"} onClick={inputHandler} error={error.emergency_contact_name} name='emergency_contact_name' FormPlaceHolder={"Contact Name"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'number'} FormLabel={"Emergency Contact Number"} onClick={inputHandler} error={error.emergency_contact_number} name="emergency_contact_number" FormPlaceHolder={"Contact Number"} />
                            </Col>
                            <Col md={4}>
                                <Select FormLabel='Status' FormPlaceHolder='Status' onClick={inputHandler} error={error.status} name='status' />
                            </Col>
                            {fields.map((field, index) => (
                                <Col md={4} key={index}>
                                    <InputField FormType={'text'} FormLabel={field.title} FormPlaceHolder={field.placeholder} />
                                </Col>
                            ))}
                            <Col md={4}>
                                <SharedButton type={'button'} BtnLabel={"Add Field"} BtnVariant={'outline-dark'} BtnClass={"w-100 AddFieldBtn"} onClick={handleShowModal} />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
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
