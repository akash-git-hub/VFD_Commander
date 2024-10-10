import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs, Form } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import Select from '../../../components/Select';
import { Textareanew } from '../../../components/Textareanew';
import { PoSidebar } from '../../PO_Sidebar';
import { Headings } from '../../../components/Headings';
import { Loader } from '../../../components/Loader';
import { createApparatus_API, createGear_API, getAddNewField_API, getGearAndApparatusType_API, getGearType_API } from '../../../api_services/Apiservices';
import { successAlert } from '../../../components/Alert';
import { useLocation, useNavigate } from 'react-router-dom';
import { GearTypeTable } from './GearTypeTable';
import { GAPoptions, itemsStatus, statusArray, statusArrayEdit } from '../../../helper/Helper';

export const CreateGearAndApparatusForm = () => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [typedata, setTypedata] = useState([]);
    const [typeOption, setTypeOption] = useState([]);
    const [loder, setLoder] = useState(false);
    const navigate = useNavigate();
    const [key, setKey] = useState('home')
    const location = useLocation();


    const addNewHandler = (e, i) => {
        const { value } = e.target;
        let data = [...fields];
        if (i >= 0 && i < data.length) {
            data[i] = { ...data[i], value: value };
            setFields(data);
        }
    }

    const newFieldData = async () => {
        const resp = await getAddNewField_API("GearApparatus");
        if (resp && resp.success) {
            let finData = resp.data;
            finData = finData.map((e) => ({ title: e.formLabel, type: e.formType, options: e.OptionArray, value: '' }));
            setFields(finData);
        }
    }
    useEffect(() => {
        if (location && location.state && location.state.eventKey) {
            setKey(location.state.eventKey);
        }
    }, [location])

    useEffect(() => { newFieldData(); }, [])




    const [indata, setIndata] = useState({
        "gear_apparatus": "",
        "name": "",
        "type": "",
        "received_date": "",
        "location": "",
        "cost": "",
        "description": "",
        "status": "",
        "inventory_status": ""
    });

    const [error, setError] = useState({
        "gear_apparatus": "",
        "name": "",
        "type": "",
        "received_date": "",
        "location": "",
        "cost": "",
        "description": "",
        "status": "",
        "inventory_status": ""
    });



    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;
        if (!indata.gear_apparatus) { setError(prev => ({ ...prev, "gear_apparatus": "Required" })); isValid = false; }
        if (!indata.name) { setError(prev => ({ ...prev, "name": "Required" })); isValid = false; }
        if (!indata.type) { setError(prev => ({ ...prev, "type": "Required" })); isValid = false; }
        if (!indata.status) { setError(prev => ({ ...prev, "status": "Required" })); isValid = false; }
        if (!indata.inventory_status) { setError(prev => ({ ...prev, "inventory_status": "Required" })); isValid = false; }
        if (isValid) {

            setLoder(true);
            if (indata.gear_apparatus === "gear") {
                const finaldata = {
                    "gear_item_name": indata.name,
                    "gearType_id": indata.type,
                    "received_date": indata.received_date,
                    "item_cost": indata.cost,
                    "description": indata.description,
                    "location": indata.location,
                    "status": indata.status,
                    "inventory_status": indata.inventory_status,
                    "add_field": fields
                }

                const resp = await createGear_API(finaldata);
                if (resp && resp.success) {
                    e.target.reset();
                    setIndata([]);
                    setFields([]);
                    setLoder(false);
                    successAlert(resp.message);
                    navigate("/inventorymodulelist", { state: { eventKey: "gear" } });
                }
                setLoder(false);
            } else {
                const finalData1 = {
                    "name": indata.name,
                    "type_id": indata.type,
                    "received_date": indata.received_date,
                    "item_cost": indata.cost,
                    "description": indata.description,
                    "location": indata.location,
                    "item_status": indata.status,
                    "inventory_status": indata.inventory_status,
                    "add_field": fields
                }
                const resp = await createApparatus_API(finalData1);
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
    }

    const getData = async () => {
        setLoder(true);
        const resp = await getGearAndApparatusType_API();
        if (resp && resp.success) {
            setLoder(false);
            setTypedata(resp.data);
            const data = resp.data;
            const option = data.map(e => ({ name: e.type, value: e._id }));
            setTypeOption(option);
        }
        setLoder(false);
    }
    useEffect(() => { getData(); }, [])

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
                            <Headings MainHeading={"Gear and Apparatus Administration"} HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Information">
                                        <div className='TrainingForm'>
                                            <Container fluid>
                                                <Form onSubmit={submitHandler}>
                                                    <Row className='mb-2'>
                                                        <Col md={6} className='mb-2'>
                                                            <Select required={true} FormLabel='Gear/Apparatus' Array={GAPoptions} onChange={inputHandler} error={error.gear_apparatus} value={indata.gear_apparatus} name='gear_apparatus' />
                                                        </Col>

                                                        <Col md={6} className='mb-2'>
                                                            <InputField required={true} FormType={'text'} FormLabel={"Name"} name='name' error={error.name} value={indata.name} onChange={inputHandler} />
                                                        </Col>
                                                        <Col md={6} className='mb-2'>
                                                            <Select required={true} FormLabel='Type' Array={typeOption} onChange={inputHandler} error={error.type} name='type' value={indata.type} />
                                                        </Col>
                                                        <Col md={6} className='mb-2'>
                                                            <InputField FormType={'date'} FormLabel={"Date Received"} onChange={inputHandler} name='received_date' error={error.received_date} />
                                                        </Col>
                                                        <Col md={6} className='mb-2'>
                                                            <InputField FormType={'text'} FormLabel={"Location"} name='location' error={error.location} value={indata.location} onChange={inputHandler} />
                                                        </Col>
                                                        <Col md={6} className='mb-2'>
                                                            <InputField FormType={'number'} min={0} FormLabel={"Cost"} onChange={inputHandler} name='cost' value={indata.cost} error={error.cost} />
                                                        </Col>
                                                        <Col md={12} className='mb-2'>
                                                            <Textareanew FormType={'text'} FormLabel={"Description"} rows={2} onChange={inputHandler} name="description" value={indata.description} error={error.description} />
                                                        </Col>
                                                        <Col md={6} className='mb-3'>
                                                            <Select required={true} FormLabel='Service Readiness' Array={itemsStatus} onChange={inputHandler} error={error.status} value={indata.status} name='status' />
                                                        </Col>
                                                        <Col md={6} className='mb-3'>
                                                            <Select required={true} FormLabel='Inventory Status' Array={statusArray} onChange={inputHandler} error={error.inventory_status} value={indata.inventory_status} name='inventory_status' />
                                                        </Col>
                                                        {fields.map((e, i) => (
                                                            <Col md={6} key={i} className='mb-2'>
                                                                {e.type == "text" ?
                                                                    <InputField FormType={'text'} FormLabel={e.title} value={e.value} onChange={(e) => addNewHandler(e, i)} name={e.title} />
                                                                    :
                                                                    <Select FormLabel={e.title} Array={e.options} value={e.value} onChange={(e) => addNewHandler(e, i)} name={e.title} />
                                                                }
                                                            </Col>
                                                        ))}
                                                    </Row>

                                                    <Row className='mb-2'>
                                                        <Col md={12}>
                                                            <SharedButton type={'submit'} BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100 mt-4"} />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                                <Row className='mt-3'>
                                                    <span className='error'>Note: Fields marked with an asterisk (*) are mandatory and must be filled out before submitting the form .</span>
                                                </Row>
                                            </Container>
                                        </div>
                                    </Tab>

                                    <Tab eventKey="geartype" title="Type">
                                        <GearTypeTable setLoder={setLoder} getData={getData} trdata={typedata} />
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
