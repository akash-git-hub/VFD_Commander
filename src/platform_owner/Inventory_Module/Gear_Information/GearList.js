import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap'
import { getGear_API } from '../../../api_services/Apiservices';

export const GearList = ({ setLoder }) => {
    const [trdata, setTrdata] = useState([]);
    const getdata = async () => {
        setLoder(true);
        const resp = await getGear_API();
        if (resp && resp.success) {
            setLoder(false);
            setTrdata(resp.data);
        }
        setLoder(false);
    }
    useEffect(() => { getdata(); }, [])
    return (
        <>
            <div className='GearList'>
                <Container>
                    <Row>
                        {trdata && trdata.map((e) => (
                            <Col md={6}>
                                <div className='Plans'>
                                    <Stack direction='vertical' gap={2}>
                                        <Stack direction='horizontal' gap={2} style={{
                                            justifyContent: 'space-between'
                                        }}>
                                            <div className='GearListHeading'>
                                                <h5>{e.gear_item_name}</h5>
                                                <h6 style={{
                                                    color: '#7B8C87'
                                                }}>{e._id}</h6>
                                            </div>
                                            <h6>{e.gearttype_id && e.gearttype_id.name}</h6>
                                        </Stack>
                                        <p style={{
                                            textAlign: 'justify',
                                            color: '#7B8C87'
                                        }}><b>Gear Item Description : </b>{e.description}</p>
                                        <Stack direction='horizontal' gap={2} style={{
                                            justifyContent: 'space-between'
                                        }}>
                                            <h6 style={{
                                                color: '#7B8C87'
                                            }}>Date Received</h6>
                                            <p>{e.recevied_date}</p>
                                            {/* <h6 style={{
                                                color:'#7B8C87'
                                            }}>Replacement Date</h6> */}
                                        </Stack>
                                        <Stack direction='horizontal' gap={2} style={{
                                            justifyContent: 'space-between'
                                        }}>
                                            <h4>INR {e.item_cost}</h4>
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
