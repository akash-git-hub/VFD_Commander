import { useState } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';

export const SubscriptionForm = () => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleAddField = (title, placeholder) => {
        setFields([...fields, { title, placeholder }]);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    return (
        <>
            <div className='SubscriptionForm'>
                <Container>
                    <Form>
                        <Row className='mb-2'>
                            <Col md={5}>
                                <InputField FormType={'text'} FormLabel={"Plan Name"} FormPlaceHolder={"Premium Plan"} />
                            </Col>
                            <Col md={5}>
                                <InputField FormType={'textarea'} FormLabel={"Description"} FormPlaceHolder={"Description"} />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={5}>
                                <InputField FormType={'text'} FormLabel={"Pricing"} FormPlaceHolder={"INR 599"} />
                            </Col>
                            <Col md={5}>
                                <InputField FormType={'time'} FormLabel={"Duration"} FormPlaceHolder={"10:00 AM"} />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={5}>
                                <InputField FormType={'date'} FormLabel={"Start Date"} FormPlaceHolder={"DD/MM/YYYY"} />
                            </Col>
                            <Col md={5}>
                            <InputField FormType={'date'} FormLabel={"End Date"} FormPlaceHolder={"DD/MM/YYYY"} />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={5}>
                                <Form.Label>Billing Interval</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option value="1">Annual</option>
                                    <option value="3">Monthly</option>
                                </Form.Select>
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
                        <Row className='mb-2 mt-5'>
                            <Col md={5}>
                                <SharedButton BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
            <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
        </>
    )
}
