import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { Headings } from '../../components/Headings';
import { InputField } from '../../components/InputField';
import { Textareanew } from '../../components/Textareanew';
import { SharedButton } from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { PoSidebar } from '../PO_Sidebar';
import { successAlert } from '../../components/Alert';
import { updateTraning_API } from '../../api_services/Apiservices';
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";



export default function QualificationListDetail() {
    const [indata, setIndata] = useState({ "trname": '', "description": "" });
    const [error, setError] = useState({ "trname": '', "description": "" })
    const [isedit, setIsedit] = useState(false);
    const [isdelete, setIsdelete] = useState(false);
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
        const resp = await updateTraning_API(fadat);
        if (resp && resp.success) {
            e.target.reset();
            setFields([]);
            setLoder(false);
            successAlert(resp.message);
            navigate("/qualification");
        }
        setLoder(false);

    }
    return (
        <>
            <Loader show={loder} />
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={12}>
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
                                                        <InputField FormType={'text'} FormLabel={"Qualification Name"} onChange={inputHandler} error={error.trname} value={indata.trname} name='trname' />
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
                                                <Col md={2}>
                                                    <Button variant="success" size="sm"
                                                        onClick={() => setIsedit(true)} style={{
                                                            fontWeight: '500',
                                                            marginRight:'1rem'
                                                        }}><TbEdit />
                                                    </Button>
                                                    <Button variant="danger" size="sm"
                                                        onClick={() => setIsdelete(true)} style={{
                                                            fontWeight: '500'
                                                        }}><RiDeleteBinLine />
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2'>
                                                <Col md={12}>
                                                    <h6>Qualification Name</h6>
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
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    )
}
