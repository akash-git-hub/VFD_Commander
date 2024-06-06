import React from 'react'
import { Container, Row, Col, Stack, Image, Button } from 'react-bootstrap'


export const UserDetail = () => {
    return (
        <>
            <div className='UseDetailPages'>
                <Container>
                    <Row>
                        <Col md={12}>
                            <Stack direction='vertical' gap={1} style={{
                                justifyContent: 'space-between'
                            }}>
                                <div className='User'>
                                    <Stack direction='horizontal' gap={2}>
                                        <Image src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.1518270500.1717459200&semt=ais_user" className='Avatar_img' rounded />
                                        <Stack direction='vertical' gap={1}>
                                            <h4>Jenny Wilson</h4>
                                            <p>Account ID : 5146846548465</p>
                                        </Stack>
                                        <Button variant="warning" size="sm" style={{
                                            background: '#FEF2F2',
                                            color: '#991B1B',
                                            borderColor: '#FEF2F2',
                                            fontWeight: '500'
                                        }}>Edit
                                        </Button>
                                    </Stack>
                                </div>
                                <hr />
                                <Row className='mb-3'>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>First Name</p>
                                        <h6>Jenny</h6>
                                    </Col>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Last Name</p>
                                        <h6>Wilson</h6>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Account Name</p>
                                        <h6>Futurrsitic</h6>
                                    </Col>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Billing Address 1</p>
                                        <h6>scheme 24 - Vijay Nagar</h6>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Billing Address 2</p>
                                        <h6>scheme 24 - Vijay Nagar</h6>
                                    </Col>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>City</p>
                                        <h6>Indore</h6>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>State</p>
                                        <h6>Madhya Pradesh</h6>
                                    </Col>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Zip Code</p>
                                        <h6>452001</h6>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Contact Phone</p>
                                        <h6>+91 8989898877</h6>
                                    </Col>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Account Owner Email Address</p>
                                        <h6>Futurristic@gmail.com</h6>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Subscription Name</p>
                                        <h6>Premium Plus</h6>
                                    </Col>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Billing Information</p>
                                        <h6>INR 599</h6>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Renewal Date</p>
                                        <h6>02/05/2024</h6>
                                    </Col>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Incentive Information</p>
                                        <h6>Reward Details</h6>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Time Zone</p>
                                        <h6>Central Time</h6>
                                    </Col>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Time Display</p>
                                        <h6>12 or 24 Hour</h6>
                                    </Col>
                                </Row>
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
