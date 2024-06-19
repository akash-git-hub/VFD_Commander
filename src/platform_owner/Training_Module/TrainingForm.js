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
                        <Col md={6}>
                            <InputField FormType={'text'} FormLabel={"Training Name"} FormPlaceHolder={"Training Name"} />
                        </Col>
                        <Col md={6}>
                            <InputField FormType={'text'} FormLabel={"Description"} FormPlaceHolder={"Description"} />
                        </Col>
                    </Row>
                    <Row className='mb-2'>
                        {fields.map((field, index) => (
                            <Col md={6} key={index}>
                                <InputField FormType={'text'} FormLabel={field.title} FormPlaceHolder={field.placeholder} />
                            </Col>
                        ))}
                        <Col md={6}>
                            <SharedButton BtnLabel={"Add Field"} BtnVariant={'outline-dark'} BtnClass={"w-100 AddFieldBtn"} onClick={handleShowModal} />
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col md={6}>
                            <SharedButton BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100"} />
                        </Col>
                    </Row>
                </Container>
            </div>
            <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
        </>

    )
}
