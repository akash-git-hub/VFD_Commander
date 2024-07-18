import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { errorAlert } from '../components/Alert';
import { addGroupUser_API, updateGrpname_API } from '../api_services/Apiservices';
import { SharedMultiSelect } from '../components/SharedMultiSelect';
import { useNavigate } from 'react-router-dom';

export const GroupAddUserModal = ({ show, handleClose, handleAddField, userlist, mygrpid, setLoder }) => {
    const [usersIds, setUsersIds] = useState([]);
    const navigate = useNavigate();


    const handleSubmit = async () => {
        const fdata = { grpId: mygrpid, usersId: usersIds };
        if (!mygrpid) { errorAlert("Something went wrong."); return; }
        if (usersIds.length === 0) { errorAlert("Please Select User name."); return; }
        const resp = await addGroupUser_API(fdata);
        if (resp && resp.success) {
            navigate("/groupslist");
        }
    };


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Group Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <SharedMultiSelect
                            labelText="Select User"
                            setSkillsdata={setUsersIds}
                            name="skills"
                            options={userlist}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button type='button' variant="primary" onClick={handleSubmit}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
