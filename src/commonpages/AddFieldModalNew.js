import React, { useState } from 'react';
import { Button, Row, Col, Container, Tabs, Tab } from 'react-bootstrap';
import { errorAlert, successAlert } from '../components/Alert';
import Select from '../components/Select';
import { selectFormOption } from '../helper/Helper';
import { InputField } from '../components/InputField';
import { RadioButton } from './RadioButton';
import { FaCircleMinus, FaCirclePlus } from 'react-icons/fa6';
import { addNewFieldAPI } from '../api_services/Apiservices';
import { Loader } from '../components/Loader';
import { PoSidebar } from '../platform_owner/PO_Sidebar';
import { Headings } from '../components/Headings';
import { SharedButton } from '../components/Button';
import Swal from 'sweetalert2';
import { InputFieldNew } from '../components/InputFieldNew';
import InfoAddField from './InfoAddField';

export const AddFieldModalNew = () => {
    const [data, setData] = useState({ "formName": "", "formLabel": "" });
    const [error, setError] = useState({ "formName": "", "formLabel": "" });
    const [selectedValue, setSelectedValue] = useState("text");
    const radioHandler = (e) => { setSelectedValue(e.target.value); setDrpOption([{ "value": "" }]) }
    const [drpOption, setDrpOption] = useState([{ "value": "" }]);
    const [loder, setLoder] = useState(false);
    const [key, setKey] = useState('information');

    const handleAddRow = (index) => {
        const pre = [...drpOption];
        pre.push({ "value": "" });
        setDrpOption(pre);
    };

    const handleDeleteRow = (index) => {
        const pre = [...drpOption];
        pre.splice(index, 1);
        setDrpOption(pre);
    };

    const optionHandler = (e, i) => {
        const data = e.target.value;
        const pre = [...drpOption];
        pre[i]["value"] = data;
        setDrpOption(pre);
    }


    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }

    const handleSubmit = async () => {
        let formName = data.formName;
        let titleObject = selectFormOption.find((d) => d.value === formName);

        if (data) {
            if (!data.formName) {
                errorAlert("Please Select Function Name.");
                return;
            }
            if (!data.formLabel) {
                errorAlert("Please enter a title.");
                return;
            }
        }
        if (selectedValue !== "text") {
            const emptyOptions = drpOption.filter(option => option.value.trim() === "");
            if (emptyOptions.length > 0) {
                errorAlert("Please enter all dropdown options.");
                return;
            }
        }

        setLoder(true);
        const fData = {
            formName: data.formName,
            formLabel: data.formLabel,
            formType: selectedValue,
            dpOption: drpOption
        }
        const resp = await addNewFieldAPI(fData);
        if (resp && resp.success) {
            setData({ "formLabel": "", "formName": "" });
            setDrpOption([{ "value": "" }]);
            setSelectedValue("text");
            setLoder(false);
            Swal.fire({
                title: "Success",
                html: `The new form field has been added successfully. Please check the <u><strong>${titleObject.name}</strong></u> form.`,
                imageUrl: "./assets/images/MainLogo.png",
                imageWidth: 400,
                imageAlt: "Success Image"
            });
        }
        setLoder(false); 
    };

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

                            <Headings MainHeading={"Add New Custom Field"} HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="information" title="Custom Field Information">
                                        <InfoAddField setLoder={setLoder} />
                                    </Tab>
                                    <Tab eventKey="addNew" title="Add New Custom Field">
                                        <Row>
                                            <Col md={6} className='mb-3'>
                                                <Select required={true} FormLabel='Form Name' Array={selectFormOption} onChange={onChangeHandler} error={error.formName} name='formName' myDefault={"Select Value"} value={data.formName} />
                                            </Col>
                                            <Col md={6} className='mb-3'>
                                                <RadioButton FormLabel={"Select Field Type"} radioHandler={radioHandler} selectedValue={selectedValue} />
                                            </Col>
                                            <Col md={6} className='mb-3'>
                                                <InputFieldNew required={true} FormType={'text'} FormLabel={"Field Title"} name='formLabel' error={error.formLabel} value={data.formLabel} onChange={onChangeHandler} />
                                            </Col>
                                            <>
                                                {selectedValue !== "text" && drpOption && drpOption.length > 0 && (
                                                    <>
                                                        {drpOption.map((e, i) => (
                                                            <React.Fragment key={i}>
                                                                <Col md={5} className='mb-3'>
                                                                    <InputField
                                                                        required={true}
                                                                        FormType={'text'}
                                                                        FormLabel={"Dropdown Values"}
                                                                        value={e.value}
                                                                        onChange={(e) => optionHandler(e, i)}
                                                                    />
                                                                </Col>
                                                                <Col md={1} className='d-flex' style={{ justifyContent: 'space-around' }}>
                                                                    <FaCirclePlus onClick={() => handleAddRow(i)} style={{ cursor: "pointer", fontSize: "x-large", color: '#0d6efd' }} />
                                                                    {i > 0 &&
                                                                        <FaCircleMinus onClick={() => handleDeleteRow(i)} style={{ cursor: "pointer", fontSize: "x-large", color: '#eb1f1f' }} />
                                                                    }
                                                                </Col>
                                                            </React.Fragment>
                                                        ))}
                                                    </>
                                                )}
                                            </>
                                        </Row>

                                        <Button className='w-50' type='button' variant="primary" onClick={handleSubmit}>
                                            Submit
                                        </Button>
                                        <Row className='mt-3'>
                                            <span className='error'>Note: Fields marked with an asterisk (*) are mandatory and must be filled out before submitting the form .</span>
                                        </Row>
                                    </Tab>
                                </Tabs>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};
