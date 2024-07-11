import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { errorAlert } from '../components/Alert';

export const EditGroupModal = ({ show, handleClose, handleAddField }) => {
    const [fieldTitle, setFieldTitle] = useState('');
    const [fieldPlaceholder, setFieldPlaceholder] = useState('');

    const handleSubmit = () => {
        if(!fieldTitle){errorAlert("Please Enter Title");return}
        handleAddField(fieldTitle, fieldPlaceholder);
        setFieldTitle('');
        setFieldPlaceholder('');
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Group Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={fieldTitle}
                            onChange={(e) => setFieldTitle(e.target.value)}
                            placeholder="Enter field title"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button type='button' variant="primary" onClick={handleSubmit}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
