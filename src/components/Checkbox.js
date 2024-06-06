import React from 'react';
import Form from 'react-bootstrap/Form';

export const Checkbox = ({ name, value, onChange }) => {
    return (
        <>
            <Form.Check // prettier-ignore
                type="checkbox"
                id="custom-check"
                name={name}
                checked={value ? true : false}
                onChange={onChange}
                label="Keep me signed in"
            />
        </>
    )
}
