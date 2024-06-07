import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import Select from '../../../components/Select';
import { TimezoneList } from '../../../helper/Helper';


export const CreateForm = () => {
  const [fields, setFields] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [timezones, setTimezones] = useState([]);

  const [indata, setIndata] = useState();


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

  const onChangeHandler = (e) =>{
    const {name,value} = e.target;

  }



  useEffect(() => {
    const tzList = TimezoneList();
    const array = [];
    if (tzList && tzList.length > 0) {
      tzList.map((e) => (array.push({ name: e, value: e })))
    }
    setTimezones(array);
  }, []);


  const submitHandler = (e) => {
    e.preventDefault();


  }

  return (
    <>
      <div className='CreateAccountForm'>
        <Container>
          <Form onSubmit={submitHandler}>
            <Row className='mb-2'>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"Account Name"} name="account_name" FormPlaceHolder={"Futurristic"} />
              </Col>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"First Name"} name="first_name" FormPlaceHolder={"Jenny"} />
              </Col>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"Last Name"} name='last_name' FormPlaceHolder={"Wilson"} />
              </Col>
            </Row>
            <Row className='mb-2'>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"Billing Address 1"} name="billing_address" FormPlaceHolder={"scheme 24 - Vijay Nagar"} />
              </Col>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"Billing Address 2"} name='billing_addres2' FormPlaceHolder={"scheme 24 - Vijay Nagar"} />
              </Col>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"City"} name='city' FormPlaceHolder={"Indore"} />
              </Col>
            </Row>
            <Row className='mb-2'>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"State"} name='state' FormPlaceHolder={"Madhya Pradesh"} />
              </Col>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"Zip Code"} name='zip_code' FormPlaceHolder={"452001"} />
              </Col>
              <Col md={4}>
                <InputField FormType={'number'} FormLabel={"Contact Phone"} name='contact_number' FormPlaceHolder={"+91 - 8989898989"} />
              </Col>
            </Row>
            <Row className='mb-2'>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"Account Owner Email Address"} name='email' FormPlaceHolder={"Jenny@wilson.com"} />
              </Col>
              <Col md={4}>
                <Select FormLabel="Subscription Name" name="subscription_name" FormPlaceHolder='Subscription Name' />
              </Col>
              <Col md={4}>
                <InputField FormType={'number'} FormLabel={"Subscription Amount"} name='subscription_amount' FormPlaceHolder={"$ 599"} readOnly="true" />
              </Col>
            </Row>
            <Row className='mb-2'>
              <Col md={4}>
                <InputField FormType={'date'} FormLabel={"Renewal Date"} name='renewal_date' FormPlaceHolder={"DD/MM/YYYY"} />
              </Col>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"Incentive Information"} name='incentive_information' FormPlaceHolder={"Reward Details"} />
              </Col>
              <Col md={4}>
                <Select Array={timezones} FormLabel="Time Zone" name="time_zone" onChange={onChangeHandler}/>
              </Col>
            </Row>
            <Row className='mb-2'>
              <Col md={4}>
                <InputField FormType={'text'} FormLabel={"Time Display"} FormPlaceHolder={"12 - hour"} />
              </Col>
              {fields.map((e, i) => (
                <Col md={4} key={i}>
                  <InputField FormType={'text'} FormLabel={e.title} onChange={addNewHandler} name={e.title} FormPlaceHolder={e.placeholder} />
                </Col>
              ))}
              <Col md={4} className='pt-2'>
                <SharedButton BtnLabel={"Add Field"} type={'button'} BtnVariant={'outline-dark'} BtnClass={"w-100 mt-md-4"} onClick={() => setShowModal(true)} />
              </Col>
            </Row>
            <Row className='mb-2'>
              <Col md={4}>
                <SharedButton BtnLabel={"Create"} type={'submit'} BtnVariant={'primary'} BtnClass={"w-100"} />
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <AddFieldModal show={showModal} setShowModal={setShowModal} fields={fields} setFields={setFields} />
    </>
  );
};
