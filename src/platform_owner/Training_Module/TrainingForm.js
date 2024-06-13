import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { InputField } from '../../components/InputField'
import { SharedButton } from '../../components/Button';
import { AddFieldModal } from '../../commonpages/AddFieldModal';

export const TrainingForm = () => {
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
                            <InputField FormType={'text'} FormLabel={"User Profile Integration"} FormPlaceHolder={"User Profile Integration"} />
                        </Col>
                        <Col md={5}>
                            <InputField FormType={'text'} FormLabel={"Training Catalog"} FormPlaceHolder={"Training Catalog"} />
                        </Col>
                    </Row>
                    <Row className='mb-2'>
                        <Col md={5}>
                            <InputField FormType={'text'} FormLabel={"Training Completion Tracking"} FormPlaceHolder={"Training Completion Tracking"} />
                        </Col>
                        <Col md={5}>
                            <InputField FormType={'text'} FormLabel={"Training Totals"} FormPlaceHolder={"Training Totals"} />
                        </Col>
                    </Row>
                    <Row className='mb-2'>
                        <Col md={5}>
                            <InputField FormType={'text'} FormLabel={"Scheduled Training"} FormPlaceHolder={"Scheduled Training"} />
                        </Col>
                        <Col md={5}>
                            <InputField FormType={'text'} FormLabel={"User Enrollment"} FormPlaceHolder={"User Enrollment"} />
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
