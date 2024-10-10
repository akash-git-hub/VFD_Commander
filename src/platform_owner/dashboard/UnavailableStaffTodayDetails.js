import { Row, Col, Container } from "react-bootstrap";
import { SharedButton } from "../../components/Button";
import { PoSidebar } from "../PO_Sidebar";
import { Headings } from "../../components/Headings";
import { UnavailableStaffTodayTable } from "./UnavailableStaffTodayTable";

export const UnavailableStaffToday = () => {
    const unavailableStaff =[{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'},{name:'jackson',department:'training',address:'indore',phone:'1234567890'}];
 
    return (
        <div className="unavailable-staff">
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <PoSidebar />
                    </Col>
                    <Col md={9}>
                        <Headings MainHeading={"Unavailable Staff Today"} HeadButton={<SharedButton onClick={()=>window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }}/>} />
                         <hr/>
                        <div className='my-md-4'>
                          <UnavailableStaffTodayTable data={unavailableStaff}/>
                         </div>
                        </Col>
                </Row>
            </Container>
        </div>
    );
}