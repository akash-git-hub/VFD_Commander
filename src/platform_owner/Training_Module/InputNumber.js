import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const InputNumber = ({
    pattern = "",
    FormLabel = "",
    FormType = "",
    FormPlaceHolder = "",
    error = "",
    name = "",
    onChange = null,
    value = "",
    readOnly = false,
    max = '',
    min = "",
    required = false,
    step="",
}) => {
    return (
        <Form.Group className="mb-3 d-grid" controlId="formGroupEmail">
            <Form.Label>{FormLabel} {required ? <small className='error'>*</small> : ""}</Form.Label>
            <Form.Control
                type={FormType}
                name={name}
                value={value ? value : ''}
                placeholder={FormPlaceHolder}
                onChange={onChange}
                readOnly={readOnly}
                maxLength={max}
                max={max}
                min={min}
                step={step}
                className="custom-input"
            />
            <small className='error'>{error}</small>
        </Form.Group>
    );
};
