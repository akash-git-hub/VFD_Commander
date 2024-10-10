import React from 'react';
import { Form } from 'react-bootstrap';

export default function Select({
    FormLabel = "",
    Array = [],
    FormPlaceHolder = "",
    name = "",
    readOnly = false,
    onChange, value = "", error = "", required = "", myDefault = "", }) {
    return (
        <>
            {FormLabel && <Form.Label>{FormLabel} {required ? <small className='error'>*</small> : ""}</Form.Label>}
            <Form.Select aria-label={FormPlaceHolder} value={value} className={FormLabel ? "" : "mt-2"} name={name} onChange={onChange} disabled={readOnly}>
                <option value="" disabled> {myDefault != "" ? myDefault : "Select"} </option>
                {Array.length > 0 &&
                    Array.map((e, i) => (
                        <option key={i} value={e.value}>{e.name} </option>
                    ))}
            </Form.Select>
            <small className='error'>{error}</small>
        </>
    );
}
