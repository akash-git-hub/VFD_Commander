import React from 'react'
import Form from 'react-bootstrap/Form';

export const InputField = ({ FormLabel="", FormType="", FormPlaceHolder="" ,error="",name="",onChange=null,value="" ,readOnly=false}) => {
    return (
        <>

            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>{FormLabel}</Form.Label>
                <Form.Control
                 type={FormType}
                 name={name} 
                 defaultValue={value ? value :''}
                 placeholder={FormPlaceHolder}
                 onChange={onChange}
                 readOnly={!!readOnly}
                 />
                <small className='error'>{error}</small>
            </Form.Group>

        </>
    )
}
