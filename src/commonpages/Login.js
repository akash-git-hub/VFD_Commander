import React from 'react'
import { Row, Col, Stack, Form } from 'react-bootstrap'
import { InputField } from '../components/InputField'
import { Checkbox } from '../components/Checkbox'
import { SharedButton } from '../components/Button'


export const Login = () => {
    return (
        <>
            <div className='Login_Page' style={{
                height: '100vh',
                background: '#E9EEED',
            }}>
                <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}>
                    <Col md="4">
                        <div className='Login_Content p-md-5 p-sm-2 rounded' style={{
                            background: '#fff',
                        }}>
                            <Stack direction='row' gap={3}>
                                <img src='./assets/images/MainLogo.png' className='img-fluid w-50' alt='' />
                                <div className=''>
                                    <h4>Login</h4>
                                    <h6 style={{
                                        color: '#64748B'
                                    }}>Welcome back. Enter your credentials to access your account</h6>
                                </div>
                            </Stack>
                            <Form>
                                <Stack className='mt-4' direction='row' gap={2}>
                                    <InputField FormLabel={"User ID"} FormType={"email"} FormPlaceHolder={"Enter Your User ID"} />
                                    <InputField FormLabel={"Password"} FormType={"password"} FormPlaceHolder={"Enter Your Password"} />
                                    <Checkbox />
                                    <SharedButton BtnLabel={"Continue"} BtnSize={"lg"} BtnClass={"W-100"} BtnVariant={"primary"} style={{
                                        background: '#00285D'
                                    }} />
                                </Stack>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
