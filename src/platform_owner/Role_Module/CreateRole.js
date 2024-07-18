import React, {  useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { InputField } from '../../components/InputField'
import { CheckBoxButton } from '../../components/CheckBoxButton'
import { SharedButton } from '../../components/Button'
import { errorAlert, successAlert } from '../../components/Alert'
import { create_rolls } from '../../api_services/Apiservices'
import { useNavigate } from 'react-router-dom'

export const CreateRole = ({ setLoder }) => {
    const navigate = useNavigate();
    const [fdata, setFdata] = useState({
        "role": "",
        "User_Profile_Module": false,
        "Training_Module":false,
        "Inventory_Module":false,
        "Availability_Module":false,
        "Qualification_Module":false,
        "Reporting_Module":false,
        "Dashboard":false,
        "Role_Administration":false,
        "Gear_Administration":false
    });

    const moduleList = [
        { id: 8, name: 'Role Administration',value:"Role_Administration" },
        { id: 3, name: 'Qualification Administration',value:"Qualification_Module" },
        { id: 5, name: 'User Profile Administration',value:"User_Profile_Module" },
        { id: 4, name: 'Training Administration',value:"Training_Module" },
        { id: 1, name: 'Inventory Administration',value:"Inventory_Module" },
        { id: 9, name: 'Gear Administration',value:"Gear_Administration" },
        { id: 2, name: 'Availability',value:"Availability_Module" },   
        { id: 6, name: 'Reporting',value:"Reporting_Module" },
        { id: 7, name: 'Dashboard',value:"Dashboard" },      
    ]

    const createHandler = async () => {
        if (fdata && !fdata.role) { errorAlert("Please Enter Role"); return null; }
        setLoder(true)
        const datas = {
            "role": fdata.role,
            "Role_Administration":fdata.Role_Administration,
            "Qualification_Module":fdata.Qualification_Module,
            "User_Profile_Module": fdata.User_Profile_Module,
            "Training_Module":fdata.Training_Module,
            "Inventory_Module":fdata.Inventory_Module,
            "Gear_Administration":fdata.Gear_Administration,
            "Availability_Module":fdata.Availability_Module,           
            "Reporting_Module":fdata.Reporting_Module,
            "Dashboard":fdata.Dashboard            
        }
        const resp = await create_rolls(datas);
        if (resp && resp.success) {          
            setLoder(false);
            successAlert(resp.message);
            navigate("/roleadminstratorlist");            
        }
        setLoder(false);
    }

    const checkedHandler = (data) => {
        const name = data.data.value;
        const isChecked = data.isChecked;
        setFdata((pre) => ({ ...pre, [name]: isChecked}));      
    }
    return (
        <>
            <div className='CreateRoleForm'>
                <Container>
                    <Row>
                        <Col md={4}>
                            <InputField FormLabel='Role Name' FormPlaceHolder='Enter Role Name' value={fdata.roll} onChange={(e) => setFdata((pre) => ({ ...pre, 'role': e.target.value }))} />
                        </Col>
                    </Row>
                    <h6>Select Module</h6>
                    <div className='RoleModule'>
                        <Row>
                            {moduleList && moduleList.map((e, i) => (
                                <Col md={3} key={i} >
                                    <CheckBoxButton BtnLabel={e.name} fulldata={e} BtnClass={'checked-btn'} onClick={checkedHandler} type={'check'} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <Row className='mt-3'>
                        <Col md={4}>
                            <SharedButton BtnLabel={'Create'} type={'button'} onClick={createHandler} BtnVariant={'primary'} BtnClass={'w-100'} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
