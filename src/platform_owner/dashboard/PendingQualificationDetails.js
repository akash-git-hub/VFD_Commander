import { Row, Col, Container } from "react-bootstrap";
import { SharedButton } from "../../components/Button";
import { PoSidebar } from "../PO_Sidebar";
import { Headings } from "../../components/Headings";
import { PendingQualificationTable } from "./PendingQualificationExpireTable";

export const PendingQualification = () => {
    const pendingQualification = [{name:'Jackson',qualification:'CPR I',expiration:'10/15/2024'},{name:'Jackson',qualification:'CPR I',expiration:'10/15/2024'},{name:'Jackson',qualification:'CPR I',expiration:'10/15/2024'},{name:'Jackson',qualification:'CPR I',expiration:'10/15/2024'},{name:'Jackson',qualification:'CPR I',expiration:'10/15/2024'}];
   return (
        <div className="upcoming-event">
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <PoSidebar />
                    </Col>
                    <Col md={9}>
                        <Headings MainHeading={"Pending Qualification Information"} HeadButton={<SharedButton onClick={()=>window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }}/>} />
                        <hr/>
                        <div className='my-md-4'>
                         <PendingQualificationTable data={pendingQualification}/>
                         </div>
                        </Col>
                </Row>
            </Container>
        </div>
    );
}