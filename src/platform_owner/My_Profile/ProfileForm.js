import React, { useState } from 'react'
import { Col, Container, Row, Form, Button, } from 'react-bootstrap';
import { InputField } from '../../components/InputField';
import { SharedButton } from '../../components/Button';
import { AddFieldModal } from '../../commonpages/AddFieldModal';
import { UploadFile } from '../../components/UploadFile';
import moment from 'moment';


export const ProfileForm = ({ usedata }) => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isedit, setIsedit] = useState(false);

    const handleAddField = (title, placeholder) => {
        setFields([...fields, { title, placeholder }]);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const [indata, setIndata] = useState({ "image": "", "preimage": "" });
    const [error, setError] = useState({ "image": "", "preimage": "" });

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


    return (
        <>
            {isedit ?
                <div className='CreateAccountForm'>
                    <Container>
                        <Form>
                            <Row style={{ justifyContent: "space-between" }} className='mb-3 mt-2'>
                                <Col md={6}>
                                    <Row>
                                        <Col md={6}>
                                            <img src={usedata.preimage ? usedata.preimage : 'assets/images/avatar.png'} alt="Profile Preview" className='img-fluid' style={{
                                                height: '130px'
                                            }} />
                                        </Col>
                                        <Col md={6}>
                                            <UploadFile
                                                FormLabel="Upload Profile"
                                                name="image"
                                                controlId="formProfilePic"
                                                onChange={imageHanlder}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={1}>
                                    <Button variant="warning" size="sm"
                                        onClick={() => setIsedit(false)} style={{
                                            background: '#FEF2F2',
                                            color: '#991B1B',
                                            borderColor: '#FEF2F2',
                                            fontWeight: '500'
                                        }}>Not Update
                                    </Button>
                                </Col>
                            </Row>
                            <Row className='mb-2 mt-5'>
                                <Col md={6} className='mb-2'>
                                    <InputField FormType={'text'} FormLabel={"First Name"} FormPlaceHolder={"Jenny"} />
                                </Col>
                                <Col md={6} className='mb-2'>
                                    <InputField FormType={'text'} FormLabel={"Last Name"} FormPlaceHolder={"Wilson"} />
                                </Col>
                                <Col md={6} className='mb-2'>
                                    <InputField FormType={'email'} FormLabel={"Email"} FormPlaceHolder={"example@gmail.com"} />
                                </Col>
                                <Col md={6} className='mb-2'>
                                    <InputField FormType={'daTextte'} FormLabel={"UserName"} FormPlaceHolder={"username"} />
                                </Col>
                                <Col md={6} className='mb-2'>
                                    <InputField FormType={'text'} FormLabel={"Password"} FormPlaceHolder={"Enter Password"} />
                                </Col>
                                <Col md={6} className='mb-2'>
                                    <InputField FormType={'text'} FormLabel={"Address Information"} FormPlaceHolder={"Enter Address Information"} />
                                </Col>
                                <Col md={6} className='mb-2'>
                                    <InputField FormType={'text'} FormLabel={"Contact Information "} FormPlaceHolder={"Contact Information"} />
                                </Col>
                                {fields.map((field, index) => (
                                    <Col md={5} key={index}>
                                        <InputField FormType={'text'} FormLabel={field.title} FormPlaceHolder={field.placeholder} />
                                    </Col>
                                ))}
                                <Col md={6} className='mb-2'>
                                    <SharedButton BtnLabel={"Add Field"} BtnVariant={'outline-dark'} BtnClass={"w-100 AddFieldBtn"} onClick={handleShowModal} />
                                </Col>
                            </Row>

                            <Row className='mb-2'>
                                <Col md={5}>
                                    <SharedButton BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100"} />
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                    <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
                </div>
                :

                <div className='CreateAccountForm'>
                    <Container>
                        <Row className="my-3 mb-5" style={{ justifyContent: "space-between" }}>
                            <Col md={6}>
                                <img src={usedata.preimage ? usedata.preimage : 'assets/images/avatar.png'} alt="Profile Preview" className='img-fluid' style={{
                                    height: '100px'
                                }} />
                            </Col>
                            <Col md={1}>
                                {/* <Button variant="warning" size="sm"
                                    onClick={() => setIsedit(true)} style={{
                                        background: '#FEF2F2',
                                        color: '#991B1B',
                                        borderColor: '#FEF2F2',
                                        fontWeight: '500'
                                    }}>Edit
                                </Button> */}
                            </Col>
                        </Row>
                        <Row className='mb-5 mt-3'>
                            <Col md={4} className='mb-2'>
                                <h6>Account Name</h6>
                                <p>{usedata && usedata.account_name}</p>
                            </Col>
                            <Col md={4} className='mb-2'>
                                <h6>Account ID</h6>
                                <p>{usedata && usedata._id}</p>
                            </Col>
                            <Col md={4} className='mb-2'>
                                <h6>Email</h6>
                                <p>{usedata && usedata.email}</p>
                            </Col>
                            <Col md={4} className='mb-2'>
                                <h6>Firat Name</h6>
                                <p>{usedata && usedata.first_name}</p>
                            </Col>
                            <Col md={4} className='mb-2'>
                                <h6>Last Name</h6>
                                <p>{usedata && usedata.last_name}</p>
                            </Col>
                            <Col md={4} className='mb-2'>
                                <h6>Mobile No</h6>
                                <p>{usedata && usedata.mobile_no}</p>
                            </Col>
                            <Col md={4} className='mb-2'>
                                <h6>Incentive Information</h6>
                                <p>{usedata && usedata.incentive_information}</p>
                            </Col>
                            <Col md={4} className='mb-2'>
                                <h6>Renewal Date</h6>
                                <p>{usedata && moment.unix(usedata.renewal_date).format("MM-DD-YYYY")}</p>
                            </Col>
                            <Col md={4} className='mb-2'>
                                <h6>Billing Address 1</h6>
                                <p>{usedata && usedata.billing_address}</p>
                            </Col>
                            <Col md={4} className='mb-2'>
                                <h6>Billing Address 2</h6>
                                <p>{usedata && usedata.billing_addres2}</p>
                            </Col>
                            <Col md={4} className='mb-2'>
                                <h6>State</h6>
                                <p>{usedata && usedata.state}</p>
                            </Col>
                            <Col md={4} className='mb-2'>
                                <h6>City</h6>
                                <p>{usedata && usedata.city}</p>
                            </Col>
                            <Col md={4} className='mb-2'>
                                <h6>Zip Code</h6>
                                <p>{usedata && usedata.zip_code}</p>
                            </Col>
                        </Row>
                    </Container>
                </div>

            }

        </>
    )
}
