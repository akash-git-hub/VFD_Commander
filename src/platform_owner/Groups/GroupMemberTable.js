import React from 'react'
import { Button, Container, Stack, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { TablePagination } from '../../components/TablePagination';
import { SearchPanel } from '../../components/SearchPanel';
import { SharedButton } from '../../components/Button';
import { RiDeleteBinLine } from 'react-icons/ri';



export const GroupMemberTable = ({ trdata }) => {
    const navigate = useNavigate();
    const handleEditClick = (data) => {
        navigate("/groupsdetails", { state: { data } });

    }
    const handleCreateAccount = () => {
        navigate('/addmember');
    }


    return (
        <>
            <div className='TrainingViewList'>
                <Container>
                    <Stack direction='horizontal' gap={2} style={{
                        justifyContent:'space-between'
                    }}>
                        <h1>Group Name</h1>
                        <SharedButton onClick={handleCreateAccount} BtnLabel={"Add Member"} BtnVariant={'primary'} style={{ background: '#00285D' }} />
                    </Stack>
                    <SearchPanel FormPlaceHolder={'Search'}/>
                    <div className='MainTable'>
                        <Table responsive className="table table-hover">
                            <thead>
                                <tr>
                                    <th>USER NAME</th>
                                    <th>ROLE NAME</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trdata.map((account, index) => (
                                    <tr key={index}>
                                        <td>{account.name}</td>
                                        <td>{account.type}</td>
                                        <td>     <Button variant="danger" size="sm" className="me-2"
                                            onClick={() => handleEditClick(account)}
                                        ><RiDeleteBinLine />
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
