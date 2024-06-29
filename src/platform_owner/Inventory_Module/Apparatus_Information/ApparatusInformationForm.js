import React, { useState } from 'react'
import { Container, Row, Col, Tab, Tabs, Form } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import Select from '../../../components/Select';
import { Textareanew } from '../../../components/Textareanew';
import { PoSidebar } from '../../PO_Sidebar';
import { Headings } from '../../../components/Headings';
import { statusArray } from '../../../helper/Helper';
import { successAlert } from '../../../components/Alert';
import { Loader } from '../../../components/Loader';
import { createApparatus_API } from '../../../api_services/Apiservices';
import { useNavigate } from 'react-router-dom';

export const ApparatusInformationForm = () => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [indata, setIndata] = useState({ "apparatus_type": "", "name": "", "srdate": "", "rpdate": "", "cost": "", "status": "", "description": "" });
    const [error, setError] = useState({ "apparatus_type": "", "name": "", "srdate": "", "rpdate": "", "cost": "", "status": "", "description": "" });

    const [loder, setLoder] = useState(false);
    const navigate = useNavigate();

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


    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;
        if (!indata.apparatus_type) { setError(prev => ({ ...prev, "apparatus_type": "Required" })); isValid = false; }
        if (!indata.name) { setError(prev => ({ ...prev, "name": "Required" })); isValid = false; }
        if (!indata.srdate) { setError(prev => ({ ...prev, "srdate": "Required" })); isValid = false; }
        if (!indata.rpdate) { setError(prev => ({ ...prev, "rpdate": "Required" })); isValid = false; }
        if (!indata.cost) { setError(prev => ({ ...prev, "cost": "Required" })); isValid = false; }
        if (!indata.status) { setError(prev => ({ ...prev, "status": "Required" })); isValid = false; }
        if (!indata.description) { setError(prev => ({ ...prev, "description": "Required" })); isValid = false; }

        if (isValid) {
            setLoder(true);
            const finaldata = {
                "apparatus_type": indata.apparatus_type,
                "name": indata.name,
                "service_date": indata.srdate,
                "replace_date": indata.rpdate,
                "cost": indata.cost,
                "status": indata.status,
                "description": indata.description
            }
            const resp = await createApparatus_API(finaldata);
            if (resp && resp.success) {
                e.target.reset();
                setIndata([]);
                setFields([]);
                setLoder(false);
                successAlert(resp.message);
                navigate("/inventorymodulelist", { state: { eventKey: "apparatus" } });
            }
            setLoder(false);
        }


    }

    return (
        <>
            <Loader show={loder} />
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Inventory"} HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={"home"}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Apparatus Info">
                                        <div className='TrainingForm'>
                                            <Container fluid>
                                                <Form onSubmit={submitHandler}>
                                                    <Row className='mb-2'>
                                                        <Col md={6}>
                                                            <InputField FormType={'text'} FormLabel={"Name"} FormPlaceHolder={"Enter Apparatus Name"} name='name' error={error.name} onChange={inputHandler} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <InputField FormType={'text'} FormLabel={"Type"} FormPlaceHolder={"Enter Apparatus Type"} name='apparatus_type' error={error.apparatus_type} onChange={inputHandler} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <InputField FormType={'date'} FormLabel={"Service Date"} FormPlaceHolder={"Select Service Date"} name='srdate' error={error.srdate} onChange={inputHandler} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <InputField FormType={'date'} FormLabel={"Replacement Date"} FormPlaceHolder={"Select Replacement Date"} name='rpdate' error={error.rpdate} onChange={inputHandler} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <InputField FormType={'text'} FormLabel={"Cost"} FormPlaceHolder={"Enter Item Cost"} name='cost' error={error.cost} onChange={inputHandler} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <Select FormLabel='Status' FormPlaceHolder='Status' Array={statusArray} name='status' error={error.status} onChange={inputHandler} />
                                                        </Col>
                                                        <Col md={12}>
                                                            <Textareanew FormType={'text'} FormLabel={"Description"} FormPlaceHolder={"Enter Apparatus Description"} error={error.description} name='description' onChange={inputHandler} />
                                                        </Col>
                                                        {/* {fields.map((field, index) => (
                                                        <Col md={6} key={index}>
                                                            <InputField FormType={'text'} FormLabel={field.title} FormPlaceHolder={field.placeholder} />
                                                        </Col>
                                                    ))} */}
                                                        {/* <Col md={6}>
                                                        <SharedButton BtnLabel={"Add Field"} BtnVariant={'outline-dark'} BtnClass={"w-100 AddFieldBtn"} onClick={handleShowModal} />
                                                    </Col> */}
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <SharedButton BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100 mt-4"} />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Container>
                                        </div>
                                        <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
                                    </Tab>
                                </Tabs>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div >
        </>
    )
}
