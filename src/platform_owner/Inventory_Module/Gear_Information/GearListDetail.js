import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { Loader } from '../../../components/Loader';
import { PoSidebar } from '../../PO_Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateGearType_API } from '../../../api_services/Apiservices';
import { successAlert } from '../../../components/Alert';
import { Headings } from '../../../components/Headings';
import { SharedButton } from '../../../components/Button';
import { InputField } from '../../../components/InputField';
import { Textareanew } from '../../../components/Textareanew';



export default function GearListDetail() {
    const [indata, setIndata] = useState({ "trname": '', "description": "" });
    const [error, setError] = useState({ "trname": '', "description": "" })
    const [isedit, setIsedit] = useState(false);
    const [loder, setLoder] = useState(false);
    const location = useLocation();
    const [fields, setFields] = useState([]);
    const navigate = useNavigate();

    const addNewHandler = (e) => {
        const { name, value } = e.target;     
        const myfield = [...fields];
        const index = myfield.findIndex((item) => item.title === name);
        if (index !== -1) {
            myfield[index] = {
                ...myfield[index],
                value: value
            };
        }
        setFields(myfield);
    }



    useEffect(() => {
        if (location && location.state && location.state.data) {
            const data = location.state.data;
            if (data) {
                setIndata({ "trname": data.name, "description": data.description, "add_field": data.add_field, "id": data._id });
                setFields(data.add_field);
            }
        }
    }, [location])


    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoder(true);
        const fadat = {
            "id": indata.id,
            'name': indata.trname,
            "description": indata.description,
            "add_field": fields
        }
        const resp = await  updateGearType_API(fadat);
        if (resp && resp.success) {
            e.target.reset();
            setFields([]);
            setLoder(false);
            successAlert(resp.message);
            navigate("/inventorymodulelist", { state: { eventKey: "geartype" } });
        }
        setLoder(false);

    }
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
                            <Headings MainHeading={"Inventory Module"} HeadButton={<SharedButton BtnLabel={"Back"} onClick={() => window.history.back()} BtnVariant={'primary'} />} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={"home"}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Gear Type Detail">
                                        {isedit ?
                                            <>
                                                <div className='CreateAccountForm'>
                                                    <Container>

                                                        <Form onSubmit={handleSubmit}>
                                                            <Row style={{ justifyContent: 'end' }}>
                                                                <Col md={1}>
                                                                    <Button variant="warning" size="sm"
                                                                        onClick={() => setIsedit(false)} style={{
                                                                            background: '#FEF2F2',
                                                                            color: '#991B1B',
                                                                            borderColor: '#FEF2F2',
                                                                            fontWeight: '500'
                                                                        }}>Not Update
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-2'>
                                                                <Col md={12}>
                                                                    <InputField FormType={'text'} FormLabel={"Gear Type Name"} onChange={inputHandler} error={error.trname} value={indata.trname} name='trname' />
                                                                </Col>
                                                                <Col md={12}>
                                                                    <Textareanew FormType={'text'} rows={4} FormLabel={"Description"} onChange={inputHandler} error={error.description} value={indata.description} name='description' />
                                                                </Col>
                                                                {indata && indata.add_field && (indata.add_field).map((e, i) => (
                                                                    <Col md={12} key={i}>
                                                                        <InputField FormType={'text'} FormLabel={e.title} value={e.value} name={e.title} onChange={addNewHandler} FormPlaceHolder={e.placeholder} />
                                                                    </Col>
                                                                ))}
                                                            </Row>
                                                            <Row className='mb-2'>
                                                                <Col md={4}>
                                                                    <SharedButton type={'submit'} BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100"} />
                                                                </Col>
                                                            </Row>
                                                        </Form>
                                                    </Container>
                                                </div>
                                            </>

                                            :
                                            <>
                                                <div className='CreateAccountForm UseDetailPages'>
                                                    <Container>
                                                        <Row style={{ justifyContent: 'end' }}>
                                                            <Col md={1}>
                                                                <Button variant="warning" size="sm"
                                                                    onClick={() => setIsedit(true)} style={{
                                                                        background: '#FEF2F2',
                                                                        color: '#991B1B',
                                                                        borderColor: '#FEF2F2',
                                                                        fontWeight: '500'
                                                                    }}>Edit
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                        <Row className='mb-2'>
                                                            <Col md={12}>
                                                                <h6>Gear Type Name</h6>
                                                                <p>{indata.trname}</p>
                                                            </Col>
                                                            <Col md={12}>
                                                                <h6>Description</h6>
                                                                <p>{indata.description}</p>
                                                            </Col>
                                                            {indata && indata.add_field && indata.add_field.map((e, i) => (
                                                                <Col md={12} key={i}>
                                                                    <h6>{e.title}</h6>
                                                                    <p>{e.value}</p>
                                                                </Col>

                                                            ))}
                                                        </Row>

                                                    </Container>
                                                </div>
                                            </>
                                        }
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