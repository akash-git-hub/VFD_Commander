import React, { useEffect, useState } from 'react'
import { PoSidebar } from '../../PO_Sidebar'
import { Headings } from '../../../components/Headings'
import { SharedButton } from '../../../components/Button'
import { Col, Container, Form, Row } from 'react-bootstrap'
import Select from '../../../components/Select'
import { InputField } from '../../../components/InputField'
import { AddNewTrackingInformation_API, getAddNewField_API } from '../../../api_services/Apiservices'
import { CategoryArray, itemsStatus } from '../../../helper/Helper'
import { successAlert } from '../../../components/Alert'
import { Textareanew } from '../../../components/Textareanew'

export default function AddNewTrackingInformation({ APid, setLoder, setKey, trackInfo, preId }) {
    const [fields, setFields] = useState([]);
    const [indata, setIndata] = useState({ "date": "", "category": "", "comments": "", "status": "" });
    const [error, setError] = useState({ "date": "", "category": "", "comments": "", "status": "" });


    const addNewHandler = (e, i) => {
        const { value } = e.target;
        let data = [...fields];
        if (i >= 0 && i < data.length) {
            data[i] = { ...data[i], value: value };
            setFields(data);
        }
    }

    // const newFieldData = async () => {
    //     const resp = await getAddNewField_API("AddNewTrackingInformation");
    //     if (resp && resp.success) {
    //         let finData = resp.data;
    //         finData = finData.map((e) => ({ title: e.formLabel, type: e.formType, options: e.OptionArray, value: '' }));
    //         setFields(finData);
    //     }
    // }

    // useEffect(() => { newFieldData(); }, [])

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const { date, category, comments, status } = indata;

        let isValid = true;
        if (!date) { setError((pre) => ({ ...pre, "date": "Required" })); isValid = false; }
        if (!category) { setError((pre) => ({ ...pre, "category": "Required" })); isValid = false; }
        if (!comments) { setError((pre) => ({ ...pre, "comments": "Required" })); isValid = false; }
        if (!status) { setError((pre) => ({ ...pre, "status": "Required" })); isValid = false; }
        if (isValid) {
            setLoder(true);
            const data = {
                "apparatus_Id": APid,
                "date": date,
                "category": category,
                "status": status,
                "comments": comments,
                "add_field": fields
            }
            const resp = await AddNewTrackingInformation_API(data);
            if (resp && resp.success) {
                e.target.reset();
                setIndata({ "date": "", "category": "", "comments": "", "status": "" });
                setFields([]);
                setLoder(false);
                trackInfo(preId);
                successAlert(resp.message);
                setKey("tracking");
            }
            setLoder(false);
        }
        setLoder(false);
    }
    return (
        <div className='RoleAdminstrator'>
            <Container fluid>
                <Row>
                    <Form onSubmit={submitHandler}>
                        <Row>
                            <Col md={4} className='mb-2'>
                                <InputField FormType={'date'} required={true} FormLabel={"Date"} value={indata.date} name='date' error={error.date} onChange={inputHandler} />
                            </Col>
                            <Col md={4} className='mb-2'>
                                <Select FormLabel='Category' required={true} Array={CategoryArray} value={indata.category} onChange={inputHandler} error={error.category} name='category' />
                            </Col>
                            <Col md={4} className='mb-2'>
                                <Select Array={itemsStatus} required={true} name="status" FormLabel={"Status"} error={error.status} value={indata.status} onChange={inputHandler} />
                            </Col>
                            {fields.map((e, i) => (
                                <Col md={4} key={i} className='mb-2'>
                                    {e.type == "text" ?
                                        <InputField FormType={'text'} FormLabel={e.title} value={e.value} onChange={(e) => addNewHandler(e, i)} name={e.title} />
                                        :
                                        <Select FormLabel={e.title} Array={e.options} value={e.value} onChange={(e) => addNewHandler(e, i)} name={e.title} />
                                    }
                                </Col>
                            ))}
                            <Col md={12} className='mb-2'>
                                <Textareanew required={true} FormLabel='Comments' name='comments' rows={2} value={indata.comments} error={error.comments} onChange={inputHandler} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className='mt-2'>
                                <SharedButton type={'submit'} BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                    <Row className='mt-3'>
                        <span className='error'>Note: Fields marked with an asterisk (*) are mandatory and must be filled out before submitting the form .</span>
                    </Row>
                </Row>
            </Container>
        </div>
    )
}
