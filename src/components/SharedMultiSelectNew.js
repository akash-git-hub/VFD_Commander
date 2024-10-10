import React, { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useEffect } from "react";



export const SharedMultiSelectNew = ({ labelText, options, name, setSkillsdata, id, value, error, isRequire = false, }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSkillsdata(selectedOptions);
  }, [selectedOptions]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const handleSelectAll = () => {
    if (selectedOptions.length === options.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions([...options]);
    }
  };

  useEffect(() => {
    if (value && value.length > 0 && options && options.length > 0) {
      const setop = [];
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < options.length; j++) {
          if (value[i].preId === options[j].value) {
            setop.push({
              value: options[j].value, label: options[j].label
            })
          }
        }
      }
      setSelectedOptions(setop);
    }
  }, [value, options]);


  const handleClearAll = () => {
    setSelectedOptions([]);
  };

  const handleOptionToggle = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const renderMenu = (results, menuProps) => (
    <div className="MultiSelected" {...menuProps}>
      <div>
        <input
          type="checkbox"
          checked={selectedOptions.length === options.length}
          onChange={handleSelectAll}
        />
        <span>Select All</span>
        <hr className="mt-1 mb-0" />
      </div>
      <div className="MultiSelectedDrop">
        {results.map((result, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={selectedOptions.includes(result)}
              onChange={() => handleOptionToggle(result)}
            />
            <span>{result.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <label className="form-label inputLable">{labelText} {isRequire ? <small className="error">*</small> : ""}</label>

      <Typeahead
        id="my-typeahead-id"
        multiple
        name={name}
        options={options}
        selected={selectedOptions}
        onChange={handleChange}
        placeholder="Select options"
        labelKey="label"
        dropdownProps={{
          style: { maxHeight: "200px", overflow: "auto" },
        }}
        renderMenu={renderMenu}
      />
      <small className="error">{error}</small>

      {/* {selectedOptions.length > 0 && (
        <button className="btn btn-sm btn-link mt-2" onClick={handleClearAll}>
          X
        </button>
      )} */}

    </>
  );
};

