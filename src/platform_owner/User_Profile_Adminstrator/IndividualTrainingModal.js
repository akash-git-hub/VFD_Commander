import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { successAlert } from '../../components/Alert';
import Select from '../../components/Select';
import { eventStatus } from '../../helper/Helper';
import moment from 'moment';
import { updateEventStatus_API } from '../../api_services/Apiservices';

export const IndividualTrainingModal = ({ show, handleClose, data = "" }) => {
    const [myd, setMyd] = useState(JSON.parse(localStorage.getItem("mydata")));


    return (
        <Modal show={show} onHide={handleClose} size={"xl"} >
            <Modal.Header closeButton>
                <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className='text-center mb-3'><h5>Attendees Details</h5></Row>
                <hr />
                <Row className='mb-3 text-center'>
                    <Col md={4} className='mb-3'>
                        <h6>Attendees Name</h6>
                        <span>{data && data.user_name}</span>
                    </Col>
                    <Col md={4} className='mb-3'>
                        <h6>Status</h6>
                        <span style={{ textTransform: 'capitalize' }}>{data && data.current_status != "select" ?
                            (data.current_status === "planning_to_attend" || data.current_status === "Planning to Attend") ? "Planning to Attend"
                                : (data.current_status === "cannot_attend" || data.current_status === "Will Not Attend") ? "Will Not Attend"
                                    : (data.current_status === "did_not_attend" || data.current_status === "Did Not Attend") ? "Did Not Attend"
                                        : (data.current_status === "completed" || data.current_status === "Completed") ? "Completed"
                                            : (data.current_status === "removed" || data.current_status === "Removed") ? "Removed"
                                                : (data.current_status === "cancelled" || data.current_status === "Cancelled") ? "Cancelled" : ""

                            : ""}</span>
                    </Col>
                    <Col md={4} className='mb-3'>
                        <h6>Credit Hours</h6>
                        <span>{data && data.credit_duration ? parseFloat(data.credit_duration).toFixed(2):"0.00"}</span>
                    </Col>
                </Row>

                <Row className='text-center mb-3'><h5>Event Details</h5></Row>
                <hr />
                <Row className='text-center'>
                    <Col md={4} className='mb-3'>
                        <h6>Event Type</h6>
                        <span>{data && data.training_id && data.training_id.event_type_id && data.training_id.event_type_id.event_name}</span>
                    </Col>
                    <Col md={4} className='mb-3'>
                        <h6>Training Name</h6>
                        <span>{data && data.training_id && data.training_id.name}</span>
                    </Col>
                    <Col md={4} className='mb-3'>
                        <h6>Training Date</h6>
                        <span>{data && data.training_id && moment.unix(data.training_id.date).format("MM/DD/YYYY")}</span>
                    </Col>
                    <Col md={4} className='mb-3'>
                        <h6>Training Start Time</h6>
                        <span>{data && data.training_id && moment.unix(data.training_id.start_time).format(myd.time_formate)}</span>
                    </Col>
                    <Col md={4} className='mb-3'>
                        <h6>Duration</h6>
                        <span>{data && data.training_id && parseFloat(data.training_id.duration).toFixed(2)}</span>
                    </Col>
                    <Col md={4} className='mb-3'>
                        <h6>Location</h6>
                        <span>{data && data.training_id && data.training_id.location}</span>
                    </Col>
                    <Col md={4} className='mb-3'>
                        <h6>Qualification</h6>
                        <span>{data && data.training_id && data.training_id.qualification_id && data.training_id.qualification_id.name}</span>
                    </Col>
                    <Col md={4} className='mb-3'>
                        <h6>Description</h6>
                        <span>{data && data.training_id && data.training_id.description}</span>
                    </Col>
                    <Col md={4} className='mb-3'>
                        <h6>Note</h6>
                        <span>{data && data.training_id && data.training_id.notes}</span>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}> Ok </Button>
            </Modal.Footer>
        </Modal>
    );
};
