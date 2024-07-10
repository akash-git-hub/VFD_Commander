import React, { useState } from 'react'
import { Container, Row, Col, Stack, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../components/InputField';
import { Textareanew } from '../../components/Textareanew';
import { SharedButton } from '../../components/Button';
import { AddFieldModal } from '../../commonpages/AddFieldModal';
import { successAlert } from '../../components/Alert';
import { createQualification_API } from '../../api_services/Apiservices';
import { SharedMultiSelect } from '../../components/SharedMultiSelect';

export const GroupForm = ({ setLoder }) => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [skillsdata, setSkillsdata] = useState();
    const [preskillsdata, setPreskillsdata] = useState([]);

    const [indata, setIndata] = useState({ "name": "", "type": "", "description": "" });
    const [error, setError] = useState({ "name": "", "type": "", "description": "" });

    const handleAddField = (title, placeholder) => {
        setFields([...fields, { title, placeholder }]);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);


    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }

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

    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;
        if (!indata.name) { setError((pre) => ({ ...pre, "name": "Required" })); isValid = false; }
        if (!indata.type) { setError((pre) => ({ ...pre, "type": "Required" })); isValid = false; }
        if (!indata.description) { setError((pre) => ({ ...pre, "description": "Required" })); isValid = false; }

        if (isValid) {
            const fdata = {
                "name": indata.name,
                "type": indata.type,
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
                navigate("/qualificationlist");
            }
        }
        setLoder(false);
    }

    const options = [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Manager', value: 'manager' },
        { label: 'Developer', value: 'developer' },
        { label: 'Designer', value: 'designer' }
    ];


    return (
        <>
            <div className='TrainingForm'>
                <Container fluid>
                    <Form onSubmit={submitHandler}>
                        <Row>
                            <Col md={4} className='mb-2'>
                                <InputField FormType={'text'} FormLabel={"Group Name"} FormPlaceHolder={"Enter Group Name"} name='name' error={error.name} onChange={inputHandler} />
                            </Col>
                            <Col md={4} className='mb-2'>
                                <SharedMultiSelect
                                    labelText="Select Role"
                                    setSkillsdata={setSkillsdata}
                                    name="skills"
                                    options={preskillsdata}
                                />
                            </Col>
                            <Col md={4} className='mb-2'>
                                <SharedMultiSelect
                                    labelText="Select User"
                                    setSkillsdata={setSkillsdata}
                                    name="skills"
                                    options={preskillsdata}
                                />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            {fields.map((e, i) => (
                                <Col md={4} key={i}>
                                    <InputField FormType={'text'} FormLabel={e.title} onChange={addNewHandler} name={e.title} FormPlaceHolder={e.placeholder} />
                                </Col>
                            ))}
                            <Col md={4}>
                                <SharedButton type={'button'} BtnLabel={"Add Field"} BtnVariant={'outline-dark'} BtnClass={"w-100 AddFieldBtn"} onClick={handleShowModal} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <SharedButton type={'submit'} BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
            <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
        </>
    )
}
