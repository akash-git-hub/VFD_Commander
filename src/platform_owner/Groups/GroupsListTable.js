import React, { useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { TablePagination } from '../../components/TablePagination';
import { TbEdit } from 'react-icons/tb';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaRegEye } from 'react-icons/fa';
import { EditGroupModal } from '../../commonpages/EditGroupModal';



export const GroupsListTable = ({ trdata }) => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const navigate = useNavigate();
    const handleEditClick = (data) => {
        navigate("/groupsdetails", { state: { data } });

    }
    
    const deleteHandler = () => {

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
                                    <th>NO OF MEMBER</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trdata.map((account, index) => (
                                    <tr key={index}>
                                        <td>{account.name}</td>
                                        <td>{account.type}</td>
                                        <td>     <Button variant="primary" size="sm" className="me-2"
                                            onClick={() => handleEditClick(account)}
                                        ><FaRegEye />
                                        </Button>
                                            <Button variant="success" size="sm" className='me-2'
                                                onClick={() => handleShowModal(true)} style={{
                                                    fontWeight: '500',

                                                }}><TbEdit />
                                            </Button>

                                            <Button variant="danger" size="sm" className='me-2'
                                                onClick={() => deleteHandler()} style={{
                                                    fontWeight: '500'
                                                }}><RiDeleteBinLine />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <TablePagination />
                        </Table>
                    </div>
                </Container>
                <EditGroupModal show={showModal} handleClose={handleCloseModal} />
            </div>
        </>
    )
}
