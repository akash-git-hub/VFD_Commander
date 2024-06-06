import React from 'react'
import Form from 'react-bootstrap/Form';

export const InputField = ({ FormLabel, FormType, FormPlaceHolder ,error,name,onChange,value=""}) => {
    return (
        <>

            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>{FormLabel}</Form.Label>
                <Form.Control type={FormType} name={name} value={value ? value :''} placeholder={FormPlaceHolder} onChange={onChange} />
                <small className='error'>{error}</small>
            </Form.Group>

        </>
    )
}
