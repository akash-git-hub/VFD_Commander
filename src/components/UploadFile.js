import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { CiCirclePlus } from "react-icons/ci";


export const UploadFile = ({ FormLabel="", error="", name="", onChange=null, className, controlId }) => {
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }

        if (onChange) {
            onChange(file);
        }
    };

    return (
        <>
            <Form.Group className="mb-3" controlId={controlId} style={{
                position:'relative',
                textAlign:'center',
                border:'2px dashed #000',
                padding:'10px',
                background:'#e8eaee'
            }}>
                <div className={`custom-file-input ${className}`} style={{
                    position:'relative'
                }}>
                    <input
                        type="file"
                        name={name}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{
                            width:'100%',
                            height:'90px',
                            position:'absolute',
                            left:'0',
                            opacity:'0'
                        }}
                    />
                     {preview ? (
                        <img src={preview} alt="Profile Preview" className='img-fluid'/>
                    ) : (
                        <CiCirclePlus  style={{
                            fontSize:'3rem'
                        }}/>
                    )}
                </div>
                <Form.Label className='text-center my-2'>{FormLabel}</Form.Label>
                <small className='error'>{error}</small>
            </Form.Group>
        </>
    );
};
