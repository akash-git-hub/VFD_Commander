import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { CheckBoxButton } from '../../components/CheckBoxButton'


export const UserUnavailabilityDetail = () => {
    
    return (
        <>
            <div className='UnavailabilityModule'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Unavailability Module"} />
                            <div className='my-md-4'>
                                <Row>
                                    <Col md={4}>
                                        <Calendar />
                                    </Col>
                                    <Col md={8}>
                                        <div className='RoleName my-3'>
                                            <h6>Role Name</h6>
                                            <h5 className='textName' style={{
                                                padding: '1rem',
                                                background: '#F7F8F9',
                                                textAlign: 'center',
                                                color: '#191D23',
                                                fontWeight: '300'
                                            }}>Employer Name</h5>
                                        </div>
                                        <div className='RoleName'>
                                            <h6>Unavailability</h6>
                                            <div className='SetAvailability d-flex'>
                                                <CheckBoxButton BtnLabel={"Morning"} BtnClass={'w-100 m-3'}/>
                                                <CheckBoxButton BtnLabel={"Afternoon"} BtnClass={'w-100 m-3'}/>
                                                <CheckBoxButton BtnLabel={"Evening"} BtnClass={'w-100 m-3'}/>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
