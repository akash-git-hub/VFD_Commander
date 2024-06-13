import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import Select from '../../../components/Select';

export const ApparatusInformationForm = () => {
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
                        <Col md={5}>
                            <Select FormLabel='Apparatus Type' FormPlaceHolder='Apparatus Type' />
                        </Col>
                        <Col md={5}>
                            <InputField FormType={'text'} FormLabel={"Apparatus ID"} FormPlaceHolder={"Apparatus ID"} />
                        </Col>
                    </Row>
                    <Row className='mb-2'>
                        <Col md={5}>
                            <InputField FormType={'text'} FormLabel={"Apparatus Name"} FormPlaceHolder={"Apparatus Name"} />
                        </Col>
                        <Col md={5}>
                            <InputField FormType={'text'} FormLabel={"Apparatus Description"} FormPlaceHolder={"Apparatus Description"} />
                        </Col>
                    </Row>
                    <Row className='mb-2'>
                        <Col md={5}>
                            <InputField FormType={'text'} FormLabel={"In Service Date"} FormPlaceHolder={"In Service Date"} />
                        </Col>
                        <Col md={5}>
                            <InputField FormType={'text'} FormLabel={"Replacement Date"} FormPlaceHolder={"Replacement Date"} />
                        </Col>
                    </Row>
                    <Row className='mb-2'>
                        <Col md={5}>
                            <InputField FormType={'text'} FormLabel={"Item Cost"} FormPlaceHolder={"Item Cost"} />
                        </Col>
                        <Col md={5}>
                            <Select FormLabel='Status' FormPlaceHolder='Status' />
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
                            <SharedButton BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100"} />
                        </Col>
                    </Row>
                </Container>
            </div>
            <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
        </>
    )
}
