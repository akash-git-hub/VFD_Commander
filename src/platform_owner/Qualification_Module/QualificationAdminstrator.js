import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import { QualificationForm } from './Qualification_Information/QualificationForm';
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { QualificationTypeForm } from './QualificationTypeForm';
import { getQtype_API } from '../../api_services/Apiservices';
export const QualificationAdminstrator = () => {
    const navigate = useNavigate();
    const [loder, setLoder] = useState(false);
    const [key, setKey] = useState('qualification');
  

    const handleCreateAccount = () => {
        navigate('/qualificationlist');
    }


    const [qtypeop, setQtypeop] = useState([]);
    const gettypes = async () => {
        const resp = await getQtype_API();
        if (resp) {
            const findata = resp.data;
            const mydata = findata.map(e => ({ name: e.name, value: e._id }));
            setQtypeop(mydata);
        }
    }

    useEffect(() => { gettypes(); }, [])

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
                            <Headings MainHeading={"Qualification Administration"} SubHeading={""} HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="qualification" title="Qualifications Information">
                                        <QualificationForm setLoder={setLoder} qtypeop={qtypeop} />
                                    </Tab>
                                    <Tab eventKey="qtype" title="Qualifications Type">
                                        <QualificationTypeForm setLoder={setLoder} gettypes={gettypes} qtypeop={qtypeop} />
                                    </Tab>
                                </Tabs>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
