import React, { useState, useEffect } from 'react';
import { Form, InputGroup, FormControl, Dropdown } from 'react-bootstrap';

const timeZones = [
    { value: 'PST', label: 'Pacific Standard Time (PST)' },
    { value: 'MST', label: 'Mountain Standard Time (MST)' },
    { value: 'CST', label: 'Central Standard Time (CST)' },
    { value: 'EST', label: 'Eastern Standard Time (EST)' },
    // Add more time zones as needed
];

export const SelectDropdown = ({ label, placeholder }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(timeZones);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        setFilteredOptions(timeZones);
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term === '') {
            setFilteredOptions(timeZones);
        } else {
            const filtered = timeZones.filter(option =>
                option.label.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredOptions(filtered);
        }
    };

    const handleSelect = (option) => {
        setSelectedOption(option.label);
    };

    return (
        <>
            <div className="timezone-dropdown">
                <Form.Label>{label}</Form.Label>
                <InputGroup className='w-100'>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" className='w-100'>
                            {selectedOption || placeholder}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <FormControl
                                placeholder={placeholder}
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            {filteredOptions.map(option => (
                                <Dropdown.Item key={option.value} onClick={() => handleSelect(option)}>
                                    {option.label}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </InputGroup>
            </div>
        </>
    )
}
