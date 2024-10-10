import React, { useEffect, useState } from 'react'
import { Col, Image, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const AvatarNew = ({ LinkLabel, LinkPath, Description,img="" }) => {
  
    return (
        <>
            <Link className='SubMenu' to={LinkPath} style={{
                textDecoration: 'none',
                color: '#000',
                fontSize: '18px'
            }}>
                <Row style={{
                    alignItems:'center'
                }}>
                    <Col md={3}>
                        <span>
                            <Image src={img ? img : "assets/images/avatar.png"} className='w-100 Avatar_img' roundedCircle  alt=''/>
                        </span>
                    </Col>
                    <Col md={9}>
                        <Stack direction='vertical' gap={0} >

                            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} >
                                {LinkLabel}
                            </span>
                            <p style={{ 
                                color: '#64748B',
                                margin: 0,
                                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                            }}>
                                {Description}
                            </p>
                        </Stack>
                    </Col>
                </Row>
            </Link>


        </>
    )
}
