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
import { createGear_API, getGearType_API } from '../../../api_services/Apiservices';
import { successAlert } from '../../../components/Alert';
import { useNavigate } from 'react-router-dom';

export const GearInformationForm = () => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [grtype, setGrtype] = useState([]);
    const [loder, setLoder] = useState(false);
    const navigate = useNavigate();

    const [indata, setIndata] = useState({ "gear_type": "", "gear_item_name": "", "recevied_date": "", "item_cost": "", "description": "" });
    const [error, setError] = useState({ "gear_type": "", "gear_item_name": "", "recevied_date": "", "item_cost": "", "description": "" });

    const getdata = async () => {
        setLoder(true);
        const resp = await getGearType_API();
        if (resp && resp.success) {
            setLoder(false);
            const fdata = resp.data;
            const mydata = fdata.map(e => ({ name: e.name, value: e._id }));
            setGrtype(mydata);
        }
        setLoder(false);
    }
    useEffect(() => { getdata(); }, [])

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

    const submitHandler = async (e) =>{
        e.preventDefault();
        let isValid=true;
        if (!indata.gear_type) {  setError(prev => ({ ...prev, "gear_type": "Required" }));  isValid = false; }        
        if (!indata.gear_item_name) {  setError(prev => ({ ...prev, "gear_item_name": "Required" }));  isValid = false; }        
        if (!indata.recevied_date) {  setError(prev => ({ ...prev, "recevied_date": "Required" }));  isValid = false; }        
        if (!indata.item_cost) {  setError(prev => ({ ...prev, "item_cost": "Required" }));  isValid = false; }
        if (!indata.description) {  setError(prev => ({ ...prev, "description": "Required" }));  isValid = false; }
        if(isValid){
            setLoder(true);
            const finaldata = {
                "gear_item_name":indata.gear_item_name,
                "recevied_date":indata.recevied_date,
                "item_cost":indata.item_cost,
                "gearttype_id":indata.gear_type,
                "description":indata.description,
                "add_field":fields
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
                            <Headings MainHeading={"Inventory Module"} HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={"home"}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Create Gear">
                                        <div className='TrainingForm'>
                                            <Container fluid>
                                                <Form onSubmit={submitHandler}>
                                                <Row className='mb-2'>
                                                    <Col md={6}>
                                                        <Select FormLabel='Gear Type' Array={grtype} onChange={inputHandler} error={error.gear_type} name='gear_type' />

                                                    </Col>
                                                    <Col md={6}>
                                                        <InputField FormType={'text'} FormLabel={"Gear Item Name"} FormPlaceHolder={"Gear Item Name"} name='gear_item_name' error={error.gear_item_name} onChange={inputHandler} />
                                                    </Col>

                                                    <Col md={6}>
                                                        <InputField FormType={'date'} FormLabel={"Date Received"} FormPlaceHolder={"Date Received"} onChange={inputHandler} name='recevied_date' error={error.recevied_date} />
                                                    </Col>
                                                    <Col md={6}>
                                                        <InputField FormType={'number'} FormLabel={"Item Cost"} FormPlaceHolder={"Item Cost"} onChange={inputHandler} name='item_cost' error={error.item_cost} />
                                                    </Col>
                                                    <Col md={12}>
                                                        <Textareanew FormType={'text'} FormLabel={"Gear Item Description"} rows={4} FormPlaceHolder={"Gear Item Description"} onChange={inputHandler} name="description" error={error.description} />
                                                    </Col>
                                                    {/* {fields.map((field, index) => (
                                                        <Col md={6} key={index}>
                                                            <InputField FormType={'text'} FormLabel={field.title} FormPlaceHolder={field.placeholder} />
                                                        </Col>
                                                    ))}
                                                    <Col md={6}>
                                                        <SharedButton BtnLabel={"Add Field"} BtnVariant={'outline-dark'} BtnClass={"w-100 AddFieldBtn"} onClick={handleShowModal} />
                                                    </Col> */}
                                                </Row>

                                                <Row className='mb-2'>
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
            </div>
        </>
    )
}
