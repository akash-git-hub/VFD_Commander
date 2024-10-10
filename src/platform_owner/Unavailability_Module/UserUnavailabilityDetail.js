import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs, Button } from 'react-bootstrap'
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
    const [shift, setShift] = useState([]);
    const [selectedDa, setSelectedDa] = useState();
    const abc = [];

    useEffect(() => {
        if (prData && prData.data.length > 0) {
            prData.data.map((e) => {
                abc.push(new Date(moment(e.date).format('DD MMM YYYY')));
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
        const formattedDate = date.toISOString().slice(0, 10);
        let pre = [];
        if (prData) {
            pre = prData.data;
        }
        const resp = pre.filter((e) =>new Date(moment(e.date).format('DD MMM YYYY')).toISOString().slice(0, 10) === formattedDate);
        setShift(resp);
    }

    // useEffect(() => {
    //     const currentDateUTC = new Date(moment().format('DD MMM YYYY'));
    //     onClick(currentDateUTC);
    // }, [prData])
    // const blank = () => { }
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
                                                    {shift.length > 0 && shift[0].morning === "yes" ?
                                                        <Button className={"w-100 m-3"} type={"button"} variant={"primary"} size={'md'}>
                                                            Morning
                                                        </Button>
                                                        :
                                                        <Button className={"w-100 m-3"} type={"button"} variant={"secondary"} size={'md'} disabled >
                                                            "Morning"
                                                        </Button>
                                                    }
                                                    {shift.length > 0 && shift[0].afternoon === "yes" ?
                                                        <Button className={"w-100 m-3"} type={"button"} variant={"primary"} size={'md'} >
                                                            Afternoon
                                                        </Button>
                                                        :
                                                        <Button className={"w-100 m-3"} type={"button"} variant={"secondary"} size={'md'} disabled >
                                                            Afternoon
                                                        </Button>
                                                    }
                                                    {shift.length > 0 && shift[0].evening === "yes" ?
                                                        <Button className={"w-100 m-3"} type={"button"} variant={"primary"} size={'md'}  >
                                                            Evening
                                                        </Button>
                                                        :
                                                        <Button className={"w-100 m-3"} type={"button"} variant={"secondary"} size={'md'} disabled>
                                                            Evening
                                                        </Button>
                                                    }
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
