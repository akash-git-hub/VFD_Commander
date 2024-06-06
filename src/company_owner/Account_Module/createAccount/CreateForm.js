import React from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'
import { InputField } from '../../../components/InputField'
import { SharedButton } from '../../../components/Button'

export const CreateForm = () => {
    return (
        <>
            <div className='CreateAccountForm'>
                <Container>
                    <Form>
                        <Row className='mb-2'>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Account Name"} FormPlaceHolder={"Futurristic"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"First Name"} FormPlaceHolder={"Jenny"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Last Name"} FormPlaceHolder={"Wilson"} />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Billing Address 1"} FormPlaceHolder={"scheme 24 - Vijay Nagar"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Billing Address 2"} FormPlaceHolder={"scheme 24 - Vijay Nagar"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"City"} FormPlaceHolder={"Indore"} />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"State"} FormPlaceHolder={"Madhya Pradesh"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Zip Code"} FormPlaceHolder={"452001"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'number'} FormLabel={"Contact Phone"} FormPlaceHolder={"+91 - 8989898989"} />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Account Owner Email Address"} FormPlaceHolder={"Jenny@wilson.com"} />
                            </Col>
                            <Col md={4}>
                                {/* <InputField FormType={'text'} FormLabel={"Subscription Name"} FormPlaceHolder={"Enter Your Zip Code"} /> */}
                                <Form.Label>Subscription Name</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option value="1">Premium Plus</option>
                                    <option value="3">Gold Plus</option>
                                    <option value="2">Silver Plus</option>
                                </Form.Select>
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'number'} FormLabel={"Subscription Amount"} FormPlaceHolder={"$ 599"} />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Account Owner Email Address"} FormPlaceHolder={"Enter Your State"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Incentive Information"} FormPlaceHolder={"Reward Details"} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'number'} FormLabel={"Time Zone"} FormPlaceHolder={"Central Time"} />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Time Display"} FormPlaceHolder={"12 - hour"} />
                            </Col>
                            <Col md={4}>
                                {/* <InputField FormType={'text'} FormLabel={"Incentive Information"} FormPlaceHolder={"Enter Your Zip Code"} /> */}
                            </Col>
                            <Col md={4}>
                                {/* <InputField FormType={'number'} FormLabel={"Time Zone"} FormPlaceHolder={"Enter Your Contact Phone"} /> */}
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={4}>
                               <SharedButton BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100"}/>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </>
    )
}
