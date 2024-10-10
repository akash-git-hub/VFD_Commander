import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { Checkbox } from '../../components/Checkbox';
import { Textareanew } from '../../components/Textareanew';
import { SharedButton } from '../../components/Button';
import { getAccount_API, sendMessage_API } from '../../api_services/Apiservices';
import { errorAlert, successAlert } from '../../components/Alert';
import moment from 'moment';

export const MessageList = ({ setLoder, msgHandler }) => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [sendmode, setSendmode] = useState({ "email": false, "sms": false, "app": false });
    const [allcheck, setAllcheck] = useState(false);


    const get_account_list = async (page, key = "") => {
        const data = { "page": page, userTypes: 3, "srkey": key }
        const resp = await getAccount_API(data);
        if (resp) {
            const data = resp.data;
            setLoder(false);
            let filterddata = data.map((e) => ({
                id: e._id,
                name: e.first_name + "" + e.last_name,
                email: e.email,
            }))
            setUsers(filterddata);
        }
        setLoder(false);
    }

    useEffect(() => { get_account_list(); }, [])

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users.map(user => user.id));
        }
        setSelectAll(!selectAll);
    };

    useEffect(() => {
        if (selectedUsers.length === users.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedUsers, users])

    const handleCheckboxChange = (userId) => {
        setSelectedUsers(prevSelectedUsers =>
            prevSelectedUsers.includes(userId)
                ? prevSelectedUsers.filter(id => id !== userId)
                : [...prevSelectedUsers, userId]
        );
    };

    const convertArrayToObjects = (arr) => {
        return arr.map(item => ({ value: item }));
    }

    const onSendHandler = async () => {
        if (!message) { errorAlert("Please Enter Message"); return; }
        if (selectedUsers.length > 0) {
            const nowDate = moment().unix();
            setLoder(true);
            const result = convertArrayToObjects(selectedUsers);
            const fdata = { "message": message, "clientId": result,"sendDate":nowDate,"sendOption":sendmode }
            const resp = await sendMessage_API(fdata);
            if (resp && resp.success) {
                msgHandler();
                setMessage([]);
                setSelectedUsers([]);
                setLoder(false);
                successAlert(resp.message);
            }
            msgHandler();
            setLoder(false);
        } else { errorAlert("Please select users") }
    }



    const CheckHandler = (e) => {
        const { name } = e.target;
        setSendmode(prevState => ({
            ...prevState,
            [name]: !prevState[name]
        }));
    };

    useEffect(() => {
        if (sendmode.email && sendmode.sms && sendmode.app) {
            setAllcheck(true);
        } else {
            setAllcheck(false);
        }
    }, [sendmode])

    const checkallHandler = () => {
        if (!allcheck) {
            setSendmode({ "email": true, "sms": true, "app": true });
        } else {
            setSendmode({ "email": false, "sms": false, "app": false });
        }
        setAllcheck(!allcheck);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Container>
                <Row className='MainTable'>
                    <Stack direction='horizontal' className='mt-3' gap={2} style={{ justifyContent: 'space-between' }}>
                        <span style={{ fontSize: "18px", fontWeight: "bold" }}>Users List</span>
                        <Checkbox
                            Checklabel={"Select All"}
                            value={selectAll}
                            onChange={handleSelectAll}
                        />
                    </Stack>
                    <Col md={12} className='mb-2 mt-2'>
                        <div style={{
                            maxHeight: '200px',
                            overflowY: 'auto',
                            border: '1px solid #ddd',
                            borderRadius:'10px',
                            padding: '5px',
                            marginBottom: '10px'
                        }}>

                            {users.map(user => (
                                <div key={user.id} className='Plans my-2' style={{ padding: "5px 15px", border: "none" }}>
                                    <Stack direction='horizontal' gap={2}>
                                        <Stack direction='vertical' gap={0} style={{ justifyContent: 'start' }}>
                                            <h6 style={{ margin: "0px" }}>{user.name} ({user.email})</h6>
                                        </Stack>
                                        <Stack direction='horizontal' gap={2}>
                                            <Checkbox
                                                ID={user.id}
                                                name={user.name}
                                                value={selectedUsers.includes(user.id)}
                                                onChange={() => handleCheckboxChange(user.id)}
                                            />
                                        </Stack>
                                    </Stack>
                                </div>
                            ))}
                        </div>
                        <Row>
                            <span style={{ fontSize: "18px", fontWeight: "bold",marginBottom:'.5rem' }}>Message</span>
                            <Textareanew rows={3} FormPlaceHolder={'write a message'} name={'message'} value={message} onChange={(e) => setMessage(e.target.value)} />
                        </Row>
                        <Row>
                            <Col md={8}>
                                <span className='mb-2' style={{ fontSize: "18px", fontWeight: "bold" }}> Send Options</span>
                                <Stack direction='horizontal' className='mt-2' gap={2} style={{ justifyContent: 'space-between' }}>
                                    <Checkbox
                                        Checklabel={"Select All"}
                                        value={allcheck}
                                        onChange={checkallHandler}
                                    />
                                    <Checkbox
                                        name={"email"}
                                        Checklabel={"Email"}
                                        value={sendmode.email}
                                        onChange={CheckHandler}
                                    />
                                    <Checkbox
                                        name={"sms"}
                                        Checklabel={"Text SMS"}
                                        value={sendmode.sms}
                                        onChange={CheckHandler}
                                    />
                                    <Checkbox
                                        name={"app"}
                                        Checklabel={"App Notification"}
                                        value={sendmode.app}
                                        onChange={CheckHandler}
                                    />
                                </Stack>
                            </Col>
                        </Row>

                        <div style={{ marginTop: 'auto', textAlign: "right", borderTop: '1px solid #ddd' }}>
                            <SharedButton BtnLabel={'Send'} BtnVariant={'primary'} onClick={onSendHandler} style={{ padding: "5px 70px" , marginTop:'10px'}} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
