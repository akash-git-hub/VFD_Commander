import { Row, Col, Container } from "react-bootstrap";
import { SharedButton } from "../../components/Button";
import { PoSidebar } from "../PO_Sidebar";
import { UpcomingEventTable } from "./UpcomingEventTable";
import { Headings } from "../../components/Headings";
import { ApparatusStatusTable } from "./ApparatusStatusTable";

export const ApparatusStatus = () => {
    const Apparatus = [{name:'truck 450', type:'vehicles',status:'in service'},{name:'truck 450', type:'vehicles',status:'out of service'},{name:'truck 450', type:'vehicles',status:'in service'},{name:'truck 450', type:'vehicles',status:'in service'},{name:'truck 450', type:'vehicles',status:'out of service'},{name:'truck 450', type:'vehicles',status:'out of service'},{name:'truck 450', type:'vehicles',status:'out of service'},{name:'truck 450', type:'vehicles',status:'out of service'},{name:'truck 450', type:'vehicles',status:'out of service'}];
    
    return (
        <div className="apparatus-status">
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <PoSidebar />
                    </Col>
                    <Col md={9}>
                        <Headings MainHeading={"Apparatus Status"} HeadButton={<SharedButton onClick={()=>window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }}/>} />
                         <hr/>
                        <div className='my-md-4'>
                         <ApparatusStatusTable data={Apparatus}/>
                         </div>
                        </Col>
                </Row>
            </Container>
        </div>
    );
}