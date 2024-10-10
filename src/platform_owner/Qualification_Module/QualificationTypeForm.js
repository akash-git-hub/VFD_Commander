import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { InputField } from '../../components/InputField'
import { CheckBoxButton } from '../../components/CheckBoxButton'
import { SharedButton } from '../../components/Button'
import { errorAlert, successAlert } from '../../components/Alert'
import { createQtype_API, updateQtype_API } from '../../api_services/Apiservices'
import { useNavigate } from 'react-router-dom'
import { TbEdit } from 'react-icons/tb'
import Swal from 'sweetalert2'
import { MyInputField } from '../../components/MyInputField'

export const QualificationTypeForm = ({ setLoder, qtypeop=[], gettypes }) => {
    const navigate = useNavigate();
    const [fdata, setFdata] = useState({ "name": "", "id": "" });
    const [isedit, setIsedit] = useState(false);


    const createHandler = async () => {
        if (fdata && !fdata.name) { errorAlert("Please Enter type"); return null; }
        setLoder(true)
        const datas = { "name": fdata.name, }
        const resp = await createQtype_API(datas);
        if (resp && resp.success) {
            setLoder(false);
            setFdata((pre) => ({ ...pre, "name": "" }));
            setFdata((pre) => ({ ...pre, "id": "" }));
            successAlert(resp.message);
            gettypes();
        }
        setLoder(false);
    }
    useEffect(() => {
        const fetchData = async () => {
            await gettypes();
        };

        fetchData();
    }, [isedit]);

    const updateHandler = async () => {
        if (!fdata.name) { errorAlert("Please Enter Position"); return null; }
        setLoder(true)
        const datas = { "name": fdata.name, "id": fdata.id }
        const resp = await updateQtype_API(datas);
        if (resp && resp.success) {
            setLoder(false);
            setIsedit(false);
            setFdata((pre) => ({ ...pre, "name": "" }));
            setFdata((pre) => ({ ...pre, "id": "" }));
            successAlert(resp.message);
            gettypes();
        }
        setLoder(false);
    }

    const edithandler = (e) => {        
        setFdata({ "name": e.name, "id": e.value });
        setIsedit(true);
    }

    const cancelHandler = () => {
        Swal.fire({
            title: "Changes have been made",
            text: "Are you sure you want to exit with no changes?",
            icon: "question"
        }).then((result) => {
            if (result.isConfirmed) {
                setFdata((pre) => ({ ...pre, "name": "" }));
                setFdata((pre) => ({ ...pre, "id": "" }));
                setIsedit(false);
            }
        });
    }

    return (
        <>
            <div className='CreateRoleForm'>
                <Container>
                    {isedit &&
                        <Row style={{ justifyContent: 'end' }}>
                            <Col md={2} style={{textAlign:'end'}}>
                                <Button variant="danger" size="sm"
                                    onClick={cancelHandler} style={{
                                        fontWeight: '500'
                                    }}>Cancel
                                </Button>
                            </Col>
                        </Row>
                    }
                    <Row>
                        <Col md={6}>
                            <MyInputField required={true} FormLabel='Qualification Type' FormPlaceHolder='Enter Qualification type' value={fdata.name} onChange={(e) => setFdata((pre) => ({ ...pre, 'name': e.target.value }))} />
                        </Col>
                        {isedit ?
                            <Col md={6} >
                                <div style={{ marginTop: "31px" }}></div>
                                <SharedButton BtnLabel={'Update'} type={'button'} onClick={updateHandler} BtnVariant={'primary'} BtnClass={'w-100'} />
                            </Col>
                            :
                            <Col md={6} >
                                <div style={{ marginTop: "31px" }}></div>
                                <SharedButton BtnLabel={'Create'} type={'button'} onClick={createHandler} BtnVariant={'primary'} BtnClass={'w-100'} />
                            </Col>
                        }
                    </Row>

                    <Row className='mt-3 mb-5'>
                        <span className='error'>Note: Fields marked with an asterisk (*) are mandatory and must be filled out before submitting the form .</span>
                    </Row>
                    <hr />
                </Container>
            </div>
            <div className='MainTable'>
                <Table responsive className="table table-hover">
                    <thead>
                        <tr>
                            <th>Qualification Type</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {qtypeop.map((e, i) => (
                            <tr key={i}>
                                <td>{e.name}</td>
                                <td>
                                    <Row>
                                        <Col md={2} style={{ textAlign: "center" }}>
                                            <Button variant="success" size="sm"
                                                onClick={() => edithandler(e)} style={{
                                                    fontWeight: '500',
                                                    marginRight: '1rem'
                                                }}><TbEdit />
                                            </Button>
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>


        </>
    )
}
