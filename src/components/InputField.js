import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = (date) => {
        setStartDate(date);
        if (onChange) {
            // Format the date as MM/DD/YYYY
            const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
            onChange({ target: { name, value: formattedDate } });
        }
    };

    return (
        <Form.Group className="mb-3 d-grid" controlId="formGroupEmail">
            <Form.Label>{FormLabel} {required ? <small className='error'>*</small> : ""}</Form.Label>
            {FormType === 'date' ? (
                <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    dateFormat="MM/dd/yyyy"
                    className="form-control"
                    placeholderText={FormPlaceHolder}
                    readOnly={readOnly}
                />
            ) : (
                <Form.Control
                    as={isTextArea ? 'textarea' : 'input'}
                    type={isTextArea ? undefined : FormType}
                    name={name}
                    defaultValue={value ? value : ''}
                    placeholder={FormPlaceHolder}
                    onChange={onChange}
                    readOnly={readOnly}
                    maxLength={max}
                    min={min}
                    className="custom-input"
                    rows={isTextArea ? 3 : undefined}
                />
            )}
            <small className='error'>{error}</small>
        </Form.Group>
    );
};
