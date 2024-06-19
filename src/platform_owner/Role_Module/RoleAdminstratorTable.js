import React from 'react';
import { Table } from 'react-bootstrap';
import { TablePagination } from '../../components/TablePagination';
import { SearchPanel } from '../../components/SearchPanel';
import { IoSearch } from 'react-icons/io5';

const sampleData = [
    {
        accountName: 'Firefighters',
        accountId: 'Inventory Module, Availability Module,  Qualification Module, Message Module, Training Module..',
    },
    {
        accountName: 'Administrative Staff',
        accountId: 'Inventory Module, Availability Module,  Qualification Module, Message Module, Training Module..',
    },
    {
        accountName: 'Volunteers',
        accountId: 'Inventory Module, Availability Module,  Qualification Module, Message Module, Training Module..',
    },
    {
        accountName: 'Command Staff,',
        accountId: 'Inventory Module, Availability Module,  Qualification Module, Message Module, Training Module..',
    },
    {
        accountName: 'Manager',
        accountId: 'Inventory Module, Availability Module,  Qualification Module, Message Module, Training Module..',
    },
    {
        accountName: 'Product Manager',
        accountId: 'Inventory Module, Availability Module,  Qualification Module, Message Module, Training Module..',
    },
    {
        accountName: 'CEO',
        accountId: 'Inventory Module, Availability Module,  Qualification Module, Message Module, Training Module..',
    },
    {
        accountName: 'Staff',
        accountId: 'Inventory Module, Availability Module,  Qualification Module, Message Module, Training Module..',
    },
];

export const RoleAdminstratorTable = () => {
    return (
        <>
            <SearchPanel  StartIcon={<IoSearch />} FormPlaceHolder={"Search by Role Name"}/>
            <div className='MainTable'>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>ROLE NAME</th>
                            <th>MODULES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleData.map((account, index) => (
                            <tr key={index}>
                                <td>{account.accountName}</td>
                                <td>{account.accountId}</td>
                            </tr>
                        ))}
                    </tbody>
                    <TablePagination />
                </Table>
            </div>
        </>
    )
}
