import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import Select from '../../../components/Select';

export const GearInformationForm = () => {
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
                        <Select FormLabel='Gear Type' FormPlaceHolder='Gear Type' />
                        </Col>
                        <Col md={5}>
                            <InputField FormType={'text'} FormLabel={"Gear Item ID"} FormPlaceHolder={"Gear Item ID"} />
                        </Col>
                    </Row>
                    <Row className='mb-2'>
                        <Col md={5}>
                            <InputField FormType={'text'} FormLabel={"Gear Item Name"} FormPlaceHolder={"Gear Item Name"} />
                        </Col>
                        <Col md={5}>
                            <InputField FormType={'text'} FormLabel={"Gear Item Description"} FormPlaceHolder={"Gear Item Description"} />
                        </Col>
                    </Row>
                    <Row className='mb-2'>
                        <Col md={5}>
                            <InputField FormType={'text'} FormLabel={"Date Received"} FormPlaceHolder={"Date Received"} />
                        </Col>
                        <Col md={5}>
                            <InputField FormType={'text'} FormLabel={"Item Cost"} FormPlaceHolder={"Item Cost"} />
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
