import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap'
import { getApparatus_API } from '../../../api_services/Apiservices';

export const ApparatusList = ({ setLoder }) => {
    const [trdata, setTrdata] = useState([]);
    const getdata = async () => {
        setLoder(true);
        const resp = await getApparatus_API();
        if (resp && resp.success) {
            setLoder(false);
            setTrdata(resp.data);
        }
        setLoder(false);
    }
    useEffect(() => { getdata(); }, [])


    return (
        <>
            <div className='ApparatusList'>
                <Container>
                    <Row>
                        {trdata && trdata.map((e) => (
                            <Col md={6}>
                                <div className='Plans'>
                                    <Stack direction='vertical' gap={2}>
                                        <Stack direction='horizontal' gap={2} style={{
                                            justifyContent: 'space-between'
                                        }}>
                                            <div className='ApparatusHeading'>
                                                <h5>{e.name}</h5>
                                                <h6 style={{
                                                    color: '#7B8C87'
                                                }}>{e._id}</h6>
                                            </div>
                                            <h6>{e.apparatus_type}</h6>
                                        </Stack>
                                        <p style={{
                                            textAlign: 'justify',
                                            color: '#7B8C87'
                                        }}><b>Apparatus Description : </b>{e.description}</p>
                                        <Stack direction='horizontal' gap={2} style={{
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                <h6 style={{
                                                    color: '#7B8C87'
                                                }}>In Service Date</h6>
                                                <p>{e.service_date}</p>
                                            </div>
                                            <div>
                                                <h6 style={{
                                                    color: '#7B8C87'
                                                }}>Replacement Date</h6>
                                                <p>{e.replace_date}</p>
                                            </div>
                                        </Stack>
                                        <Stack direction='horizontal' gap={2} style={{
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                            </div>
                                            <h4>INR {e.cost}</h4>
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
