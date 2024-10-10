import React from 'react'
import { Stack } from 'react-bootstrap'

export const HeadingUserProfile = ({ image, SubHeading, prName, HeadButton, MainHeading }) => {
    return (
        <>
            <Stack className='px-1' direction='horizontal' gap={2} style={{
                justifyContent: 'space-between'
            }}>

                <Stack direction='vertical' gap={0} >
                    
                    <h2 className='pt-md-3 mb-0'>{MainHeading}</h2>
                    <p className='mt-3'>                         
                        <img src={image ? image : 'assets/images/avatar.png'} alt="Profile Preview" className='img-fluid me-3' style={{
                            border: "1px solid",
                            borderRadius: "50px",
                            width: "50px",
                            height: '50px'
                        }} />
                        <b>{prName}</b>
                    </p>
                </Stack>                
                <Stack direction='horizontal' gap={0}>
                    {HeadButton}
                </Stack>
            </Stack>
            <hr />
        </>
    )
}
