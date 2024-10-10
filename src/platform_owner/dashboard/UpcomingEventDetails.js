import { Row, Col, Container } from "react-bootstrap";
import { SharedButton } from "../../components/Button";
import { PoSidebar } from "../PO_Sidebar";
import { UpcomingEventTable } from "./UpcomingEventTable";
import { Headings } from "../../components/Headings";

export const UpcomingEvent = () => {
    const Event = [{eventType:'Training',eventName:'ladder Training',eventDate:'09-28-2024',eventTime:'9:00'},
        {eventType:'Training',eventName:'ladder Training',eventDate:'09-28-2024',eventTime:'9:00'},
        {eventType:'Training',eventName:'ladder Training',eventDate:'09-28-2024',eventTime:'9:00'},
        {eventType:'Training',eventName:'ladder Training',eventDate:'09-28-2024',eventTime:'9:00'},
        {eventType:'Training',eventName:'ladder Training',eventDate:'09-28-2024',eventTime:'9:00'},
        {eventType:'Training',eventName:'ladder Training',eventDate:'09-28-2024',eventTime:'9:00'}
    ]
    return (
        <div className="upcoming-event">
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <PoSidebar />
                    </Col>
                    <Col md={9}>
                        <Headings MainHeading={"Upcoming Events Information"} HeadButton={<SharedButton onClick={()=>window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }}/>} />
                        <hr/>
                        <div className='my-md-4'>
                         <UpcomingEventTable data={Event}/>
                         </div>
                        </Col>
                </Row>
            </Container>
        </div>
    );
}