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
    const Event = [{eventType:'Training',eventName:'ladder Training',eventDate:'09-28-2024',eventTime:'9:00'},
        {eventType:'Training',eventName:'ladder Training',eventDate:'09-28-2024',eventTime:'9:00'},
        {eventType:'Training',eventName:'ladder Training',eventDate:'09-28-2024',eventTime:'9:00'},
        {eventType:'Training',eventName:'ladder Training',eventDate:'09-28-2024',eventTime:'9:00'},
        {eventType:'Training',eventName:'ladder Training',eventDate:'09-28-2024',eventTime:'9:00'},
        {eventType:'Training',eventName:'ladder Training',eventDate:'09-28-2024',eventTime:'9:00'}
    ]
    const Apparatus = [{name:'truck 450', type:'vehicles',status:'in service'},{name:'truck 450', type:'vehicles',status:'out of service'},{name:'truck 450', type:'vehicles',status:'in service'},{name:'truck 450', type:'vehicles',status:'in service'},{name:'truck 450', type:'vehicles',status:'out of service'}];
    const pendingQualification = [{name:'Jackson',qualification:'CPR I',expiration:'10/15/2024'},{name:'Jackson',qualification:'CPR I',expiration:'10/15/2024'},{name:'Jackson',qualification:'CPR I',expiration:'10/15/2024'},{name:'Jackson',qualification:'CPR I',expiration:'10/15/2024'},{name:'Jackson',qualification:'CPR I',expiration:'10/15/2024'}];
    const unavailableStaff =[{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'}];
    const navigate = useNavigate();
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
                            <Col md={4}>
                                <Container className='border border-dark rounded mt-4' style={{minHeight:'95%'}}>
                                    <Stack direction="horizontal" gap={0} style={{ justifyContent: 'space-between' }}>
                                        <h5 className="m-md-3 text-primary">Unavailable Staff Today</h5>
                                        <Button variant="transparent" size="lg" onClick={()=>{navigate("/unavailableStaffDetails")}}><BsThreeDots /></Button>
                                    </Stack>
                                    {(unavailableStaff.slice(0,10)).map((data,index)=>{return(<p key={index} className='mx-3 mb-1'>{data.name}</p>);})}
                                    {unavailableStaff.length > 10 && ( <p className='mx-3 mb-1'><Link to='/unavailableStaffDetails' className="text-decoration-none text-dark">More...</Link></p>)}
                                </Container>
                            </Col>
                            <Col md={8}>
                                <Container className='border border-dark rounded mt-4'>
                                    <Stack direction="horizontal" gap={2} style={{ justifyContent: 'space-between'}}>
                                        <h5 className=" m-md-3 text-primary">Upcoming Event Information</h5>
                                        <Button variant="transparent" size="lg" onClick={()=>{navigate("/upcomingEventDetails")}}><BsThreeDots /></Button>
                                    </Stack>
                                    <UpcomingEventTable count={3} data={Event} />
                                </Container>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                            <Container className='border border-dark rounded mt-4'>
                                <Stack direction="horizontal" gap={2} style={{ justifyContent: 'space-between' }}>
                                    <h5 className=" m-md-3 text-primary">Apparatus Status</h5>
                                    <Button variant="transparent" size="lg" onClick={()=>{navigate("/apparatusStatusDetails")}}><BsThreeDots /></Button>
                                </Stack>
                                <ApparatusStatusTable count={3} data={Apparatus}/>
                                </Container>
                            </Col>
                            <Col md={8}>
                            <Container className='border border-dark rounded  mt-4'>
                                <Stack direction="horizontal" gap={2} style={{ justifyContent: 'space-between' }}>
                                    <h5 className=" m-md-3 text-primary">Pending Qualifications Expirations </h5>
                                    <Button variant="transparent" size="lg" onClick={()=>{navigate("/pendingQualificationDetails")}}><BsThreeDots /></Button>
                                </Stack>
                                <PendingQualificationTable count={3} data={pendingQualification} />
                                </Container>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}