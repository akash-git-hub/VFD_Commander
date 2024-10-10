import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Stack, Tab, Table, Tabs } from 'react-bootstrap';
import { InputField } from '../../components/InputField';
import { Loader } from '../../components/Loader';
import { PoSidebar } from '../PO_Sidebar';
import { Headings } from '../../components/Headings';
import { SharedButton } from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Textareanew } from '../../components/Textareanew';
import { addUsersEvent_API, deleteEventUsers_API, getAddNewField_API, getAttendees_API, getTraningById_API, multiUpdateEventStatus_API, updateTraning_API } from '../../api_services/Apiservices';
import { errorAlert, successAlert } from '../../components/Alert';
import { TbEdit } from 'react-icons/tb';
import Swal from 'sweetalert2';
import moment from 'moment';
import Select from '../../components/Select';
import { event_type_option, get_qualification_op, multiSelectUsersOption } from '../../helper/API_Helper';
import { RiDeleteBinLine } from 'react-icons/ri';
import { NewSharedMultiSelect } from '../../components/NewSharedMultiSelect';
import { eventStatus, orderby, pointerExpiration } from '../../helper/Helper';
import { FaSortAlphaDownAlt, FaSortAlphaUp } from 'react-icons/fa';
import { InputNumber } from './InputNumber';


