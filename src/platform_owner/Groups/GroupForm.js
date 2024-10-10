import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../components/InputField';
import { SharedButton } from '../../components/Button';
import { errorAlert, successAlert } from '../../components/Alert';
import { createGroup_API, getAccount_API, getApparatus_API, getGear_API, getRollsAll_API, getUserByGroup_API } from '../../api_services/Apiservices';
import { SharedMultiSelect } from '../../components/SharedMultiSelect';
import { statusArrayEdit } from '../../helper/Helper';
import Select from '../../components/Select';

export const GroupForm = ({ setLoder }) => {
    const navigate = useNavigate();
    const [inventoryIDS, setInventoryIDS] = useState();
    const [gearIDS, setGearIDS] = useState([]);
    const [usersIds, setUsersIds] = useState([]);

    const [indata, setIndata] = useState({ "name": "", "group_status": "", "type": "", "description": "" });
    const [error, setError] = useState({ "name": "", "type": "", "users": "", "gears": "", "group_status": "", "description": "" });


    const [rolelist, setRolelist] = useState([]);
    const [userlist, setUserlist] = useState([]);


    const [gear, setGear] = useState([]);


    const getGear = async () => {
        setLoder(true);
        const resp = await getGear_API();
        if (resp && resp.success) {
            setLoder(false);
            const findata = resp.data;
            const mydata = findata.map(e => ({ label: e.gear_item_name, value: e._id }));
            setGear(mydata);
        }
        setLoder(false);
    }

    useEffect(() => {
        if (usersIds && usersIds.length > 0) { setError((pre) => ({ ...pre, 'users': "" })); }
        if (gearIDS && gearIDS.length > 0) { setError((pre) => ({ ...pre, 'gears': "" })); }
    }, [gearIDS, usersIds])

    const get_users_list = async (page, key = "") => {
        const data = { "page": page, userTypes: 3, "srkey": key }
        const resp = await getAccount_API(data);
        if (resp) {
            setLoder(false);
            const data = resp.data;
            const findata = resp.data;
            const mydata = findata.map(e => ({ label: e.first_name + " " + e.last_name, value: e._id }));
            setUserlist(mydata);
        }
        setLoder(false);
    }


    useEffect(() => { getGear(); get_users_list(); }, []);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;
        const { name, group_status } = indata;
        if (!name) { setError((pre) => ({ ...pre, "name": "Required" })); isValid = false; }
        if (!group_status) { setError((pre) => ({ ...pre, "group_status": "Required" })) }
        if (gearIDS.length <= 0) { setError((pre) => ({ ...pre, "gears": "Required" })); isValid = false; }

        
        if (isValid) {
            const fdata = {
                "grpname": name,
                "gear": gearIDS,
                "group_status": group_status
            }
            const resp = await createGroup_API(fdata);
            if (resp && resp.success) {
                e.target.reset();
                setIndata([]);
                setInventoryIDS();
                successAlert(resp.message);
                navigate("/groupslist");
            }
        }
        setLoder(false);
    }


    return (
        <>
            <div className='TrainingForm'>
                <Container fluid>
                    <Form onSubmit={submitHandler}>
                        <Row className='mb-3'>
                            <Col md={12} className='mb-2'>
                                <InputField required={true} FormType={'text'} FormLabel={"Group Name"} FormPlaceHolder={"Enter Group Name"} name='name' error={error.name} onChange={inputHandler} />
                            </Col>
                            <Col md={6} className='mb-2'>
                                <SharedMultiSelect
                                    isRequire={true}
                                    labelText="Select Gear"
                                    setSkillsdata={setGearIDS}
                                    name="gears"
                                    options={gear}
                                    error={error.gears}
                                />
                            </Col>
                            <Col md={6} className='mb-3'>
                                <Select required={true} FormLabel='Group Status' Array={statusArrayEdit} onChange={inputHandler} error={error.group_status} value={indata.group_status} name='group_status' />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4} className='mt-4'>
                                <SharedButton type={'submit'} BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </>
    )
}
