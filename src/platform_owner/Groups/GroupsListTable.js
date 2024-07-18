import React, { useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { TablePagination } from '../../components/TablePagination';
import { TbEdit } from 'react-icons/tb';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaRegEye } from 'react-icons/fa';
import { EditGroupModal } from '../../commonpages/EditGroupModal';
import { updateGrpname_API } from '../../api_services/Apiservices';
import { errorAlert } from '../../components/Alert';
import Swal from 'sweetalert2';



export const GroupsListTable = ({ trdata, getdata, setLoder }) => {
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    const [grpdata, setGrpdata] = useState({ "id": "", "name": "" });
    const handleEditClick = (data) => {
        navigate("/groupsdetails", { state: { data } });

    }

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (id, name) => {
        setShowModal(true);
        setGrpdata({ "id": id, "name": name });
    }

    const deleteHandler = (id) => {
        if (!id) { errorAlert("Something wrong"); return; }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const formData = { "grpId": id, "is_delete": "yes" }
                const resp = await updateGrpname_API(formData);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            getdata();
                        }
                    })
                }
            }
        });
    }


    return (
        <>
            <div className='TrainingViewList'>
                <Container>
                    <div className='MainTable'>
                        <Table responsive className="table table-hover">
                            <thead>
                                <tr className='text-center'>
                                    <th>GROUP NAME</th>
                                    <th>NO OF MEMBER</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trdata.map((e, index) => (
                                    <tr key={index} className='text-center'>
                                        <td>{e.name}</td>
                                        <td>{e.totleUsers}</td>
                                        <td>     <Button variant="primary" size="sm" className="me-2"
                                            onClick={() => handleEditClick(e)}
                                        ><FaRegEye />
                                        </Button>
                                            <Button variant="success" size="sm" className='me-2'
                                                onClick={() => handleShowModal(e._id, e.name)} style={{
                                                    fontWeight: '500',
                                                }}><TbEdit />
                                            </Button>

                                            <Button variant="danger" size="sm" className='me-2'
                                                onClick={() => deleteHandler(e._id)} style={{
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
                <EditGroupModal show={showModal} grpdata={grpdata} setGrpdata={setGrpdata} handleClose={handleCloseModal} getdata={getdata} setLoder={setLoder} />
            </div>
        </>
    )
}
