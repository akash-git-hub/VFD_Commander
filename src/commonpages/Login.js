import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Stack, Form } from 'react-bootstrap'
import { InputField } from '../components/InputField'
import { Checkbox } from '../components/Checkbox'
import { SharedButton } from '../components/Button'
import { Loader } from '../components/Loader'
import { emailPattern } from '../helper/Helper'
import { account_Access_API, login_API } from '../api_services/Apiservices'
import { errorAlert, successAlert } from '../components/Alert'
import { useLocation, useNavigate } from 'react-router-dom'
import { Mycontext } from '../App'
import CryptoJS from 'crypto-js';


export const Login = () => {
    const { contaxtHandler } = useContext(Mycontext);
    const [indata, setIndata] = useState({ "email": localStorage.getItem("myemail"), "password": localStorage.getItem("mypassword"), "reminder": localStorage.getItem("myreminder") });
    const [error, setError] = useState({ "email": "", "password": "" });
    const navigate = useNavigate();
    const [loder, setLoder] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(window.location.search);
    const encryptedId = queryParams.get('key');

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }

    const checkHenlder = (e) => {
        const { name, checked } = e.target;
        setIndata((pre) => ({ ...pre, [name]: checked }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (indata.reminder) {
            localStorage.setItem("myreminder", true);
            localStorage.setItem("myemail", indata.email);
            localStorage.setItem("mypassword", indata.password);
        } else {
            localStorage.removeItem("myreminder");
            localStorage.removeItem("myemail");
            localStorage.removeItem("mypassword");
        }

        let isvalid = 1;
        if (!indata.email) {
            setError((prev) => ({ ...prev, email: "Email is required *" }));
            isvalid = 2;
        } else if (!emailPattern.test(indata.email)) {
            setError((prev) => ({ ...prev, email: "Invalid email format *" }));
            isvalid = 3;
        }
        if (!indata.password) {
            setError((pre) => ({ ...pre, 'password': "Password is Required *" }));
            isvalid = 4;
        }
        if (isvalid === 1) {
            setLoder(true);
            const fdata = {
                "email": indata.email,
                "password": indata.password
            }
            const resp = await login_API(fdata);
            if (resp && resp.success) {
                const data = resp.data;

                contaxtHandler(data);
                setLoder(false);
                successAlert(resp.message);
                const type = data.user_type_id;
                if (parseInt(type) === 1) {
                    navigate("/accountmodule");
                } else if (parseInt(type) === 2) {
                    navigate("/roleadminstratorlist");
                }
            }
            setLoder(false);
        }

    }


    const accessHandler = async (key) => {
        if (!key) { errorAlert('Invalid access key'); return; }
        // Decrypt the ID
        const secretKey = 'admin@gmail.com'; // Use the same secret key
        const bytes = CryptoJS.AES.decrypt(key, secretKey);
        const decryptedId = bytes.toString(CryptoJS.enc.Utf8);
        setLoder(true);
        const fdata = { "key": decryptedId, }
        const resp = await account_Access_API(fdata);
        if (resp && resp.success) {
            const data = resp.data;
            contaxtHandler(data);
            setLoder(false);
            successAlert(resp.message);
            const type = data.user_type_id;
            if (parseInt(type) === 1) {
                navigate('/accountmodule', { replace: true });
            } else if (parseInt(type) === 2) {
                navigate('/roleadminstratorlist', { replace: true });
                // navigate('/roleadminstratorlist ', { replace: true });
            }
        }
        setLoder(false);
    }
    // useEffect(() => {
    //     if (encryptedId) {
    //         accessHandler(encryptedId);
    //     }
    // }, [encryptedId])
    return (
        <>
            <Loader show={loder} />
            <div className='Login_Page maindiv'>
                <Row className="chiled-row">
                    <Col md="4">
                        <div className='Login_Content p-md-5 p-sm-2 rounded bg-white' >
                            <Stack direction='row' gap={3}>
                                <img src='./assets/images/MainLogo.png' className='img-fluid w-50' alt='' />
                                <div className=''>
                                    <h4>Login</h4>
                                    <h6 style={{
                                        color: '#64748B'
                                    }}>Welcome back. Enter your credentials to access your account</h6>
                                </div>
                            </Stack>
                            <Form onSubmit={submitHandler}>
                                <Stack className='mt-4' direction='row' gap={2}>
                                    <InputField
                                        FormLabel={"User ID"}
                                        FormType={"email"}
                                        FormPlaceHolder={"Enter Your User ID"}
                                        name='email'
                                        value={indata.email}
                                        onChange={inputHandler}
                                        error={error.email}
                                    />
                                    <InputField
                                        FormLabel={"Password"}
                                        FormType={"password"}
                                        FormPlaceHolder={"Enter Your Password"}
                                        name='password'
                                        value={indata.password}
                                        onChange={inputHandler}
                                        error={error.password}
                                    />
                                    <Checkbox name="reminder" value={indata.reminder} onChange={checkHenlder} Checklabel={'"Keep me signed in"'} ID={'custom-check'} />
                                    <SharedButton type={'submit'} BtnLabel={"Continue"} BtnSize={"lg"} BtnClass={"W-100"} BtnVariant={"primary"} style={{
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
