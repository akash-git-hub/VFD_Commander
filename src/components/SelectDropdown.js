import React, { useState, useEffect } from 'react';
import { Form, InputGroup, FormControl, Dropdown } from 'react-bootstrap';



export const SelectDropdown = ({ FormLabel, placeholder,onChange,Array,name,error }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(Array);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        const newArray = [];
        if(Array && Array.length > 0) {           
            Array.map((e)=>{
                newArray.push({'name':name,'label':e.label,'value':e.value});
            })
        }
        setFilteredOptions(newArray);
    }, [Array,name]);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term === '') {
            setFilteredOptions(Array);
        } else {
            const filtered = Array.filter(option =>
                option.label.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredOptions(filtered);
        }
    };

    const handleSelect = (option) => {
        onChange(option);
        setSelectedOption(option.label);
    };

    return (
        <>
            <div className="timezone-dropdown">
                <Form.Label>{FormLabel}</Form.Label>
                <InputGroup className='w-100'>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" className='w-100'>
                            {selectedOption || 'select'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <FormControl
                                placeholder='Select'
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            {filteredOptions.map(option => (
                                <Dropdown.Item key={option.value} onClick={() => handleSelect(option)}>
                                    {option.label}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                        <small className='error'>{error}</small>
                    </Dropdown>
                </InputGroup>
            </div>
        </>
    )
}
