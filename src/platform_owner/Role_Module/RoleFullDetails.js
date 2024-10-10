import React, { useEffect, useState } from 'react'
import { Button, Col, Container,  Row, } from 'react-bootstrap';
import { InputField } from '../../components/InputField';
import { SharedButton } from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { errorAlert, successAlert } from '../../components/Alert';
import { deleteRoll_API, updateRoll_API } from '../../api_services/Apiservices';
import { TbEdit } from "react-icons/tb";
import { CheckBoxButton } from '../../components/CheckBoxButton';
import { NewCheckBoxButton } from '../../components/NewCheckBoxButton';
import Swal from 'sweetalert2';



export default function RoleFullDetails({ setLoder }) {
    const [isedit, setIsedit] = useState(false);
    const [maindata, setMaindata] = useState();
    const location = useLocation();
    const navigate = useNavigate();

    const [moduleList, setModuleList] = useState([
        { id: 8, name: 'Role Administration', value: "Role_Administration", ischek: false },
        { id: 3, name: 'Qualification Administration', value: "Qualification_Module", ischek: false },
        { id: 5, name: 'User Profile Administration', value: "User_Profile_Module", ischek: false },
        { id: 4, name: 'Event Administration', value: "Training_Module", ischek: false },
        { id: 1, name: 'Inventory Administration', value: "Inventory_Module", ischek: false },
        { id: 9, name: 'Gear Administration', value: "Gear_Administration", ischek: false },
        { id: 2, name: 'Availability', value: "Availability_Module", ischek: false },      
        { id: 6, name: 'Reporting', value: "Reporting_Module", ischek: false },
        { id: 7, name: 'Dashboard', value: "Dashboard", ischek: false },     
        
    ])


    const [fdata, setFdata] = useState({ "id": '', "role": "", });


    useEffect(() => {
        if (location && location.state && location.state.data) {
            const data = location.state.data;
            setFdata({ "id": data._id, "role": data.role, });
            setModuleList(
                [
                    { id: 8, name: 'Role Administration', value: "Role_Administration", ischek: data.Role_Administration },
                    { id: 3, name: 'Qualification Administration', value: "Qualification_Module", ischek: data.Qualification_Module },
                    { id: 5, name: 'User Profile Administration', value: "User_Profile_Module", ischek: data.User_Profile_Module },
                    { id: 4, name: 'Event Administration', value: "Training_Module", ischek: data.Training_Module },
                    { id: 1, name: 'Inventory Administration', value: "Inventory_Module", ischek: data.Inventory_Module },
                    { id: 9, name: 'Gear Administration', value: "Gear_Administration", ischek: data.Gear_Administration },
                    { id: 2, name: 'Availability', value: "Availability_Module", ischek: data.Availability_Module },                  
                    { id: 6, name: 'Reporting', value: "Reporting_Module", ischek: data.Reporting_Module },
                    { id: 7, name: 'Dashboard', value: "Dashboard", ischek: data.Dashboard },                 
                ]
            )
            const array = [];
            if (data && data.Role_Administration) { array.push('Role Administration') }
            if (data && data.Qualification_Module) { array.push('Qualification Administration') }
            if (data && data.User_Profile_Module) { array.push('User Profile Administration') }
            if (data && data.Training_Module) { array.push('Event Administration') }
            if (data && data.Inventory_Module) { array.push('Inventory Administration') }
            if (data && data.Gear_Administration) { array.push('Gear Administration') }
            if (data && data.Availability_Module) { array.push('Availability') }          
            if (data && data.Reporting_Module) { array.push('Reporting') }
            if (data && data.Dashboard) { array.push('Dashboard') }         
          
            data.modules = array;
            if (data) { setMaindata(data); }
        }
    }, [location])


    const updateHandler = async () => {
        if (fdata && !fdata.role) { errorAlert("Please Enter Role"); return null; }
        Swal.fire({
            title: "Are you sure?",
            text: "This Role has been modified. Save changes?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then( async (result) => {
            if (result.isConfirmed) {
                setLoder(true);
                const Role_Administration = moduleList.find((e) => e.value === 'Role_Administration').ischek;
                const qm_value = moduleList.find((e) => e.value === 'Qualification_Module').ischek;
                const upm_value = moduleList.find((e) => e.value === 'User_Profile_Module').ischek;
                const tm_value = moduleList.find((e) => e.value === 'Training_Module').ischek;
                const im_value = moduleList.find((e) => e.value === 'Inventory_Module').ischek;
                const Gear_Administration = moduleList.find((e) => e.value === 'Gear_Administration').ischek;
                const am_value = moduleList.find((e) => e.value === 'Availability_Module').ischek;             
                const rm_value = moduleList.find((e) => e.value === 'Reporting_Module').ischek;             
                const Dashboard = moduleList.find((e) => e.value === 'Dashboard').ischek;
              
                const datas = {
                    "id": fdata.id,
                    "role": fdata.role,
                    "User_Profile_Module": upm_value,
                    "Training_Module": tm_value,
                    "Inventory_Module": im_value,
                    "Availability_Module": am_value,
                    "Qualification_Module": qm_value,
                    "Reporting_Module": rm_value,
                    "Role_Administration": Role_Administration,
                    "Dashboard": Dashboard,
                    "Gear_Administration": Gear_Administration,
                }
                const resp = await updateRoll_API(datas);
                if (resp && resp.success) {
                    setLoder(false);
                    successAlert(resp.message);
                    navigate("/roleadminstratorlist");
                }
            
            }
          });

      


     
     
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

    const cartClick = () => {

    }


    const cancelHandler = () => {
        Swal.fire({
            title:"Changes have been made",
            text: "Are you sure you want to exit with no changes?",
            icon: "question"
        }).then((result) => {
            if (result.isConfirmed) { setIsedit(false); }
        });
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
                                                <Button variant="danger" size="sm"
                                                    onClick={cancelHandler}>Cancel
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={4}>
                                                <InputField required={true} FormLabel='Role Name' FormPlaceHolder='Enter Role Name' value={fdata.role} onChange={(e) => setFdata((pre) => ({ ...pre, 'role': e.target.value }))} />
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
                                        <Row className='mt-3'>
                                                <span className='error'>Note: Fields marked with an asterisk (*) are mandatory and must be filled out before submitting the form .</span>
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
                                                            <CheckBoxButton BtnLabel={e} fulldata={e} BtnClass={'checked-btn checked mb-2 color_white'} type={'check'} onClick={cartClick} />
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
