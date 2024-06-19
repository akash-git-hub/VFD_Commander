import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export const CheckBoxButton = ({ onClick, BtnLabel, BtnSize, BtnVariant, BtnClass, type,value }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = (e) => {
    setIsChecked(!isChecked);
    if (onClick) {
      onClick({vlaue:e,isChecked:isChecked});
    }
  };

  return (
    <>
      <Button
        onClick={()=>handleClick(value)}
        className={`${BtnClass} ${isChecked ? 'checked mb-2' : 'mb-2'}`}
        type={type}
        variant={BtnVariant}
        size={BtnSize}
        style={{
          backgroundColor: isChecked ? '#0d6efd' : '',
          color: isChecked ? '#fff' : '',
          
        }}
      >
        {BtnLabel}
      </Button>
    </>
  )
}
