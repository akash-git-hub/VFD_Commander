import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import Select from '../../../components/Select';
import { AddFieldModal } from '../../../commonpages/AddFieldModal';
import { SharedButton } from '../../../components/Button';
import { createUserQualification_API,  getQualification_API } from '../../../api_services/Apiservices';
import { errorAlert, successAlert } from '../../../components/Alert';
import { UserQualificationTable } from './UserQualificationTable';

export const UserQuilification = ({ pre, setLoder, setKey,quadata,getqua }) => {
    const [fields, setFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [maindata, setMaindata] = useState();
    const [grtype, setGrtype] = useState([]);

    const getdata = async () => {
        setLoder(true);
        const resp = await getQualification_API();
        if (resp && resp.success) {
            setLoder(false);
            const prefdata = resp.data;
            const fdata = prefdata.map((e) => ({ "name": e.name, "value": e._id }));
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

    const [indata, setIndata] = useState({ "qualifications_id": "", "exp_date": "" });

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((prev) => ({ ...prev, [name]: value }));
    }

    const [checked, setChecked] = useState(false);

    const handleChange = () => { setChecked(!checked); };
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!indata.qualifications_id) {errorAlert("Qualifications Type Is Required"); return; }
        setLoder(true);
        const fdata = {
            "user_id": maindata._id,
            "qualifications_id": indata.qualifications_id,
            "exp_date": indata.exp_date,
            "add_field": fields
        }
        const resp = await createUserQualification_API(fdata);

        if (resp && resp.success) {
            e.target.reset();
            setFields([]);
            setLoder(false);
            successAlert(resp.message);
            const id = maindata._id;
            getqua(id);
            setKey("home");
        }
        setLoder(false);


    }

    return (
        <>
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Form onSubmit={submitHandler}>
                        <Row>
                            <Col md={6} className='mb-2'>
                                <Select FormLabel='Qualifications Type' FormPlaceHolder='Qualifications Type' Array={grtype} name='qualifications_id'  onChange={inputHandler} />
                            </Col>
                            <Col md={6} style={{
                                position: 'relative'
                            }} className='mb-2'>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label={!checked ? "Disable" : "Enable"}
                                    style={{ position: 'absolute', right: '0' }}
                                    checked={checked}
                                    onChange={handleChange}
                                />
                                <InputField FormType={'date'} readOnly={!checked} FormLabel={"Expiration Date"} name='exp_date'  onChange={inputHandler} FormPlaceHolder='MM/DD/YYYY' />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            {fields.map((e, i) => (
                                <Col md={6} key={i}>
                                    <InputField FormType={'text'} FormLabel={e.title} onChange={addNewHandler} name={e.title} FormPlaceHolder={e.placeholder} />
                                </Col>
                            ))}
                            <Col md={6}>
                                <SharedButton type={'button'} BtnLabel={"Add Field"} BtnVariant={'outline-dark'} BtnClass={"w-100 AddFieldBtn"} onClick={handleShowModal} />
                            </Col>
                        </Row>
                        <Row className='mb-2 mt-3'>
                            <Col md={6}>
                                <SharedButton BtnLabel={"Add"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                    <Row className='mt-5'><hr /></Row>
                    <UserQualificationTable quadata={quadata}/>
                </Container>
            </div>
            <AddFieldModal show={showModal} handleClose={handleCloseModal} handleAddField={handleAddField} />
        </>
    );
};
