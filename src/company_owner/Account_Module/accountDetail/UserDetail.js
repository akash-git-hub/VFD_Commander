import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Stack, Image, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


export const UserDetail = ({ data }) => {
    const navigate = useNavigate();
    const [pre, setPre] = useState();

    useEffect(() => { setPre(data); }, [data])

    const handleEditClick = (data) => { navigate('/editaccount', { state: { data } }); };

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
                                            <p>Account ID : {pre && pre._id}</p>
                                        </Stack>
                                        <Button variant="warning" size="sm" onClick={() => handleEditClick(pre)} style={{
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
                                        <h6>{pre && pre.first_name}</h6>
                                    </Col>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Last Name</p>
                                        <h6>{pre && pre.last_name}</h6>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Account Name</p>
                                        <h6>{pre && pre.account_name}</h6>
                                    </Col>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Billing Address 1</p>
                                        <h6>{pre && pre.billing_address}</h6>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Billing Address 2</p>
                                        <h6>{pre && pre.billing_addres2}</h6>
                                    </Col>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>City</p>
                                        <h6>{pre && pre.city}</h6>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>State</p>
                                        <h6>{pre && pre.state}</h6>
                                    </Col>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Zip Code</p>
                                        <h6>{pre && pre.zip_code}</h6>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Contact Phone</p>
                                        <h6>+91 {pre && pre.mobile_no}</h6>
                                    </Col>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Account Owner Email Address</p>
                                        <h6>{pre && pre.email}</h6>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Subscription Name</p>
                                        <h6>{pre && pre.subscription_id && pre.subscription_id.name}</h6>
                                    </Col>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Billing Information</p>
                                        <h6>INR {pre && pre.subscription_id && pre.subscription_id.pricing}</h6>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Renewal Date</p>
                                        <h6>{pre && pre.renewal_date}</h6>
                                    </Col>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Incentive Information</p>
                                        <h6>{pre && pre.incentive_information}</h6>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Time Zone</p>
                                        <h6>{pre && pre.time_zone}</h6>
                                    </Col>
                                    <Col md={6}>
                                        <p className='mb-2 paraText'>Time Display</p>
                                        <h6>{pre && pre.time_formate === "hh:mm:ss A" ? "12-Hours" : "24-Hours"}</h6>
                                    </Col>
                                </Row>

                                <Row className='mb-3'>
                                    {pre && pre.add_field && (pre.add_field).map((e,i) => (
                                        <Col md={6} key={i}>
                                            <p className='mb-2 paraText'>{e.title}</p>
                                            <h6>{e.value}</h6>
                                        </Col>
                                    ))}

                                </Row>
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
