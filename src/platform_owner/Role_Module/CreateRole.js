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
        "Reporting_Module":false
    });

    const moduleList = [
        { id: 5, name: 'User Profile Module',value:"User_Profile_Module" },
        { id: 4, name: 'Training Module',value:"Training_Module" },
        { id: 1, name: 'Inventory Module',value:"Inventory_Module" },
        { id: 2, name: 'Availability Module',value:"Availability_Module" },
        { id: 3, name: 'Qualification Module',value:"Qualification_Module" }, 
        { id: 6, name: 'Reporting Module',value:"Reporting_Module" },
    ]

    const createHandler = async () => {
        if (fdata && !fdata.role) { errorAlert("Please Enter Roll"); return null; }
        setLoder(true)
        const datas = {
            "role": fdata.role,
            "User_Profile_Module": fdata.User_Profile_Module,
            "Training_Module":fdata.Training_Module,
            "Inventory_Module":fdata.Inventory_Module,
            "Availability_Module":fdata.Availability_Module,
            "Qualification_Module":fdata.Qualification_Module,
            "Reporting_Module":fdata.Reporting_Module
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
