import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row, Table } from 'react-bootstrap'
import { CategoryArray, FilterItemsStatus, itemsStatus, sortEventByDate } from '../../../helper/Helper'
import { AddNewTrackingInformation_API } from '../../../api_services/Apiservices';
import { successAlert } from '../../../components/Alert';
import { InputField } from '../../../components/InputField';
import Select from '../../../components/Select';
import { Textareanew } from '../../../components/Textareanew';
import { SharedButton } from '../../../components/Button';
import { SearchDaterange } from '../../../components/SearchDaterange';

export default function ApparatusTrackingInformation({ tbData, setLoder, APid }) {
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
                setIndata([]);
                setFields([]);
                setLoder(false);
                successAlert(resp.message);
                // setKey("tracking");
            }
            setLoder(false);
        }
        setLoder(false);
    }




    const [eventSearchDate, setEventSearchDate] = useState({ "start": "", "end": "" });
    const [flData, setFlData] = useState([]);

    useEffect(() => { setFlData(tbData) }, [tbData]);   

    const EventDateChange = (value) => {
        if (value && value.length === 2) {
            const fStart = moment(value[0].$d).startOf('day').unix();
            const fEnd = moment(value[1].$d).endOf('day').unix();
            setEventSearchDate({ "start": fStart, "end": fEnd });
            const flData = tbData.filter(e => {
                const eventDate = e.date;
                return eventDate >= fStart && eventDate <= fEnd;
            });
            const final = sortEventByDate(flData, true);
            setFlData(final);
        } else {
            setFlData(tbData)
        }
    };

    return (
        <>
            {/* <div className='RoleAdminstrator'>
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
        <hr /> */}
            <div className='MainTable mt-2 '>

                <SearchDaterange onChange={EventDateChange} />

                <Table responsive className='table table-hover'>
                    <thead>
                        <tr className='text-center'>
                            <th>Date </th>
                            <th>Category </th>
                            <th>Status </th>
                            <th>Comments </th>
                            <th>Completed By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flData.map((e, index) => (
                            <tr key={index}>
                                <td className='text-center'>{e.date && moment.unix(e.date).format("MM-DD-YYYY")}</td>
                                <td className='text-center'>{e.category}</td>
                                <td className='text-center'>{e.status && FilterItemsStatus(e.status)}</td>
                                <td className='text-center'>{e.comments}</td>
                                <td className='text-center'>{e.creator_id && e.creator_id.last_name + " " + e.creator_id.first_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}
