import React from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { SearchPanel } from '../../components/SearchPanel';
import { TablePagination } from '../../components/TablePagination';
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


export const ListView = () => {
    return (
        <>
            <div className='TrainingViewList'>
                <Container>
                    <SearchPanel StartIcon={<IoSearch />} FormPlaceHolder={"Search by Role Name"} />
                    <div className='MainTable'>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>TRAINING NAME</th>
                                    <th>DESCRIPTION</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sampleData.map((account, index) => (
                                    <tr key={index}>
                                        <td>{account.accountName}</td>
                                        <td>{account.accountId}</td>
                                        <td>     <Button variant="success" size="sm" className="me-2" 
                                            // onClick={handleEditClick}
                                        >Detail
                                        </Button></td>
                                    </tr>
                                ))}
                            </tbody>
                            <TablePagination />
                        </Table>
                    </div>
                </Container>
            </div>
        </>
    )
}
