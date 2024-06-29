import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import Select from '../../../components/Select';
import { TimezoneList, timeFormateArray } from '../../../helper/Helper';
import { SelectDropdown } from '../../../components/SelectDropdown';
import { create_modal_account_api, getSubscriptionPlan_api } from '../../../api_services/Apiservices';
import { errorAlert, successAlert } from '../../../components/Alert';
// import { Timezoneselectdropdown } from '../../../components/Timezoneselectdropdown';
import { Timeformatdropdown } from '../../../components/Timeformatdropdown';
import { useNavigate } from 'react-router-dom';


export const CreateForm = ({ setLoder }) => {
  const [fields, setFields] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [timezones, setTimezones] = useState([]);
  const [planList, setPlanList] = useState([]);
  const [fullplandata, setFullplandata] = useState([]);
  const [timeFormate, setTimeFormate] = useState([{ 'label': '12-Hours', "value": 'hh:mm:ss A' }, { 'label': '24-Hours', "value": 'HH:mm:ss' }]);

 
  const navigate = useNavigate();

  const [indata, setIndata] = useState(
    {
      "time_formate": "", "time_zone": "", "incentive_information": "",
      "renewal_date": "", "subscription_amount": "", "subscription_name": "",
      "email": "", "contact_number": "", "zip_code": "", "state": "",
      "city": "", "billing_addres2": "", "billing_address": "", "account_name": "",
      "first_name": "", "last_name": "",
    }
  );



  const handleAddField = (title, placeholder) => {
    if (!title) { errorAlert("Please Enter Title"); setShowModal(true); return }
    setFields([...fields, { title, placeholder }]);
  };
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [error, setError] = useState(
    {
      "time_formate": "", "time_zone": "", "incentive_information": "",
      "renewal_date": "", "subscription_amount": "", "subscription_name": "",
      "email": "", "contact_number": "", "zip_code": "", "state": "",
      "city": "", "billing_addres2": "", "billing_address": "", "account_name": "",
      "first_name": "", "last_name": "",
    }
  );


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
    if (name === "subscription_name") {
      const resp = fullplandata.filter((e) => e._id === value);
      const price = resp[0].pricing;
      setIndata((pre) => ({ ...pre, "subscription_amount": price }));
    }
    setIndata((pre) => ({ ...pre, [name]: value }));
    setError((pre) => ({ ...pre, [name]: "" }));
  }
  const onSelectHandler = (indata) => {
    const name = indata.name;
    const value = indata.value;

    if (name) {
      setIndata((pre) => ({ ...pre, [name]: value }));
      setError((pre) => ({ ...pre, [name]: "" }));
    }
  }


  const get_plan = async () => {
    setLoder(true);
    const resp = await getSubscriptionPlan_api();
    if (resp && resp.data) {
      setLoder(false);
      const data = resp.data;
      setFullplandata(data);
      const aaray = [];
      if (data && data.length > 0) {
        data.map((e) => (aaray.push({ "name": e.name, "value": e._id })))
      }

      setPlanList(aaray);
    } else { setPlanList([]); setLoder(false); }
    setLoder(false);
  }
  useEffect(() => {
    const tzList = TimezoneList();
    const array = [];
    if (tzList && tzList.length > 0) {
      // tzList.map((e) => (array.push({ label: e, value: e })))
      tzList.map((e) => (array.push({ name: e, value: e })))
    }
    setTimezones(array);
    get_plan();
  }, []);


  const submitHandler = async (e) => {
    e.preventDefault();
    let isValid = 1;
    if (!indata.email) { setError((e) => ({ ...e, "email": "* Email is required" })); isValid = 2; }
    if (!indata.account_name) { setError((e) => ({ ...e, "account_name": "* Account name is required" })); isValid = 2; }
    if (!indata.first_name) { setError((e) => ({ ...e, "first_name": "* First name is required" })); isValid = 2; }
    if (!indata.last_name) { setError((e) => ({ ...e, "last_name": "* Last name is required" })); isValid = 2; }
    if (!indata.time_formate) { setError((e) => ({ ...e, "time_formate": "* Time format is required" })); isValid = 2; }
    if (!indata.incentive_information) { setError((e) => ({ ...e, "incentive_information": "* Incentive information is required" })); isValid = 2; }
    if (!indata.renewal_date) { setError((e) => ({ ...e, "renewal_date": "* Renewal date is required" })); isValid = 2; }
    if (!indata.subscription_amount) { setError((e) => ({ ...e, "subscription_amount": "* Subscription amount is required" })); isValid = 2; }
    if (!indata.subscription_name) { setError((e) => ({ ...e, "subscription_name": "* Subscription name is required" })); isValid = 2; }
    if (!indata.contact_number) { setError((e) => ({ ...e, "contact_number": "* Contact number is required" })); isValid = 2; }
    if (!indata.zip_code) { setError((e) => ({ ...e, "zip_code": "* ZIP code is required" })); isValid = 2; }
    if (!indata.state) { setError((e) => ({ ...e, "state": "* State is required" })); isValid = 2; }
    if (!indata.city) { setError((e) => ({ ...e, "city": "* City is required" })); isValid = 2; }
    if (!indata.billing_addres2) { setError((e) => ({ ...e, "billing_addres2": "* Billing address line 2 is required" })); isValid = 2; }
    if (!indata.billing_address) { setError((e) => ({ ...e, "billing_address": "* Billing address line 1 is required" })); isValid = 2; }

    if (isValid === 1) {
      setLoder(true);
      const formData = new FormData();

      formData.append('checkUserType', 1);
      formData.append('email', indata.email);
      formData.append('create_by_id', "super_admin");
      formData.append('first_name', indata.first_name);
      formData.append('last_name', indata.last_name);
      formData.append('account_name', indata.account_name);
      formData.append('subscription_id', indata.subscription_name);
      formData.append('mobile_no', indata.contact_number);
      formData.append('time_zone', indata.time_zone);
      formData.append('time_formate', indata.time_formate);
      formData.append('incentive_information', indata.incentive_information);
      formData.append('renewal_date', indata.renewal_date);
      formData.append('subscription_amount', indata.subscription_amount);
      formData.append('zip_code', indata.zip_code);
      formData.append('state', indata.state);
      formData.append('city', indata.city);
      formData.append('billing_address', indata.billing_address);
      formData.append('billing_addres2', indata.billing_addres2);
      formData.append('add_field', JSON.stringify(fields));

      const resp = await create_modal_account_api(formData);
      if (resp && resp.success) {
        e.target.reset();
        setIndata([]);
        setFields([]);
        setLoder(false);
        successAlert(resp.message);
        navigate("/accountmodule");
      }
      setLoder(false);
    }
  }

  return (
    <>
      <div className='CreateAccountForm'>
        <Container>
          <Form onSubmit={submitHandler}>
            <Row className='mb-2'>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"Account Name"} name="account_name" error={error.account_name} onChange={onChangeHandler} />
              </Col>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"First Name"}  name="first_name" error={error.first_name} onChange={onChangeHandler} />
              </Col>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"Last Name"} name='last_name' error={error.last_name} onChange={onChangeHandler} />
              </Col>
            </Row>
            <Row className='mb-2'>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"Email"} name='email' error={error.email} onChange={onChangeHandler} />
              </Col>
              <Col md={4}>
                <InputField FormType={'tel'} FormLabel={"Mobile No"} max={10} name='contact_number' error={error.contact_number} onChange={onChangeHandler} />
              </Col>
              <Col md={4}>
                <Select Array={planList} name="subscription_name" FormLabel={"Subscription Name"} error={error.subscription_name} value={indata.subscription_name} onChange={onChangeHandler} />
              </Col>
            </Row>
            <Row className='mb-2'>
              <Col md={4}>
                <InputField FormType={'number'} FormLabel={"Subscription Amount"} value={indata.subscription_amount} error={error.subscription_amount} name='subscription_amount' onChange={onChangeHandler} readOnly="true" />
              </Col>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"Billing Address 1"} name="billing_address" error={error.billing_address} onChange={onChangeHandler} />
              </Col>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"Billing Address 2"} name='billing_addres2' error={error.billing_addres2} onChange={onChangeHandler} />
              </Col>
            </Row>
            <Row className='mb-2'>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"State"} name='state' error={error.state} onChange={onChangeHandler} />
              </Col>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"City"} name='city' error={error.city} onChange={onChangeHandler} />
              </Col>
              <Col md={4}>
                <InputField FormType={'tel'} FormLabel={"Zip Code"} max={6} name='zip_code' error={error.zip_code} onChange={onChangeHandler} />
              </Col>
            </Row>
            <Row className='mb-2'>
              <Col md={4}>
                <InputField FormType={'date'}
                  FormLabel={"Renewal Date"}
                  name='renewal_date'
                  error={error.renewal_date}
                  onChange={onChangeHandler} 
                  />
              </Col>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"Incentive Information"} name='incentive_information' onChange={onChangeHandler} error={error.incentive_information} />
              </Col>
              <Col md={4}>
              <Select Array={timezones} name="time_zone" FormLabel={"Time Zone"} error={error.time_zone} value={indata.time_zone} onChange={onChangeHandler} />
{/*               
                <Timezoneselectdropdown Array={timezones} FormLabel="Time Zone" error={error.time_zone} name="time_zone" onChange={(e) => onSelectHandler(e)} /> */}
                {/* <Select  /> */}
              </Col>
            </Row>
            <Row className='mb-2'>
              <Col md={4}>
              <Select Array={timeFormateArray} name="time_formate" FormLabel={"Time Display"} error={error.time_formate} value={indata.time_formate} onChange={onChangeHandler} />
                {/* <Timeformatdropdown arraydata={timeFormate} FormLabel="Time Display" name="time_formate" error={error.time_formate} onChange={(e) => onSelectHandler(e)} /> */}
              </Col>
              {fields.map((e, i) => (
                <Col md={4} key={i}>
                  <InputField FormType={'text'} FormLabel={e.title} onChange={addNewHandler} name={e.title} FormPlaceHolder={e.placeholder} />
                </Col>
              ))}
              <Col md={4} className='pt-2'>
                <SharedButton BtnLabel={"Add Field"} type={'button'} BtnVariant={'outline-dark'} BtnClass={"w-100 mt-md-4"} onClick={() => handleShowModal()} />
              </Col>
            </Row>
            <hr />
            <Row className='mb-2 mt-4'>
              <Col md={4}>
                <SharedButton BtnLabel={"Create"} type={'submit'} BtnVariant={'primary'} BtnClass={"w-100"} />
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
    </>
  );
};
