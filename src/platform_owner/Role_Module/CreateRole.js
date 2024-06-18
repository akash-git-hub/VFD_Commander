import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { InputField } from '../../components/InputField'
import { CheckBoxButton } from '../../components/CheckBoxButton'
import { SharedButton } from '../../components/Button'
import { errorAlert, successAlert } from '../../components/Alert'
import { create_rolls, getRolls } from '../../api_services/Apiservices'

export const CreateRole = ({ setLoder }) => {
    const [names, setNames] = useState('');
    const [mylist, setMylist] = useState([]);

    const rollList = async () => {
        const resp = await getRolls();
        if (resp) {
            const data = resp.data;
            console.log(data);
            setMylist(data);
        }
    }

    useEffect(() => { rollList(); }, []);

    const createHandler = async () => {
        if (!names) { errorAlert("Please Enter Roll"); return null; }
        setLoder(true)
        const resp = await create_rolls({ "name": names })
        if (resp && resp.success) {
            rollList();
            setNames('');
            setLoder(false);
            successAlert(resp.message);
        }
        setLoder(false);

    }
    return (
        <>
            <div className='CreateRoleForm'>
                <Container>
                    <Row>
                        <Col md={4}>
                            <InputField FormLabel='Role Name' FormPlaceHolder='Enter Role Name' value={names} onChange={(e) => setNames(e.target.value)} />
                        </Col>
                    </Row>
                    <div className='RoleModule'>
                        <Row>
                            {mylist && mylist.map((e,i) => (
                                <Col md={3} key={i} >
                                    <CheckBoxButton BtnLabel={e.name} BtnClass={'checked-btn'} type={'check'} />
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
