import moment from 'moment'
import React from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap'

export const Plans = ({ planList }) => {
    return (
        <>
            <div className='SubscriptionPlans'>
                <Container>
                    <Row>
                        {planList && planList.length > 0 && planList.map((e,i) => (
                            <Col md={6} key={i}  className='mb-3'>
                                <div className='Plans'>
                                    <Stack direction='vertical' gap={2}>
                                        <Stack direction='horizontal' gap={2} style={{
                                            justifyContent: 'space-between'
                                        }}>
                                            <h5>{e.name}</h5>
                                            {/* <h6>10:00 AM</h6> */}
                                        </Stack>
                                        <p style={{
                                            textAlign: 'justify'
                                        }}><b>Descriptions : </b>{e.description}</p>
                                        <Stack direction='horizontal' gap={2} style={{
                                            justifyContent: 'space-between'
                                        }}>
                                            <h6>{moment.unix(e.start_date).format("MM-DD-YYYY")}</h6>
                                            <h6>{moment.unix(e.end_date).format("MM-DD-YYYY")}</h6>
                                        </Stack>
                                        <Stack direction='horizontal' gap={2}>
                                            <h4 style={{display:"flex",alignItems:"center"}}>$ {e.pricing}
                                                 <span style={{  color: 'green', fontSize:"15px", marginLeft:"5px" }}>{e.billing_interval}</span>
                                            </h4>
                                        </Stack>
                                    </Stack>
                                </div>
                            </Col>
                        ))}

                    </Row>
                </Container>
            </div>
        </>
    )
}
