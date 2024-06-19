import React from 'react'
import { Form } from 'react-bootstrap'

export const Textareanew = ({FormLabel, rows=2}) => {
    return (
        <>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>{FormLabel}</Form.Label>
                <Form.Control as="textarea" rows={rows} />
            </Form.Group>
        </>
    )
}
