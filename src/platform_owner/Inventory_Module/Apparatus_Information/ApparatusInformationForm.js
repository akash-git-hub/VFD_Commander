import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import Select from '../../../components/Select';
import { Textareanew } from '../../../components/Textareanew';

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
                        <Col md={6}>
                            <InputField FormType={'text'} FormLabel={"Apparatus Type"} FormPlaceHolder={"Apparatus Type"} />
                        </Col>
                        <Col md={6}>
                            <InputField FormType={'text'} FormLabel={"Apparatus Name"} FormPlaceHolder={"Apparatus Name"} />
                        </Col>
                        <Col md={6}>
                            <InputField FormType={'text'} FormLabel={"In Service Date"} FormPlaceHolder={"In Service Date"} />
                        </Col>
                        <Col md={6}>
                            <InputField FormType={'text'} FormLabel={"Replacement Date"} FormPlaceHolder={"Replacement Date"} />
                        </Col>
                        <Col md={6}>
                            <InputField FormType={'text'} FormLabel={"Item Cost"} FormPlaceHolder={"Item Cost"} />
                        </Col>
                        <Col md={6}>
                            <Select FormLabel='Status' FormPlaceHolder='Status' />
                        </Col>
                        <Col md={12}>
                            <Textareanew FormType={'text'} FormLabel={"Apparatus Description"} FormPlaceHolder={"Apparatus Description"} />
                        </Col>
                        {fields.map((field, index) => (
                            <Col md={6} key={index}>
                                <InputField FormType={'text'} FormLabel={field.title} FormPlaceHolder={field.placeholder} />
                            </Col>
                        ))}
                        <Col md={6}>
                            <SharedButton BtnLabel={"Add Field"} BtnVariant={'outline-dark'} BtnClass={"w-100 AddFieldBtn"} onClick={handleShowModal} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <SharedButton BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100 mt-4"} />
                        </Col>
                    </Row>
                </Container>
            </div>
            <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
        </>
    )
}
