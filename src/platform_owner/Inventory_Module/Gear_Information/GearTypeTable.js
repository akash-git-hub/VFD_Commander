import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { createGearAndApparatusType_API, getGearAndApparatusType_API, getGearType_API, updateGearAndApparatusType_API } from '../../../api_services/Apiservices'
import { useNavigate } from 'react-router-dom'
import { InputField } from '../../../components/InputField'
import { SharedButton } from '../../../components/Button'
import { TbEdit } from 'react-icons/tb'
import { errorAlert, successAlert } from '../../../components/Alert'

export const GearTypeTable = ({ setLoder, getData, trdata }) => {
    const navigate = useNavigate();
    const [myType, setMyType] = useState();
    const [editData, setEditData] = useState({ "id": "", "type": "" });

    // const getData = async () => {
    //     setLoder(true);
    //     const resp = await getGearAndApparatusType_API();
    //     if (resp && resp.success) {
    //         setLoder(false);
    //         setTrdata(resp.data);
    //     }
    //     setLoder(false);
    // }
    // useEffect(() => { getData(); }, [])

    const handleEditClick = (data) => {
        setMyType('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setEditData({ "id": data._id, "type": data.type })
    }

    const submitHandler = async () => {
        setEditData({ "id": "", "type": "" });
        if (!myType) { errorAlert("please enter type"); return; }
        setLoder(true);
        const data = { "type": myType }
        const resp = await createGearAndApparatusType_API(data);
        if (resp && resp.success) {
            setMyType();
            getData();          
            setLoder(false);
            successAlert(resp.message);
        }
    }

    const updateHandler = async () => {
        setMyType();
        if (!editData && !editData.type) { errorAlert("please enter type"); return; }
        setLoder(true);
        const data = { "type": editData.type, "id": editData.id }
        const resp = await updateGearAndApparatusType_API(data);
        if (resp && resp.success) {
            getData();
            setMyType("");
            setEditData({ "id": "", "type": "" });
            setLoder(false);
            successAlert(resp.message);
        }

    }

    return (
        <>
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        {editData && editData.id ?
                            <>
                                <Col md={6} className='mb-2'>
                                    <InputField required={true} FormType={'text'} FormLabel={"Type"} value={editData.type} name='types' onChange={(e) => setEditData((pre) => ({ ...pre, "type": e.target.value }))} />
                                </Col>
                                <Col md={6} className='mt-4'>
                                    <SharedButton type={"button"} onClick={updateHandler} BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100 mt-2"} />
                                </Col>
                            </>
                            :
                            <>
                                <Col md={6} className='mb-2'>
                                    <InputField required={true} FormType={'text'} FormLabel={"Type"} name='myType' value={myType} onChange={(e) => setMyType(e.target.value)} />
                                </Col>
                                <Col md={6} className='mt-4'>
                                    <SharedButton type={"button"} onClick={submitHandler} BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100 mt-2"} />
                                </Col>
                            </>
                        }
                    </Row>
                    <Row className='mt-5'><hr /></Row>
                    <div className='MainTable'>
                        <Table responsive className="table table-hover">
                            <thead>
                                <tr className='text-center'>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trdata.map((e, i) => (
                                    <tr key={i}>
                                        <td className='text-center'>{e.type}</td>
                                        <td className='text-center'>
                                            <Button variant="success" size="sm" className="me-2"
                                                onClick={() => handleEditClick(e)}
                                            ><TbEdit />
                                            </Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div >
        </>
    )
}
