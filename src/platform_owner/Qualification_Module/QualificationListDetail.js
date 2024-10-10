import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { Headings } from '../../components/Headings';
import { InputField } from '../../components/InputField';
import { Textareanew } from '../../components/Textareanew';
import { SharedButton } from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { errorAlert, successAlert } from '../../components/Alert';
import { getAddNewField_API, updateQualification_API } from '../../api_services/Apiservices';
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import Swal from 'sweetalert2';
import Select from '../../components/Select';
import { statusOP } from '../../helper/Helper';



export default function QualificationListDetail({ qtypeop, setLoder }) {
    const [indata, setIndata] = useState({ "trname": '', "description": "", "type_id": "", "type": "", "status": "", "add_field": "" });
    const [error, setError] = useState({ "trname": '', "description": "", "type_id": "", "type": "", "status": "", "add_field": "" })
    const [isedit, setIsedit] = useState(false);
    const [isdelete, setIsdelete] = useState(false);
    const location = useLocation();
    const [fields, setFields] = useState([]);
    const navigate = useNavigate();
    const [newAddField, setNewAddField] = useState([]);

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
            finData = finData.map((e) => ({ id: e._id, title: e.formLabel, type: e.formType, options: e.OptionArray, value: '' }));
            setNewAddField(finData);
        }
    }

    useEffect(() => { newFieldData(); }, []);

    const setHandler = (data) => {
        if (data) {
            const { name, description, add_field, _id, type_id, type, status } = data;

            let check = add_field.filter(cr => newAddField.some(newItem => newItem.id === cr.id));
            const check1 = newAddField.filter(cr => !add_field.some(newItem => newItem.id === cr.id));
            let customFiled = [];
            if (check1.length > 0) { customFiled = check.concat(check1); } else { customFiled = check; }

            setIndata({
                "trname": name,
                "description": description,
                "add_field": add_field,
                "id": _id,
                "type_id": type_id,
                "type": type,
                "status": status,
                "add_field": customFiled
            });
            setFields(customFiled);
        }

    }


    useEffect(() => {
        if (location && location.state && location.state.data) {
            const data = location.state.data;
            setHandler(data);
        }
    }, [location, newAddField])

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;
        if (!indata.trname) { setError((pre) => ({ ...pre, "trname": "Required" })); isValid = false; }
        if (!indata.type_id) { setError((pre) => ({ ...pre, "type_id": "Required" })); isValid = false; }
        if (!indata.status) { setError((pre) => ({ ...pre, "status": "Required" })); isValid = false; }
        if (!indata.description) { setError((pre) => ({ ...pre, "description": "Required" })); isValid = false; }
        if (isValid === false) { return }

        let type = qtypeop.find((e) => e.value === indata.type_id);
        if (type) { type = type.name }

        Swal.fire({
            title: "Are you sure?",
            text: "Qualification has been modified. Save changes?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoder(true);
                const fadat = {
                    "id": indata.id,
                    'name': indata.trname,
                    "type": type,
                    "type_id": indata.type_id,
                    "status": indata.status,
                    "description": indata.description,
                    "add_field": fields
                }
                const resp = await updateQualification_API(fadat);
                if (resp && resp.success) {
                    e.target.reset();
                    setFields([]);
                    setLoder(false);
                    successAlert(resp.message);
                    navigate("/qualificationlist");
                }
            }
        });
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
                const resp = await updateQualification_API(fadat);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/qualificationlist");
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
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            {isedit ?
                                <>
                                    <div className='CreateAccountForm'>
                                        <Container>
                                            <Row style={{ justifyContent: 'end' }}>
                                                <Col md={2} style={{ textAlign: "end" }}>
                                                    <Button variant="danger" size="sm"
                                                        onClick={cancelHandler} >Cancel
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <Form onSubmit={handleSubmit}>

                                                <Row className='mb-2'>
                                                    <Col md={6} className="mb-3">
                                                        <InputField FormType={'text'} required={true} FormLabel={"Name"} FormPlaceHolder={"Enter Qualification Name"} onChange={inputHandler} error={error.trname} value={indata.trname} name='trname' />
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Select FormLabel='Type' required={true} Array={qtypeop} value={indata.type_id} onChange={inputHandler} error={error.type_id} name='type_id' />
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <Select Array={statusOP} name="status" required={true} FormLabel={"Status"} error={error.status} value={indata.status} onChange={inputHandler} />
                                                    </Col>
                                                    <Col md={12} className='mb-3'>
                                                        <Textareanew required={true} FormType={'text'} rows={2} FormLabel={"Description"} FormPlaceHolder={"Enter Qualification Description"} onChange={inputHandler} error={error.description} value={indata.description} name='description' />
                                                    </Col>
                                                    {fields && fields.map((e, i) => (
                                                        <Col md={6} key={i} className='mb-3'>
                                                            {e.type == "text" ?
                                                                <InputField FormType={'text'} FormLabel={e.title} value={e.value} onChange={(e) => addNewHandler(e, i)} name={e.title} />
                                                                :
                                                                <Select FormLabel={e.title} Array={e.options} value={e.value} onChange={(e) => addNewHandler(e, i)} name={e.title} />
                                                            }
                                                        </Col>
                                                    ))}
                                                    
                                                </Row>
                                                <Row className='mb-2'>
                                                    <Col md={6}>
                                                        <SharedButton type={'submit'} BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100"} />
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
                                                <Col md={6} className="mb-3">
                                                    <h6>Name</h6>
                                                    <p>{indata.trname}</p>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <h6>Type</h6>
                                                    <p>{indata.type}</p>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <h6>Status</h6>
                                                    <p>{indata.status}</p>
                                                </Col>
                                                <Col md={12} className='mb-3'>
                                                    <h6>Description</h6>
                                                    <p>{indata.description}</p>
                                                </Col>
                                                {indata && indata.add_field && indata.add_field.map((e, i) => (
                                                    <Col md={6} className="mb-3" key={i}>
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
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    )
}
