import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Stack, Form } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import Select from '../../../components/Select';
import { Radio } from '../../../components/Radio';
import { Textareanew } from '../../../components/Textareanew';
import { createQualification_API, getAddNewField_API } from '../../../api_services/Apiservices';
import { successAlert } from '../../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { statusOP } from '../../../helper/Helper';

export const QualificationForm = ({ setLoder, qtypeop }) => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const [indata, setIndata] = useState({ "name": "", "type_id": "", "description": "", "status": "" });
    const [error, setError] = useState({ "name": "", "type_id": "", "description": "", "status": "" });

    const addNewHandler = (e, i) => {
        const { value } = e.target;
        let data = [...fields];
        if (i >= 0 && i < data.length) {
            data[i] = { ...data[i], value: value };
            setFields(data);
        }
    }

    const newFieldData = async () => {
        const resp = await getAddNewField_API("Qualifications");
        if (resp && resp.success) {
            let finData = resp.data;
            finData = finData.map((e) => ({ title: e.formLabel, type: e.formType, options: e.OptionArray, value: '' }));
            setFields(finData);
        }
    }

    useEffect(() => { newFieldData(); }, [])


    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }



    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;
        if (!indata.name) { setError((pre) => ({ ...pre, "name": "Required" })); isValid = false; }
        if (!indata.type_id) { setError((pre) => ({ ...pre, "type_id": "Required" })); isValid = false; }
        if (!indata.description) { setError((pre) => ({ ...pre, "description": "Required" })); isValid = false; }
        if (!indata.status) { setError((pre) => ({ ...pre, "status": "Required" })); isValid = false; }

        let type = qtypeop.find((e) => e.value === indata.type_id);
        if (type) { type = type.name; }

        if (isValid) {
            const fdata = {
                "name": indata.name,
                "type": type,
                "type_id": indata.type_id,
                "type_id": indata.type_id,
                "status": indata.status,
                "description": indata.description,
                "add_field": fields
            }
            const resp = await createQualification_API(fdata);
            if (resp && resp.success) {
                e.target.reset();
                setIndata([]);
                setFields([]);
                setLoder(false);
                successAlert(resp.message);
                navigate("/roleadminstratorlist", { state: { key: "qualifications" } });
            }
        }
        setLoder(false);
    }



    return (
        <>
            <div className='TrainingForm'>
                <Container fluid>
                    <Form onSubmit={submitHandler}>
                        <Row>
                            <Col md={6} className='mb-3'>
                                <InputField FormType={'text'} required={true} FormLabel={"Name"} value={indata.name} name='name' error={error.name} onChange={inputHandler} />
                            </Col>
                            <Col md={6} className='mb-3'>
                                <Select FormLabel='Type' required={true} Array={qtypeop} value={indata.type_id} onChange={inputHandler} error={error.type_id} name='type_id' />
                            </Col>
                            <Col md={6} className='mb-3'>
                                <Select Array={statusOP} required={true} name="status" FormLabel={"Status"} error={error.status} value={indata.status} onChange={inputHandler} />
                            </Col>
                            {fields.map((e, i) => (
                                <Col md={6} key={i} className='mb-3'>
                                    {e.type == "text" ?
                                        <InputField FormType={'text'} FormLabel={e.title} value={e.value} onChange={(e) => addNewHandler(e, i)} name={e.title} />
                                        :
                                        <Select FormLabel={e.title} Array={e.options} value={e.value} onChange={(e) => addNewHandler(e, i)} name={e.title} />
                                    }
                                </Col>
                            ))}
                            <Col md={12} className='mb-3'>
                                <Textareanew required={true} FormLabel='Description' name='description' value={indata.description} error={error.description} onChange={inputHandler} />
                            </Col>



                        </Row>
                        <Row>
                            <Col md={6} className='mt-4'>
                                <SharedButton type={'submit'} BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                    <Row className='mt-3'>
                        <span className='error'>Note: Fields marked with an asterisk (*) are mandatory and must be filled out before submitting the form .</span>
                    </Row>
                </Container>
            </div>
        </>
    )
}