export default function TraningListDetail() {
    const [isedit, setIsedit] = useState(false);
    const [loder, setLoder] = useState(false);
    const location = useLocation();
    const [fields, setFields] = useState([]);
    const navigate = useNavigate();
    const [myd] = useState(JSON.parse(localStorage.getItem("mydata")));
    const [event_op, setEvent_op] = useState([]);
    const [qualification_op, setQualification_op] = useState([]);
    const [event_id, setEvent_id] = useState();

    const [showModal, setShowModal] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [trainingData, setTrainingData] = useState();
    const [order, setOrder] = useState(true);

    const [indata, setIndata] = useState({ "id": "", "event_name": "", "description": "", "duration": "", "trdate": "", "st_time": "", "event_type_id": "", "trlocation": "", "capacity": "", "notes": "", "qualification_id": "", "qf_name": "", "event_type": "" });
    const [error, setError] = useState({ "event_name": "", "event_type_id": "", "description": "", "duration": "", "trdate": "", "st_time": "", "trlocation": "", "capacity": "", "notes": '' });

    const [data, setData] = useState([]);
    const [usersIds, setUsersIds] = useState([]);
    const [user_option, setUser_option] = useState([]);
    const [attendees, setAttendees] = useState([]);
    const [searchDate, setSearchDate] = useState({ "start": "", "end": "" });
    const [selectedStatus, setSelectedStatus] = useState({ "status": "", "duration": "" });


    const [newAddField, setNewAddField] = useState([]);
    const newFieldData = async () => {
        const resp = await getAddNewField_API("Event");
        if (resp && resp.success) {
            let finData = resp.data;
            finData = finData.map((e) => ({ id: e._id, title: e.formLabel, type: e.formType, options: e.OptionArray, value: '' }));
            setNewAddField(finData);
        }
    }


    const getDetails = async (id) => {
        setLoder(true);
        const resp = await getTraningById_API({ "tr_id": id });
        if (resp && resp.success) {
            setLoder(false);
            const e = resp.data;
            const { add_field, _id, name, description, duration, date,
                start_time, event_type_id, location, capacity, notes,
                qualification_id } = resp.data;

            let check = add_field.filter(cr => newAddField.some(newItem => newItem.id === cr.id));
            const check1 = newAddField.filter(cr => !add_field.some(newItem => newItem.id === cr.id));

            let customFiled = [];
            if (check1.length > 0) { customFiled = check.concat(check1); } else { customFiled = check; }

            let pre = { ...e };
            e.add_field = customFiled;
            setTrainingData(pre);
            setFields(customFiled);
            setIndata({
                "id": _id,
                "event_name": name,
                "description": description,
                "duration": duration,
                "trdate": date,
                "prestart_time": start_time,
                "st_time": start_time ? moment.unix(start_time).format("HH:mm") : "",
                "event_type_id": event_type_id && event_type_id._id,
                "event_type": event_type_id && event_type_id.event_name ? event_type_id.event_name : "",
                "trlocation": location,
                "capacity": capacity,
                "notes": notes,
                "qualification_id": qualification_id && qualification_id._id ? qualification_id._id : "",
                "qf_name": qualification_id && qualification_id.name ? qualification_id.name : "",
                "add_field": customFiled
            })
        }
        setLoder(false);
    }


    const getAttendeesList = async (id) => {
        let myOrd = "asc";
        if (order) {
            myOrd = "asc"
        } else {
            myOrd = "desc";
        }
        if (id) {
            setLoder(true);
            const resp = await getAttendees_API(id, myOrd);
            if (resp && resp.success) {
                setLoder(false);
                const atd = resp.data.map(e => ({
                    "id": e._id,
                    "name": e.user_name,
                    "status": e.current_status === "select" ? "" : e.current_status,
                    "update_by": e.creator_id,
                    "training_id": e.training_id,
                    "credit_duration": e.credit_duration,
                    "trainingDuration": indata.duration
                }));
                setData(atd);
                setAttendees(resp.data);
            }
            setLoder(false);
        }
    }

    useEffect(() => {
        getAttendeesList(event_id);
    }, [order])



    const addNewHandler = (e, i) => {
        const { value } = e.target;
        let data = [...fields];
        if (i >= 0 && i < data.length) {
            data[i] = { ...data[i], value: value };
            setFields(data);
        }
    }

    const get_option_data = async () => {
        const ev_option = await event_type_option(setLoder);
        const qf_option = await get_qualification_op(setLoder);
        const ur_option = await multiSelectUsersOption(setLoder);
        let filteredAttendees = ur_option.filter(user =>
            !attendees.some(option => option.user_id === user.value)
        );

        setEvent_op(ev_option);
        setQualification_op(qf_option);
        setUser_option(filteredAttendees);
    }

    useEffect(() => {
        get_option_data();
    }, [attendees])

    useEffect(() => { newFieldData(); }, [])


    useEffect(() => {
        if (location && location.state && location.state.data) {
            const data = location.state.data;
            const srDates = location.state.eventSearchDate;
            setSearchDate({ "start": srDates.start, "end": srDates.end });
            if (data && data._id) {
                getAttendeesList(data._id);
                getDetails(data._id);
                setEvent_id(data._id);
                setFields(data.add_field);

            }
        }
    }, [location, newAddField])

    const addTimeToTimestamp = (givenTimestamp, timeToAdd) => {
        let dateTime = moment.unix(givenTimestamp);
        const [hours, minutes] = timeToAdd.split(':');
        dateTime = dateTime.hours(parseInt(hours)).minutes(parseInt(minutes));
        const newTimestamp = dateTime.unix();
        return newTimestamp;
    }


    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }

    const updateHandler = async (e) => {
        e.preventDefault();
        setLoder(true);
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
                "id": indata.id,
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
            const resp = await updateTraning_API(final);
            if (resp && resp.success) {
                getAttendeesList(indata.id);
                getDetails(indata.id);
                setLoder(false);
                setIsedit(false);
                successAlert(resp.message);
            }
            setLoder(false);
        }
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
                const resp = await updateTraning_API(fadat);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/traininglist");
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

    const userEditHandlerCancel = () => {
        Swal.fire({
            title: "Changes have been made",
            text: "Are you sure you want to exit with no changes?",
            icon: "question"
        }).then((result) => {
            if (result.isConfirmed) { setShowModal(false); }
        });

    }



    const addUserHandler = async () => {
        if (usersIds.length === 0) { errorAlert("Please select at least one user"); return; }
        if (selectedStatus.duration) {
            if (!pointerExpiration.test(selectedStatus.duration)) { errorAlert('Please enter a number with up to 2 decimal places.'); return; }
        }
        setLoder(true);
        const final_data = {
            "event_id": event_id,
            "users": usersIds,
            "status": selectedStatus.status,
            "duration": selectedStatus.duration
        }
        const resp = await addUsersEvent_API(final_data);
        if (resp && resp.success) {
            setUsersIds([]);
            setSelectedOptions([]);
            setSelectedStatus({ "status": "", "duration": "" });
            setLoder(false);
            getAttendeesList(event_id);
            successAlert(resp.message);
        }
    }

    const useredithandler = (e) => {
        setShowModal(true);
    }

    const attendeesDeleteHandler = (data) => {
        if (!data._id) { errorAlert("Something wrong"); return; }
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
                const formData = { "delete_id": data._id };
                const resp = await deleteEventUsers_API(formData);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            getAttendeesList(data.training_id);
                        }
                    })
                }
            }
        });
    }

    const attendeesUpdateSubmit = async () => {
        const errorMinuet = data.filter((e) => (!pointerExpiration.test(e.credit_duration)));
        if (errorMinuet.length > 0) {
            errorAlert("* Please enter a number with up to 2 decimal places."); return;
        }
        Swal.fire({
            title: "Are you sure?",
            text: "User Information has been modified. Save changes?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const f_data = {
                    "data": data,
                    "update_date": moment().unix(),
                }
                const resp = await multiUpdateEventStatus_API(f_data);
                if (resp && resp.success) {
                    getAttendeesList(event_id);
                    setShowModal(false)
                    setLoder(false);
                    successAlert(resp.message);
                }
                setLoder(false);
            }
        });
        setLoder(false);
    };

    const editInputHandler = (e, i) => {
        const { name, value } = e.target;
        const prd = [...data];
        if (name === "status" && (value === "cancelled" || value === "removed")) {
            prd[i][name] = value;
            prd[i]['credit_duration'] = "0";
        } else {
            prd[i][name] = value;
        }
        setData(prd);
    }



    const statusHandler = (e) => {
        const { name, value } = e.target;
        setSelectedStatus((pre) => ({ ...pre, [name]: value }));
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
                            <Headings MainHeading={"Event Administration"} HeadButton={<SharedButton BtnLabel={"Back"} onClick={() => window.history.back()} BtnVariant={'primary'} />} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={"home"}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Event Information">

                                        {searchDate && searchDate.start && searchDate.end &&
                                            <div className='SearchBox mb-3' style={{ border: "1px solid #e6e6e6", borderRadius: "10px" }}>
                                                <Container>
                                                    <Row style={{ padding: "8px 0px" }} cla >
                                                        <Col className='d-flex' style={{ justifyContent: "end" }}>
                                                            <h5 style={{ marginRight: "10px" }}>
                                                                {moment.unix(searchDate.start).format("MM/DD/yyyy")}
                                                            </h5>
                                                            <b>To</b>
                                                            <h5 style={{ marginLeft: "10px" }}>
                                                                {moment.unix(searchDate.end).format("MM/DD/yyyy")}
                                                            </h5>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </div>
                                        }
                                        {isedit ?
                                            <>
                                                <div className='CreateAccountForm'>
                                                    <Container>
                                                        <Row className='mb-4' style={{ justifyContent: 'end' }}>
                                                            <Col md={2} style={{ textAlign: "end" }}>
                                                                <Button variant="danger" size="sm"
                                                                    onClick={cancelHandler}
                                                                >Cancel
                                                                </Button>
                                                            </Col>
                                                        </Row>

                                                        <Form onSubmit={updateHandler}>
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
                                                                    <InputField readOnly={indata.trdate && moment(indata.trdate).isAfter(moment())} FormType={'date'} required={true} FormLabel={"Date"} name='trdate' error={error.trdate} value={indata.trdate} onChange={inputHandler} />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <InputField FormType={'time'} required={true} FormLabel={"Start Time"} name='st_time' error={error.st_time} value={indata.st_time} onChange={inputHandler} />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <InputNumber step="0.01" min="0" FormType={'number'} required={true} FormLabel={"Duration"} name='duration' error={error.duration} value={indata.duration} onChange={inputHandler} />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <InputField FormType={'text'} required={true} max='255' FormLabel={"Location"} FormPlaceHolder={"Enter Training Location"} name='trlocation' error={error.trlocation} value={indata.trlocation} onChange={inputHandler} />
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
                                                            <Row className='mt-3'>
                                                                <Col md={6}>
                                                                    <SharedButton BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100"} />
                                                                </Col>
                                                            </Row>
                                                        </Form>
                                                    </Container>
                                                </div>
                                            </>

                                            :
                                            <>
                                                <div className='CreateAccountForm UseDetailPages'>
                                                    <Container>
                                                        <Row style={{ justifyContent: 'end' }}>
                                                            <Col md={1} style={{ textAlign: "end" }}>
                                                                <Button variant="success" size="sm"
                                                                    onClick={() => setIsedit(true)} style={{
                                                                        fontWeight: '500',
                                                                        marginRight: '1rem'
                                                                    }}><TbEdit />
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                        <Row className='mb-2'>
                                                            <Col md={6} className='mb-2'>
                                                                <h6>Event Type</h6>
                                                                <p>{indata && indata.event_type}</p>
                                                                <hr />
                                                            </Col>
                                                            <Col md={6} className='mb-2'>
                                                                <h6>Event Name</h6>
                                                                <p>{indata && indata.event_name}</p>
                                                                <hr />
                                                            </Col>

                                                            <Col md={12}>
                                                                <h6>Event Description</h6>
                                                                <p>{indata.description}</p>
                                                                <hr />
                                                            </Col>

                                                            <Col md={6} className='mb-2'>
                                                                <h6>Event Date</h6>
                                                                <p>{indata.trdate && moment.unix(indata.trdate).format("MM-DD-YYYY")}</p>
                                                                <hr />
                                                            </Col>
                                                            <Col md={6} className='mb-2'>
                                                                <h6>Start Time</h6>
                                                                <p>{indata.prestart_time && moment.unix(indata.prestart_time).format(myd.time_formate)}</p>
                                                                <hr />
                                                            </Col>

                                                            <Col md={6} className='mb-2'>
                                                                <h6>Duration</h6>
                                                                <p>{parseFloat(indata.duration).toFixed(2)}</p>
                                                                <hr />
                                                            </Col>
                                                            <Col md={6} className='mb-2'>
                                                                <h6>Capacity</h6>
                                                                <p>{indata.capacity || 0}</p>
                                                                <hr />
                                                            </Col>

                                                            <Col md={6} className='mb-2'>
                                                                <h6>Location</h6>
                                                                <p>{indata.trlocation}</p>
                                                                <hr />
                                                            </Col>
                                                            <Col md={6} className='mb-2'>
                                                                <h6>Qualification</h6>
                                                                <p>{indata.qf_name}</p>
                                                                <hr />
                                                            </Col>

                                                            <Col md={12} className='mb-2'>
                                                                <h6>Notes</h6>
                                                                <p>{indata.notes}</p>
                                                                <hr />
                                                            </Col>

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
                                                                    <hr />
                                                                </Col>


                                                            ))}
                                                        </Row>
                                                        <Row>
                                                            <Col className={attendees.length > 0 ? "md-10 text-center" : "md-12 text-center"} ><h6 style={{ textTransform: "uppercase", fontWeight: "bold" }}>Attendees List</h6></Col>
                                                            {attendees.length > 0 &&
                                                                <Col md={2} className='text-end'>
                                                                    {!showModal ?
                                                                        <Button variant="success" size="sm"
                                                                            onClick={() => useredithandler()} style={{
                                                                                fontWeight: '500',
                                                                                marginRight: '1rem',
                                                                                maxWidth: '38px'
                                                                            }}><TbEdit />
                                                                        </Button>
                                                                        :
                                                                        <Button variant="danger" size="sm" style={{
                                                                            fontWeight: '500',
                                                                            marginRight: '1rem',
                                                                            maxWidth: '60px'
                                                                        }}
                                                                            onClick={() => userEditHandlerCancel(false)} >Cancel
                                                                        </Button>
                                                                    }
                                                                </Col>
                                                            }

                                                            {!showModal ?
                                                                <>
                                                                    <Col md={12} className='mt-1'>
                                                                        <Row style={{
                                                                            justifyContent: "end",
                                                                            alignItems: 'center'
                                                                        }}>
                                                                        </Row>
                                                                        <div className='MainTable'>
                                                                            <Table responsive className="table table-hover">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th style={{ textAlign: "center" }}>Status</th>
                                                                                        <th onClick={() => setOrder(!order)} style={{ cursor: "pointer", textAlign: "center" }}> {order ? <span> <FaSortAlphaUp style={{ color: "#198754" }} /> </span> : <span> <FaSortAlphaDownAlt style={{ color: "#198754" }} /> </span>} Name</th>
                                                                                        <th style={{ textAlign: "center" }}>Credit Hours</th>
                                                                                        {/* <th style={{ textAlign: "center" }}>ACTION</th> */}
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {attendees.map((e, i) => (
                                                                                        <tr key={i}>
                                                                                            <td style={{ textAlign: "center", textTransform: "capitalize" }}>
                                                                                                {(e.current_status === "planning_to_attend" || e.current_status === "Planning to Attend") && "Planning to Attend"}
                                                                                                {(e.current_status === "cannot_attend" || e.current_status === "Will Not Attend") && "Will Not Attend"}
                                                                                                {(e.current_status === "did_not_attend" || e.current_status === "Did Not Attend") && "Did Not Attend"}
                                                                                                {(e.current_status === "completed" || e.current_status === "Completed") && "Completed"}
                                                                                                {(e.current_status === "removed" || e.current_status === "Removed") && "Removed"}
                                                                                                {(e.current_status === "cancelled" || e.current_status === "Cancelled") && "Cancelled"}
                                                                                            </td>
                                                                                            <td style={{ textAlign: "center" }}>{e.user_name}</td>
                                                                                            <td style={{ textAlign: "center" }}>{e.credit_duration ? parseFloat(e.credit_duration).toFixed(2) : ""}</td>
                                                                                            {/* <td>
                                                                                                <Row style={{ justifyContent: "center" }}>
                                                                                                    <Button variant="danger" size="sm"
                                                                                                        onClick={() => attendeesDeleteHandler(e)} style={{
                                                                                                            fontWeight: '500',
                                                                                                            maxWidth: '38px'
                                                                                                        }}><RiDeleteBinLine />
                                                                                                    </Button>
                                                                                                </Row>
                                                                                            </td> */}
                                                                                        </tr>
                                                                                    ))}
                                                                                </tbody>
                                                                            </Table>
                                                                        </div>
                                                                    </Col>

                                                                    <Col md={12} className='mt-5 mb-5'>
                                                                        <Col className={"md-12 text-center"} ><h6 style={{ textTransform: "uppercase", fontWeight: "bold" }}>Add Users With Status</h6></Col>
                                                                        <Row className='mt-4'>
                                                                            <Col md={4}>
                                                                                <NewSharedMultiSelect
                                                                                    labelText="Users"
                                                                                    setSkillsdata={setUsersIds}
                                                                                    name="users"
                                                                                    options={user_option}
                                                                                    setSelectedOptions={setSelectedOptions}
                                                                                    selectedOptions={selectedOptions}
                                                                                />
                                                                            </Col>
                                                                            <Col md={4}>
                                                                                <Select
                                                                                    FormLabel='Status'
                                                                                    Array={eventStatus}
                                                                                    value={selectedStatus.status}
                                                                                    name='status'
                                                                                    onChange={statusHandler} />
                                                                            </Col>
                                                                            <Col md={4}>
                                                                                <InputNumber
                                                                                    FormLabel='Credit Hours'
                                                                                    step="0.01"
                                                                                    min="0"
                                                                                    FormType={'number'}
                                                                                    name='duration'
                                                                                    value={selectedStatus.duration}
                                                                                    onChange={statusHandler}
                                                                                />
                                                                            </Col>
                                                                            <Col md={12} >
                                                                                <div style={{ marginTop: "31px" }}></div>
                                                                                <SharedButton BtnLabel={'Add'} type={'button'} onClick={addUserHandler} BtnVariant={'primary'} BtnClass={'w-100'} />
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>

                                                                </>
                                                                :

                                                                <Col md={12} className='mt-1'>
                                                                    <Row style={{
                                                                        justifyContent: "end",
                                                                        alignItems: 'center'
                                                                    }}>

                                                                    </Row>
                                                                    <div className='MainTable'>
                                                                        <Table responsive className="table">
                                                                            <thead>
                                                                                <tr className='text-center'>
                                                                                    <th>Status</th>
                                                                                    <th onClick={() => setOrder(!order)} style={{ cursor: "pointer", textAlign: "center" }}> {order ? <span style={{ marginRight: "10px" }}> <FaSortAlphaUp style={{ color: "#198754" }} /> </span> : <span style={{ marginRight: "10px" }}> <FaSortAlphaDownAlt style={{ color: "#198754" }} /> </span>} Name</th>
                                                                                    <th>Credit Hours</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {data.map((e, i) => (
                                                                                    <tr key={i}>
                                                                                        <td className='text-center' style={{ minWidth: "210px" }}>
                                                                                            <Select Array={eventStatus} value={e.status} name='status' onChange={(e) => editInputHandler(e, i)} />
                                                                                        </td>
                                                                                        <td className='text-center' style={{ verticalAlign: "middle" }}>{e.name}</td>
                                                                                        <td className='text-center'>
                                                                                            <InputNumber
                                                                                                step="0.01"
                                                                                                min="0"
                                                                                                FormType={'number'}
                                                                                                name='credit_duration'
                                                                                                value={e.credit_duration}
                                                                                                onChange={(e) => editInputHandler(e, i)}
                                                                                            />
                                                                                        </td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </Table>
                                                                        <Button variant='success' type='button' style={{ width: "100%" }} className='mt-3 mb-5' onClick={attendeesUpdateSubmit}>Update</Button>
                                                                    </div>
                                                                </Col>
                                                            }


                                                        </Row>
                                                    </Container>
                                                </div>
                                            </>
                                        }
                                    </Tab>
                                </Tabs>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* <EditTraningModel show={showModal} handleClose={() => { setShowModal(false); }} setLoder={setLoder} modalData={modalData} getAttendeesList={getAttendeesList} trainingData={trainingData} /> */}
        </>
    )
}
