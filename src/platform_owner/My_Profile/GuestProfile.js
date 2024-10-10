import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Stack, } from 'react-bootstrap';
import moment from 'moment';


export const GuestProfile = ({ useData }) => {
    const [fields, setFields] = useState([]);

    useEffect(() => {
        if (useData && useData.add_field) {
            setFields(useData.add_field);
        }
    }, [useData]);

    return (
        <>
            <div className='CreateAccountForm'>
                <Container>
                    <Stack className='px-1' direction='horizontal' gap={2} style={{
                        justifyContent: 'space-between'
                    }}>
                        <Stack direction='vertical' gap={0}>
                            <img src={useData && useData.image ? useData.image : 'assets/images/avatar.png'} alt="Profile Preview" className='img-fluid' style={{
                                width: '100px',
                                height: '100px',
                                border: "1px solid",
                                borderRadius: "50px",
                            }} />
                        </Stack>
                    </Stack>
                    <Row className='mb-5 mt-5'>
                        <Col md={4} className='mb-3'>
                            <h6>Account ID</h6>
                            <p>{useData?._id}</p>
                        </Col>
                        <Col md={4} className='mb-3'>
                            <h6>First Name</h6>
                            <p>{useData?.first_name}</p>
                        </Col>
                        <Col md={4} className='mb-3'>
                            <h6>Last Name</h6>
                            <p>{useData?.last_name}</p>
                        </Col>
                        <Col md={4} className='mb-3'>
                            <h6>Contact Email</h6>
                            <p>{useData?.email}</p>
                        </Col>
                        <Col md={4} className='mb-3'>
                            <h6>Contact Mobile No</h6>
                            <p>{useData?.mobile_no}</p>
                        </Col>
                        <Col md={4} className='mb-3'>
                            <h6>Supervisor</h6>
                            <p>{useData?.supervisor}</p>
                        </Col>
                        <Col md={4} className='mb-3'>
                            <h6>Position</h6>
                            <p>{useData?.position}</p>
                        </Col>
                        <Col md={4} className='mb-3'>
                            <h6>Role</h6>
                            <p>{useData?.role?.role}</p>
                        </Col>
                        <Col md={4} className='mb-3'>
                            <h6>Address</h6>
                            <p>{useData?.billing_address}</p>
                        </Col>
                        <Col md={4} className='mb-3'>
                            <h6>City</h6>
                            <p>{useData?.city}</p>
                        </Col>
                        <Col md={4} className='mb-3'>
                            <h6>State</h6>
                            <p>{useData?.state}</p>
                        </Col>
                        <Col md={4} className='mb-3'>
                            <h6>Zip Code</h6>
                            <p>{useData?.zip_code}</p>
                        </Col>
                        <Col md={4} className='mb-3'>
                            <h6>Start Date</h6>
                            <p>{useData && moment.unix(useData.start_date).format("MM-DD-YYYY")}</p>
                        </Col>
                        <Col md={4} className='mb-3'>
                            <h6>Term Date</h6>
                            <p>{useData && moment.unix(useData.term_date).format("MM-DD-YYYY")}</p>
                        </Col>
                        <Col md={4} className='mb-3'>
                            <h6>Status </h6>
                            <p>{useData?.status}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
