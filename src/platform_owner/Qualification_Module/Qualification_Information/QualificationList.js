import React from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap'

export const QualificationList = ({ predata = [] }) => {
    return (
        <>
            <div className='GearList'>
                <Container>
                    <Row>
                        {predata && predata.map((e,i) => (
                            <Col md={6} key={i}>
                                <div className='UseDetailPages'>
                                    <Stack direction='vertical' gap={2}>
                                        <Stack direction='horizontal' gap={2} style={{
                                            justifyContent: 'space-between'
                                        }}>
                                            <div className='GearListHeading'>
                                                <h5>{e.name}</h5>
                                                <h6 style={{
                                                    color: '#7B8C87'
                                                }}>{e._id}</h6>
                                            </div>
                                            <h6>{e.type}</h6>
                                        </Stack>
                                        <p style={{
                                            textAlign: 'justify',
                                            color: '#7B8C87'
                                        }}><b>Description : </b>{e.description}</p>
                                        <Stack direction='horizontal' gap={2} style={{
                                            justifyContent: 'space-between'
                                        }}>
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
