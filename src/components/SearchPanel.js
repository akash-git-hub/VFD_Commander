import React from 'react'
import { Row, Col, Container, Form, InputGroup } from 'react-bootstrap'

export const SearchPanel = ({ FormLabel, FormType, FormPlaceHolder, StartIcon,onChange}) => {
    return (
        <>
            <div className='SearchBox'>
                <Container>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>{FormLabel}</Form.Label>
                                <InputGroup>
                                    {StartIcon && (
                                        <InputGroup.Text>
                                            {StartIcon}
                                        </InputGroup.Text>
                                    )}
                                    <Form.Control type={FormType} placeholder={FormPlaceHolder} onChange={onChange} />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
