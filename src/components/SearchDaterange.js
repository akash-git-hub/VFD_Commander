import React, { useState } from 'react'
import { Row, Col, Container, Form, InputGroup } from 'react-bootstrap'
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

export const SearchDaterange = ({ FormLabel, FormType, FormPlaceHolder, StartIcon, onChange  }) => {
    
    return (
        <>
            <div className='SearchBox'  style={{border:"1px solid #e6e6e6", borderRadius:'10px'}} >
                <Container>
                    <Row style={{padding:"8px 0px"}}>
                        <Space direction="vertical" size={12}>
                            <RangePicker  onChange={onChange}  format={"MM/DD/YYYY"} />
                        </Space>
                    </Row>
                </Container>
            </div>
        </>
    )
}
