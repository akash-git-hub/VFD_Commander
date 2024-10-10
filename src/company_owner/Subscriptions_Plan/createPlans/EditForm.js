import { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import moment from 'moment';
import { create_plan_api, update_plan_api } from '../../../api_services/Apiservices';
import { errorAlert, successAlert } from '../../../components/Alert';
import { Textarea } from '../../../components/Textarea';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import InputWithDollar from '../../../components/Inputwithdoller';

export const EditForm = ({ setLoder, predata }) => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [indata, setIndata] = useState({ "billing_interval": "", "end_date": "", "start_date": "", "duration": "", "price": "", "plan_name": "", "discription": "", "display_name": "", "license_fee_amount": "", "status": "", "add_field": "" });
    const [error, setError] = useState({ "billing_interval": "", "end_date": "", "start_date": "", "duration": "", "price": "", "plan_name": "", "discription": "", "display_name": "", "license_fee_amount": "", "status": "" });

    const navigate = useNavigate();

    const setPreData = (data) => {       

        if (data && data.add_new) {
            setFields(data.add_new);
        }
        setIndata({ "id": data._id, "billing_interval": data.billing_interval, "end_date": data.end_date, "start_date": data.start_date, "duration": data.duration, "price": data.pricing, "plan_name": data.name, "discription": data.description, "display_name": data.display_name, "license_fee_amount": data.license_fee_amount, "status": data.status, "add_field": data.add_new });
    }
    useEffect(() => {
        setPreData(predata)
    }, [predata])

    const addNewHandler = (e) => {
        const { name, value } = e.target;
        const field = [...fields];
        const index = field.findIndex((item) => item.title === name);
        if (index !== -1) {
            field[index] = {
                ...field[index],
                value: value
            };
        }
        setFields(field);
    }

    const handleAddField = (title, placeholder) => {
        setFields([...fields, { title, placeholder }]);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const inHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        let isValid = 1;

        if (!/^\d+$/.test(indata.license_fee_amount)) {
            setError((e) => ({ ...e, "license_fee_amount": "* License fee amount must contain only digits" }));
            isValid = 9;
        }

        if (!/^\d+$/.test(indata.price)) {
            setError((e) => ({ ...e, "price": "* Recurring fee amount must contain only digits" }));
            isValid = 9;
        }
        if (!indata.billing_interval) {
            setError((pre) => ({ ...pre, "billing_interval": "Billing interval is required" }));
            isValid = 2;
        }
        if (!indata.status) {
            setError((pre) => ({ ...pre, "status": "Status is required" }));
            isValid = 2;
        }

        if (!indata.license_fee_amount) {
            setError((pre) => ({ ...pre, "license_fee_amount": "License Fee Amount is required" }));
            isValid = 2;
        }
        
        if (!indata.start_date) {
            setError((pre) => ({ ...pre, "start_date": "Start date is required" }));
            isValid = 2;
        }
        if (!indata.duration) {
            setError((pre) => ({ ...pre, "duration": "Duration is required" }));
            isValid = 2;
        }
        if (!indata.display_name) {
            setError((pre) => ({ ...pre, "display_name": "Display name is required" }));
            isValid = 2;
        }
        if (!indata.price) {
            setError((pre) => ({ ...pre, "price": "Recurring fee amount is required" }));
            isValid = 2;
        }
        if (!indata.plan_name) {
            setError((pre) => ({ ...pre, "plan_name": "Plan name is required" }));
            isValid = 2;
        }
        if (!indata.discription) {
            setError((pre) => ({ ...pre, "discription": "Description is required" }));
            isValid = 2;
        }

        if (indata.end_date) {
            if (moment.unix(indata.end_date).isSame(moment.unix(indata.start_date), 'day')) {
                errorAlert("Start Date and End Date are the same");
                return;
            }
            if (moment.unix(indata.end_date).isBefore(moment.unix(indata.start_date), 'day')) {
                errorAlert("End Date should be greater than Start Date");
                return;
            }
        }


        if (isValid === 1) {
            Swal.fire({
                title: "Are you sure?",
                text: "This Subscriptions has been modified. Save changes?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setLoder(true);
                    const fdata = {
                        "id": indata.id,
                        "name": indata.plan_name,
                        "description": indata.discription,
                        "pricing": indata.price,
                        "duration": indata.duration,
                        "start_date": indata.start_date,
                        "end_date": indata.end_date,
                        "billing_interval": indata.billing_interval,
                        "license_fee_amount": indata.license_fee_amount,
                        "display_name": indata.display_name,
                        "status": indata.status,
                        "add_new": fields
                    }
                    const resp = await update_plan_api(fdata);
                    if (resp && resp.success) {
                        e.target.reset();
                        setLoder(false);
                        setIndata((pre) => ({ ...pre, "billing_interval": "", "end_date": "", "start_date": "", "duration": "", "price": "", "plan_name": "", "discription": "", "license_fee_amount": "", "display_name": "", "status": "", "add_field": "" }));
                        setFields([]);
                        successAlert(resp.message);
                        navigate("/subscriptionview");
                    }
                    setLoder(false);
                }
                setLoder(false);
            });
            setLoder(false);
        }
    }

    const cancelHandler = () => {
        Swal.fire({
            title: "Changes have been made",
            text: "Are you sure you want to exit with no changes?",
            icon: "question"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/subscriptionview")
            }
        });
    }

    return (
        <>
            <div className='SubscriptionForm'>
                <Container className='p-3'>
                    <Row style={{ justifyContent: 'end' }}>
                        <Col md={2} style={{textAlign:"end"}}>
                            <Button variant="danger" size="sm"
                                onClick={cancelHandler}
                            >Cancel
                            </Button>
                        </Col>
                    </Row>
                    <Form onSubmit={submitHandler}>
                        <Row className='mb-2'>
                            <Col md={6}>
                                <InputField FormType={'text'} required={true} FormLabel={"Plan Name"} name='plan_name' value={indata.plan_name} error={error.plan_name} onChange={inHandler} />
                            </Col>
                            <Col md={6}>
                                <InputField FormType={'text'} required={true} FormLabel={"Display Name"} name='display_name' value={indata.display_name} error={error.display_name} onChange={inHandler} />
                            </Col>
                            <Col md={6}>
                                <InputWithDollar formType={'number'} star={true} min={0} formLabel={"License Fee Amount"} value={indata.license_fee_amount} name='license_fee_amount' error={error.license_fee_amount} onChange={inHandler} />
                            </Col>
                            <Col md={6}>
                                <InputWithDollar formType={'number'} star={true} min={0} formLabel={"Recurring Fee Amount"} value={indata.price} name='price' error={error.price} onChange={inHandler} />
                            </Col>
                            <Col md={6}>
                                <InputField FormType={'number'} required={true} min={0} FormLabel={"Duration"} value={indata.duration} name='duration' error={error.duration} onChange={inHandler} />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Billing Interval <small className='error'>*</small></Form.Label>
                                <Form.Select aria-label="Default select example" name='billing_interval' value={indata.billing_interval} onChange={inHandler} >
                                    <option value='' disabled>select</option>
                                    <option value="Annual">Annual</option>
                                    <option value="Monthly">Monthly</option>
                                </Form.Select>
                                <small className='error'>{error.billing_interval}</small>
                            </Col>
                            <Col md={6}>
                                <InputField FormType={'date'} required={true} FormLabel={"Start Date"} value={indata.start_date} name='start_date' error={error.start_date}
                                    onChange={inHandler} />
                            </Col>
                            <Col md={6}>
                                <InputField FormType={'date'} min={indata.start_date} FormLabel={"End Date"} value={indata.end_date} name='end_date' error={error.end_date} onChange={inHandler} />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Status <small className='error'>*</small></Form.Label>
                                <Form.Select aria-label="Default select example" name='status' value={indata.status} onChange={inHandler} >
                                    <option value='' disabled>select</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </Form.Select>
                                <small className='error'>{error.status}</small>
                            </Col>
                            {indata && indata.add_field && (indata.add_field).map((e, i) => (
                                <Col md={6} key={i}>
                                    <InputField FormType={'text'} FormLabel={e.title} value={e.value} name={e.title} onChange={addNewHandler} FormPlaceHolder={e.placeholder} />
                                </Col>
                            ))}
                        </Row>

                        <Row>
                            <Col md={12}>
                                <InputField isTextArea={true} required={true} FormType={'textarea'} FormLabel={"Description"} value={indata.discription} name='discription' error={error.discription} onChange={inHandler} />
                            </Col>
                        </Row>

                        <Row className='mb-2 mt-3'>
                            <Col md={6}>
                                <SharedButton type="submit" BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                    <Row className='mt-3'>
                        <span className='error'>Note: Fields marked with an asterisk (*) are mandatory and must be filled out before submitting the form .</span>
                    </Row>
                </Container>
            </div>
            <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
        </>
    )
}
