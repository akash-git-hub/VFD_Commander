import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import Select from '../../../components/Select';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import { SharedButton } from '../../../components/Button';
import { createUserGear_API, getGear_API } from '../../../api_services/Apiservices';
import { successAlert } from '../../../components/Alert';
import { UserGearTable } from './UserGearTable';

export const EditGearForm = ({ pre, setLoder, setKey, getgr,grdata }) => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [maindata, setMaindata] = useState();
    const [grtype, setGrtype] = useState([]);

    const getdata = async () => {
        setLoder(true);
        const resp = await getGear_API();
        if (resp && resp.success) {
            setLoder(false);
            const prefdata = resp.data;
            const fdata = prefdata.map((e) => ({ "name": e.gear_item_name, "value": e._id }));
            setGrtype(fdata);
        }
        setLoder(false);
    }

    const addNewHandler = (e) => {
        const { name, value } = e.target;
        const field = [...fields];
        const index = field.findIndex((item) => item.title === name);
        if (index !== -1) {
            field[index] = {
                ...field[index],
                value: value
            };
        }
        setFields(field);
    }

    useEffect(() => {
        setMaindata(pre);
        getdata();
    }, [pre])

    const handleAddField = (title, placeholder) => {
        setFields([...fields, { title, placeholder }]);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [indata, setIndata] = useState({ "gear_id": "", "replacement_date": "", "issue_date": "" });
    const [error, setError] = useState({ "gear_id": "", "replacement_date": "", "issue_date": "" });
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((prev) => ({ ...prev, [name]: value }));
        setError((prev) => ({ ...prev, [name]: "" }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;
        if (!indata.gear_id) { setError((prev) => ({ ...prev, "gear_id": "Required" })); isValid = false; }
        if (!indata.replacement_date) { setError((prev) => ({ ...prev, "replacement_date": "Required" })); isValid = false; }
        if (!indata.issue_date) { setError((prev) => ({ ...prev, "issue_date": "Required" })); isValid = false; }

        if (isValid) {
            setLoder(true);
            const fdata = {
                "user_id": maindata._id,
                "gear_id": indata.gear_id,
                "replacement_date": indata.replacement_date,
                "issue_date": indata.issue_date,
                "add_field": fields
            }
            const resp = await createUserGear_API(fdata);

            if (resp && resp.success) {
                e.target.reset();
                setFields([]);
                setLoder(false);
                successAlert(resp.message);
                setKey("home");
                const id = maindata._id;
                getgr(id);
            }
            setLoder(false);
        }

    }

    return (
        <>
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Form onSubmit={submitHandler}>
                        <Row className='mb-2'>
                            <Col md={4}>
                                <Select FormLabel='Gear Type' FormPlaceHolder='Gear Type' Array={grtype} name='gear_id' error={error.gear_id} onChange={inputHandler} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'date'} FormLabel={"Issue Date"} FormPlaceHolder={"Issue Date"} name='issue_date' error={error.issue_date} onChange={inputHandler} />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'date'} FormLabel={"Replacement Date"} FormPlaceHolder={"Replacement Date"} name='replacement_date' error={error.replacement_date} onChange={inputHandler} />
                            </Col>

                        </Row>
                        <Row className='mb-2'>
                            {fields.map((e, i) => (
                                <Col md={4} key={i}>
                                    <InputField FormType={'text'} FormLabel={e.title} onChange={addNewHandler} name={e.title} FormPlaceHolder={e.placeholder} />
                                </Col>
                            ))}
                            <Col md={4}>
                                <SharedButton type={'button'} BtnLabel={"Add Field"} BtnVariant={'outline-dark'} BtnClass={"w-100 AddFieldBtn"} onClick={handleShowModal} />
                            </Col>
                        </Row>
                        <Row className='mb-2 mt-3'>
                            <Col md={4}>
                                <SharedButton BtnLabel={"Add"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                    <Row className='mt-5'><hr /></Row>                    
                    <UserGearTable grdata={grdata} />
                </Container>
            </div>
            <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
        </>
    );
};
