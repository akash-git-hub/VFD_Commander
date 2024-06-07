import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { InputField } from '../../components/InputField'
import { CheckBoxButton } from '../../components/CheckBoxButton'
import { SharedButton } from '../../components/Button'

export const CreateRole = () => {
    return (
        <>
            <div className='CreateRoleForm'>
                <Container>
                    <Row>
                        <Col md={4}>
                            <InputField FormLabel='Role Name' FormPlaceHolder='Enter Role Name' />
                        </Col>
                    </Row>
                    <div className='RoleModule'>
                        <Row>
                            <Col md={3}>
                                <CheckBoxButton BtnLabel={'Inventory Module'} BtnClass={'checked-btn'} type={'check'} />
                            </Col>
                            <Col md={3}>
                                <CheckBoxButton BtnLabel={'Availability Module'} BtnClass={'checked-btn'} type={'check'} />
                            </Col>
                            <Col md={3}>
                                <CheckBoxButton BtnLabel={'Qualification Module'} BtnClass={'checked-btn'} type={'check'} />
                            </Col>
                            <Col md={3}>
                                <CheckBoxButton BtnLabel={'Training Module'} BtnClass={'checked-btn'} type={'check'} />
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={3}>
                                <CheckBoxButton BtnLabel={'User Profile Module'} BtnClass={'checked-btn'} type={'check'} />
                            </Col>
                            <Col md={3}>
                                <CheckBoxButton BtnLabel={'Reporting Module'} BtnClass={'checked-btn'} type={'check'} />
                            </Col>
                        </Row>
                    </div>
                    <Row className='mt-3'>
                        <Col md={4}>
                            <SharedButton BtnLabel={'Create'} type={'submit'} BtnVariant={'primary'} BtnClass={'w-100'} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
