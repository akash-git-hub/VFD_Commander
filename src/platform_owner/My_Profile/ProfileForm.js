import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, Button, } from 'react-bootstrap';
import { InputField } from '../../components/InputField';
import { SharedButton } from '../../components/Button';
import { AddFieldModal } from '../../commonpages/AddFieldModal';
import { UploadFile } from '../../components/UploadFile';
import moment from 'moment';
import { TbEdit } from 'react-icons/tb';
import { update_modal_account_api } from '../../api_services/Apiservices';
import { successAlert } from '../../components/Alert';
import Select from '../../components/Select';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export const ProfileForm = ({ usedata ,setLoder,getmydata}) => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isedit, setIsedit] = useState(false);
    const navigate = useNavigate();


    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    // const [indata, setIndata] = useState({ "image": "", "preimage": "", "account_name": "", "first_name": "", "last_name": "" });
    // const [error, setError] = useState({ "image": "", "preimage": "" });


    const [indata, setIndata] = useState(
        {
          "id": "", "time_formate": "", "time_zone": "", "incentive_information": "",
          "renewal_date": "", "subscription_amount": "", "subscription_name": "",
          "email": "", "mobile_no": "", "zip_code": "", "state": "",
          "city": "", "billing_addres2": "", "billing_address": "", "account_name": "",
          "first_name": "", "last_name": "","image": "", "preimage":""
        }
      );
    
      const [error, setError] = useState(
        {
          "time_formate": "", "time_zone": "", "incentive_information": "",
          "renewal_date": "", "subscription_amount": "", "subscription_name": "",
          "email": "", "mobile_no": "", "zip_code": "", "state": "",
          "city": "", "billing_addres2": "", "billing_address": "", "account_name": "",
          "first_name": "", "last_name": "","image": "", "preimage":""
        }
      );

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

    useEffect(() => {
        if (usedata) {
          setIndata((pre) => ({
            ...pre,
            "id": usedata._id,
            "time_formate": usedata.time_formate, "time_zone": usedata.time_zone, "incentive_information": usedata.incentive_information,
            "renewal_date": usedata.renewal_date, "subscription_amount": usedata.subscription_amount, "subscription_name": "",
            "email": usedata.email, "mobile_no": usedata.mobile_no, "zip_code": usedata.zip_code, "state": usedata.state,
            "city": usedata.city, "billing_addres2": usedata.billing_addres2, "billing_address": usedata.billing_address, "account_name": usedata.account_name, "first_name": usedata.first_name, "last_name": usedata.last_name, "add_field": usedata.add_field,
            "preimage": usedata.image,
          }));
          if (usedata && usedata.add_field) {
            setFields(usedata.add_field);
          }
          if (usedata && usedata.subscription_id && usedata.subscription_id.name) {
            setIndata((pre) => ({ ...pre, "subscription_name": usedata.subscription_id.name }));
          }
        }
      }, [usedata]);

    const addNewHandler = (e) => {
        const { name, value } = e.target;
        const field = [...fields];
        const index = field.findIndex((item) => item.title === name);
        if (index !== -1) {
          field[index] = {
            ...field[index],
            value: value
          };
        }
        setFields(field);
      }

      const onChangeHandler = (e) => {
        const { name, value } = e.target;
    
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
      }

    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = 1;
        if (!indata.account_name) { setError((e) => ({ ...e, "account_name": "* Account name is required" })); isValid = 2; }
        if (!indata.first_name) { setError((e) => ({ ...e, "first_name": "* First name is required" })); isValid = 3; }
        if (!indata.last_name) { setError((e) => ({ ...e, "last_name": "* Last name is required" })); isValid = 4; }
        if (!indata.time_formate) { setError((e) => ({ ...e, "time_formate": "* Time format is required" })); isValid = 5; }
        // if (!indata.time_zone) { setError((e) => ({ ...e, "time_zone": "* Time zone is required" })); isValid = 6; }
        if (!indata.incentive_information) { setError((e) => ({ ...e, "incentive_information": "* Incentive information is required" })); isValid = 7; }
        if (!indata.renewal_date) { setError((e) => ({ ...e, "renewal_date": "* Renewal date is required" })); isValid = 8; }
        if (!indata.mobile_no) { setError((e) => ({ ...e, "mobile_no": "* Contact number is required" })); isValid = 9; }
        if (!indata.zip_code) { setError((e) => ({ ...e, "zip_code": "* ZIP code is required" })); isValid = 10; }
        if (!indata.state) { setError((e) => ({ ...e, "state": "* State is required" })); isValid = 11; }
        if (!indata.city) { setError((e) => ({ ...e, "city": "* City is required" })); isValid = 12; }
        if (!indata.billing_addres2) { setError((e) => ({ ...e, "billing_addres2": "* Billing address line 2 is required" })); isValid = 13; }
        if (!indata.billing_address) { setError((e) => ({ ...e, "billing_address": "* Billing address line 1 is required" })); isValid = 14; }
    
        if (isValid === 1) {
          setLoder(true);
    
          const formData = new FormData();
    
          formData.append('id', indata.id);
          formData.append('first_name', indata.first_name);
          formData.append('last_name', indata.last_name);
          formData.append('account_name', indata.account_name);
          formData.append('mobile_no', indata.mobile_no);
          formData.append('incentive_information', indata.incentive_information);
          formData.append('zip_code', indata.zip_code);
          formData.append('state', indata.state);
          formData.append('city', indata.city);
          formData.append('billing_address', indata.billing_address);
          formData.append('billing_addres2', indata.billing_addres2);
          formData.append('image', indata.image);
    
          const resp = await update_modal_account_api(formData);
          if (resp && resp.success) {
            e.target.reset();
            getmydata();
            setIsedit(false)
            // get_account_list_byid(indata.id);
            setLoder(false);
            successAlert(resp.message);
          }
          setLoder(false);
        }
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
            {isedit ?
                <div className='CreateAccountForm'>
                    <Container>
                        <Form onSubmit={submitHandler}>
                            <Row style={{ justifyContent: "space-between" }} className='mb-3 mt-2'>
                                <Col md={6}>
                                    <Row>
                                        <Col md={6}>
                                            <img src={indata.preimage ? indata.preimage : 'assets/images/avatar.png'} alt="Profile Preview" className='img-fluid' style={{
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
                                    <Button variant="danger" size="sm"
                                        onClick={cancelHandler} style={{
                                            fontWeight: '500'
                                        }}>Cancel
                                    </Button>
                                </Col>
                            </Row>

                            <Row className='mb-2'>
                                <Col md={4} className={"mb-2"}>
                                    <InputField FormType={'text'} FormLabel={"Account Name"} value={indata.account_name} name="account_name" error={error.account_name} onChange={onChangeHandler} FormPlaceHolder={"Futurristic"} />
                                </Col>
                                <Col md={4} className={"mb-2"}>
                                    <InputField FormType={'text'} FormLabel={"First Name"} value={indata.first_name} name="first_name" error={error.first_name} onChange={onChangeHandler} FormPlaceHolder={"Jenny"} />
                                </Col>
                                <Col md={4} className={"mb-2"}>
                                    <InputField FormType={'text'} FormLabel={"Last Name"} value={indata.last_name} name="last_name" error={error.last_name} onChange={onChangeHandler} FormPlaceHolder={"Wilson"} />
                                </Col>
                                <Col md={4} className={"mb-2"}>
                                    <InputField FormType={'text'} FormLabel={"Email"} readOnly={true} value={indata.email} name="email" error={error.email} onChange={onChangeHandler} />
                                </Col>
                                <Col md={4} className={"mb-2"}>
                                    <InputField FormType={'tel'} FormLabel={"Mobile No"} max={10} value={indata.mobile_no} name="mobile_no" error={error.mobile_no} onChange={onChangeHandler} />
                                </Col>
                                <Col md={4} className={"mb-2"}>
                                    <InputField FormType={'text'} FormLabel={"Subscription Name"} readOnly={true} value={indata.subscription_name} name="subscription_name" />
                                </Col>
                                <Col md={4} className={"mb-2"}>
                                    <InputField FormType={'tel'} readOnly FormLabel={"Subscription Amount"} value={indata.subscription_amount} name="subscription_amount" />
                                </Col>                             
                                <Col md={4} className={"mb-2"}>
                                    <InputField FormType={'text'} FormLabel={"Billing Address 1"} value={indata.billing_address} name="billing_address" error={error.billing_address} onChange={onChangeHandler} />
                                </Col>
                                <Col md={4} className={"mb-2"}>
                                    <InputField FormType={'text'} FormLabel={"Billing Address 2"} value={indata.billing_addres2} name="billing_addres2" error={error.billing_addres2} onChange={onChangeHandler} />
                                </Col>
                                <Col md={4} className={"mb-2"}>
                                    <InputField FormType={'text'} FormLabel={"State"} value={indata.state} name="state" error={error.state} onChange={onChangeHandler} />
                                </Col>
                                <Col md={4} className={"mb-2"}>
                                    <InputField FormType={'text'} FormLabel={"City"} value={indata.city} name="city" error={error.city} onChange={onChangeHandler} />
                                </Col>
                                <Col md={4} className={"mb-2"}>
                                    <InputField FormType={'text'} FormLabel={"Zip Code"} value={indata.zip_code} name="zip_code" error={error.zip_code} onChange={onChangeHandler} />
                                </Col>

                                <Col md={4} className={"mb-2"}>
                                    <InputField FormType={'text'} FormLabel={"Incentive Information"} value={indata.incentive_information} name="incentive_information" error={error.incentive_information} onChange={onChangeHandler} FormPlaceHolder={"Reward Details"} />
                                </Col>
                                {/* <Col md={4} className={"mb-2"}>
                                    <InputField FormType={'text'} FormLabel={"Time Zone"} readOnly={true} value={indata.time_zone} name="time_zone" error={error.time_zone} onChange={onChangeHandler} />
                                </Col> */}
                                {/* <Col md={4} className='mb-2'>
                                    <Select Array={timeFormateArray} name="time_formate" FormLabel={"Time Display"} error={error.time_formate} value={indata.time_formate} onChange={onChangeHandler} />
                                </Col> */}
                            </Row>


                            <Row className='mb-2'>
                                <Col md={4} className={"mb-2"}>
                                    <SharedButton type={"submit"} BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100"} />
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </div>
                :

                <div className='CreateAccountForm'>
                    <Container>
                        <Row className="my-3 mb-5" style={{ justifyContent: "space-between" }}>
                            <Col md={6}>
                                <img src={usedata && usedata.image ? usedata.image : 'assets/images/avatar.png'} alt="Profile Preview" className='img-fluid' style={{
                                    height: '100px'
                                }} />
                            </Col>
                            <Col md={1}>
                                <Button variant="success" size="sm" className='m-2'
                                    onClick={() => setIsedit(true)} style={{
                                        fontWeight: '500',

                                    }}><TbEdit />
                                </Button>
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
