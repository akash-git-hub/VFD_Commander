import React from 'react'
import Form from 'react-bootstrap/Form';

export const InputField = ({ FormLabel, FormType, FormPlaceHolder }) => {
    return (
        <>

            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>{FormLabel}</Form.Label>
                <Form.Control type={FormType} placeholder={FormPlaceHolder} />
            </Form.Group>

        </>
    )
}
