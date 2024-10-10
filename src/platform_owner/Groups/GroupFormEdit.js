import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../components/InputField';
import { SharedButton } from '../../components/Button';
import { successAlert } from '../../components/Alert';
import { getGear_API, groupUpdate_API } from '../../api_services/Apiservices';
import { statusArrayEdit } from '../../helper/Helper';
import Select from '../../components/Select';
import { SharedMultiSelectNew } from '../../components/SharedMultiSelectNew';

export const GroupFormEdit = ({ setLoder, viewData, gearList }) => {
    const navigate = useNavigate();
    const [gearIDS, setGearIDS] = useState([]);
    const [usersIds, setUsersIds] = useState([]);
    const [grpPreValue, setGrpPreValue] = useState([]);    
    const [gear, setGear] = useState([]);

    const [indata, setIndata] = useState({ "id": "", "name": "", "group_status": "", "type": "", "description": "" });
    const [error, setError] = useState({ "name": "", "type": "", "users": "", "gears": "", "group_status": "", "description": "" });

    useEffect(() => {
        if (viewData && viewData.name) {
            setIndata((pre) => ({ ...pre, "id": viewData._id, 'name': viewData.name, 'group_status': viewData.group_status }))
        }
    }, [viewData])



    useEffect(() => {
        const Ids = [];
        if (gearList && gearList.length > 0) {
            gearList.forEach((item) => {
                Ids.push({ 'preId': item._id });
            });
        }
        setGrpPreValue(Ids); // Update state with the array of objects
    }, [gearList]);



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



    useEffect(() => { getGear(); }, []);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = 1;
        const { name, group_status, id } = indata;
        if (!name) { setError((pre) => ({ ...pre, "name": "Required" })); isValid = 2; }
        if (!group_status) { setError((pre) => ({ ...pre, "group_status": "Required" })); isValid = 3; }
        if (gearIDS.length <= 0) { setError((pre) => ({ ...pre, "gears": "Required" })); isValid = 4; }

        if (isValid === 1) {
            const fdata = {
                "grpId": id,
                "grpName": name,
                "gear": gearIDS,
                "group_status": group_status
            }

            const resp = await groupUpdate_API(fdata);
            if (resp && resp.success) {
                e.target.reset();
                setIndata([]);
                successAlert(resp.message);
                navigate("/inventorymodulelist", { state: { eventKey: 'group' } });
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
                                <InputField required={true} FormType={'text'} FormLabel={"Group Name"} FormPlaceHolder={"Enter Group Name"} name='name' error={error.name} value={indata.name} onChange={inputHandler} />
                            </Col>
                            <Col md={6} className='mb-2'>
                                <SharedMultiSelectNew
                                    isRequire={true}
                                    labelText="Select Gear"
                                    setSkillsdata={setGearIDS}
                                    name="gears"
                                    options={gear}
                                    value={grpPreValue}
                                    error={error.gears}
                                />
                            </Col>
                            <Col md={6} className='mb-3'>
                                <Select required={true} FormLabel='Group Status' Array={statusArrayEdit} value={indata.group_status} onChange={inputHandler} error={error.group_status} name='group_status' />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4} className='mt-4'>
                                <SharedButton type={'submit'} BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </>
    )
}
