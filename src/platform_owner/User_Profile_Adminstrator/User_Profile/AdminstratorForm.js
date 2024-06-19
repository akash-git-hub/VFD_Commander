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

    const handleAddField = (title, placeholder) => {
        setFields([...fields, { title, placeholder }]);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <>
            <div className='CreateAccountForm'>
                <Container>
                    <Form>
                        <Row>
                            <Col md={2}>
                                <Form onSubmit={handleSubmit}>
                                    <UploadFile
                                        FormLabel="Upload Profile"
                                        name="profilePic"
                                        controlId="formProfilePic"
                                    />
                                </Form>
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"First Name"} FormPlaceHolder={"Jenny"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Last Name"} FormPlaceHolder={"Wilson"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'date'} FormLabel={"Start Date"} FormPlaceHolder={"DD/MM/YYYY"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'email'} FormLabel={"Email"} FormPlaceHolder={"example@gmail.com"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'date'} FormLabel={"Term Date"} FormPlaceHolder={"DD/MM/YYYY"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Supervisor"} FormPlaceHolder={"Enter Supervisor"} />
                            </Col>
                            <Col md={4}>
                                <Select FormLabel='Role' FormPlaceHolder='Adminstrator Staff' />
                            </Col>
                            <Col md={4}>
                                <Select FormLabel='Position' FormPlaceHolder='Software Employee' />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Address 1"} FormPlaceHolder={"scheme 24 - Vijay Nagar"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Address 2"} FormPlaceHolder={"scheme 24 - Vijay Nagar"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"City"} FormPlaceHolder={"Indore"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"State"} FormPlaceHolder={"Madhya Pradesh"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Zip Code"} FormPlaceHolder={"452001"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'number'} FormLabel={"Contact Phone"} FormPlaceHolder={"+91 - 8989898989"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Emergency Contact Name"} FormPlaceHolder={"Contact Name"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'number'} FormLabel={"Emergency Contact Number"} FormPlaceHolder={"Contact Number"} />
                            </Col>
                            <Col md={4}>
                                <Select FormLabel='Status' FormPlaceHolder='Software Employee' />
                            </Col>
                            {fields.map((field, index) => (
                                <Col md={4} key={index}>
                                    <InputField FormType={'text'} FormLabel={field.title} FormPlaceHolder={field.placeholder} />
                                </Col>
                            ))}
                            <Col md={4}>
                                <SharedButton BtnLabel={"Add Field"} BtnVariant={'outline-dark'} BtnClass={"w-100 AddFieldBtn"} onClick={handleShowModal} />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={4}>
                                <SharedButton BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
            <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
        </>
    )
}
