import React, {  useState } from 'react'
import { Button, Col, Container, Row, Stack, Table } from 'react-bootstrap'
import { TablePagination } from '../../components/TablePagination';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineQuestionCircle } from 'react-icons/ai';
import { SearchDaterange } from '../../components/SearchDaterange';

export const ListView = ({ trdata, orderByName, nameOrder, orderByDateHandler, dateOrder,EventDateChange,eventSearchDate }) => {
    const navigate = useNavigate();
    const [myd, setMyd] = useState(JSON.parse(localStorage.getItem("mydata")));   
    const handleEditClick = (data) => {
        navigate("/TraningListDetail", { state: { data ,eventSearchDate} });
    }

    return (
        <>
            <div className='TrainingViewList'>
                <Container>
                    <Row className='mt-3 mb-5'>
                        <Col style={{ display: "flex", justifyContent: "end" }}><AiOutlineCheckCircle className='check_icon' />Planning to Attend</Col>
                        <Col style={{ display: "flex", justifyContent: "center" }}><AiOutlineCloseCircle className='close_icon' />Will not Attend</Col>
                        <Col style={{ display: 'flex', justifyContent: "start" }}><AiOutlineQuestionCircle className='question_icon' />No Response</Col>
                    </Row>
                    <hr />
                    <Row className='mt-3'>
                    </Row>
                    <SearchDaterange onChange={EventDateChange} />
                    <div className='MainTable'>
                        <Table responsive className="table table-hover">
                            <thead>
                                <tr>
                                    <th colSpan="4" style={{ border: "none" }}></th>
                                    <th colSpan="2" className="main-heading">Attendees</th>
                                </tr>
                                <tr>
                                    <th>Event Type</th>
                                    <th onClick={orderByName} style={{ cursor: "pointer" }}>
                                        Event Name</th>
                                    <th onClick={orderByDateHandler} style={{ cursor: "pointer" }}>
                                        Event Date
                                    </th>
                                    <th>Start Time</th>
                                    <th className="subheading">Interest</th>
                                    <th className="subheading">Actual </th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trdata.map((account, index) => (
                                    <tr key={index}>
                                        <td>{account.event_type_id && account.event_type_id.event_name}</td>
                                        <td>{account.name}</td>
                                        <td>{moment.unix(account.date).format("MM-DD-YYYY")}</td>
                                        <td>{moment.unix(account.start_time).format(myd.time_formate)}</td>
                                        <td>
                                            <Stack direction='horizontal' gap={2} style={{ justifyContent: "center" }}>
                                                {account.planning_to_attend} <AiOutlineCheckCircle className='check_icon' />
                                                {account.cannot_attend}<AiOutlineCloseCircle className='close_icon' />
                                                {account.no_response} <AiOutlineQuestionCircle className='question_icon' />
                                            </Stack>

                                        </td>
                                        <td style={{ textAlign: "center" }}>{account.completed != 0 ? account.completed : "n/a"}</td>
                                        <td>     <Button variant="success" size="sm" className="me-2"
                                            onClick={() => handleEditClick(account)}
                                        >Detail
                                        </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <TablePagination />
                        </Table>
                    </div>
                </Container>
            </div>
        </>
    )
}
