import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Select from '../../../components/Select';
import { InputField } from '../../../components/InputField';
import { updateUserGear_API } from '../../../api_services/Apiservices';
import { successAlert } from '../../../components/Alert';

export const MyGearEditModal = ({ show, handleClose, handleAddField, userlist, mygrpid, setLoder, grtype, pregr,prName,image,refreshHandler }) => {
    const [usersIds, setUsersIds] = useState([]);
    const navigate = useNavigate();

    const [indata, setIndata] = useState({ "gear_id": "", "replacement_date": "", "issue_date": "" });
    const [error, setError] = useState({ "gear_id": "", "replacement_date": "", "issue_date": "" });
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((prev) => ({ ...prev, [name]: value }));
        setError((prev) => ({ ...prev, [name]: "" }));
    }

    useEffect(() => {
        if (pregr) {
            const id = pregr._id || "";
            const grid = pregr.gear_id?._id || "";
            const replacement_date = pregr.replacement_date || "";
            const issue_date = pregr.issue_date || "";
            setIndata({
                id,
                gear_id: grid,
                replacement_date,
                issue_date
            });
        }
    }, [pregr]);



    const update_Handler = async (e) => {
        // e.preventDefault();
        let isValid = true;
        if (!indata.gear_id) { setError((prev) => ({ ...prev, "gear_id": "Required" })); isValid = false; }
        // if (!indata.replacement_date) { setError((prev) => ({ ...prev, "replacement_date": "Required" })); isValid = false; }
        // if (!indata.issue_date) { setError((prev) => ({ ...prev, "issue_date": "Required" })); isValid = false; }

        if (isValid) {
            setLoder(true);
            const fdata = {
                "id": indata.id,
                "gear_id": indata.gear_id,
                "replacement_date": indata.replacement_date,
                "issue_date": indata.issue_date,
            }
            const resp = await updateUserGear_API(fdata);
            if (resp && resp.success) {
                setLoder(false);
                successAlert(resp.message);
                handleClose();
                refreshHandler();
                // navigate("/adminstratorprofilelist");
            }
        }
        setLoder(false);

    };


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>

                <Stack className='px-1' direction='horizontal' gap={2} style={{
                    justifyContent: 'space-between'
                }}>
                    <Stack direction='vertical' gap={0} >
                    <Modal.Title>Update My Gear</Modal.Title>
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
                    <Row>
                        <Col md={12} className='mb-2'>
                            <Select required={true} FormLabel='Gear Name' Array={grtype} value={indata.gear_id} name='gear_id' error={error.gear_id} onChange={inputHandler} />
                        </Col>
                        <Col md={12} className='mb-2'>
                            <InputField FormType={'date'} FormLabel={"Issue Date"} value={indata.issue_date} name='issue_date' error={error.issue_date} onChange={inputHandler} />
                        </Col>
                        <Col md={12} className='mb-2'>
                            <InputField FormType={'date'} FormLabel={"Replacement Date"} value={indata.replacement_date} name='replacement_date' error={error.replacement_date} onChange={inputHandler} />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type='button' variant="primary" onClick={update_Handler}>
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
