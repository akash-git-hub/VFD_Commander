import React from 'react'
import { Button } from 'react-bootstrap'

export const SharedButton = ({onClick, BtnLabel, BtnSize, BtnVariant, BtnClass, startIcon, endIcon}) => {
    return (
        <>
            <Button onClick={onClick} className={BtnClass} variant={BtnVariant} size={BtnSize}>
                 {startIcon && <span style={{ marginRight: '8px' }}>{startIcon}</span>}
                {BtnLabel}
                {endIcon && <span style={{ marginLeft: '8px' }}>{endIcon}</span>}
            </Button>
        </>
    )
}
