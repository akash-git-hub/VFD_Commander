import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Stack, Tab, Table, Tabs, } from 'react-bootstrap';
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
import { getAddNewField_API, getApparatusById_API, getGearAndApparatusType_API, getTrackingInformation_API, updateApparatus_API } from '../../../api_services/Apiservices';
import Select from '../../../components/Select';
import { FilterItemsStatus, itemsStatus, sortEventByDate, statusArray, statusArrayEdit } from '../../../helper/Helper';
import moment from 'moment';
import ApparatusTrackingInformation from './ApparatusTrackingInformation';
import AddNewTrackingInformation from './AddNewTrackingInformation';
import { HeadingUserProfile } from '../../../components/HeadingUserProfile';



export default function ApparatusInfoDetails() {
    const [key, setKey] = useState('home');

    const [indata, setIndata] = useState({
        "id": "",
        "name": "",
        "type_id": "",
        "type_name": "",
        "received_date": "",
        "location": "",
        "cost": "",
        "description": "",
        "item_status": "",
        "inventory_status": "",
        "update_date": ""
    });
    const [error, setError] = useState({
        "id": "",
        "name": "",
        "type_id": "",
        "type_name": "",
        "received_date": "",
        "location": "",
        "cost": "",
        "description": "",
        "item_status": "",
        "inventory_status": "",
        "update_date": ""
    });

    const [isedit, setIsedit] = useState(false);
    const [isdelete, setIsdelete] = useState(false);
    const [loder, setLoder] = useState(false);
    const location = useLocation();
    const [fields, setFields] = useState([]);
    const [preId, setPreId] = useState();
    const [typeOption, setTypeOption] = useState([]);
    const navigate = useNavigate();
    const [tbData, setTbData] = useState([]);

    const [newAddField, setNewAddField] = useState([]);
    const newFieldData = async () => {
        const resp = await getAddNewField_API("GearApparatus");
        if (resp && resp.success) {
            let finData = resp.data;
            finData = finData.map((e) => ({ id: e._id, title: e.formLabel, type: e.formType, options: e.OptionArray, value: '' }));
            setNewAddField(finData);
        }
    }
    useEffect(() => { newFieldData(); }, []);


    const getDataById = async (id) => {
        if (id) {
            const resp = await getApparatusById_API(id);
            if (resp && resp.success) {
                setLoder(false);
                // let data = resp.data;
                let { _id, name, type_Id, recevied_date, location, cost, description, item_status, inventory_status, lastUpdate, add_field } = resp.data;


                let check = add_field.filter(cr => newAddField.some(newItem => newItem.id === cr.id));
                const check1 = newAddField.filter(cr => !add_field.some(newItem => newItem.id === cr.id));
                let customFiled = [];
                if (check1.length > 0) { customFiled = check.concat(check1); } else { customFiled = check; }

                setFields(customFiled);
                setIndata({
                    "id": _id,
                    "name": name,
                    "type_id": type_Id && type_Id._id,
                    "type_name": type_Id && type_Id.type,
                    "received_date": recevied_date,
                    "location": location,
                    "cost": cost,
                    "description": description,
                    "item_status": item_status,
                    "new_item_status": item_status === "in_service" ? "In Service" : "Out of Service",
                    "inventory_status": inventory_status,
                    "update_date": lastUpdate,
                    "add_field": customFiled
                })
                setLoder(false);
            }
            setLoder(false);
        }
        setLoder(false);
    }

    const getdata = async () => {
        setLoder(true);
        const resp = await getGearAndApparatusType_API();
        if (resp && resp.success) {
            setLoder(false);
            const fdata = resp.data;
            const mydata = fdata.map(e => ({ name: e.type, value: e._id }));
            setTypeOption(mydata);
        }
        setLoder(false);
    }

    const trackInfo = async (id = preId) => {
        if (id) {
            const resp = await getTrackingInformation_API(id);
            if (resp) {
                let prData = resp.data;
                prData = sortEventByDate(prData, false);
                setTbData(prData);
            }
        }
    }
    useEffect(() => { getdata(); if (preId) { trackInfo(preId) } }, [preId])



    useEffect(() => {
        if (location && location.state && location.state.data) {
            const data = location.state.data;
            if (data) {
                const myid = data._id;
                setPreId(myid);
                getDataById(myid);
            }
        }
    }, [location, newAddField])


    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }

    const addNewHandler = (e, i) => {
        const { value } = e.target;
        let data = [...fields];
        if (i >= 0 && i < data.length) {
            data[i] = { ...data[i], value: value };
            setFields(data);
        }
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;
        const date = moment().unix();

        if (!indata.name) { setError(prev => ({ ...prev, "name": "Required" })); isValid = false; }
        if (!indata.type_id) { setError(prev => ({ ...prev, "type_id": "Required" })); isValid = false; }
        if (!indata.inventory_status) { setError(prev => ({ ...prev, "inventory_status": "Required" })); isValid = false; }
        if (!indata.item_status) { setError(prev => ({ ...prev, "item_status": "Required" })); isValid = false; }

        if (isValid) {
            Swal.fire({
                title: "Are you sure?",
                text: "Gear Information has been modified. Save changes?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then(async (result) => {
                if (result.isConfirmed) {

                    setLoder(true);
                    const finaldata = {
                        "id": indata.id,
                        "name": indata.name,
                        "type_Id": indata.type_id,
                        "received_date": indata.received_date,
                        "location": indata.location,
                        "cost": indata.cost,
                        "description": indata.description,
                        "inventory_status": indata.inventory_status,
                        "item_status": indata.item_status,
                        "update_date": date,
                        "add_field": fields
                    }
                    const resp = await updateApparatus_API(finaldata);
                    if (resp && resp.success) {
                        e.target.reset();
                        setIndata([]);
                        setFields([]);
                        setLoder(false);
                        successAlert(resp.message);
                        navigate("/inventorymodulelist", { state: { eventKey: "apparatus" } });
                    }
                }
                setLoder(false);
            });
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
                    "id": indata.id,
                    "is_delete": 'yes'
                }
                const resp = await updateApparatus_API(fadat);

                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/inventorymodulelist", { state: { eventKey: "apparatus" } });
                        }
                    })
                }
            }
        });
    }

    const cancelHandler = () => {
        Swal.fire({
            title: "Changes have been made",
            text: "Are you sure you want to exit with no changes?",
            icon: "question"
        }).then((result) => {
            if (result.isConfirmed) { setIsedit(false); }
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
                            {/* <Headings
                              
                                prName={indata.name}
                                HeadButton={<SharedButton onClick={() => window.history.back()}
                                    BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />}
                            /> */}


                            <Stack className='px-1' direction='horizontal' gap={2} style={{
                                justifyContent: 'space-between'
                            }}>
                                <Stack direction='vertical' gap={0} >

                                    <h2 className='pt-md-3 mb-0'>{"Gear and Apparatus Administration"}</h2>
                                    <p className='mt-4'>
                                        <b>{indata.name}</b>
                                    </p>
                                </Stack>
                                <Stack direction='horizontal' gap={0}>
                                    {<SharedButton BtnLabel={"Back"} onClick={() => window.history.back()} BtnVariant={'primary'} />}
                                </Stack>
                            </Stack>
                            <hr />

                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Apparatus Information">
                                        <div className='RoleAdminstrator'>
                                            <Container fluid>
                                                <Row>
                                                    <Col md={12}>
                                                        <div className='mt-3 mb-3'>
                                                            <h5 className='apHeader ps-3 pt-3 pb-3' style={{ background: "#f8f8f8" }}>Apparatus Details</h5>
                                                        </div>
                                                        {isedit ?
                                                            <>
                                                                <div className='CreateAccountForm'>
                                                                    <Container fluid>
                                                                        <Row style={{ justifyContent: 'end' }}>
                                                                            <Col md={2} style={{ textAlign: "end" }}>
                                                                                <Button variant="danger" size="sm"
                                                                                    onClick={cancelHandler} >Cancel
                                                                                </Button>
                                                                            </Col>
                                                                        </Row>
                                                                        <Form onSubmit={submitHandler}>
                                                                            <Row className='mb-2'>
                                                                                <Col md={6}>
                                                                                    <InputField required={true} FormType={'text'} FormLabel={"Name"} name='name' error={error.name} value={indata.name} onChange={inputHandler} />
                                                                                </Col>
                                                                                <Col md={6}>
                                                                                    <Select required={true} FormLabel='Type' Array={typeOption} onChange={inputHandler} error={error.type_id} value={indata.type_id} name='type_id' />
                                                                                </Col>

                                                                                <Col md={6}>
                                                                                    <InputField FormType={'date'} FormLabel={"Received Date"} onChange={inputHandler} name='received_date'
                                                                                        value={indata.received_date} error={error.received_date} />
                                                                                </Col>
                                                                                <Col md={6}>
                                                                                    <InputField FormType={'text'} FormLabel={"Location"} name='location' error={error.location} value={indata.location} onChange={inputHandler} />
                                                                                </Col>
                                                                                <Col md={6}>
                                                                                    <InputField min={0} FormType={'number'} FormLabel={"Cost"} onChange={inputHandler} name='cost' value={indata.cost} error={error.cost} />
                                                                                </Col>
                                                                                <Col md={12}>
                                                                                    <Textareanew FormType={'text'} FormLabel={"Description"} rows={2} value={indata.description} onChange={inputHandler} name="description" error={error.description} />
                                                                                </Col>
                                                                                <Col md={6}>
                                                                                    <InputField readOnly FormType={'text'} FormLabel={"Service Readiness"} name='new_item_status' value={indata.new_item_status} />
                                                                                </Col>
                                                                                <Col md={6}>
                                                                                    <Select required={true} FormLabel='Inventory Status' Array={statusArrayEdit} onChange={inputHandler} error={error.inventory_status} value={indata.inventory_status} name='inventory_status' />
                                                                                </Col>
                                                                                {fields && fields.map((e, i) => (
                                                                                    <Col md={6} key={i}>
                                                                                        {e.type == "text" ?
                                                                                            <InputField FormType={'text'} FormLabel={e.title} value={e.value} onChange={(e) => addNewHandler(e, i)} name={e.title} />
                                                                                            :
                                                                                            <Select FormLabel={e.title} Array={e.options} value={e.value} onChange={(e) => addNewHandler(e, i)} name={e.title} />
                                                                                        }
                                                                                    </Col>
                                                                                ))}
                                                                            </Row>
                                                                            <Row>
                                                                                <Col md={12}>
                                                                                    <SharedButton BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100 mt-4"} />
                                                                                </Col>
                                                                            </Row>
                                                                        </Form>
                                                                        <Row className='mt-3'>
                                                                            <span className='error'>Note: Fields marked with an asterisk (*) are mandatory and must be filled out before submitting the form .</span>
                                                                        </Row>
                                                                    </Container>
                                                                </div>
                                                            </>

                                                            :
                                                            <>
                                                                <div className='CreateAccountForm UseDetailPages'>
                                                                    <Container>
                                                                        <Row className='mb-2' style={{ justifyContent: 'end' }}>
                                                                            <Col md={2} style={{ textAlign: "end" }}>
                                                                                <Button variant="success" size="sm"
                                                                                    onClick={() => setIsedit(true)} style={{
                                                                                        fontWeight: '500',
                                                                                        marginRight: '1rem'
                                                                                    }}><TbEdit />
                                                                                </Button>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='mb-2 mt-3'>
                                                                            {indata &&
                                                                                <Col md={6} className='mb-2'>
                                                                                    <h6>Name</h6>
                                                                                    <p>{indata.name}</p>
                                                                                </Col>
                                                                            }
                                                                            {indata &&
                                                                                <Col md={6} className='mb-2'>
                                                                                    <h6>Type</h6>
                                                                                    <p>{indata.type_name}</p>
                                                                                </Col>
                                                                            }
                                                                            {indata &&
                                                                                <Col md={6} className='mb-2'>
                                                                                    <h6>Date Received</h6>
                                                                                    <p>{indata.received_date && moment.unix(indata.received_date).format("MM/DD/YYYY")}</p>
                                                                                </Col>
                                                                            }
                                                                            {indata &&
                                                                                <Col md={6} className='mb-2'>
                                                                                    <h6>Location</h6>
                                                                                    <p>{indata.location}</p>
                                                                                </Col>
                                                                            }
                                                                            {indata &&
                                                                                <Col md={6} className='mb-2'>
                                                                                    <h6>Cost</h6>
                                                                                    <p>{indata.cost && `$ ${indata.cost}`}</p>
                                                                                </Col>
                                                                            }
                                                                            {indata &&
                                                                                <Col md={12} className='mb-2'>
                                                                                    <h6>Description</h6>
                                                                                    <p>{indata.description}</p>
                                                                                </Col>
                                                                            }
                                                                            {indata &&
                                                                                <Col md={6} className='mb-2'>
                                                                                    <h6>Service Readiness</h6>
                                                                                    <p>{indata.item_status === "in_service" ? "In Service" : "Out of Service"}</p>
                                                                                </Col>
                                                                            }
                                                                            {indata &&
                                                                                <Col md={6} className='mb-2'>
                                                                                    <h6>Inventory Status</h6>
                                                                                    <p>{indata.inventory_status}</p>
                                                                                </Col>
                                                                            }

                                                                            {indata && indata.add_field && indata.add_field.map((e, i) => (
                                                                                <Col md={6} className='mb-3' key={i}>
                                                                                    {e.type === "text" ?
                                                                                        <> <h6>{e.title}</h6> <p>{e.value}</p> </>
                                                                                        :
                                                                                        <> <h6>{e.title}</h6>
                                                                                            <p>
                                                                                                {e.options && e.value
                                                                                                    ? e.options.find((d) => d.value === e.value)?.name || "No match"
                                                                                                    : "No options"}
                                                                                            </p>
                                                                                        </>
                                                                                    }
                                                                                </Col>
                                                                            ))}
                                                                        </Row>

                                                                    </Container>
                                                                </div>
                                                            </>
                                                        }
                                                        <div className='mt-3 mb-3'>
                                                            <h5 className='apHeader ps-3 pt-3 pb-3' style={{ background: "#f8f8f8" }}>Apparatus Tracking Information</h5>
                                                        </div>
                                                        <div className='MainTable mt-2 '>
                                                            <Table responsive className='table table-hover'>
                                                                <thead>
                                                                    <tr className='text-center'>
                                                                        <th>Date </th>
                                                                        <th>Category </th>
                                                                        <th>Status </th>
                                                                        <th>Comments </th>
                                                                        <th>Completed By</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {tbData.map((e, index) => (
                                                                        index < 5 &&
                                                                        <tr key={index}>
                                                                            <td className='text-center'>{e.date && moment.unix(e.date).format("MM-DD-YYYY")}</td>
                                                                            <td className='text-center'>{e.category}</td>
                                                                            <td className='text-center'>{e.status && FilterItemsStatus(e.status)}</td>
                                                                            <td className='text-center'>{e.comments}</td>
                                                                            <td className='text-center'>{e.creator_id && e.creator_id.last_name + " " + e.creator_id.first_name}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                        </div>

                                                        <div className='mt-3 mb-3'>
                                                            <h5 className='apHeader ps-3 pt-3 pb-3' style={{ background: "#f8f8f8" }}>Add New Apparatus Tracking Information</h5>
                                                        </div>
                                                        <div>
                                                            <AddNewTrackingInformation APid={indata.id} setLoder={setLoder} setKey={setKey} trackInfo={trackInfo} preId={preId} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </div>
                                    </Tab>

                                    <Tab eventKey="tracking" title="Apparatus History">
                                        <ApparatusTrackingInformation tbData={tbData} setLoder={setLoder} setKey={setKey} APid={indata.id} />
                                    </Tab>
                                    {/* <Tab eventKey="addNew" title="Add New Tracking Information">
                                        
                                    </Tab> */}


                                </Tabs>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    )
}
