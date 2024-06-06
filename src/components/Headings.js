import React from 'react'
import { Stack } from 'react-bootstrap'

export const Headings = ({ MainHeading, SubHeading, HeadButton }) => {
    return (
        <>
            <Stack className='pt-md-5 px-3' direction='horizontal' gap={2} style={{
                justifyContent: 'space-between'
            }}>
                <Stack direction='vertical' gap={0}>
                    <h2 className='pt-md-5 mb-0'>{MainHeading}</h2>
                    <p style={{
                        color: '#64748B'
                    }}>{SubHeading}</p>
                </Stack>
                <Stack direction='horizontal' gap={0}>
                    {HeadButton}
                </Stack>
            </Stack>
        </>
    )
}
