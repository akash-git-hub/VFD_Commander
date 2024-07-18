import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Stack, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../components/InputField';
import { Textareanew } from '../../components/Textareanew';
import { SharedButton } from '../../components/Button';
import { AddFieldModal } from '../../commonpages/AddFieldModal';
import { errorAlert, successAlert } from '../../components/Alert';
import { createGroup_API, createQualification_API, getRollsAll_API, getUserByGroup_API } from '../../api_services/Apiservices';
import { SharedMultiSelect } from '../../components/SharedMultiSelect';

export const GroupForm = ({ setLoder }) => {
    const navigate = useNavigate();
    const [rolesIds, setRolesIds] = useState();
    const [usersIds, setUsersIds] = useState();

    const [indata, setIndata] = useState({ "name": "", "type": "", "description": "" });
    const [error, setError] = useState({ "name": "", "type": "", "description": "" });


    const [rolelist, setRolelist] = useState([]);
    const [userlist, setUserlist] = useState([]);

    const getrolls = async () => {
        const resp = await getRollsAll_API();
        if (resp) {
            const findata = resp.data;
            const mydata = findata.map(e => ({ label: e.role, value: e._id }));
            setRolelist(mydata);
        }
    }

    const getUsersByRole = async (data) => {
        let fdata = [];
        if (data && data.length > 0) {
            fdata = data.map((e) => e.value);
        }
        const resp = await getUserByGroup_API(fdata);
        if (resp) {
            const findata = resp.data;
            const mydata = findata.map(e => ({ label: e.first_name + " " + e.last_name, value: e._id }));
            setUserlist(mydata);
        }
    }

    useEffect(() => { getUsersByRole(rolesIds); }, [rolesIds]);
    useEffect(() => { getrolls(); }, []);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;
        if (!indata.name) { setError((pre) => ({ ...pre, "name": "Required" })); isValid = false; }
        if (usersIds.length <= 0) { errorAlert("Users are required"); return false; }
        let myusersIds = [];
        if (usersIds && usersIds.length > 0) {
            myusersIds = usersIds.map((e) => ({ value: e.value }));
        }
        if (isValid) {
            const fdata = {
                "grpname": indata.name,
                "usersId": myusersIds,
            }
            const resp = await createGroup_API(fdata);
            if (resp && resp.success) {
                e.target.reset();
                setIndata([]);
                setRolesIds();
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
                        <Row>
                            <Col md={4} className='mb-2'>
                                <InputField FormType={'text'} FormLabel={"Group Name"} FormPlaceHolder={"Enter Group Name"} name='name' error={error.name} onChange={inputHandler} />
                            </Col>
                            <Col md={4} className='mb-2'>
                                <SharedMultiSelect
                                    labelText="Select Role"
                                    setSkillsdata={setRolesIds}
                                    name="skills"
                                    options={rolelist}
                                />
                            </Col>
                            <Col md={4} className='mb-2'>
                                <SharedMultiSelect
                                    labelText="Select User"
                                    setSkillsdata={setUsersIds}
                                    name="skills"
                                    options={userlist}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <SharedButton type={'submit'} BtnLabel={"Create"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </>
    )
}
