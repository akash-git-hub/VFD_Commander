import React, { useEffect, useState } from 'react'
import { Image, Stack, } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Avatar = ({ LinkLabel, LinkPath, Description }) => {
  const [img ,setImg] = useState();
  useEffect(()=>{
    setImg(localStorage.getItem('proimage'));
  },[localStorage.getItem('proimage')])
    return (
        <>

            <Link className='SubMenu' to={LinkPath} style={{
                textDecoration: 'none',
                color: '#000',
                fontSize: '18px'
            }}>
                <Stack direction='horizontal' gap={2} style={{padding:'0.2rem'}}>
                    <div style={{marginRight:"0.2rem"}}>
                        <Image src={img ? img : "assets/images/avatar.png"} className='Avatar_img' style={{width:'50px',height:'50px'}} roundedCircle />
                    </div>
                    <Stack direction='vertical' gap={0} >
                        <span>
                            {LinkLabel}
                        </span>
                        <p style={{
                            color: '#64748B',
                            margin: 0
                        }}>
                            {Description}
                        </p>
                    </Stack>
                </Stack>
            </Link>


        </>
    )
}
