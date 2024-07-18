import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { errorAlert } from '../components/Alert';
import { updateGrpname_API } from '../api_services/Apiservices';

export const EditGroupModal = ({ show, handleClose, handleAddField, grpdata, setGrpdata, getdata, setLoder }) => {
    const [fieldTitle, setFieldTitle] = useState('');
    const [fieldPlaceholder, setFieldPlaceholder] = useState('');

    const handleSubmit = async () => {
        const fdata = { "grpId": grpdata.id, "name": grpdata.name };
        if (!grpdata.id) { errorAlert("Something went wrong."); return; }
        if (!grpdata.name) { errorAlert("Please enter a group name."); return; }
        setLoder(true);
        const resp = await updateGrpname_API(fdata);
        if (resp && resp.success) {
            setLoder(false);
            handleClose();
            getdata();
        }
        setLoder(false);
    };

    const inputChange = (e) => {
        const { name, value } = e.target;
        setGrpdata((pre) => ({ ...pre, [name]: value }));
    }

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
                            name="name"
                            value={grpdata.name}
                            onChange={inputChange}
                            placeholder="Enter Group Name"
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
