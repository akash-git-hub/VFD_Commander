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
import { updateApparatus_API } from '../../../api_services/Apiservices';
import Select from '../../../components/Select';
import { statusArray } from '../../../helper/Helper';
import moment from 'moment';



export default function ApparatusInfoDetails() {
    const [indata, setIndata] = useState({ "apparatus_type": "", "name": "", "srdate": "", "rpdate": "", "cost": "", "status": "", "description": "" });
    const [error, setError] = useState({ "apparatus_type": "", "name": "", "srdate": "", "rpdate": "", "cost": "", "status": "", "description": "" });
    const [isedit, setIsedit] = useState(false);
    const [isdelete, setIsdelete] = useState(false);
    const [loder, setLoder] = useState(false);
    const location = useLocation();
    const [fields, setFields] = useState([]);
    const navigate = useNavigate();

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
            if (data) {
                setIndata({ "id": data._id, "apparatus_type": data.apparatus_type, "name": data.name, "srdate": data.service_date, "rpdate": data.replace_date, "cost": data.cost, "status": data.status, "description": data.description });

                setFields(data.add_field);
            }
        }
    }, [location])


    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (isValid) {
            
            setLoder(true);
            const finaldata = {
                "id": indata.id,
                "name": indata.name,
                "apparatus_type": indata.apparatus_type,
                "service_date": indata.srdate,
                "replace_date": indata.rpdate,
                "cost": indata.cost,
                "status": indata.status,
                "description": indata.description
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
            title:"Changes have been made",
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
                            <Headings MainHeading={"Inventory"} HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />

                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={"home"}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Apparatus Info">
                                        <div className='RoleAdminstrator'>
                                            <Container fluid>
                                                <Row>
                                                    <Col md={12}>
                                                        {isedit ?
                                                            <>
                                                                <div className='CreateAccountForm'>
                                                                    <Container fluid>
                                                                        <Row style={{ justifyContent: 'end' }}>
                                                                            <Col md={1}>
                                                                                <Button variant="danger" size="sm"
                                                                                    onClick={cancelHandler} >Cancel
                                                                                </Button>
                                                                            </Col>
                                                                        </Row>
                                                                        <Form onSubmit={submitHandler}>
                                                                            <Row className='mb-2'>
                                                                                <Col md={6}>
                                                                                    <InputField FormType={'text'} FormLabel={"Name"} FormPlaceHolder={"Enter Apparatus Name"} value={indata.name} name='name' error={error.name} onChange={inputHandler} />
                                                                                </Col>
                                                                                <Col md={6}>
                                                                                    <InputField FormType={'text'} FormLabel={"Type"} FormPlaceHolder={"Enter Apparatus Type"} value={indata.apparatus_type} name='apparatus_type' error={error.apparatus_type} onChange={inputHandler} />
                                                                                </Col>
                                                                                <Col md={6}>
                                                                                    <InputField FormType={'date'} FormLabel={"Service Date"} FormPlaceHolder={"Enter Service Date"} value={indata.srdate} name='srdate' error={error.srdate} onChange={inputHandler} />
                                                                                </Col>
                                                                                <Col md={6}>
                                                                                    <InputField FormType={'date'} FormLabel={"Replacement Date"} FormPlaceHolder={"Replacement Date"} value={indata.rpdate} name='rpdate' error={error.rpdate} onChange={inputHandler} />
                                                                                </Col>
                                                                                <Col md={6}>
                                                                                    <InputField FormType={'text'} FormLabel={"Cost"} FormPlaceHolder={"Enter Item Cost"} name='cost' value={indata.cost} error={error.cost} onChange={inputHandler} />
                                                                                </Col>
                                                                                <Col md={6}>
                                                                                    <Select FormLabel='Status' FormPlaceHolder='Status' Array={statusArray} name='status' value={indata.status} error={error.status} onChange={inputHandler} />
                                                                                </Col>
                                                                                <Col md={12}>
                                                                                    <Textareanew FormType={'text'} FormLabel={"Description"} FormPlaceHolder={"Description"} value={indata.description} error={error.description} name='description' onChange={inputHandler} />
                                                                                </Col>
                                                                            </Row>
                                                                            <Row>
                                                                                <Col md={6}>
                                                                                    <SharedButton BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100 mt-4"} />
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
                                                                                <p>{indata.name}</p>
                                                                            </Col>
                                                                            <Col md={12} className='mb-2'>
                                                                                <h6>Type</h6>
                                                                                <p>{indata.apparatus_type}</p>
                                                                            </Col>
                                                                            <Col md={12} className='mb-2'>
                                                                                <h6>Service Date</h6>
                                                                                <p>{moment.unix(indata.srdate).format("MM-DD-YYYY")}</p>
                                                                            </Col>
                                                                            <Col md={12} className='mb-2'>
                                                                                <h6>Replacement Date</h6>
                                                                                <p>{moment.unix(indata.rpdate).format("MM-DD-YYYY")}</p>
                                                                            </Col>
                                                                            <Col md={12} className='mb-2'>
                                                                                <h6>Cost</h6>
                                                                                <p>$ {indata.cost}</p>
                                                                            </Col>
                                                                            <Col md={12} className='mb-2'>
                                                                                <h6>Status</h6>
                                                                                <p>{indata.status}</p>
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
