import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, Button, } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import Select from '../../../components/Select';
import { UploadFile } from '../../../components/UploadFile';
import { create_modal_account_api, getRollsAll_API } from '../../../api_services/Apiservices';
import { successAlert } from '../../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { statusArray } from '../../../helper/Helper';


export const EditAdminstratorForm = ({ setLoder, pre }) => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [rolelist, setRolelist] = useState([]);
    const [isedit, setIsedit] = useState(false);

    const [indata, setIndata] = useState({
        "first_name": "", "last_name": "",
        "start_date": "", "email": "",
        "supervisor": "", "role": "",
        "position": "", "address_1": "",
        "address_2": "", "city": "",
        "state": "", "zip_code": "",
        "term_date": "", "image": "",
        "phone_no": "", "emergency_contact_name": "",
        "emergency_contact_number": "", "status": ""
    });

    const getrolls = async () => {
        const resp = await getRollsAll_API();
        if (resp) {
            const findata = resp.data;
            const mydata = findata.map(e => ({ name: e.role, value: e._id }));
            setRolelist(mydata);
        }
    }

    useEffect(() => { getrolls(); }, []);

    useEffect(() => {
        if (pre) {
            let roleId = "";
            if (pre.role && pre.role.role) {
                roleId = pre.role && pre.role.role;
            }
            setIndata({
                "first_name": pre.first_name, "last_name": pre.last_name,
                "start_date": pre.start_date, "email": pre.email,
                "supervisor": pre.supervisor, "role": roleId,
                "position": pre.position, "address_1": pre.billing_address,
                "address_2": pre.billing_address2, "city": pre.city,
                "state": pre.state, "zip_code": pre.zip_code,
                "term_date": pre.term_date, "image": pre.image,
                "phone_no": pre.mobile_no, "emergency_contact_name": pre.emergency_contact_name,
                "emergency_contact_number": pre.emergency_contact_number, "status": pre.status
            });
        }
    }, [pre])


    const [error, setError] = useState({
        "first_name": "", "last_name": "",
        "start_date": "", "email": "",
        "supervisor": "", "role": "",
        "position": "", "address_1": "",
        "address_2": "", "city": "",
        "state": "", "zip_code": "",
        "term_date": "", "image": "",
        "phone_no": "", "emergency_contact_name": "",
        "emergency_contact_number": "", "status": ""
    });

    const handleAddField = (title, placeholder) => {
        setFields([...fields, { title, placeholder }]);
    };

    const imageHanlder = (data) => {
        const { name, value } = data;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }


    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = async (e) => {
        console.log(indata);
        e.preventDefault();
        // Validate each field
        let isValid = true;
        if (!indata.first_name) { setError(prev => ({ ...prev, "first_name": "First Name is required" })); isValid = false; }
        if (!indata.last_name) { setError(prev => ({ ...prev, "last_name": "Last Name is required" })); isValid = false; }
        if (!indata.start_date) { setError(prev => ({ ...prev, "start_date": "Start Date is required" })); isValid = false; }
        if (!indata.email) { setError(prev => ({ ...prev, "email": "Email is required" })); isValid = false; }
        if (!indata.supervisor) { setError(prev => ({ ...prev, "supervisor": "Supervisor is required" })); isValid = false; }
        if (!indata.role) { setError(prev => ({ ...prev, "role": "Role is required" })); isValid = false; }
        if (!indata.position) { setError(prev => ({ ...prev, "position": "Position is required" })); isValid = false; }
        if (!indata.address_1) { setError(prev => ({ ...prev, "address_1": "Address 1 is required" })); isValid = false; }
        if (!indata.address_2) { setError(prev => ({ ...prev, "address_2": "Address 2 is required" })); isValid = false; }
        if (!indata.city) { setError(prev => ({ ...prev, "city": "City is required" })); isValid = false; }
        if (!indata.state) { setError(prev => ({ ...prev, "state": "State is required" })); isValid = false; }
        if (!indata.term_date) { setError(prev => ({ ...prev, "term_date": "Term Date is required" })); isValid = false; }
        if (!indata.zip_code) { setError(prev => ({ ...prev, "zip_code": "Zip Code is required" })); isValid = false; }
        if (!indata.phone_no) { setError(prev => ({ ...prev, "phone_no": "Phone Number is required" })); isValid = false; }
        if (!indata.emergency_contact_name) { setError(prev => ({ ...prev, "emergency_contact_name": "Emergency Contact Name is required" })); isValid = false; }
        if (!indata.emergency_contact_number) { setError(prev => ({ ...prev, "emergency_contact_number": "Emergency Contact Number is required" })); isValid = false; }
        if (!indata.status) { setError(prev => ({ ...prev, "status": "Status is required" })); isValid = false; }
        // If all fields are valid, submit the form
        if (isValid) {

            setLoder(true);

            const formData = new FormData();
            formData.append('checkUserType', 2);
            formData.append('create_by_id', localStorage.getItem('id'));
            formData.append('first_name', indata.first_name);
            formData.append('last_name', indata.last_name);
            formData.append('start_date', indata.start_date);
            formData.append('email', indata.email);
            formData.append('supervisor', indata.supervisor);
            formData.append('role', indata.role);
            formData.append('position', indata.position);
            formData.append('billing_address', indata.address_1);
            formData.append('billing_addres2', indata.address_2);
            formData.append('city', indata.city);
            formData.append('state', indata.state);
            formData.append('zip_code', indata.zip_code);
            formData.append('term_date', indata.term_date);
            formData.append('image', indata.image);
            formData.append('mobile_no', indata.phone_no);
            formData.append('emergency_contact_name', indata.emergency_contact_name);
            formData.append('emergency_contact_number', indata.emergency_contact_number);
            formData.append('status', indata.status);
            formData.append('add_field', fields);

            const resp = await create_modal_account_api(formData);
            if (resp && resp.success) {
                e.target.reset();
                setFields([]);
                setLoder(false);
                successAlert(resp.message);
                navigate("/adminstratorprofilelist");
            }
            setLoder(false);
        }
    };

    console.log(indata)



    return (
        <>
            {isedit ?
                <>
                    <div className='CreateAccountForm'>
                        <Container>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={2}>
                                        <img src={indata.image ? indata.image : 'assets/images/avatar.png'} alt="Profile Preview" className='img-fluid' style={{
                                            height: '130px'
                                        }} />
                                    </Col>
                                    <Col md={2}>
                                        <UploadFile
                                            FormLabel="Upload Profile"
                                            name="image"
                                            controlId="formProfilePic"
                                            onChange={imageHanlder}
                                        />
                                    </Col>

                                </Row>
                                <Row className='mb-2'>
                                    <Col md={4}>
                                        <InputField FormType={'text'} FormLabel={"First Name"} onChange={inputHandler} error={error.first_name} value={indata.first_name} name='first_name' FormPlaceHolder={"Jenny"} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'text'} FormLabel={"Last Name"} onChange={inputHandler} error={error.last_name} value={indata.last_name} name='last_name' FormPlaceHolder={"Wilson"} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'date'} FormLabel={"Start Date"} onChange={inputHandler} error={error.start_date} value={indata.start_date} name='start_date' FormPlaceHolder={"DD/MM/YYYY"} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'email'} FormLabel={"Email"} onChange={inputHandler} readOnly={true} error={error.email} value={indata.email} name='email' FormPlaceHolder={"example@gmail.com"} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'date'} FormLabel={"Term Date"} onChange={inputHandler} error={error.term_date} value={indata.term_date} name='term_date' FormPlaceHolder={"DD/MM/YYYY"} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'text'} FormLabel={"Supervisor"} onChange={inputHandler} error={error.supervisor} value={indata.supervisor} name='supervisor' FormPlaceHolder={"Enter Supervisor"} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'text'} FormLabel={"Role"} readOnly={true} onChange={inputHandler} value={indata.role} name={'role'} />
                                    </Col>
                                    {/* <Select FormLabel='Role' Array={rolelist} FormPlaceHolder='Adminstrator Staff' onChange={inputHandler} error={error.role} value={indata.role} name='role' /> */}
                                    {/* </Col> */}
                                    <Col md={4}>
                                        <InputField FormType={'text'} FormLabel={"Position"} onChange={inputHandler} error={error.position} value={indata.position} name='position' FormPlaceHolder={"Enter Position"} />
                                        {/* <Select FormLabel='Position' FormPlaceHolder='Software Employee' /> */}
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'text'} FormLabel={"Address 1"} onChange={inputHandler} error={error.address_1} value={indata.address_1} name='address_1' FormPlaceHolder={"scheme 24 - Vijay Nagar"} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'text'} FormLabel={"Address 2"} onChange={inputHandler} error={error.address_2} value={indata.address_2} name='address_2' FormPlaceHolder={"scheme 24 - Vijay Nagar"} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'text'} FormLabel={"City"} onChange={inputHandler} error={error.city} value={indata.city} name='city' FormPlaceHolder={"Indore"} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'text'} FormLabel={"State"} onChange={inputHandler} error={error.state} value={indata.state} name='state' FormPlaceHolder={"Madhya Pradesh"} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'tel'} FormLabel={"Zip Code"} max={6} onChange={inputHandler} error={error.zip_code} value={indata.zip_code} name='zip_code' FormPlaceHolder={"452001"} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'tel'} FormLabel={"Phone No"} max='10' onChange={inputHandler} error={error.phone_no} value={indata.phone_no} name='phone_no' FormPlaceHolder={"8989898989"} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'text'} FormLabel={"Emergency Contact Name"} onChange={inputHandler} error={error.emergency_contact_name} value={indata.emergency_contact_name} name='emergency_contact_name' FormPlaceHolder={"Contact Name"} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'tel'} FormLabel={"Emergency Contact Number"} max='10' onChange={inputHandler} error={error.emergency_contact_number} value={indata.emergency_contact_number} name="emergency_contact_number" FormPlaceHolder={"Contact Number"} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField FormType={'text'} FormLabel={"Status"} readOnly={true} value={indata.status} name="status" />
                                        {/* <Select FormLabel='Status' Array={statusArray} FormPlaceHolder='Status' onChange={inputHandler} error={error.status} value={indata.status} name='status' /> */}
                                    </Col>                                  
                                </Row>
                                <Row className='mb-2'>
                                    <Col md={4}>
                                        <SharedButton type={'submit'} BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100"} />
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </div>
                </>
                :

                <>
                    <div className='CreateAccountForm'>
                        <Container>
                            <Row className="my-3">
                                <Col md={12} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <img src={indata.image ? indata.image : 'assets/images/avatar.png'} alt="Profile Preview" className='img-fluid' style={{
                                        height: '100px'
                                    }} />
                                    <Button variant="warning" size="sm"
                                        onClick={() => setIsedit(true)} style={{
                                            background: '#FEF2F2',
                                            color: '#991B1B',
                                            borderColor: '#FEF2F2',
                                            fontWeight: '500'
                                        }}>Edit
                                    </Button>
                                </Col>
                            </Row>
                            <Row className='mb-2'>
                                <Col md={4}>
                                    <h6>First Name</h6>
                                    <p>{indata.first_name}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Last Name</h6>
                                    <p>{indata.last_name}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Start Date</h6>
                                    <p>{indata.start_date}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Email</h6>
                                    <p>{indata.email}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Term Date</h6>
                                    <p>{indata.term_date}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Supervisor</h6>
                                    <p>{indata.supervisor}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Role</h6>
                                    <p>{indata.role}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Position</h6>
                                    <p>{indata.position}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Address 1</h6>
                                    <p>{indata.address_1}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Address 2</h6>
                                    <p>{indata.address_2}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>City</h6>
                                    <p>{indata.city}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>State</h6>
                                    <p>{indata.state}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Zip Code</h6>
                                    <p>{indata.zip_code}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Phone No</h6>
                                    <p>{indata.phone_no}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Emergency Contact Name</h6>
                                    <p>{indata.emergency_contact_name}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Emergency Contact Number</h6>
                                    <p>{indata.emergency_contact_number}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Status</h6>
                                    <p>{indata.status}</p>
                                </Col>
                                {fields.map((field, index) => (
                                    <Col md={4} key={index}>
                                        <InputField FormType={'text'} FormLabel={field.title} FormPlaceHolder={field.placeholder} />
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </div>
                    <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
                </>


            }
        </>
    )
}
