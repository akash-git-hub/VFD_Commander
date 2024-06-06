import React from 'react'
import { Image, Stack,  } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Avatar = ({LinkLabel, LinkPath, Description}) => {
    return (
        <>

            <Link className='SubMenu' to={LinkPath} style={{
                textDecoration: 'none',
                color: '#000',
                fontSize: '18px'
            }}>
                <Stack direction='horizontal' gap={1}>
                    <div>
                        <Image src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.1518270500.1717459200&semt=ais_user" className='w-75 Avatar_img' roundedCircle />
                    </div>
                    <Stack direction='vertical' gap={0}>
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
