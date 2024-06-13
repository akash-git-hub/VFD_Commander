import React, { useState } from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import Select from '../../../components/Select';

export const QualificationForm = () => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleAddField = (title, placeholder) => {
        setFields([...fields, { title, placeholder }]);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <div className='TrainingForm'>
                <Container fluid>
                    <Row className='mb-2'>
                        <Col md={4}>
                            <InputField FormType={'text'} FormLabel={"Qualification Name"} FormPlaceHolder={"Qualification Name"} />
                        </Col>
                        <Col md={4}>
                            <Select FormLabel='Type' FormPlaceHolder='Type' />
                        </Col>
                        <Col md={4}>
                            <InputField FormType={'text'} FormLabel={"Display Name"} FormPlaceHolder={"Display Name"} />
                        </Col>
                    </Row>
                    <Row className='mb-2'>
                        <Col md={4}>
                            <Stack direction="horizontal" gap={2}>
                                <InputField
                                    FormType={'text'}
                                    FormLabel={"Days"}
                                    FormPlaceHolder={"days"}
                                />
                                <InputField
                                    FormType={'text'}
                                    FormLabel={"Weeks"}
                                    FormPlaceHolder={"weeks"}
                                />
                                <InputField
                                    FormType={'text'}
                                    FormLabel={"Months"}
                                    FormPlaceHolder={"months"}
                                />
                                <InputField
                                    FormType={'text'}
                                    FormLabel={"Years"}
                                    FormPlaceHolder={"years"}
                                />
                            </Stack>
                        </Col>
                    </Row>
                    <Row className='mb-2'>
                        <Col md={12}>
                            <InputField FormLabel='Description'/>
                        </Col>
                    </Row>
                    <Row className='mb-2'>
                        {fields.map((field, index) => (
                            <Col md={5} key={index}>
                                <InputField FormType={'text'} FormLabel={field.title} FormPlaceHolder={field.placeholder} />
                            </Col>
                        ))}
                        <Col md={4}>
                            <SharedButton BtnLabel={"Add Field"} BtnVariant={'outline-dark'} BtnClass={"w-100 AddFieldBtn"} onClick={handleShowModal} />
                        </Col>
                    </Row>
                    <Row className='mb-2'>
                        <Col md={4}>
                            <SharedButton BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100"} />
                        </Col>
                    </Row>
                </Container>
            </div>
            <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
        </>
    )
}
