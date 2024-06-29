import { useState } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import moment from 'moment';
import { create_plan_api } from '../../../api_services/Apiservices';
import { errorAlert, successAlert } from '../../../components/Alert';
import { Textarea } from '../../../components/Textarea';
import { useNavigate } from 'react-router-dom';

export const SubscriptionForm = ({ setLoder }) => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [indata, setIndata] = useState({ "billing_interval": "", "end_date": "", "start_date": "", "duration": "", "price": "", "plan_name": "", "discription": "", });
    const [error, setError] = useState({ "billing_interval": "", "end_date": "", "start_date": "", "duration": "", "price": "", "plan_name": "", "discription": "", });

    const navigate = useNavigate();

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
        if (!indata.billing_interval) {
            setError((pre) => ({ ...pre, "billing_interval": "Billing interval is required" }));
            isValid = 2;
        }
        if (!indata.end_date) {
            setError((pre) => ({ ...pre, "end_date": "End date is required" }));
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
        if (!indata.price) {
            setError((pre) => ({ ...pre, "price": "Price is required" }));
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

   

        if (moment.unix(indata.end_date).isSame(moment.unix(indata.start_date), 'day')) {
            errorAlert("Start Date and End Date are the same");
            return;
        } 
         if (moment.unix(indata.end_date).isBefore(moment.unix(indata.start_date), 'day')) {
            errorAlert("End Date should be greater than Start Date");
            return;
        }
        

        if (isValid === 1) {
            setLoder(true);
            const fdata = {
                "name": indata.plan_name,
                "description": indata.discription,
                "pricing": indata.price,
                "duration": indata.duration,
                "start_date": indata.start_date,
                "end_date": indata.end_date,
                "billing_interval": indata.billing_interval,
                "add_new": fields
            }
            const resp = await create_plan_api(fdata);
            if (resp && resp.success) {
                e.target.reset();
                setLoder(false);
                setIndata((pre)=>({...pre, "billing_interval": "", "end_date": "", "start_date": "", "duration": "", "price": "", "plan_name": "", "discription": "", }));
                setFields([]);
                successAlert(resp.message);
                navigate("/subscriptionview");
            }
            setLoder(false);
        }
    }


    return (
        <>
            <div className='SubscriptionForm'>
                <Container className='p-3'>
                    <Form onSubmit={submitHandler}>
                        <Row className='mb-2'>
                            <Col md={6}>
                                <InputField FormType={'text'} FormLabel={"Plan Name"} name='plan_name' value={indata.plan_name} error={error.plan_name} onChange={inHandler} FormPlaceHolder={"Enter Plan Name"} />
                            </Col>
                            <Col md={6}>
                                <InputField FormType={'number'} min={0} FormLabel={"Amount"} value={indata.price} name='price' error={error.price} onChange={inHandler} FormPlaceHolder={"Enter Amount"} />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={6}>
                                <InputField FormType={'tel'} FormLabel={"Duration"} value={indata.duration} name='duration' error={error.duration} onChange={inHandler}  />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Billing Interval</Form.Label>
                                <Form.Select aria-label="Default select example" name='billing_interval' defaultValue={indata.billing_interval} onChange={inHandler} >
                                    <option value='' disabled>select</option>
                                    <option value="Annual">Annual</option>
                                    <option value="Monthly">Monthly</option>
                                </Form.Select>
                                <small className='error'>{error.billing_interval}</small>
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={6}>
                                <InputField FormType={'date'} FormLabel={"Start Date"} value={indata.start_date} name='start_date' error={error.start_date}
                                    onChange={inHandler} FormPlaceHolder={"DD/MM/YYYY"} />
                            </Col>
                            <Col md={6}>
                                <InputField FormType={'date'} min={indata.start_date} FormLabel={"End Date"} value={indata.end_date} name='end_date' error={error.end_date} onChange={inHandler} FormPlaceHolder={"DD/MM/YYYY"} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <InputField isTextArea={true} FormType={'textarea'} FormLabel={"Description"} value={indata.discription} name='discription' error={error.discription} onChange={inHandler} FormPlaceHolder={"Description"} />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            {fields.map((e, i) => (
                                <Col md={6} key={i}>
                                    <InputField FormType={'text'} FormLabel={e.title} onChange={addNewHandler} name={e.title} FormPlaceHolder={e.placeholder} />
                                </Col>
                            ))}
                            <Col md={6}>
                                <SharedButton type="button" BtnLabel={"Add Field"} BtnVariant={'outline-dark'} BtnClass={"w-100 AddFieldBtn"} onClick={() => handleShowModal()} />
                            </Col>
                        </Row>
                        <Row className='mb-2 mt-5'>
                            <Col md={6}>
                                <SharedButton type="submit" BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
            <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
            {/* <AddFieldModal show={showModal} setShowModal={setShowModal} fields={fields} setFields={setFields} /> */}
        </>
    )
}
