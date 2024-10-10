import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { PoSidebar } from '../../PO_Sidebar'
import { AdminstratorForm } from './AdminstratorForm'
import { SharedButton } from '../../../components/Button'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../../components/Loader'
import { PosiotinForm } from '../PosiotinForm'
import { getPosition_API } from '../../../api_services/Apiservices'

export const ProfileAdminstrator = () => {
    const [loder, setLoder] = useState(false);
    const [key,setKey] = useState("home");
    const navigate = useNavigate();
    const handleCreateAccount = () => {
        navigate('/adminstratorprofilelist');
    }


    const [positionOp, setPositionOp] = useState([]);

    const getposition = async () => {
        const resp = await getPosition_API();
        if (resp) {
            const findata = resp.data;
            const mydata = findata.map(e => ({ name: e.name, value: e._id }));
            setPositionOp(mydata);
        }
    }

    useEffect(() => {
        getposition();
    }, [])
    return (
        <>
            <Loader show={loder} />
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"User Profile"} HeadButton={<SharedButton onClick={()=>window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='my-md-4'>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}                                
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="User Information">
                                    <AdminstratorForm setLoder={setLoder} positionOp={positionOp} getposition={getposition} />
                                </Tab>
                                {/* <Tab eventKey="position" title="Position Information">
                                    <PosiotinForm setLoder={setLoder} positionOp={positionOp} getposition={getposition} />
                                </Tab> */}
                            </Tabs>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
