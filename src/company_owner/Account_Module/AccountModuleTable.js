import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { TablePagination } from '../../components/TablePagination';
import { useNavigate } from 'react-router-dom';



export const AccountModuleTable = ({ setLoder,mydata ,pagination,pageHanlder}) => {
    const navigate = useNavigate();
    const [account_data, setAccount_data] = useState([]);

    useEffect(()=>{setAccount_data(mydata);},[mydata])

    

    const handleViewClick = (data) => {
        navigate('/accountdetail', { state: { data } });
    };
    const handleEditClick = (data) => {
        navigate('/editaccount', { state: { data } });
    };

    return (
        <>
            <div className='MainTable' >
                <Table responsive  style={{minHeight:"200px"}}>
                    <thead>
                        <tr>
                            <th>ACCOUNT NAME</th>
                            <th>ACCOUNT ID</th>
                            <th>OWNER ID</th>
                            <th>BILLING DATE</th>
                            <th>LOCATION</th>
                            <th>SUBSCRIPTION</th>
                            <th>MOBILE NO</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {account_data.map((account, index) => (
                            <tr key={index}>
                                <td style={{maxWidth:"99px"}}>{account.accountName}</td>
                                <td style={{maxWidth:"99px"}}>{account.accountId}</td>
                                <td style={{maxWidth:"99px"}}>{account.accountOwnerId}</td>
                                <td style={{maxWidth:"99px"}}>{account.billingDate}</td>
                                <td style={{maxWidth:"99px"}}>{account.location}</td>
                                <td style={{maxWidth:"99px"}}>INR {account.subscription}</td>
                                <td style={{maxWidth:"99px"}}>{account.mobileNo}</td>
                                <td>
                                    <Button variant="info" size="sm" className="me-2" style={{
                                        background: '#ECFDF5',
                                        color: '#064E3B',
                                        borderColor: '#ECFDF5',
                                        fontWeight: '500'
                                    }}
                                        onClick={()=>handleViewClick(account.data)}
                                    >View
                                    </Button>
                                    <Button variant="warning" size="sm" style={{
                                        background: '#FEF2F2',
                                        color: '#991B1B',
                                        borderColor: '#FEF2F2',
                                        fontWeight: '500'
                                    }}
                                        onClick={()=>handleEditClick(account.data)}
                                    >Edit
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <TablePagination pagination={pagination} pageHanlder={pageHanlder} />
            </div>
        </>
    );
};
