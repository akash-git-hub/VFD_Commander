import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export const NotificationModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                view
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>20/12/2024</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>Infobeans</h6>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting.</p>
                </Modal.Body>
            </Modal>
        </>
    );
}
