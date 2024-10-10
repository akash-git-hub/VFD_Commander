import moment from 'moment'
import React from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { TbEdit } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

export const Plans = ({ planList }) => {
    const navigate = useNavigate();

    const handleEditClick = (data) => { navigate('/editplan', { state: { data } }); };
    return (
        <>
            <div className='SubscriptionPlans'>
                <Container>

                    <Row>
                        {planList && planList.length > 0 && planList.map((e, i) => (
                            <span key={i}>

                                <Col md={12} key={i} className='mb-3'>
                                    <div className='Plans'>

                                        <Stack direction='vertical' gap={2}>
                                            <Stack direction='horizontal' gap={2} style={{
                                                justifyContent: 'space-between'
                                            }}>
                                                <h5>{e.name}</h5>
                                                <Button variant="success" size="sm"
                                                    onClick={() => handleEditClick(e)}
                                                    style={{
                                                        fontWeight: '500',
                                                        marginRight: '1rem'
                                                    }}><TbEdit />
                                                </Button>
                                                {/* <h6>10:00 AM</h6> */}
                                            </Stack>

                                            <Stack direction='horizontal' gap={2} style={{ justifyContent: 'space-between' }}>
                                                {e.license_fee_amount &&
                                                    <span>
                                                        <span>License Fee Amount</span>
                                                        <h5>$ {e.license_fee_amount + ".00"}
                                                            <span style={{ color: 'green', fontSize: "15px", marginLeft: "5px" }}>{e.billing_interval}</span>
                                                        </h5>
                                                    </span>
                                                }
                                                {e.billing_interval &&
                                                    <span>
                                                        <span>Recurring Fee Amount</span>
                                                        <h5>$ {e.pricing + ".00"}
                                                            <span style={{ color: 'green', fontSize: "15px", marginLeft: "5px" }}>{e.billing_interval}</span>
                                                        </h5>
                                                    </span>
                                                }
                                                {e.start_date &&
                                                    <span >
                                                        <span>Start Date </span>
                                                        <h5 className='mt-1' style={{ textAlign: 'justify' }}> {moment.unix(e.start_date).format("MM-DD-YYYY")}</h5>
                                                    </span>
                                                }
                                                {e.end_date &&
                                                    <span>
                                                        <span>End Date</span>
                                                        <h5 className='mt-1'>{moment.unix(e.end_date).format("MM-DD-YYYY")}</h5>
                                                    </span>
                                                }
                                            </Stack>
                                            {e.description &&
                                                <>
                                                    <span>Descriptions</span>
                                                    <p style={{ textAlign: 'justify' }}>{e.description}</p>
                                                </>
                                            }
                                        </Stack>
                                    </div>
                                </Col>
                            </span>
                        ))}

                    </Row>
                </Container>
            </div>
        </>
    )
}
