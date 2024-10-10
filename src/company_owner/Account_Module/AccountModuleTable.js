import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { TablePagination } from '../../components/TablePagination';
import { useNavigate } from 'react-router-dom';



export const AccountModuleTable = ({ mydata, pagination, pageHanlder }) => {
    const navigate = useNavigate();
    const [account_data, setAccount_data] = useState([]);

    useEffect(() => { setAccount_data(mydata); }, [mydata])



    const handleViewClick = (data) => {
        navigate('/accountdetail', { state: { data } });
    };
    const handleEditClick = (data) => {
        navigate('/editaccount', { state: { data } });
    };

    return (
        <>
            <div className='MainTable' >
                <Table responsive className="table table-hover">
                    <thead>
                        <tr>
                            <th>ACCOUNT NAME</th>
                            <th>SUBSCRIPTION NAME</th>
                            <th>Contact Name</th>
                            {/* <th>ACCOUNT ID</th>
                            <th>OWNER ID</th>
                            <th>BILLING DATE</th>
                            <th>LOCATION</th> */}
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {account_data.map((account, index) => (
                            <tr key={index}>
                                <td >{account.accountName.length > 55 ?
                                    `${account.accountName.slice(0, 55)}...` :
                                    account.accountName
                                }</td>
                                <td >{account.subscription}</td>
                                <td >{account.contact_name}</td>
                                {/* <td >{account.accountId}</td>
                                <td >{account.accountOwnerId}</td>
                                <td style={{ maxWidth: "99px" }}>{moment.unix(account.billingDate).format("MM-DD-YYYY")}</td>
                                <td style={{ maxWidth: "99px" }}>{account.location}</td> */}
                                <td>
                                    <Button variant="info" size="sm" className="me-2" style={{
                                        background: '#ECFDF5',
                                        color: '#064E3B',
                                        borderColor: '#ECFDF5',
                                        fontWeight: '500'
                                    }}
                                        onClick={() => handleViewClick(account.data)}
                                    >Details
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
