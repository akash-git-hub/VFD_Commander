import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Stack } from 'react-bootstrap'
import { InputField } from '../../components/InputField'
import { SharedButton } from '../../components/Button';
import { AddFieldModal } from '../../commonpages/AddFieldModal';
import { Textareanew } from '../../components/Textareanew';
import { createTraning_API, getAddNewField_API, getEventType_API, getQualification_API } from '../../api_services/Apiservices';
import { successAlert } from '../../components/Alert';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Select from '../../components/Select';
import { InputNumber } from './InputNumber';
import { pointerExpiration } from '../../helper/Helper';


export const TrainingForm = ({ setLoder }) => {
    const [fields, setFields] = useState([]);
    const [indata, setIndata] = useState({ "event_name": "", "description": "", "duration": "", "duration": "", "trdate": "", "st_time": "", "event_type_id": "", "trlocation": "", "capacity": "", "notes": "", "qualification_id": "" });
    const [error, setError] = useState({ "event_name": "", "event_type_id": "", "description": "", "duration": "", "trdate": "", "st_time": "", "trlocation": "", "capacity": "", "notes": '' });
    const navigate = useNavigate();
    const [event_op, setEvent_op] = useState([]);
    const [qualification_op, setQualification_op] = useState([]);


    const event_type_option = async () => {
        const resp = await getEventType_API();
        if (resp && resp.success) {
            setLoder(false);
            const fdata = resp.data;
            const mydata = fdata.map(e => ({ name: e.event_name, value: e._id }));
            setEvent_op(mydata);
        }
    }


    const get_qualification_op = async () => {
        const resp = await getQualification_API();
        if (resp) {
            let findata = resp.data;
            findata = findata.filter((e) => e.status === "Active");
            const mydata = findata.map(e => ({ name: e.name, value: e._id }));
            setQualification_op(mydata);
        }
    }


    const inputHandler = async (e) => {
        const { name, value } = e.target;
        setIndata(prev => ({ ...prev, [name]: value }));
        setError(prev => ({ ...prev, [name]: "" }));

    }

    const addNewHandler = (e, i) => {
        const { value } = e.target;
        let data = [...fields];
        if (i >= 0 && i < data.length) {
            data[i] = { ...data[i], value: value };
            setFields(data);
        }
    }

    const newFieldData = async () => {
        const resp = await getAddNewField_API("Event");
        if (resp && resp.success) {
            let finData = resp.data;
            finData = finData.map((e) => ({ title: e.formLabel, type: e.formType, options: e.OptionArray, value: '' }));
            setFields(finData);
        }
    }


    const addTimeToTimestamp = (givenTimestamp, timeToAdd) => {
        let dateTime = moment.unix(givenTimestamp);
        const [hours, minutes] = timeToAdd.split(':');
        dateTime = dateTime.hours(parseInt(hours)).minutes(parseInt(minutes));
        const newTimestamp = dateTime.unix();
        return newTimestamp;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;
        if (!pointerExpiration.test(indata.duration)) { setError(prev => ({ ...prev, "duration": 'Please enter a number with up to 2 decimal places.' })); isValid = false; }
        if (!indata.duration) { setError(prev => ({ ...prev, "duration": "Required" })); isValid = false; }
        if (!indata.event_name) { setError(prev => ({ ...prev, "event_name": "Required" })); isValid = false; }
        if (!indata.event_type_id) { setError(prev => ({ ...prev, "event_type_id": "Required" })); isValid = false; }
        if (!indata.trdate) { setError(prev => ({ ...prev, "trdate": "Required" })); isValid = false; }
        if (!indata.st_time) { setError(prev => ({ ...prev, "st_time": "Required" })); isValid = false; }
        if (!indata.trlocation) { setError(prev => ({ ...prev, "trlocation": "Required" })); isValid = false; }

        const time = addTimeToTimestamp(indata.trdate, indata.st_time);

        if (isValid) {

            setLoder(true);
            const final = {
                "name": indata.event_name,
                "event_type_id": indata.event_type_id,
                "date": indata.trdate,
                "start_time": time,
                "duration": indata.duration,
                "location": indata.trlocation,
                "capacity": indata.capacity,
                "notes": indata.notes,
                "qualification_id": indata.qualification_id,
                "description": indata.description,
                "add_field": fields
            }
            const resp = await createTraning_API(final);
            if (resp && resp.success) {
                e.target.reset();
                setIndata([]);
                setFields([]);
                setLoder(false);
                successAlert(resp.message);
                navigate("/traininglist");
            }
            setLoder(false);

        }


    }


    useEffect(() => { get_qualification_op(); event_type_option(); newFieldData(); }, [])
    return (

        <>
            <div className='TrainingForm'>
                <Container fluid>
                    <Form onSubmit={submitHandler}>
                        <Row className='mb-2'>
                            <Col md={6}>
                                <Select Array={event_op} required={true} name="event_type_id" value={indata.event_type_id} FormLabel={"Event Type"} error={error.event_type_id} onChange={inputHandler} />
                            </Col>
                            <Col md={6}>
                                <InputField FormType={'text'} max='255' required={true} FormLabel={"Event Name"} name='event_name' error={error.event_name} value={indata.event_name} onChange={inputHandler} />
                            </Col>
                            <Col md={12}>
                                <Textareanew FormType={'text'} rows={2} FormLabel={"Description"} name="description" error={error.description} value={indata.description} onChange={inputHandler} />
                            </Col>
                            <Col md={6}>
                                <InputField FormType={'date'} required={true} FormLabel={"Date"} name='trdate' error={error.trdate} value={indata.trdate} onChange={inputHandler} />
                            </Col>
                            <Col md={6}>
                                <InputField FormType={'time'} required={true} FormLabel={"Start Time"} name='st_time' error={error.st_time} value={indata.st_time} onChange={inputHandler} />
                            </Col>
                            <Col md={6}>
                                <InputNumber step="0.01" min="0" FormType={'number'} required={true} FormLabel={"Duration"} name='duration' error={error.duration} value={indata.duration} onChange={inputHandler} />
                            </Col>

                            <Col md={6}>
                                <InputField FormType={'text'} required={true} max='255' FormLabel={"Location"} FormPlaceHolder={"Enter Event Location"} name='trlocation' error={error.trlocation} value={indata.trlocation} onChange={inputHandler} />
                            </Col>
                            <Col md={6}>
                                <InputField FormType={'number'} FormLabel={"Capacity"} min='0' name='capacity' error={error.capacity} value={indata.capacity} onChange={inputHandler} />
                            </Col>
                            <Col md={6}>
                                <Select Array={qualification_op} value={indata.qualification_id} name="qualification_id" FormLabel={"Qualifications"} onChange={inputHandler} />
                            </Col>
                            <Col md={12}>
                                <Textareanew FormType={'text'} rows={2} FormLabel={"Notes"} name="notes" error={error.notes} value={indata.notes} onChange={inputHandler} />
                            </Col>
                            {fields.map((e, i) => (
                                <Col md={6} key={i}>
                                    {e.type == "text" ?
                                        <InputField FormType={'text'} FormLabel={e.title} value={e.value} onChange={(e) => addNewHandler(e, i)} name={e.title} />
                                        :
                                        <Select FormLabel={e.title} Array={e.options} value={e.value} onChange={(e) => addNewHandler(e, i)} name={e.title} />
                                    }
                                </Col>
                            ))}
                        </Row>
                        <Row className='mt-3'>
                            <Col md={6}>
                                <SharedButton BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <Row className='mt-4'>
                    <span className='error'>Note: Fields marked with an asterisk (*) are mandatory and must be filled out before submitting the form .</span>
                </Row>
            </div>

        </>

    )
}
