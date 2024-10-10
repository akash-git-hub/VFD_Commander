import React from 'react'
import { Form } from 'react-bootstrap'


export const Textareanew = ({FormLabel,error,onChange,name,value, rows=3,FormPlaceHolder ,labelClass,required}) => {
    return (
        <>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              {FormLabel &&  <Form.Label className={labelClass}>{FormLabel}  {required ? <small className='error'>*</small> : ""}</Form.Label>}
                <Form.Control as="textarea" name={name} value={value} onChange={onChange} rows={rows} placeholder={FormPlaceHolder} />
                <small className='error'>{error}</small>
            </Form.Group>
        </>
    )
}
