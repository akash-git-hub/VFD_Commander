import React from 'react';
import PropTypes from 'prop-types';

export default function InputWithDollar({  
    formLabel = "",
    formType = "text",
    formPlaceholder = "",
    error = "",
    name = "",
    onChange = null,
    value = "",
    readOnly = false,
    isTextArea = false,
    max = '',
    min = "",
    star="",
    required = false
}) {
    return (
        <span>
            {formLabel && <label className='form-label'>{formLabel} {star ? <small className='error'>*</small> : ""}</label>}
            <div className='mb-3'>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" style={{ borderRadius: "5px 0px 0px 5px" }}>$</span>
                </div>
                {isTextArea ? (
                    <textarea
                        placeholder={formPlaceholder}
                        name={name}
                        className="form-control"
                        maxLength={max}
                        minLength={min}
                        readOnly={readOnly}
                        value={value}
                        onChange={onChange}
                        required={required}
                    />
                ) : (
                    <input
                        type={formType}
                        placeholder={formPlaceholder}
                        name={name}
                        className="form-control"
                        maxLength={max}
                        minLength={min}
                        min={min}
                        max={max}
                        readOnly={readOnly}
                        value={value}
                        onChange={onChange}
                        required={required}
                    />
                )}
                <div className="input-group-append">
                    <span className="input-group-text" style={{ borderRadius: "0px 5px 5px 0px" }}>.00</span>
                </div>              
            </div>
            <small className='error mt-0 p-0'>{error}</small>
            </div>
        </span>
    );
}

InputWithDollar.propTypes = {
    formLabel: PropTypes.string,
    formType: PropTypes.string,
    formPlaceholder: PropTypes.string,
    error: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    readOnly: PropTypes.bool,
    isTextArea: PropTypes.bool,
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    required: PropTypes.bool
};
