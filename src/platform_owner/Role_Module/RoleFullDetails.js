import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { Headings } from '../../components/Headings';
import { InputField } from '../../components/InputField';
import { Textareanew } from '../../components/Textareanew';
import { SharedButton } from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { PoSidebar } from '../PO_Sidebar';
import { errorAlert, successAlert } from '../../components/Alert';
import { deleteRoll_API, updateRoll_API, updateTraning_API } from '../../api_services/Apiservices';
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { CreateRole } from './CreateRole';
import { CheckBoxButton } from '../../components/CheckBoxButton';
import { NewCheckBoxButton } from '../../components/NewCheckBoxButton';
import Swal from 'sweetalert2';



export default function RoleFullDetails({ setLoder }) {
    const [isedit, setIsedit] = useState(false);
    const [isdelete, setIsdelete] = useState(false);

    const [maindata, setMaindata] = useState();
    const location = useLocation();
    const navigate = useNavigate();

    const [moduleList, setModuleList] = useState([
        { id: 5, name: 'User Profile Module', value: "User_Profile_Module", ischek: false },
        { id: 4, name: 'Training Module', value: "Training_Module", ischek: false },
        { id: 1, name: 'Inventory Module', value: "Inventory_Module", ischek: false },
        { id: 2, name: 'Availability Module', value: "Availability_Module", ischek: false },
        { id: 3, name: 'Qualification Module', value: "Qualification_Module", ischek: false },
        { id: 6, name: 'Reporting Module', value: "Reporting_Module", ischek: false },
    ])


    const [fdata, setFdata] = useState({ "id": '', "role": "", });


    useEffect(() => {
        if (location && location.state && location.state.data) {
            const data = location.state.data;
            setFdata({ "id": data._id, "role": data.role, });
            setModuleList(
                [
                    { id: 5, name: 'User Profile Module', value: "User_Profile_Module", ischek: data.User_Profile_Module },
                    { id: 4, name: 'Training Module', value: "Training_Module", ischek: data.Training_Module },
                    { id: 1, name: 'Inventory Module', value: "Inventory_Module", ischek: data.Inventory_Module },
                    { id: 2, name: 'Availability Module', value: "Availability_Module", ischek: data.Availability_Module },
                    { id: 3, name: 'Qualification Module', value: "Qualification_Module", ischek: data.Qualification_Module },
                    { id: 6, name: 'Reporting Module', value: "Reporting_Module", ischek: data.Reporting_Module },
                ]
            )
            const array = [];
            if (data && data.User_Profile_Module) { array.push('User_Profile_Module') }
            if (data && data.Training_Module) { array.push('Training_Module') }
            if (data && data.Inventory_Module) { array.push('Inventory_Module') }
            if (data && data.Availability_Module) { array.push('Availability_Module') }
            if (data && data.Qualification_Module) { array.push('Qualification_Module') }
            if (data && data.Reporting_Module) { array.push('Reporting_Module') }
            data.modules = array;
            if (data) { setMaindata(data); }
        }
    }, [location])




    const updateHandler = async () => {
        if (fdata && !fdata.role) { errorAlert("Please Enter Role"); return null; }
        setLoder(true);
        const upm_value = moduleList.find((e) => e.value === 'User_Profile_Module').ischek;
        const tm_value = moduleList.find((e) => e.value === 'Training_Module').ischek;
        const im_value = moduleList.find((e) => e.value === 'Inventory_Module').ischek;
        const am_value = moduleList.find((e) => e.value === 'Availability_Module').ischek;
        const qm_value = moduleList.find((e) => e.value === 'Qualification_Module').ischek;
        const rm_value = moduleList.find((e) => e.value === 'Reporting_Module').ischek;
        const datas = {
            "id": fdata.id,
            "role": fdata.role,
            "User_Profile_Module": upm_value,
            "Training_Module": tm_value,
            "Inventory_Module": im_value,
            "Availability_Module": am_value,
            "Qualification_Module": qm_value,
            "Reporting_Module": rm_value
        }
        const resp = await updateRoll_API(datas);
        if (resp && resp.success) {
            setLoder(false);
            successAlert(resp.message);
            navigate("/roleadminstratorlist");
        }
        setLoder(false);
    }

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
                const resp = await deleteRoll_API({ "id": id });
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/roleadminstratorlist");
                        }
                    })
                }
            }
        });
        // 
    }


    return (
        <>

            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            {isedit ?
                                <div className='CreateRoleForm'>
                                    <Container>
                                        <Row style={{ justifyContent: 'end' }}>
                                            <Col md={1}>
                                                <Button variant="success" size="sm"
                                                    onClick={() => setIsedit(false)}>Not Update
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={4}>
                                                <InputField FormLabel='Role Name' FormPlaceHolder='Enter Role Name' value={fdata.role} onChange={(e) => setFdata((pre) => ({ ...pre, 'role': e.target.value }))} />
                                            </Col>
                                        </Row>
                                        <Row className='mt-3'>
                                            <h6>Select Module</h6>
                                            <div className='RoleModule'>
                                                <Row>
                                                    <NewCheckBoxButton option={moduleList} setModuleList={setModuleList} BtnClass={'checked-btn'} type={'check'} />

                                                </Row>
                                            </div>
                                        </Row>
                                        <Row className='mt-3'>
                                            <Col md={4}>
                                                <SharedButton BtnLabel={'Update'} type={'button'} onClick={updateHandler} BtnVariant={'primary'} BtnClass={'w-100'} />
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                :
                                <div className='CreateAccountForm UseDetailPages'>
                                    <Container>
                                        <Row style={{ justifyContent: 'end' }}>
                                            <Col md={2} style={{ textAlign: "center" }}>
                                                <Button variant="success" size="sm"
                                                    onClick={() => setIsedit(true)} style={{
                                                        fontWeight: '500',
                                                        marginRight: '1rem'
                                                    }}><TbEdit />
                                                </Button>
                                                <Button variant="danger" size="sm"
                                                    onClick={() => deleteHandler(maindata._id)} style={{
                                                        fontWeight: '500'
                                                    }}><RiDeleteBinLine />
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={4}>
                                                <h4>Role Name</h4>
                                                <p> {maindata && maindata.role}  </p>
                                            </Col>
                                        </Row>
                                        <Row className='mt-3'>
                                            <h6>Select Module</h6>
                                            <div className='RoleModule '>
                                                <Row>
                                                    {maindata && (maindata.modules).map((e, i) => (
                                                        <Col md={3} key={i} >
                                                            <CheckBoxButton BtnLabel={e} fulldata={e} BtnClass={'checked-btn checked mb-2 color_white'} type={'check'} />
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </div>
                                        </Row>

                                    </Container>
                                </div>
                            }

                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    )
}
