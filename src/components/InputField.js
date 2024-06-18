import React from 'react'
import Form from 'react-bootstrap/Form';

export const InputField = ({
    FormLabel = "",
    FormType = "",
    FormPlaceHolder = "",
    error = "",
    name = "",
    onChange = null,
    value = "",
    readOnly = false,
    isTextArea = false,
    max='',
    min="",
    required=false,
}) => {
    return (
        <>

            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>{FormLabel} {required ? <small className='error'>*</small>:""}</Form.Label>
                <Form.Control
                    as={isTextArea ? 'textarea' : 'input'} // Use 'textarea' if isTextArea is true
                    type={isTextArea ? undefined : FormType}
                    name={name}
                    defaultValue={value ? value : ''}
                    placeholder={FormPlaceHolder}
                    onChange={onChange}
                    readOnly={!!readOnly}
                    maxLength={max}
                    min={min}
                    className="custom-input"
                    rows={isTextArea ? 3 : undefined}
                />
                <small className='error'>{error}</small>
            </Form.Group>

        </>
    )
}
