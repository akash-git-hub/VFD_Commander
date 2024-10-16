import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { TablePagination } from '../../components/TablePagination';
import { useNavigate } from 'react-router-dom';

export const RoleAdminstratorTable = ({ rolldata, pagination, pageHanlder }) => {
    const navigate = useNavigate();
    const handleEditClick = (data) => {
        navigate("/rolelistdetail", { state: { data } });

    }
    return (
        <>
            <div className='MainTable'>
                <Table responsive className="table table-hover">
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>MODULES</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rolldata.map((e, i) => (
                            <tr key={i}>
                                <td>{e.name}</td>
                                <td style={{
                                    maxWidth:'350px'
                                }}>{e.modules}</td>
                                <td>
                                    <Button variant="success" size="sm" className="me-2"
                                        onClick={() => handleEditClick(e.fulldata)}
                                    >Detail
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <TablePagination pagination={pagination} pageHanlder={pageHanlder} />
            </div>
        </>
    )
}
