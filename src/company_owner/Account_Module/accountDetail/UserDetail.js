import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Stack, Image, Button } from 'react-bootstrap'
import { RiDeleteBinLine } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { update_modal_account_api } from '../../../api_services/Apiservices';
import { errorAlert } from '../../../components/Alert';
import Swal from 'sweetalert2';


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

    return (
        <>
            <div className='UseDetailPages' >
                <Container>
                    <Row style={{ justifyContent: 'end' }}>
                        <Col md={2}>
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
                                    fontWeight: '500'
                                }}><RiDeleteBinLine />
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
                                        {/* <Button variant="warning" size="sm" 
                                        onClick={() => handleEditClick(pre)} 
                                        style={{
                                            background: '#FEF2F2',
                                            color: '#991B1B',
                                            borderColor: '#FEF2F2',
                                            fontWeight: '500'
                                        }}><TbEdit />
                                        </Button> */}
                                    </Stack>
                                </div>
                                <hr />
                                <Row className='mb-3'>
                                    <Col md={6} className="mb-3">
                                        <p className='mb-2 paraText'>Account Name</p>
                                        <h6>{pre && pre.account_name}</h6>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <p className='mb-2 paraText'>Contact Name</p>
                                        <h6>{pre && pre.first_name}{pre && " "+pre.last_name}</h6>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <p className='mb-2 paraText'>Email</p>
                                        <h6>{pre && pre.email}</h6>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <p className='mb-2 paraText'>Mobile No</p>
                                        <h6>+91 {pre && pre.mobile_no}</h6>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <p className='mb-2 paraText'>Billing Address 1</p>
                                        <h6>{pre && pre.billing_address}</h6>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <p className='mb-2 paraText'>Billing Address 2</p>
                                        <h6>{pre && pre.billing_addres2}</h6>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <p className='mb-2 paraText'>City</p>
                                        <h6>{pre && pre.city}</h6>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <p className='mb-2 paraText'>State</p>
                                        <h6>{pre && pre.state}</h6>
                                    </Col>                                
                                    <Col md={6} className="mb-3">
                                        <p className='mb-2 paraText'>Zip Code</p>
                                        <h6>{pre && pre.zip_code}</h6>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <p className='mb-2 paraText'>Subscription Name</p>
                                        <h6>{pre && pre.subscription_id && pre.subscription_id.name}</h6>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <p className='mb-2 paraText'>Subscription Amount</p>
                                        <h6>$ {pre && pre.subscription_id && pre.subscription_id.pricing}</h6>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <p className='mb-2 paraText'>Renewal Date</p>
                                        <h6>{pre && moment.unix(pre.renewal_date).format('MM-DD-YYYY')}</h6>
                                    </Col>                                 
                                 
                                    <Col md={6} className="mb-3">
                                        <p className='mb-2 paraText'>Incentive Information</p>
                                        <h6>{pre && pre.incentive_information}</h6>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <p className='mb-2 paraText'>Time Zone</p>
                                        <h6>{pre && pre.time_zone}</h6>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <p className='mb-2 paraText'>Time Display</p>
                                        <h6>{pre && pre.time_formate === "hh:mm:ss A" ? "12-Hours" : "24-Hours"}</h6>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <p className='mb-2 paraText'>Status</p>
                                        <h6>{pre && pre.status}</h6>
                                    </Col>
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
