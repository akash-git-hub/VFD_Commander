import React from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap'

export const Plans = () => {
    return (
        <>
            <div className='SubscriptionPlans'>
                <Container>
                    <Row>
                        <Col md={6}>
                            <div className='Plans'>
                                <Stack direction='vertical' gap={2}>
                                    <Stack direction='horizontal' gap={2} style={{
                                        justifyContent: 'space-between'
                                    }}>
                                        <h5>Premium Plan</h5>
                                        <h6>10:00 AM</h6>
                                    </Stack>
                                    <p style={{
                                        textAlign: 'justify'
                                    }}><b>Descriptions : </b>Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                    <Stack direction='horizontal' gap={2} style={{
                                        justifyContent: 'space-between'
                                    }}>
                                        <h6>02/05/2024</h6>
                                        <h6>02/06/2024</h6>
                                    </Stack>
                                    <Stack direction='horizontal' gap={2}>
                                        <h4>INR 599 <sup style={{
                                            color: 'green'
                                        }}>Annual</sup></h4>
                                    </Stack>
                                </Stack>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
