import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

export const RadioButton = ({ required, FormLabel,radioHandler,selectedValue }) => {

    return (
        <Form.Group className="mb-3 d-grid" controlId="formGroupEmail">
            <Form.Label>
                {FormLabel} {required ? <small className='error'>*</small> : ""}
            </Form.Label>
            <div>
                <Form.Check
                    inline
                    label="Text"
                    name="formType"
                    type="radio"
                    id="text"
                    value="text"
                    checked={selectedValue === 'text'}
                    onChange={radioHandler}
                />
                <Form.Check
                    inline
                    label="Dropdown"
                    name="formType"
                    type="radio"
                    id="dropdown"
                    value="dropdown"
                    checked={selectedValue === 'dropdown'}
                    onChange={radioHandler}
                />
            </div>
        </Form.Group>
    );
};
