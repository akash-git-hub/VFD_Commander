import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export const CheckBoxButton = ({ onClick, BtnLabel, BtnSize, BtnVariant, BtnClass, type }) => {


  const [isChecked, setIsChecked] = useState(false);
  const handleClick = (e) => {
    setIsChecked(!isChecked);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className={`${BtnClass} ${isChecked ? 'checked' : ''}`}
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
