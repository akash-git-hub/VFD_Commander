import React from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap'
import { NotificationModal } from '../../commonpages/NotificationModal'

export const NotificationList = () => {
    return (
        <>
            <div className='Notifications'>
                <Container>
                    <Row>
                        <Col md={12} className='mb-3'>
                            <div className='Plans'>
                                <Stack direction='horizontal' gap={2} style={{
                                    justifyContent:'space-between',
                                    alignItems:'center'
                                }}>
                                    <Stack direction='horizontal' gap={2} style={{
                                        justifyContent: 'space-between'
                                    }}>
                                        <h5>Jenny Wilson</h5>
                                        {/* <h6>10:00 AM</h6> */}
                                    </Stack>
                                    <p style={{
                                        textAlign: 'justify'
                                    }}>Lorem ipsum</p>
                                    <Stack direction='horizontal' gap={2} style={{
                                        justifyContent: 'space-between'
                                    }}>
                                        <h6>20/12/2023</h6>
                                    </Stack>
                                    <Stack direction='horizontal' gap={2}>
                                        <NotificationModal/>
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
