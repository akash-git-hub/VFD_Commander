import React from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap'

export const QualificationList = () => {
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
                                            <h5>Qualification Name</h5>
                                            <h6 style={{
                                                color:'#7B8C87'
                                            }}>Qualification ID</h6>
                                        </div>
                                        <h6>Qualification Type</h6>
                                    </Stack>
                                    <p style={{
                                        textAlign: 'justify',
                                         color:'#7B8C87'
                                    }}><b>Description : </b>Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                    <Stack direction='horizontal' gap={2} style={{
                                        justifyContent: 'space-between'
                                    }}>
                                        <h6>Display Name</h6>
                        
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
