import React, { useState } from 'react'
import { Container, Row, Col, Form, Tab, Tabs } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom';
import { PoSidebar } from '../../PO_Sidebar';
import { Headings } from '../../../components/Headings';
import { Loader } from '../../../components/Loader';
import { InputField } from '../../../components/InputField';
import { Textareanew } from '../../../components/Textareanew';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import { successAlert } from '../../../components/Alert';
import { createGearType_API } from '../../../api_services/Apiservices';


export const CreateGareType = ({ }) => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [indata, setIndata] = useState({ "type_name": "", "description": "" });
    const [error, setError] = useState({ "type_name": "", "description": "" });
    const [loder, setLoder] = useState(false);
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

    const inputHandler = async (e) => {
        const { name, value } = e.target;
        setIndata(prev => ({ ...prev, [name]: value }));
    }

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;
        if (!indata.type_name) { setError(prev => ({ ...prev, "type_name": "Required" })); isValid = false; }
        if (!indata.description) { setError(prev => ({ ...prev, "description": "Required" })); isValid = false; }

        if (isValid) {
            setLoder(true);
            const final = {
                name: indata.type_name,
                description: indata.description,
                add_field: fields
            }
            const resp = await createGearType_API(final);
            if (resp && resp.success) {
                e.target.reset();
                setIndata([]);
                setFields([]);
                setLoder(false);
                successAlert(resp.message);
                navigate("/CreateGear", { state: { eventKey: "geartype" } });
            }
            setLoder(false);

        }


    }
    return (

        <>
            <Loader show={loder} />
            <div className='Training'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Gear and Apparatus Administration"} HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={"home"}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Create Gare Type">
                                        <div className='TrainingForm'>
                                            <Container fluid>
                                                <Form onSubmit={submitHandler}>
                                                    <Row className='mb-2'>
                                                        <Col md={12}>
                                                            <InputField required={true} FormType={'text'} FormLabel={"Gear Type"} FormPlaceHolder={"Enter Gear Type Name"} name='type_name' error={error.type_name} value={indata.type_name} onChange={inputHandler} />
                                                        </Col>
                                                        <Col md={12}>
                                                            <Textareanew required={true} FormType={'text'} FormLabel={"Description"} FormPlaceHolder={"Description"} name="description" error={error.description} value={indata.description} onChange={inputHandler} />
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        {fields.map((e, i) => (
                                                            <Col md={12} key={i}>
                                                                <InputField FormType={'text'} FormLabel={e.title} onChange={addNewHandler} name={e.title} FormPlaceHolder={e.placeholder} />
                                                            </Col>
                                                        ))}
                                                        {/* <Col md={6}>
                                                            <SharedButton type={"button"} BtnLabel={"Add Field"} BtnVariant={'outline-dark'} BtnClass={"w-100 AddFieldBtn"} onClick={handleShowModal} />
                                                        </Col> */}
                                                    </Row>
                                                    <Row className='mt-3'>
                                                        <Col md={6}>
                                                            <SharedButton type={'submit'} BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100"} />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                                <Row className='mt-3'>
                                                    <span className='error'>Note: Fields marked with an asterisk (*) are mandatory and must be filled out before submitting the form .</span>
                                                </Row>
                                            </Container>
                                        </div>
                                        <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
                                    </Tab>
                                </Tabs>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>

    )
}
