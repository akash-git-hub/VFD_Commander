import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Tab, Tabs, } from 'react-bootstrap';
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import Swal from 'sweetalert2';
import { Loader } from '../../../components/Loader';
import { InputField } from '../../../components/InputField';
import { Textareanew } from '../../../components/Textareanew';
import { SharedButton } from '../../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { errorAlert, successAlert } from '../../../components/Alert';
import { PoSidebar } from '../../PO_Sidebar';
import { Headings } from '../../../components/Headings';
import Select from '../../../components/Select';
import { getGearType_API, updateGear_API } from '../../../api_services/Apiservices';
import moment from 'moment';


export default function GearInfoDetails() {
    const [indata, setIndata] = useState({ "gear_item_name": "", "recevied_date": "", "description": "", "add_field": "", "id": "", "item_cost": "", "gearttype_id": "", "gearttype_name": "" });
    const [error, setError] = useState({ "gear_item_name": "", "recevied_date": "", "description": "", "add_field": "", "id": "", "item_cost": "", "gearttype_id": "", "gearttype_name": "" });
    const [isedit, setIsedit] = useState(false);
    const [loder, setLoder] = useState(false);
    const location = useLocation();
    const [fields, setFields] = useState([]);
    const navigate = useNavigate();
    const [grtype, setGrtype] = useState([]);

    const addNewHandler = (e) => {
        const { name, value } = e.target;
        const myfield = [...fields];
        const index = myfield.findIndex((item) => item.title === name);
        if (index !== -1) {
            myfield[index] = {
                ...myfield[index],
                value: value
            };
        }
        setFields(myfield);
    }

    useEffect(() => {
        if (location && location.state && location.state.data) {
            const data = location.state.data;
            console.log(data);

            if (data) {
                setIndata({ "gear_item_name": data.gear_item_name, "recevied_date": data.recevied_date, "description": data.description, "add_field": data.add_field, "id": data._id, "item_cost": data.item_cost, "gearttype_id": data.gearttype_id._id, "gearttype_name": data.gearttype_id.name });
                setFields(data.add_field);
            }
        }
    }, [location])


    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }
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

    const updateHandler = async (e) => {
        e.preventDefault();
        setLoder(true);
        const fadat = {
            "id": indata.id,
            'gear_item_name': indata.gear_item_name,
            "recevied_date": indata.recevied_date,
            "description": indata.description,
            "item_cost": indata.item_cost,
            "gearttype_id": indata.gearttype_id,
            "add_field": fields
        }
        const resp = await updateGear_API(fadat);
        if (resp && resp.success) {
            e.target.reset();
            setFields([]);
            setLoder(false);
            successAlert(resp.message);
            navigate("/inventorymodulelist", { state: { eventKey: "gear" } });
        }
        setLoder(false);
    }

    const deleteHandler = (id) => {
        if (!id) { errorAlert("Something wrong"); return; }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const fadat = {
                    "id": id,
                    "is_delete": 'yes'
                }
                const resp = await updateGear_API(fadat);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/inventorymodulelist", { state: { eventKey: "gear" } });
                        }
                    })
                }
            }
        });
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
                                    <Tab eventKey="home" title="Gear Info">
                                        <div className='RoleAdminstrator'>
                                            <Container fluid>
                                                <Row>
                                                    <Col md={12}>
                                                        {isedit ?
                                                            <>
                                                                <div className='CreateAccountForm'>
                                                                    <div className='TrainingForm'>
                                                                        <Container fluid>
                                                                            <Row style={{ justifyContent: 'end' }}>
                                                                                <Col md={1}>
                                                                                    <Button variant="success" size="sm"
                                                                                        onClick={() => setIsedit(false)} >Not Update
                                                                                    </Button>
                                                                                </Col>
                                                                            </Row>
                                                                            <Form onSubmit={updateHandler}>
                                                                                <Row className='mb-2'>
                                                                                    <Col md={6}>
                                                                                        <InputField FormType={'text'} FormLabel={"Name"} FormPlaceHolder={"Enter Gear Item Name"} name='gear_item_name' error={error.gear_item_name} value={indata.gear_item_name} onChange={inputHandler} />
                                                                                    </Col>
                                                                                    <Col md={6}>
                                                                                        <Select FormLabel='Type' Array={grtype} onChange={inputHandler} error={error.gear_type} value={indata.gearttype_id} name='gear_type' />
                                                                                    </Col>

                                                                                    <Col md={6}>
                                                                                        <InputField FormType={'date'} FormLabel={"Received Date"} FormPlaceHolder={"Enter Received Date "} onChange={inputHandler} name='recevied_date'
                                                                                            value={indata.recevied_date}
                                                                                            error={error.recevied_date} />
                                                                                    </Col>
                                                                                    <Col md={6}>
                                                                                        <InputField FormType={'number'} FormLabel={"Cost"} FormPlaceHolder={"Enter Cost"} onChange={inputHandler} name='item_cost' value={indata.item_cost} error={error.item_cost} />
                                                                                    </Col>
                                                                                    <Col md={12}>
                                                                                        <Textareanew FormType={'text'} FormLabel={"Description"} rows={4} FormPlaceHolder={"Enter Gear Item Description"} value={indata.description} onChange={inputHandler} name="description" error={error.description} />
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className='mb-2'>
                                                                                    <Col md={6}>
                                                                                        <SharedButton BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100 mt-4"} />
                                                                                    </Col>
                                                                                </Row>
                                                                            </Form>
                                                                        </Container>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            :
                                                            <>
                                                                <div className='CreateAccountForm UseDetailPages'>
                                                                    <Container>
                                                                        <Row style={{ justifyContent: 'end' }}>
                                                                            <Col md={2}>
                                                                                <Button variant="success" size="sm"
                                                                                    onClick={() => setIsedit(true)} style={{
                                                                                        fontWeight: '500',
                                                                                        marginRight: '1rem'
                                                                                    }}><TbEdit />
                                                                                </Button>
                                                                                <Button variant="danger" size="sm"
                                                                                    onClick={() => deleteHandler(indata.id)} style={{
                                                                                        fontWeight: '500'
                                                                                    }}><RiDeleteBinLine />
                                                                                </Button>
                                                                            </Col>
                                                                        </Row>

                                                                        <Row className='mb-2'>
                                                                            <Col md={12} className='mb-2'>
                                                                                <h6>Name</h6>
                                                                                <p>{indata.gear_item_name}</p>
                                                                            </Col>
                                                                            <Col md={12} className='mb-2'>
                                                                                <h6>Type</h6>
                                                                                <p>{indata.gearttype_name}</p>
                                                                            </Col>

                                                                            <Col md={12} className='mb-2'>
                                                                                <h6>Received Date</h6>
                                                                                <p>{moment.unix(indata.recevied_date).format("MM-DD-YYYY")}</p>
                                                                            </Col>
                                                                            <Col md={12} className='mb-2'>
                                                                                <h6>Cost</h6>
                                                                                <p>$ {indata.item_cost}</p>
                                                                            </Col>
                                                                            <Col md={12} className='mb-2'>
                                                                                <h6>Description</h6>
                                                                                <p>{indata.description}</p>
                                                                            </Col>

                                                                            {indata && indata.add_field && indata.add_field.map((e, i) => (
                                                                                <Col md={12} key={i}>
                                                                                    <h6>{e.title}</h6>
                                                                                    <p>{e.value}</p>
                                                                                </Col>

                                                                            ))}
                                                                        </Row>

                                                                    </Container>
                                                                </div>
                                                            </>
                                                        }
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </div>
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
