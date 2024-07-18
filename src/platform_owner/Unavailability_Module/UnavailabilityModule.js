import React, { useEffect, useState } from 'react'
import { UnavailabilityTableList } from './UnavailabilityTableList'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { PoSidebar } from '../PO_Sidebar'
import { unavailableUsers_API } from '../../api_services/Apiservices'
import { Loader } from '../../components/Loader'

export const UnavailabilityModule = () => {
    const [loder,setLoder] = useState(false);
    const [preData,setpreData] = useState([]);

    const getdata = async()=>{
        setLoder(true);
        const resp = await unavailableUsers_API();
        if (resp && resp.success) {
            setLoder(false);
            const prefdata = resp.data;
            setpreData(prefdata);
        }
        setLoder(false);
    }
    useEffect(()=>{ getdata(); },[])
    return (
        <>
        <Loader show={loder} />
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
                                    <UnavailabilityTableList  preData={preData}/>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
