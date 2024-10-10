import React, { useState } from 'react';
import { Button, Col, Container, Row, Stack, Table } from 'react-bootstrap';
import { TablePagination } from '../../components/TablePagination';
import { Navigate, useNavigate } from 'react-router-dom';
import { TbEdit } from 'react-icons/tb';
import { CheckBoxButton } from '../../components/CheckBoxButton';
import { IoClose } from 'react-icons/io5';
import moment from 'moment';

export const MessageTable = ({ messagedata = [] }) => {
    const [view, setView] = useState();
    const [isedit, setIsedit] = useState(false);
    const handleEditClick = (data) => {
        setView(data);
        setIsedit(true);
    }

    return (
        <>
            <div className='MainTable' style={{ padding: '20px 20px' }}>
                {isedit ?
                    <div className='CreateAccountForm UseDetailPages'>
                        <Container>
                            <Row style={{ justifyContent: 'end' }}>
                                <Col md={2} style={{ textAlign: "end" }}>
                                    <Button variant="dark" size="sm"
                                        onClick={() => setIsedit(false)} style={{
                                            fontSize: '1.2rem',
                                            lineHeight: '0'
                                        }}><IoClose />
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <h6>Date</h6>
                                    <p> {view && moment.unix(view.sendDate).format("MM-DD-YYYY")}  </p>
                                </Col>
                                <Col md={12}>
                                    <h6>Message</h6>
                                    <p> {view && view.message}  </p>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <h6>Users</h6>
                                <div className='RoleModule '>
                                    <Row style={{ display: 'flex' }}>
                                        <Stack direction='horizontal' gap={3}>
                                            {view && (view.client).map((e, i) => (
                                                <span key={i}>
                                                    <p>{i + 1}.{e && e.user_id && e.user_id.first_name + " " + e.user_id.last_name}</p>
                                                </span>
                                            ))}
                                        </Stack>
                                    </Row>
                                </div>
                            </Row>
                        </Container>
                    </div>
                    :

                    <>
                        <Table responsive className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Message</th>
                                    <th>Total Users</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messagedata.map((e, i) => (
                                    <tr key={i}>
                                        <td>{moment.unix(e.sendDate).format("MM-DD-YYYY")}</td>
                                        <td style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '5vw',
                                            width: '60%'
                                        }}>{e.message}</td>
                                        <td style={{
                                            maxWidth: '20px', textAlign: 'center'
                                        }}>{e.totleUsers}</td>
                                        <td>
                                            <Button variant="success" size="sm" className="me-2"
                                                onClick={() => handleEditClick(e)}
                                            >Detail
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        {/* <TablePagination pagination={pagination} pageHanlder={pageHanlder} /> */}
                    </>
                }
            </div>
        </>
    )
}
