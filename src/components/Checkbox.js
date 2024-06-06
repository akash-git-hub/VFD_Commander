import React from 'react';
import Form from 'react-bootstrap/Form';

export const Checkbox = () => {
    return (
        <>
            <Form>
                <Form.Check // prettier-ignore
                    type="checkbox"
                    id="custom-check"
                    label="Keep me signed in"
                />
            </Form>
        </>
    )
}
