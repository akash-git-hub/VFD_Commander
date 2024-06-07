import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { errorAlert } from '../components/Alert';

export const AddFieldModal = ({ show, setShowModal, setFields, fields }) => {
  const [title, setTitle] = useState();
  const [placeholder, setPlaceholder] = useState();

  const handleSubmit = () => {
    if (!title) { errorAlert("Please Add Title"); return; }
    const resp = fields.find((e) => e.title.toLowerCase() === title.toLowerCase());
    if (resp) { errorAlert("Item with this title already exists:"); return; }  
    setFields((pre) => [...pre, {"title": title, "value":"","placeholder":placeholder }]);
    setShowModal(false);
    setTitle();
    setPlaceholder();

  };

  return (
    <Modal show={show} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Field</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Field Title</Form.Label>
            <Form.Control
              type="text"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter field title"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Placeholder</Form.Label>
            <Form.Control
              type="text"
              defaultValue={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              placeholder="Enter placeholder"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Field
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// AddFieldModal.propTypes = {
//   show: PropTypes.bool.isRequired,
//   handleClose: PropTypes.func.isRequired,
//   handleAddField: PropTypes.func.isRequired,
// };
