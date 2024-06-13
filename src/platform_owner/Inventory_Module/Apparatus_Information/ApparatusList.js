import React from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap'

export const ApparatusList = () => {
    return (
        <>
            <div className='ApparatusList'>
                <Container>
                    <Row>
                        <Col md={6}>
                            <div className='Plans'>
                                <Stack direction='vertical' gap={2}>
                                    <Stack direction='horizontal' gap={2} style={{
                                        justifyContent: 'space-between'
                                    }}>
                                        <div className='ApparatusHeading'>
                                            <h5>Apparatus Name</h5>
                                            <h6 style={{
                                                color:'#7B8C87'
                                            }}>Apparatus ID</h6>
                                        </div>
                                        <h6>Apparatus Type</h6>
                                    </Stack>
                                    <p style={{
                                        textAlign: 'justify',
                                        color:'#7B8C87'
                                    }}><b>Apparatus Description : </b>Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                    <Stack direction='horizontal' gap={2} style={{
                                        justifyContent: 'space-between'
                                    }}>
                                        <h6 style={{
                                                color:'#7B8C87'
                                            }}>In Service Date</h6>
                                        <h6 style={{
                                                color:'#7B8C87'
                                            }}>Replacement Date</h6>
                                    </Stack>
                                    <Stack direction='horizontal' gap={2} style={{
                                        justifyContent: 'space-between'
                                    }}>
                                        <div>
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
