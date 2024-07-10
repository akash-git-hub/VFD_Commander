import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { CheckBoxButton } from '../../components/CheckBoxButton'
import { useLocation } from 'react-router-dom'
import moment from 'moment'


export const UserUnavailabilityDetail = () => {
    const state = useLocation().state;
    const [prData, setPrData] = useState();
    const [shift, setShift] = useState();
    const [selectedDa, setSelectedDa] = useState();
    const abc = [];

    useEffect(() => {
        if (prData && prData.data.length > 0) {
            prData.data.map((e) => {
                abc.push(new Date(moment(e.date).format('ddd MMM D YYYY HH:mm:ss')));
            })
            setSelectedDa(abc);
        } else {
            setSelectedDa();
        }
    }, [prData])

    useEffect(() => { if (state) { setPrData(state.data); } }, [state])


    const tileClassName = ({ date }) => {
        const formattedDate = date.toISOString().slice(0, 10);
        if (selectedDa && selectedDa.some(selectedDate =>
            selectedDate.toISOString().slice(0, 10) === formattedDate
        )) {
            return 'highlighted-date';
        }
        return null;
    };
    const onClick = (date) => {
        const formattedDate = moment(date).format("YYYY-MM-DD");
        const pre = prData.data;
        const resp = pre.filter((e) => moment(e.date).format("YYYY-MM-DD") === formattedDate);
        console.log("Filtered Response:", resp);
       
    }
    return (
        <>
            <div className='UnavailabilityModule'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Unavailability"} />
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={"home"}
                                className="my-4"
                            >
                                <Tab eventKey="home" title="Information">
                                    <Row>
                                        <Col md={4}>
                                            <Calendar tileClassName={tileClassName} onChange={onClick} />
                                        </Col>
                                        <Col md={8}>
                                            <h6>User Detail</h6>
                                            <div className='RoleName my-3'>
                                                <Row>
                                                    <Col md={6}>
                                                        <h6>Name</h6>
                                                        <h5 className='textName' style={{
                                                            padding: '1rem',
                                                            background: '#F7F8F9',
                                                            textAlign: 'center',
                                                            color: '#191D23',
                                                            fontWeight: '300'
                                                        }}>{prData && prData.first_name} {prData && prData.last_name}</h5>
                                                    </Col>
                                                    <Col md={6}>
                                                        <h6>Role</h6>
                                                        <h5 className='textName' style={{
                                                            padding: '1rem',
                                                            background: '#F7F8F9',
                                                            textAlign: 'center',
                                                            color: '#191D23',
                                                            fontWeight: '300'
                                                        }}>{prData && prData.role_name} </h5>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <h6 className='mt-4'>Unavailability</h6>
                                            <div className='RoleName'>
                                                <div className='SetAvailability d-flex'>
                                                    <CheckBoxButton BtnLabel={"Morning"} BtnClass={'w-100 m-3'} />
                                                    <CheckBoxButton BtnLabel={"Afternoon"} BtnClass={'w-100 m-3'} />
                                                    <CheckBoxButton BtnLabel={"Evening"} BtnClass={'w-100 m-3'} />
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container >
            </div >
        </>
    )
}
