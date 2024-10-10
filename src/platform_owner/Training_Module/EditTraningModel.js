import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Col, Row, Stack } from 'react-bootstrap';
import { errorAlert, successAlert } from '../../components/Alert';
import Select from '../../components/Select';
import { eventStatus } from '../../helper/Helper';
import moment from 'moment';
import { updateEventStatus_API } from '../../api_services/Apiservices';
import { InputNumber } from './InputNumber';

export const EditTraningModel = ({ show, handleClose, setLoder, modalData, get_My_Training, crTrainingId }) => {

    const [data, setData] = useState({ "id": "", "name": "", "status": "", "update_by": "", "training_id": "", "credit_duration": "" });

    const [trData, setTrData] = useState();
    useEffect(() => {
        if (modalData) {
            setTrData(modalData.training_id);
            setData({ "id": modalData._id, "name": modalData.user_name, "status": modalData.current_status === "select" ? "" : modalData.current_status, "update_by": modalData.creator_id, "training_id": modalData.training_id._id, "credit_duration": modalData.credit_duration });
        }
    }, [modalData])



    const handleSubmit = async () => {
        setLoder(true);

        // if (parseFloat(data.credit_duration) > parseFloat(trData.duration)) {
        //     errorAlert("Credit Hours should be less than Duration"); return;
        // }
        const f_data = {
            "id": data.id,
            "current_status": data.status,
            "credit_duration": data.credit_duration,
            "update_date": moment().unix(),
            "update_by": data.update_by,
            "trainingDuration": trData.duration,
        }
        const resp = await updateEventStatus_API(f_data);
        if (resp && resp.success) {
            handleClose();
            get_My_Training(crTrainingId);
            setLoder(false);
            successAlert(resp.message);
        }
        setLoder(false);
    };

    const inputHandler = (e) => {
        const { name, value } = e.target;
         if (name === "status" && (value === "cancelled" || value === "removed")) {
            setData((pre) => ({ ...pre, [name]: value, credit_duration: '0' }));
        } else {
            setData((pre) => ({ ...pre, [name]: value }));
        }
    }

    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Name :- {data.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row style={{ textAlign: "right" }} className='mb-4'><span className='error'>Duration: {trData && parseFloat(trData.duration).toFixed(2)} </span></Row>
                <Form>
                    <Row>
                        <Col md={6} className='mb-2'>
                            <Select FormLabel='Update Status' Array={eventStatus} value={data.status} name='status' onChange={(e) => inputHandler(e)}
                            //  setData((pre) => ({ ...pre, "status": e.target.value }))}
                            />
                        </Col>
                        <Col md={6} style={{
                            position: 'relative'
                        }} className='mb-2'>
                            <InputNumber step="0.01" min="0" FormLabel={"Credit Hours"} FormType={'number'} name='credit_duration' value={data.credit_duration} onChange={(e) => inputHandler(e)} />

                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type='button' variant="primary" onClick={handleSubmit}>
                    Update
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
