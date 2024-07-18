import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import { Timeformatdropdown } from '../../../components/Timeformatdropdown';
import { getAccount_by_id_API, update_modal_account_api } from '../../../api_services/Apiservices';

import { successAlert } from '../../../components/Alert';
import { useNavigate } from 'react-router-dom';
import Select from '../../../components/Select';
import { stateList, timeFormateArray } from '../../../helper/Helper';
import Swal from 'sweetalert2';


export const EditForm = ({ mydata, setLoder }) => {
  const [fields, setFields] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState();
  const navigate = useNavigate();
  const [statusop, setStatusop] = useState([{ "name": "Active", "value": "Active" }, { "name": "Inactive", "value": "Inactive" }])

  const timeFormate = [{ 'label': '12-Hours', "value": 'hh:mm:ss A' }, { 'label': '24-Hours', "value": 'HH:mm:ss' }]

  const handleAddField = (title, placeholder) => {
    setFields([...fields, { title, placeholder }]);
  };


  const handleCloseModal = () => setShowModal(false);

  const get_account_list_byid = async (id) => {
    if (id) {
      setLoder(true);
      const resp = await getAccount_by_id_API({ "id": id });
      if (resp) {
        setLoder(false);
        const data = resp.data;
        setData(data);
        if (data && data.add_field) {
          setFields(data.add_field);
        }
        setLoder(false);
      }
      setLoder(false);
    }
    setLoder(false);
  }

  useEffect(() => { if (mydata) { const id = mydata._id;get_account_list_byid(id); } }, [mydata,stateList])



  const [indata, setIndata] = useState(
    {
      "id": "", "time_formate": "", "time_zone": "", "incentive_information": "",
      "renewal_date": "", "subscription_amount": "", "subscription_name": "",
      "email": "", "mobile_no": "", "zip_code": "", "state": "",
      "city": "", "billing_addres2": "", "billing_address": "", "account_name": "",
      "first_name": "", "last_name": "","status":""
    }
  );

  const [error, setError] = useState(
    {
      "time_formate": "", "time_zone": "", "incentive_information": "",
      "renewal_date": "", "subscription_amount": "", "subscription_name": "",
      "email": "", "mobile_no": "", "zip_code": "", "state": "",
      "city": "", "billing_addres2": "", "billing_address": "", "account_name": "",
      "first_name": "", "last_name": "","status":""
    }
  );


  useEffect(() => {
    if (data) {
      setIndata((pre) => ({
        ...pre,
        "id": data._id,
        "time_formate": data.time_formate, "time_zone": data.time_zone, "incentive_information": data.incentive_information,
        "renewal_date": data.renewal_date, "subscription_amount": data.subscription_amount, "subscription_name": "",
        "email": data.email, "mobile_no": data.mobile_no, "zip_code": data.zip_code, "state": data.state_code,
        "city": data.city, "billing_addres2": data.billing_addres2, "billing_address": data.billing_address, "account_name": data.account_name, "first_name": data.first_name, "last_name": data.last_name, "add_field": data.add_field ,"status":data.status
      }));
      if (data && data.add_field) {
        setFields(data.add_field);
      }
      if (data && data.subscription_id && data.subscription_id.name) {
        setIndata((pre) => ({ ...pre, "subscription_name": data.subscription_id.name }));
      }
    }
  }, [data]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setIndata((pre) => ({ ...pre, [name]: value }));
    setError((pre) => ({ ...pre, [name]: "" }));
  }
  const onSelectHandler = (data) => {
    const name = data.name;
    const value = data.value;
    if (name) {
      setIndata((pre) => ({ ...pre, [name]: value }));
      setError((pre) => ({ ...pre, [name]: "" }));
    }
  }

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

  const submitHandler = async (e) => {
    e.preventDefault();
    let isValid = 1;

  
    if (!/^\d+$/.test(indata.mobile_no)) {
      setError((e) => ({ ...e, "mobile_no": "* Contact number must contain only digits" }));
      isValid = 9;
  }

  
  const st_name = stateList.find((e) => e.value === indata.state);
  let state_name = "";
  if (st_name) {
    state_name = st_name.name;
  }



    if (!indata.account_name) { setError((e) => ({ ...e, "account_name": "* Account name is required" })); isValid = 2; }
    if (!indata.first_name) { setError((e) => ({ ...e, "first_name": "* First name is required" })); isValid = 3; }
    if (!indata.mobile_no) { setError((e) => ({ ...e, "mobile_no": "* Contact number is required" })); isValid = 9; }
    if (!indata.billing_address) { setError((e) => ({ ...e, "billing_address": "* Billing address line 1 is required" })); isValid = 14; }
    if (!indata.city) { setError((e) => ({ ...e, "city": "* City is required" })); isValid = 12; }
    if (!indata.state) { setError((e) => ({ ...e, "state": "* State is required" })); isValid = 11; }
    if (!indata.zip_code) { setError((e) => ({ ...e, "zip_code": "* ZIP code is required" })); isValid = 10; }
    if (!indata.renewal_date) { setError((e) => ({ ...e, "renewal_date": "* Renewal date is required" })); isValid = 8; }

    // if (!indata.time_formate) { setError((e) => ({ ...e, "time_formate": "* Time format is required" })); isValid = 5; }
    // if (!indata.time_zone) { setError((e) => ({ ...e, "time_zone": "* Time zone is required" })); isValid = 6; }
    if (!indata.incentive_information) { setError((e) => ({ ...e, "incentive_information": "* Incentive information is required" })); isValid = 7; }

 
 
 


    // if (!indata.billing_addres2) { setError((e) => ({ ...e, "billing_addres2": "* Billing address line 2 is required" })); isValid = 13; }
 

    if (isValid === 1) {      
      setLoder(true);

      const formData = new FormData();

      formData.append('id', indata.id);
      formData.append('first_name', indata.first_name);
      formData.append('last_name', indata.last_name);
      formData.append('account_name', indata.account_name);
      formData.append('mobile_no', indata.mobile_no);
      formData.append('time_zone', indata.time_zone);
      formData.append('time_formate', indata.time_formate);
      formData.append('incentive_information', indata.incentive_information);
      formData.append('renewal_date', indata.renewal_date);
      formData.append('zip_code', indata.zip_code);
      formData.append('state_code', indata.state);
      formData.append('state', state_name);
      formData.append('city', indata.city);
      formData.append('status', indata.status);
      formData.append('billing_address', indata.billing_address);
      formData.append('billing_addres2', indata.billing_addres2);
      formData.append('add_field', JSON.stringify(fields));

      const resp = await update_modal_account_api(formData);
      if (resp && resp.success) {
        e.target.reset();
        get_account_list_byid(indata.id);
        setLoder(false);
        successAlert(resp.message);
        navigate("/accountmodule");
      }
      setLoder(false);
    }
  }

  const cancelHandler = () =>{
    Swal.fire({
      title:"Changes have been made",
      text: "Are you sure you want to exit with no changes?",
      icon: "question"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/accountmodule")
      }
    });
  }

  return (
    <>

      <div className='CreateAccountForm'>
        <Container>
          <Row style={{ justifyContent: 'end' }}>
            <Col md={1}>
              <Button variant="danger" size="sm"
                onClick={cancelHandler}
                 >Cancel
              </Button>
            </Col>
          </Row>
          <Form onSubmit={submitHandler}>
            <Row className='mb-2'>
              <Col md={4} className={"mb-2"}>
                <InputField FormType={'text'} readOnly={true} FormLabel={"Account Name"} value={indata.account_name} name="account_name" error={error.account_name} onChange={onChangeHandler} FormPlaceHolder={"Futurristic"} />
              </Col>
              <Col md={4} className={"mb-2"}>
                <InputField FormType={'text'} FormLabel={"Contact Name"} value={indata.first_name} name="first_name" error={error.first_name} onChange={onChangeHandler} FormPlaceHolder={"Jenny"} />
              </Col>
              {/* <Col md={4} className={"mb-2"}>
                <InputField FormType={'text'} FormLabel={"Last Name"} value={indata.last_name} name="last_name" error={error.last_name} onChange={onChangeHandler} FormPlaceHolder={"Wilson"} />
              </Col> */}
              <Col md={4} className={"mb-2"}>
                <InputField FormType={'text'} FormLabel={"Email"} readOnly={true} value={indata.email} name="email" error={error.email} onChange={onChangeHandler} />
              </Col>
              <Col md={4} className={"mb-2"}>
                <InputField FormType={'tel'} FormLabel={"Mobile No"} maxL={10} value={indata.mobile_no} name="mobile_no" error={error.mobile_no} onChange={onChangeHandler} />
              </Col>
              <Col md={4} className={"mb-2"}>
                <InputField FormType={'text'} FormLabel={"Billing Address 1"} value={indata.billing_address} name="billing_address" error={error.billing_address} onChange={onChangeHandler} />
              </Col>
              <Col md={4} className={"mb-2"}>
                <InputField FormType={'text'} FormLabel={"Billing Address 2"} value={indata.billing_addres2} name="billing_addres2" error={error.billing_addres2} onChange={onChangeHandler} />
              </Col>
              <Col md={4} className={"mb-2"}>
                <InputField FormType={'text'} FormLabel={"City"} value={indata.city} name="city" error={error.city} onChange={onChangeHandler} />
              </Col>
              {/* <Col md={4} className={"mb-2"}>
                <InputField FormType={'text'} FormLabel={"State"} value={indata.state} name="state" error={error.state} onChange={onChangeHandler} />
              </Col> */}

              <Col md={4}>
                <Select Array={stateList} name="state" FormLabel={"State"} error={error.state} value={indata.state} onChange={onChangeHandler} />
              </Col>
             
              <Col md={4} className={"mb-2"}>
                <InputField FormType={'text'} FormLabel={"Zip Code"} max={5} value={indata.zip_code} name="zip_code" error={error.zip_code} onChange={onChangeHandler} />
              </Col>
              <Col md={4} className={"mb-2"}>
                <InputField FormType={'text'} FormLabel={"Subscription Name"} readOnly={true} value={indata.subscription_name} name="subscription_name" />
              </Col>
              <Col md={4} className={"mb-2"}>
                <InputField FormType={'tel'} readOnly FormLabel={"Subscription Amount"} value={indata.subscription_amount} name="subscription_amount" />
              </Col>
              <Col md={4} className={"mb-2"}>
                <InputField FormType={'date'} FormLabel={"Renewal Date"} value={indata.renewal_date} name="renewal_date" error={error.renewal_date} onChange={onChangeHandler} />
              </Col>            
            
              <Col md={4} className={"mb-2"}>
                <InputField FormType={'text'} FormLabel={"Incentive Information"} value={indata.incentive_information} name="incentive_information" error={error.incentive_information} onChange={onChangeHandler} FormPlaceHolder={"Reward Details"} />
              </Col>
              <Col md={4} className={"mb-2"}>
                <InputField FormType={'text'} FormLabel={"Time Zone"} readOnly={true} value={indata.time_zone} name="time_zone" error={error.time_zone} onChange={onChangeHandler} />
              </Col>
              <Col md={4} className='mb-2'>
                <Select Array={timeFormateArray} name="time_formate" FormLabel={"Time Display"} error={error.time_formate} value={indata.time_formate} onChange={onChangeHandler} />
              </Col>
              <Col md={4}>
                <Select Array={statusop} name="status" FormLabel={"Status"} error={error.status } value={indata.status} onChange={onChangeHandler} />
              </Col>
              {indata && indata.add_field && (indata.add_field).map((e, i) => (
                <Col md={4} key={i}>
                  <InputField FormType={'text'} FormLabel={e.title} value={e.value} name={e.title} onChange={addNewHandler} FormPlaceHolder={e.placeholder} />
                </Col>
              ))}
              {/* <Col md={4} className='mb-2'> */}
              {/* <SharedButton type={'button'} BtnLabel={"Add Field"} BtnVariant={'outline-dark'} BtnClass={"w-100 AddFieldBtn"} onClick={() => handleShowModal()} /> */}
              {/* </Col> */}
            </Row>
            <Row className='mb-2'>
              <Col md={4} className={"mb-2"}>
                <SharedButton type={"submit"} BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100"} />
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
      {/* <AddFieldModal show={showModal} setShowModal={setShowModal} fields={fields} setFields={setFields} /> */}
    </>
  );
};
