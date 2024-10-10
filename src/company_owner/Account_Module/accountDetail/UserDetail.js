import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Stack, Image, Button } from 'react-bootstrap'
import { RiDeleteBinLine } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { resetPassword_API, update_modal_account_api } from '../../../api_services/Apiservices';
import { errorAlert } from '../../../components/Alert';
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';


export const UserDetail = ({ data, setLoder }) => {
    const navigate = useNavigate();
    const [pre, setPre] = useState();

    useEffect(() => { setPre(data); }, [data])

    const handleEditClick = (data) => { navigate('/editaccount', { state: { data } }); };

    const deleteHandler = (id) => {
        if (!id) { errorAlert("Something wrong"); return; }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const formData = new FormData();
                formData.append('id', id);
                formData.append('is_delete', 'yes');
                const resp = await update_modal_account_api(formData);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/accountmodule");
                        }
                    })
                }
            }
        });
    }

    const resetPasswordHandler = (id) => {
        if (!id) { errorAlert("Something wrong"); return; }
        Swal.fire({
            "title": "Are you sure?",
            "text": "Do you want to reset the password ",
            "icon": "warning",
            "showCancelButton": true,
            "confirmButtonColor": "#3085d6",
            "cancelButtonColor": "#d33",
            "confirmButtonText": "Yes, reset it!",
            "cancelButtonText": "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const abcd = { "id": id };
                setLoder(true);
                const resp = await resetPassword_API(abcd);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Reset!",
                        text: "The password has been sent successfully to the registered email address",
                        icon: "success"
                    })
                }
            }
        });
    }

    const logoutHandler = () => {
        localStorage.setItem("mydata", "");
        localStorage.removeItem("mydata");
        localStorage.removeItem('id');
        localStorage.removeItem('Authorization');
        localStorage.removeItem('type');
        navigate('/');
    };

    const accessHandler = async (id) => {
        const secretKey = 'admin@gmail.com'; // Use a strong secret key
        const encryptedId = CryptoJS.AES.encrypt(id.toString(), secretKey).toString();

        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to access this client account?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, access it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                logoutHandler();
                window.open(`/account_access?key=${encodeURIComponent(encryptedId)}`, '_blank');
            }
        })

    }

    return (
        <>
            <div className='UseDetailPages' >
                <Container>
                    <Row style={{ justifyContent: 'end' }}>
                        <Col md={8} style={{ display: 'flex', justifyContent: "end" }}>
                            <Button variant="success" size="sm"
                                onClick={() => handleEditClick(pre)}
                                style={{
                                    fontWeight: '500',
                                    marginRight: '1rem'
                                }}><TbEdit />
                            </Button>
                            <Button variant="danger" size="sm"
                                onClick={() => deleteHandler(pre._id)}
                                style={{
                                    fontWeight: '500',
                                    marginRight: '1rem',
                                }}><RiDeleteBinLine />
                            </Button>
                            <Button variant="primary" size="sm"
                                onClick={() => resetPasswordHandler(pre._id)}
                                style={{
                                    fontWeight: '500',
                                    marginRight: '1rem'
                                }}>Reset password
                            </Button>
                            <Button variant="warning" size="sm"
                                onClick={() => accessHandler(pre._id)}
                                style={{
                                    fontWeight: '500'
                                }}>Access Account
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Stack direction='vertical' gap={1} style={{
                                justifyContent: 'space-between'
                            }}>
                                <div className='User'>
                                    <Stack direction='horizontal' gap={2}>
                                        <Image src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.1518270500.1717459200&semt=ais_user" className='Avatar_img' rounded />
                                        <Stack direction='vertical' gap={1}>
                                            <h4>{pre && pre.first_name + " "}{pre && pre.last_name}</h4>
                                            <p>Account ID : {pre && pre._id}</p>
                                        </Stack>
                                    </Stack>
                                </div>
                                <hr />
                                <Row className='mb-3'>
                                    {pre && pre.account_name &&
                                        <Col md={6} className="mb-3">
                                            <p className='mb-2 paraText' >Account Name</p>
                                            <h6>{pre && pre.account_name}</h6>
                                        </Col>
                                    }
                                    {pre && pre.first_name &&
                                        <Col md={6} className="mb-3">
                                            <p className='mb-2 paraText'>Contact Name</p>
                                            <h6>{pre && pre.first_name}{pre && " " + pre.last_name}</h6>
                                        </Col>
                                    }
                                    {pre && pre.email &&
                                        <Col md={6} className="mb-3">
                                            <p className='mb-2 paraText'>Contact Email</p>
                                            <h6>{pre && pre.email}</h6>
                                        </Col>
                                    }
                                    {pre && pre.mobile_no &&
                                        <Col md={6} className="mb-3">
                                            <p className='mb-2 paraText'>Contact Mobile No</p>
                                            <h6>{pre && pre.mobile_no}</h6>
                                        </Col>
                                    }
                                    {pre && pre.billing_address &&
                                        <Col md={6} className="mb-3">
                                            <p className='mb-2 paraText'>Billing Address 1</p>
                                            <h6>{pre && pre.billing_address}</h6>
                                        </Col>
                                    }
                                    {pre && pre.billing_addres2 &&
                                        <Col md={6} className="mb-3">
                                            <p className='mb-2 paraText'>Billing Address 2</p>
                                            <h6>{pre && pre.billing_addres2}</h6>
                                        </Col>
                                    }
                                    {pre && pre.city &&
                                        <Col md={6} className="mb-3">
                                            <p className='mb-2 paraText'>City</p>
                                            <h6>{pre && pre.city}</h6>
                                        </Col>
                                    }
                                    {pre && pre.state &&
                                        <Col md={6} className="mb-3">
                                            <p className='mb-2 paraText'>State</p>
                                            <h6>{pre && pre.state}</h6>
                                        </Col>
                                    }
                                    {pre && pre.zip_code &&
                                        <Col md={6} className="mb-3">
                                            <p className='mb-2 paraText'>Zip Code</p>
                                            <h6>{pre && pre.zip_code}</h6>
                                        </Col>
                                    }
                                    {pre && pre.subscription_id &&
                                        <Col md={6} className="mb-3">
                                            <p className='mb-2 paraText'>Subscription Name</p>
                                            <h6>{pre && pre.subscription_id && pre.subscription_id.name}</h6>
                                        </Col>
                                    }
                                    {pre && pre.subscription_id &&
                                        <Col md={6} className="mb-3">
                                            <p className='mb-2 paraText'>Subscription Amount</p>
                                            <h6>$ {pre && pre.subscription_id && pre.subscription_id.pricing}</h6>
                                        </Col>
                                    }
                                    {pre && pre.account_start_date &&
                                        <Col md={6} className="mb-3">
                                            <p className='mb-2 paraText'>Account Start Date</p>
                                            <h6>{pre && moment.unix(pre.account_start_date).format('MM-DD-YYYY')}</h6>
                                        </Col>
                                    }
                                    {pre && pre.renewal_date &&
                                        <Col md={6} className="mb-3">
                                            <p className='mb-2 paraText'>Renewal Date</p>
                                            <h6>{pre && moment.unix(pre.renewal_date).format('MM-DD-YYYY')}</h6>
                                        </Col>
                                    }
                                    {pre && pre.incentive_information &&
                                        <Col md={6} className="mb-3">
                                            <p className='mb-2 paraText'>Incentive Information</p>
                                            <h6>{pre && pre.incentive_information}</h6>
                                        </Col>
                                    }
                                    {pre && pre.status &&
                                        <Col md={6} className="mb-3">
                                            <p className='mb-2 paraText'>Account Status</p>
                                            <h6>{pre && pre.status}</h6>
                                        </Col>
                                    }
                                    {pre && pre.time_formate &&
                                        <Col md={6} className="mb-3">
                                            <p className='mb-2 paraText'>Time Display</p>
                                            <h6>{pre && pre.time_formate === "hh:mm:ss A" ? "12-Hours" : "24-Hours"}</h6>
                                        </Col>
                                    }
                                </Row>
                                <Row className='mb-3'>
                                    {pre && pre.add_field && (pre.add_field).map((e, i) => (
                                        <Col md={6} key={i}>
                                            <p className='mb-2 paraText'>{e.title}</p>
                                            <h6>{e.value}</h6>
                                        </Col>
                                    ))}

                                </Row>
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
