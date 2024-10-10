import React, { useState } from 'react';
import { Modal, Button, Form, Row } from 'react-bootstrap';
import { errorAlert } from '../../components/Alert';


export const ForgotPassword = ({ show, handleClose }) => {
    const [indata, setIndata] = useState({ 'crPassword': "", 'newPassword': "", 'cnPassword': "" });
    const [error, setError] = useState({ 'crPassword': "", 'newPassword': "", 'cnPassword': "" });

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        if (!indata.crPassword) { setError((pre) => ({ ...pre, "crPassword": "Required" })); isValid = false; }
        if (!indata.newPassword) { setError((pre) => ({ ...pre, "newPassword": "Required" })); isValid = false; }
        if (!indata.cnPassword) { setError((pre) => ({ ...pre, "cnPassword": "Required" })); isValid = false; }
        if (indata.newPassword != indata.cnPassword) { errorAlert("New password and confirm password do not match.");isValid=false }
        if(isValid){
            alert("In progress")
        }               
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Forgot your password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Current password <small className='error'>*</small></Form.Label>
                        <Form.Control
                            type="text"
                            name='crPassword'
                            value={indata.crPassword}
                            onChange={inputHandler}
                            placeholder="Enter current password"
                        />
                        <small className='error'>{error.crPassword}</small>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>New password <small className='error'>*</small></Form.Label>
                        <Form.Control
                            type="text"
                            name='newPassword'
                            value={indata.newPassword}
                            onChange={inputHandler}
                            placeholder="Enter new password"
                        />
                        <small className='error'>{error.newPassword}</small>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm password <small className='error'>*</small></Form.Label>
                        <Form.Control
                            type="text"
                            name='cnPassword'
                            value={indata.cnPassword}
                            onChange={inputHandler}
                            placeholder="Enter confirm password"
                        />
                        <small className='error'>{error.cnPassword}</small>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type='button' variant="primary" onClick={handleSubmit}>
                    Reset
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
