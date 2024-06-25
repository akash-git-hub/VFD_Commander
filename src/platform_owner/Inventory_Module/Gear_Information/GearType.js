import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { InputField } from '../../../components/InputField'
import { SharedButton } from '../../../components/Button'
import { AddFieldModal } from '../../../commonpages/AddFieldModal'
import { Textareanew } from '../../../components/Textareanew'

export const GearType = () => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleAddField = (title, placeholder) => {
        setFields([...fields, { title, placeholder }]);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

  return (
    <>
    <div className='GearTypeForm'>
        <Container fluid>
            <Row className='mb-2'>
                <Col md={12}>
                    <InputField FormType={'text'} FormLabel={"Gear Type"} FormPlaceHolder={"Gear Type"} />
                </Col>
                <Col md={12}>
                    <Textareanew FormType={'text'} FormLabel={"Gear Description"} FormPlaceHolder={"Gear Description"} />
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
            <Row className='mb-2'>
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
