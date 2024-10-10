import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { selectFormOption } from '../helper/Helper'
import Select from '../components/Select'
import { addNewDropdownValue_API, deleteCustom_API, dropdownUpdate_API, getAddNewField_API, updateOneCustom_API } from '../api_services/Apiservices';
import { InputFieldNew } from '../components/InputFieldNew';
import { TbEdit } from 'react-icons/tb';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaCheck, FaCirclePlus } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { errorAlert, successAlert } from '../components/Alert';

export default function InfoAddField({ setLoder }) {
    const [selected, setSelected] = useState();
    const [textForm, setTextForm] = useState([]);
    const [dropdownFrom, setDropdownFrom] = useState([]);
    const [isEdit, setIsEdit] = useState('');
    const [drpValueIsEdit, setDrpValueIsEdit] = useState({ "outer": '', "inner": '' });
    const [drpLabelIsEdit, setDrpLabelIsEdit] = useState('');


    const changeHandler = (data, index) => {
        const preTextForm = [...textForm];
        preTextForm[index].formLabel = data;
        setTextForm(preTextForm);
    }

    const newFieldData = async (data) => {
        setLoder(true);
        const resp = await getAddNewField_API(data);
        if (resp && resp.success) {
            let finData = resp.data;
            const textData = finData.filter((e) => (e.formType === "text"));
            const dropdownData = finData.filter((e) => (e.formType === "dropdown"));
            setTextForm(textData);
            setDropdownFrom(dropdownData);
            setLoder(false);
        }
        setLoder(false);
    }

    useEffect(() => { if (selected) newFieldData(selected); }, [selected]);



    const deleteHandler = async (id, type) => {
        if (!id) { errorAlert("Something wrong"); return; }
        if (!type) { errorAlert("Something wrong"); return; }
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
                setLoder(true);
                const data = { "id": id, "type": type };
                const resp = await deleteCustom_API(data);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            newFieldData(selected);
                        }
                    })
                }
                setLoder(false);
            }
            setLoder(false);
        });
    }


    const updateTestField = async (data) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to update the records",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoder(true);
                const fData = { "myData": data };
                const resp = await updateOneCustom_API(fData);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Updated!",
                        text: "Your data has been successfully updated.",
                        icon: "success"
                    }).then(() => {
                        setIsEdit("");
                        setDrpLabelIsEdit("");
                        newFieldData(selected);
                    });
                }
                setLoder(false);
            } else {
                setIsEdit("");
                setDrpLabelIsEdit('');
            }
        });
    };

    const drpUpdateHandler = (data) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to update the records",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoder(true);
                const fData = { "myData": data };
                const resp = await dropdownUpdate_API(fData);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Updated!",
                        text: "Your data has been successfully updated.",
                        icon: "success"
                    }).then(() => {
                        setDrpValueIsEdit({ "outer": '', "inner": '' })
                        setDrpLabelIsEdit("")
                        newFieldData(selected);
                    });
                }
                setLoder(false);
            } else {
                setDrpValueIsEdit({ "outer": '', "inner": '' })
                setDrpLabelIsEdit("")
            }
        });
    };

    const drpChangeHandler = (data, outIndex, inIndex) => {
        const preDpData = [...dropdownFrom];
        if (inIndex === undefined || inIndex === null) {
            preDpData[outIndex].formLabel = data;
        } else {
            preDpData[outIndex].OptionArray[inIndex].name = data;
        }
        setDropdownFrom(preDpData);
    }

    const [drpOption, setDrpOption] = useState([]);
    const handleAddRow = (id) => {
        const pre = [...drpOption];
        pre.push({ "label_Id": id, "name": "", "value": "" });
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

    const addNewDropdownValueHandler = async (inData, index) => {
        setLoder(true);
        const final = { "data": inData }
        const resp = await addNewDropdownValue_API(final);
        if (resp && resp.success) {
            setLoder(false);
            successAlert(resp.message);
            const pre = [...drpOption];
            pre.splice(index, 1);
            setDrpOption(pre);
            newFieldData(selected);
        }
        setLoder(false);
    }

    return (
        <>
            <div className='RoleAdminstrator'>
                <Container>
                    <Row className='mt-3'>
                        <Col md={6} style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}><h5>Please Select Function Name</h5></Col>
                        <Col md={6} className='mb-3'>
                            <Select required={true}
                                 myDefault={'Select Value'}
                                Array={selectFormOption}
                                onChange={(e) => setSelected(e.target.value)}
                                name='selected'
                                value={selected} />
                        </Col>

                        <Col md={12}>
                            <Row className='mt-3'>
                                <hr />
                                <Col md={12} className='mt-3 mb-3 text-center'>
                                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                        <h4>Text Field</h4>
                                    </div>
                                </Col>
                                <Col md={12} className={"mb-2"} style={{ border: "1px solid #c6c7c8" }}>
                                    <Row className='mt-2'>
                                        {textForm.map((e, i) => (
                                            <Col md={6} className='mt-2 mb-2' key={i}>
                                                <Row className={isEdit !== i ? "edtBack" : ""}>
                                                    <Col md={9} style={{ paddingRight: "0px" }}>
                                                        <InputFieldNew
                                                            readOnly={isEdit === i ? false : true}
                                                            labelClassName={'labelBold'}
                                                            FormLabel='Field Title'
                                                            name={`formLabel${i}`}
                                                            value={e.formLabel}
                                                            onChange={(e) => changeHandler(e.target.value, i)} />
                                                    </Col>
                                                    <Col md={3} className='mt-4' >
                                                        <Button variant="danger" size="sm" className='mt-2'
                                                            onClick={() => deleteHandler(e._id, 'formField')} style={{
                                                                fontWeight: '500',
                                                            }}><RiDeleteBinLine />
                                                        </Button>
                                                        {isEdit === i ?
                                                            <Button variant="primary" size="sm"
                                                                className='mt-2 ms-1'
                                                                onClick={() => updateTestField(textForm)} style={{
                                                                    fontWeight: '500',
                                                                    marginRight: '1rem'
                                                                }}><FaCheck />
                                                            </Button>
                                                            :
                                                            <Button variant="success" size="sm"
                                                                className='mt-2 ms-1'
                                                                onClick={() => setIsEdit(i)} style={{
                                                                    fontWeight: '500',
                                                                    marginRight: '1rem'
                                                                }}><TbEdit />
                                                            </Button>
                                                        }
                                                    </Col>
                                                </Row >
                                            </Col>
                                        ))}

                                        <Col md={4} className='mt-2 mb-2'></Col>
                                    </Row>
                                </Col>
                                <hr />
                                <Col md={12} className='mt-3 mb-3 text-center'>
                                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                        <h4>Dropdown Field</h4>
                                    </div>
                                </Col>

                                <Col md={12}
                                    style={{ border: "1px solid #c6c7c8" }}>
                                    <Row className='mt-2'>
                                        {dropdownFrom.map((e, outerIndex) => (
                                            <React.Fragment key={outerIndex}>
                                                <Col md={12} key={outerIndex}>
                                                    {outerIndex != 0 ? <hr /> : ""}
                                                    <Row>
                                                        <Col md={6} className={drpLabelIsEdit !== outerIndex ? 'mt-2 mb-2 edtBack' : "mt-2 mb-2"}>
                                                            <Row>
                                                                <Col md={9} style={{ paddingRight: "0px" }}>
                                                                    <InputFieldNew
                                                                        labelClassName={'labelBold'}
                                                                        readOnly={drpLabelIsEdit === outerIndex ? false : true}
                                                                        FormLabel='Field Title'
                                                                        name='formLabel'
                                                                        value={e.formLabel}
                                                                        onChange={(e) => drpChangeHandler(e.target.value, outerIndex,)}
                                                                    />
                                                                </Col>
                                                                <Col md={3} className='mt-4' >
                                                                    <Button
                                                                        variant="danger"
                                                                        className='mt-2'
                                                                        size="sm"
                                                                        onClick={() => deleteHandler(e._id, "optionFormField")}
                                                                        style={{ fontWeight: '500' }}
                                                                    >
                                                                        <RiDeleteBinLine />
                                                                    </Button>
                                                                    {drpLabelIsEdit === outerIndex ?
                                                                        <Button variant="primary" size="sm"
                                                                            className='mt-2 ms-1'
                                                                            onClick={() => drpUpdateHandler(dropdownFrom)} style={{
                                                                                fontWeight: '500',
                                                                                marginRight: '1rem'
                                                                            }}><FaCheck />
                                                                        </Button>
                                                                        :
                                                                        <Button variant="success" size="sm"
                                                                            className='mt-2 ms-1'
                                                                            onClick={() => setDrpLabelIsEdit(outerIndex)} style={{
                                                                                fontWeight: '500',
                                                                                marginRight: '1rem'
                                                                            }}><TbEdit />
                                                                        </Button>
                                                                    }
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col md={6} className='mt-2 mb-2 edtBack' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <h5 className='me-3'> Add New Dropdown Values</h5>
                                                            <FaCirclePlus onClick={() => handleAddRow(e._id)} style={{ cursor: "pointer", fontSize: "x-large", color: '#0d6efd' }} />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col md={12}>
                                                    <Row>
                                                        <Col md={12}>
                                                            <Row className='mt-2 mb-2'>
                                                                {drpOption.map((d, inIndex) => (
                                                                    d.label_Id == e._id && (
                                                                        <Col md={6} className='mt-2 mb-2 edtBack' key={inIndex}>
                                                                            <Row>
                                                                                <Col md={9} style={{ paddingRight: "0px" }}>
                                                                                    <InputFieldNew
                                                                                        labelClassName={'labelBold'}
                                                                                        FormLabel='Dropdown Values'
                                                                                        name='formLabel'
                                                                                        value={d.value}
                                                                                        onChange={(e) => optionHandler(e, inIndex)}
                                                                                    />
                                                                                </Col>
                                                                                <Col md={3} className='mt-4' >
                                                                                    <Button
                                                                                        variant="danger"
                                                                                        size="sm"
                                                                                        className='mt-2'
                                                                                        onClick={() => handleDeleteRow(inIndex)}
                                                                                        style={{ fontWeight: '500' }}
                                                                                    >
                                                                                        <RiDeleteBinLine />
                                                                                    </Button>
                                                                                    <Button variant="primary" size="sm"
                                                                                        className='mt-2 ms-1'
                                                                                        onClick={() => addNewDropdownValueHandler(d, inIndex)} style={{
                                                                                            fontWeight: '500',
                                                                                            marginRight: '1rem'
                                                                                        }}><FaCheck />
                                                                                    </Button>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    )))}
                                                            </Row>
                                                        </Col>
                                                        {e.OptionArray.map((option, innerIndex) => (
                                                            <Col md={6} className='mt-2 mb-2' key={innerIndex}>
                                                                <Row>
                                                                    <Col md={9} style={{ paddingRight: "0px" }}>
                                                                        <InputFieldNew
                                                                            readOnly={drpValueIsEdit.inner === innerIndex && drpValueIsEdit.outer === outerIndex ? false : true}
                                                                            labelClassName={'labelBold'}
                                                                            FormLabel='Dropdown Values'
                                                                            name='formLabel'
                                                                            value={option.name}
                                                                            onChange={(e) => drpChangeHandler(e.target.value, outerIndex, innerIndex)}
                                                                        />
                                                                    </Col>
                                                                    <Col md={3} className='mt-4' >
                                                                        <Button
                                                                            variant="danger"
                                                                            size="sm"
                                                                            className='mt-2'
                                                                            onClick={() => deleteHandler(option._id, "option")}
                                                                            style={{ fontWeight: '500' }}
                                                                        >
                                                                            <RiDeleteBinLine />
                                                                        </Button>
                                                                        {drpValueIsEdit.inner === innerIndex && drpValueIsEdit.outer === outerIndex ?
                                                                            <Button variant="primary" size="sm"
                                                                                className='mt-2 ms-1'
                                                                                onClick={() => drpUpdateHandler(dropdownFrom)} style={{
                                                                                    fontWeight: '500',
                                                                                    marginRight: '1rem'
                                                                                }}><FaCheck />
                                                                            </Button>
                                                                            :
                                                                            <Button variant="success" size="sm"
                                                                                className='mt-2 ms-1'
                                                                                onClick={() => setDrpValueIsEdit({ "outer": outerIndex, "inner": innerIndex })} style={{
                                                                                    fontWeight: '500',
                                                                                    marginRight: '1rem'
                                                                                }}><TbEdit />
                                                                            </Button>
                                                                        }
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        ))}
                                                    </Row>
                                                </Col>
                                            </React.Fragment>
                                        ))}
                                    </Row>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </Container >
            </div >
        </>
    )
}
