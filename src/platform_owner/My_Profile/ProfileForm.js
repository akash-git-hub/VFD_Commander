import React, { useState } from 'react'
import { Col, Container, Row, Form, } from 'react-bootstrap';
import { InputField } from '../../components/InputField';
import { SharedButton } from '../../components/Button';
import { AddFieldModal } from '../../commonpages/AddFieldModal';
import { UploadFile } from '../../components/UploadFile';


export const ProfileForm = () => {
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
                            <Col md={5}>
                                <InputField FormType={'text'} FormLabel={"First Name"} FormPlaceHolder={"Jenny"} />
                            </Col>
                            <Col md={5}>
                                <InputField FormType={'text'} FormLabel={"Last Name"} FormPlaceHolder={"Wilson"} />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={5}>
                                <InputField FormType={'email'} FormLabel={"Email"} FormPlaceHolder={"example@gmail.com"} />
                            </Col>
                            <Col md={5}>
                                <InputField FormType={'daTextte'} FormLabel={"UserName"} FormPlaceHolder={"username"} />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={5}>
                                <InputField FormType={'text'} FormLabel={"Password"} FormPlaceHolder={"Enter Password"} />
                            </Col>
                            <Col md={5}>
                                <InputField FormType={'text'} FormLabel={"Address Information"} FormPlaceHolder={"Enter Address Information"} />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={5}>
                                <InputField FormType={'text'} FormLabel={"Contact Information "} FormPlaceHolder={"Contact Information"} />
                            </Col>
                            {fields.map((field, index) => (
                                <Col md={5} key={index}>
                                    <InputField FormType={'text'} FormLabel={field.title} FormPlaceHolder={field.placeholder} />
                                </Col>
                            ))}
                            <Col md={5}>
                                <SharedButton BtnLabel={"Add Field"} BtnVariant={'outline-dark'} BtnClass={"w-100 AddFieldBtn"} onClick={handleShowModal} />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={5}>
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
