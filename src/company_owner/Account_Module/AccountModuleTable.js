import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { TablePagination } from '../../components/TablePagination';
import { useNavigate } from 'react-router-dom';

const sampleData = [
    {
        accountName: 'Futurrsitc',
        accountId: '5146846548465',
        accountOwnerId: 'futurristic@gmail.com',
        billingDate: '2023-01-01',
        location: 'Indore, (M.P)',
        subscription: '$500.00',
        mobileNo: '+91 8989898877',
        status: 'Active'
    },
    {
        accountName: 'Infobeans',
        accountId: '5146846548465',
        accountOwnerId: 'Infobeans@gmail.com',
        billingDate: '2023-01-01',
        location: 'Bhopal, (M.P)',
        subscription: '$500.00',
        mobileNo: '+91 8989898877',
        status: 'Inactive'
    },
    {
        accountName: 'Futurrsitc',
        accountId: '5146846548465',
        accountOwnerId: 'futurristic@gmail.com',
        billingDate: '2023-01-01',
        location: 'Indore, (M.P)',
        subscription: '$500.00',
        mobileNo: '+91 8989898877',
        status: 'Active'
    },
    {
        accountName: 'Infobeans',
        accountId: '5146846548465',
        accountOwnerId: 'Infobeans@gmail.com',
        billingDate: '2023-01-01',
        location: 'Bhopal, (M.P)',
        subscription: '$500.00',
        mobileNo: '+91 8989898877',
        status: 'Inactive'
    },
    {
        accountName: 'Futurrsitc',
        accountId: '5146846548465',
        accountOwnerId: 'futurristic@gmail.com',
        billingDate: '2023-01-01',
        location: 'Indore, (M.P)',
        subscription: '$500.00',
        mobileNo: '+91 8989898877',
        status: 'Active'
    },
    // Add more data as needed
];

export const AccountModuleTable = () => {
    const navigate = useNavigate();

    const handleViewClick = () => {
        navigate('/accountdetail');
    };
    const handleEditClick = () => {
        navigate('/editaccount');
    };

    return (
        <>
            <div className='MainTable'>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>ACCOUNT NAME</th>
                            <th>ACCOUNT ID</th>
                            <th>ACCOUNT OWNER ID</th>
                            <th>BILLING DATE</th>
                            <th>LOCATION</th>
                            <th>SUBSCRIPTION</th>
                            <th>MOBILE NO</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleData.map((account, index) => (
                            <tr key={index}>
                                <td>{account.accountName}</td>
                                <td>{account.accountId}</td>
                                <td>{account.accountOwnerId}</td>
                                <td>{account.billingDate}</td>
                                <td>{account.location}</td>
                                <td>{account.subscription}</td>
                                <td>{account.mobileNo}</td>
                                <td>
                                    <Button variant="info" size="sm" className="me-2" style={{
                                        background:'#ECFDF5',
                                        color:'#064E3B',
                                        borderColor:'#ECFDF5',
                                        fontWeight:'500'
                                    }}
                                    onClick={handleViewClick}
                                    >View
                                    </Button>
                                    <Button variant="warning" size="sm" style={{
                                        background:'#FEF2F2',
                                        color:'#991B1B',
                                        borderColor:'#FEF2F2',
                                        fontWeight:'500'
                                    }}
                                    onClick={handleEditClick}
                                    >Edit
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <TablePagination/>
            </div>
        </>
    );
};
