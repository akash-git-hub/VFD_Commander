import React from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap'


export const ListView = () => {
    return (
        <>
            <div className='TrainingViewList'>
                <Container>
                    <Row>
                        <Col md={6}>
                            <div className='Plans'>
                                <Stack direction='vertical' gap={2}>
                                    <Stack direction='horizontal' gap={2} style={{
                                        justifyContent: 'space-between'
                                    }}>
                                        <h5>User Profile Integration</h5>
                                        <h6>Training Catalog</h6>
                                    </Stack>
                                    <p style={{
                                        textAlign: 'justify'
                                    }}>Training Completion Tracking</p>
                                    <Stack direction='horizontal' gap={2} style={{
                                        justifyContent: 'space-between'
                                    }}>
                                        <h6 style={{
                                            color:'#919191'
                                        }}>Training Totals</h6>
                                        <h6 style={{
                                            color:'#919191'
                                        }}>User Enrolment</h6>
                                    </Stack>
                                    <Stack direction='horizontal' gap={2} style={{
                                        justifyContent: 'space-between'
                                    }}>
                                        <h6>Scheduled Training</h6>
                                        <h6>User Enrollment</h6>
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
