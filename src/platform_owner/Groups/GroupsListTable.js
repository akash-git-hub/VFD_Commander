import React from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { TablePagination } from '../../components/TablePagination';



export const GroupsListTable = ({ trdata }) => {
    const navigate = useNavigate();
    const handleEditClick = (data) => {
        navigate("/groupsdetails", { state: { data } });

    }


    return (
        <>
            <div className='TrainingViewList'>
                <Container>
                    <div className='MainTable'>
                        <Table responsive className="table table-hover">
                            <thead>
                                <tr>
                                    <th>GROUP NAME</th>
                                    <th>ON OF MEMBER</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trdata.map((account, index) => (
                                    <tr key={index}>
                                        <td>{account.name}</td>
                                        <td>{account.type}</td>
                                        <td>     <Button variant="success" size="sm" className="me-2"
                                            onClick={() => handleEditClick(account)}
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
