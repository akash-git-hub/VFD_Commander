import React from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap'

export const GearList = () => {
    return (
        <>
            <div className='GearList'>
                <Container>
                    <Row>
                        <Col md={6}>
                            <div className='Plans'>
                                <Stack direction='vertical' gap={2}>
                                    <Stack direction='horizontal' gap={2} style={{
                                        justifyContent: 'space-between'
                                    }}>
                                        <div className='GearListHeading'>
                                            <h5>Gear Item Name</h5>
                                            <h6 style={{
                                                color:'#7B8C87'
                                            }}>Gear Item ID</h6>
                                        </div>
                                        <h6>Gear Type</h6>
                                    </Stack>
                                    <p style={{
                                        textAlign: 'justify',
                                         color:'#7B8C87'
                                    }}><b>Gear Item Description : </b>Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                    <Stack direction='horizontal' gap={2} style={{
                                        justifyContent: 'space-between'
                                    }}>
                                        <h6 style={{
                                                color:'#7B8C87'
                                            }}>Date Received</h6>
                                        <h6 style={{
                                                color:'#7B8C87'
                                            }}>Replacement Date</h6>
                                    </Stack>
                                    <Stack direction='horizontal' gap={2} style={{
                                        justifyContent: 'space-between'
                                    }}>
                                        <div>
                                            <h6>Issue Date</h6>
                                            <h6>Issue Date</h6>
                                        </div>
                                        <h4>INR 599</h4>
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
