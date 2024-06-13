import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import Select from '../../../components/Select';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import { SharedButton } from '../../../components/Button';

export const GearForm = () => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleAddField = (title, placeholder) => {
        setFields([...fields, { title, placeholder }]);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row className='mb-2'>
                        <Col md={4}>
                            <Select FormLabel='Gear Type' FormPlaceHolder='Gear Type' />
                        </Col>
                        <Col md={4}>
                            <InputField FormType={'text'} FormLabel={"Replacement Date"} FormPlaceHolder={"Replacement Date"} />
                        </Col>
                        <Col md={4}>
                            <InputField FormType={'date'} FormLabel={"Issue Date"} FormPlaceHolder={"Issue Date"} />
                        </Col>
                    </Row>
                    <Row className='mb-2'>
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
                </Container>
            </div>
            <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
        </>
    );
};
