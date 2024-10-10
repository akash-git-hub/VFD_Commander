import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Col, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Select from '../../../components/Select';
import { getQualification_API, updateUserQualifiaction_API } from '../../../api_services/Apiservices';
import { InputField } from '../../../components/InputField';
import { successAlert } from '../../../components/Alert';

export const EditQuelification = ({ show, handleClose, handleAddField, userlist, mygrpid, setLoder, predata ,prName,image,refreshHandler}) => {
    const [usersIds, setUsersIds] = useState([]);
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [indata, setIndata] = useState({ "qualifications_id": "", "exp_date": "", "uid": "", "prequid": "" });


    const handleSubmit = async (data) => {
        const fdata = {
            "quid": indata.id,
            "qualifications_id": indata.qualifications_id,
            "exp_date": indata.exp_date,
        }
        const resp = await updateUserQualifiaction_API(fdata);
        if (resp && resp.success) {
            setLoder(false);
            successAlert(resp.message);
            handleClose();
            refreshHandler();
            // navigate("/adminstratorprofilelist");
        }
    };

    const [grtype, setGrtype] = useState([]);

    const getdata = async () => {

        setLoder(true);
        const resp = await getQualification_API();
        if (resp && resp.success) {
            setLoder(false);
            let prefdata = resp.data;
            prefdata = prefdata.filter((e) => e.status === "Active");
            const fdata = prefdata.map((e) => ({ "name": e.name, "value": e._id }));
            setGrtype(fdata);
        }
        setLoder(false);
    }



    const setmyprd = (data) => {
        const id = data._id;
        const eep = data.exp_date;
        const fdata = data.qualifications_id;        
        setIndata({ "qualifications_id": fdata._id, "exp_date": eep, "id": id })
    }

    useEffect(() => {
        getdata();
        if (predata) {
            setmyprd(predata);
        }
    }, [predata])



    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((prev) => ({ ...prev, [name]: value }));
    }
    // const handleChange = () => { setChecked(!checked); };



    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Stack className='px-1' direction='horizontal' gap={2} style={{
                    justifyContent: 'space-between'
                }}>
                    <Stack direction='vertical' gap={0} >
                    <Modal.Title>Update My Qualifications</Modal.Title>
                        <p className='mt-3'>
                            <img src={image ? image : 'assets/images/avatar.png'} alt="Profile Preview" className='img-fluid me-3' style={{
                                border: "1px solid",
                                borderRadius: "50px",
                                width: "50px",
                                height: '50px'
                            }} />
                            <b>{prName}</b>
                        </p>
                    </Stack>                
                </Stack>
                
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Col md={12} className='mb-2'>
                        <Select FormLabel='Qualification Name' FormPlaceHolder='Qualification Name' Array={grtype} name='qualifications_id' value={indata.qualifications_id} onChange={inputHandler} />
                    </Col>
                    <Col md={12} style={{
                        position: 'relative'
                    }} className='mb-2'>
                        <InputField FormType={'date'} FormLabel={"Expiration Date"} value={indata.exp_date} name='exp_date' onChange={inputHandler} FormPlaceHolder='MM/DD/YYYY' />
                    </Col>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button type='button' variant="primary" onClick={handleSubmit}>
                    Update
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Row className='mt-3 text-center'>
                    <span className='error'>Note: Fields marked with an asterisk (*) are mandatory and must be filled out before submitting the form .</span>
                </Row>
              
            </Modal.Footer>
        </Modal>
    );
};
