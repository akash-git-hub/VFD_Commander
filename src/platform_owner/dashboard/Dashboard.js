import { Button, Row, Col, Container, Stack } from "react-bootstrap";
import { PoSidebar } from "../PO_Sidebar";
import { Headings } from "../../components/Headings";
import { UpcomingEventTable } from "./UpcomingEventTable";
import { ApparatusStatusTable } from "./ApparatusStatusTable";
import { PendingQualificationTable } from "./PendingQualificationExpireTable";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { UnavailableStaffTodayTable } from "./UnavailableStaffTodayTable";

export const Dashboard = () => {
    const Event = [{ eventType: 'Training', eventName: 'ladder Training', eventDate: '09-28-2024', eventTime: '9:00' },
    { eventType: 'Training', eventName: 'ladder Training', eventDate: '09-28-2024', eventTime: '9:00' },
    { eventType: 'Training', eventName: 'ladder Training', eventDate: '09-28-2024', eventTime: '9:00' },
    { eventType: 'Training', eventName: 'ladder Training', eventDate: '09-28-2024', eventTime: '9:00' },
    { eventType: 'Training', eventName: 'ladder Training', eventDate: '09-28-2024', eventTime: '9:00' },
    { eventType: 'Training', eventName: 'ladder Training', eventDate: '09-28-2024', eventTime: '9:00' }
    ]
    const Apparatus = [{ name: 'truck 450', type: 'vehicles', status: 'in service' },{ name: 'truck 450', type: 'vehicles', status: 'in service' },{ name: 'truck 450', type: 'vehicles', status: 'in service' },{ name: 'truck 450', type: 'vehicles', status: 'in service' },{ name: 'truck 450', type: 'vehicles', status: 'in service' },{ name: 'truck 450', type: 'vehicles', status: 'in service' },{ name: 'truck 450', type: 'vehicles', status: 'in service' },{ name: 'truck 450', type: 'vehicles', status: 'in service' },{ name: 'truck 450', type: 'vehicles', status: 'in service' },{ name: 'truck 450', type: 'vehicles', status: 'in service' },{ name: 'truck 450', type: 'vehicles', status: 'in service' },{ name: 'truck 450', type: 'vehicles', status: 'in service' }, { name: 'truck 450', type: 'vehicles', status: 'out of service' }, { name: 'truck 450', type: 'vehicles', status: 'in service' }, { name: 'truck 450', type: 'vehicles', status: 'in service' }, { name: 'truck 450', type: 'vehicles', status: 'out of service' }];
    const pendingQualification = [{ name: 'Jackson', qualification: 'CPR I', expiration: '10/15/2024' }, { name: 'Jackson', qualification: 'CPR I', expiration: '10/15/2024' }, { name: 'Jackson', qualification: 'CPR I', expiration: '10/15/2024' }, { name: 'Jackson', qualification: 'CPR I', expiration: '10/15/2024' }, { name: 'Jackson', qualification: 'CPR I', expiration: '10/15/2024' }];
    const unavailableStaff = [{ name: 'jackson', department: 'training', address: 'indore', phone: '1234567890' }, { name: 'jackson', department: 'training', address: 'indore', phone: '1234567890' }, { name: 'jackson', department: 'training', address: 'indore', phone: '1234567890' }, { name: 'jackson', department: 'training', address: 'indore', phone: '1234567890' }, { name: 'jackson', department: 'training', address: 'indore', phone: '1234567890' }, { name: 'jackson', department: 'training', address: 'indore', phone: '1234567890' }, { name: 'jackson', department: 'training', address: 'indore', phone: '1234567890' }, { name: 'jackson', department: 'training', address: 'indore', phone: '1234567890' }, { name: 'jackson', department: 'training', address: 'indore', phone: '1234567890' }, { name: 'jackson', department: 'training', address: 'indore', phone: '1234567890' }, { name: 'jackson', department: 'training', address: 'indore', phone: '1234567890' }, { name: 'jackson', department: 'training', address: 'indore', phone: '1234567890' }, { name: 'jackson', department: 'training', address: 'indore', phone: '1234567890' }, { name: 'jackson', department: 'training', address: 'indore', phone: '1234567890' }, { name: 'jackson', department: 'training', address: 'indore', phone: '1234567890' }];
    return (
        <div className="dashboard">
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <PoSidebar />
                    </Col>

                    <Col md={9}>
                        <Headings MainHeading={'Dashboard'} />
                        <hr />
                        <Row>
                            <Col md={8}>
                                <Container className='mt-4'>
                                    <h5 className=" m-md-3 text-primary">Apparatus Status</h5>
                                    <ApparatusStatusTable data={Apparatus} />
                                </Container>
                            </Col>
                            <Col md={4}>
                                <Container className='mt-4' >
                                    <h5 className="m-md-3 text-primary">Unavailable Staff Today</h5>
                                    <div className='MainTable'>
                                        <h6 className='mx-3 my-3'>NAME</h6>
                                        {unavailableStaff.map((data,index)=>{return(<p key={index} className='mx-3 mb-1'>{data.name}</p>);})}
                                    </div>
                                </Container>
                            </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                                <Container className='mt-4'>
                                    <h5 className=" m-md-3 text-primary">Upcoming Event Information</h5>
                                    <UpcomingEventTable data={Event} />
                                </Container>
                            </Col>
                            <Col md={12}>
                                <Container className='mt-4'>
                                    <h5 className=" m-md-3 text-primary">Pending Qualifications Expirations </h5>
                                    <PendingQualificationTable data={pendingQualification} />
                                </Container>
                            </Col>
                        </Row>
                     
                    </Col>
                </Row>
            </Container>
        </div>
    );
}