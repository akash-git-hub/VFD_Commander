import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SharedButton } from '../../components/Button';
import { errorAlert, successAlert } from '../../components/Alert';
import { assignGroupUser_API, createGroup_API, getAccount_API, getGroups_API } from '../../api_services/Apiservices';
import { SharedMultiSelect } from '../../components/SharedMultiSelect';
import moment from 'moment';

export const AssignGroupForm = ({ setLoder }) => {
    const navigate = useNavigate();



    const [userList, setUserList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);


    const group_list_Handler = async () => {
        setLoder(true);
        const resp = await getGroups_API();
        if (resp && resp.success) {
            setLoder(false);
            let data = resp.data;
            data = data.filter((e) => e.group_status === "Active");
            data = data.map(e => ({ label: e.name, value: e._id }));
            setGroupList(data);
        }
        setLoder(false);
    }


    const users_list_Handler = async (page, key = "") => {
        const data = { "page": page, userTypes: 3, "srkey": key }
        const resp = await getAccount_API(data);
        if (resp) {
            setLoder(false);
            let data = resp.data;
            data = data.map(e => ({ label: e.first_name + " " + e.last_name, value: e._id }));
            setUserList(data);
        }
        setLoder(false);
    }


    useEffect(() => { group_list_Handler(); users_list_Handler(); }, []);


    const submitHandler = async (e) => {
        e.preventDefault();
        const cr_time = moment().unix();
        let isValid = true;
        let checkGroup = selectedGroup.length;
        let checkUser = selectedUser.length;
        if (checkGroup === 0) { errorAlert("Please select a group name."); }
        if (checkUser === 0) { errorAlert("Please select a user name."); }
        if (checkGroup === 0 || checkUser === 0) { return; };

        if (isValid) {

            const data = {
                "groupsIDS": selectedGroup,
                "usersIDS": selectedUser,
                "time":cr_time,
            }
            const resp = await assignGroupUser_API(data);

            if (resp && resp.success) {
                e.target.reset();
                successAlert(resp.message);
                navigate("/inventorymodulelist", { state: { eventKey: "group" } });
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
                            <Col md={6} className='mb-2'>
                                <SharedMultiSelect
                                    isRequire={true}
                                    labelText="Select Group "
                                    setSkillsdata={setSelectedGroup}
                                    name="group"
                                    options={groupList}
                                />
                            </Col>
                            <Col md={6} className='mb-2'>
                                <SharedMultiSelect
                                    isRequire={true}
                                    labelText="Select User  "
                                    setSkillsdata={setSelectedUser}
                                    name="users"
                                    options={userList}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4} className='mt-4'>
                                <SharedButton type={'submit'} BtnLabel={"Assign"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </>
    )
}
