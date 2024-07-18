import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Stack, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { TablePagination } from '../../components/TablePagination';
import { SearchPanel } from '../../components/SearchPanel';
import { SharedButton } from '../../components/Button';
import { RiDeleteBinLine } from 'react-icons/ri';
import { getUserByGroupId_API, grpUsersDelete_API } from '../../api_services/Apiservices';
import { errorAlert } from '../../components/Alert';
import Swal from 'sweetalert2';
import { GroupAddUserModal } from '../../commonpages/GroupAddUserModal';



export const GroupMemberTable = ({ predata, setLoder }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const [mygrpid, setMygrpid] = useState();
    const [userlist, setUserlist] = useState([]);

    const handleShowModal = (id) => {
        setShowModal(true);
        setMygrpid(id);
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
                const resp = await grpUsersDelete_API(formData);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/groupslist");
                            // getdata();
                        }
                    })
                }
            }
        });
    }



    const getUsersByRole = async (id) => {
        const fdata = { "grpid": id };
        const resp = await getUserByGroupId_API(fdata);
        if (resp) {
            const findata = resp.data;
            const mydata = findata.map(e => ({ label: e.first_name + " " + e.last_name, value: e._id }));
            setUserlist(mydata);
        }
    }

    useEffect(() => {
        if (predata) {
            getUsersByRole(predata._id);
        }
    }, [predata])

    return (
        <>
            <div className='TrainingViewList'>
                <Container>

                    <Row style={{ background: "#f7f8f9", border: '1px', borderRadius: "10px" }} className='m-1 p-4'>
                        <Stack direction='horizontal' gap={2} style={{
                            justifyContent: 'space-between'
                        }}>
                            <Col md={9}>
                                <Row>
                                    <Col md={12} className='d-flex'>

                                        <h6>Group Name : </h6><h6 style={{ paddingLeft: "10px" }}><u>{predata && predata.name}</u></h6>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} className='d-flex'>
                                        <h6>Total Users : </h6><h6 style={{ paddingLeft: "10px" }}><u>{predata && predata.totleUsers}</u></h6>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={3}>
                                <SharedButton onClick={()=>handleShowModal(predata._id)} BtnLabel={"Add Member"} BtnVariant={'primary f-end'} style={{ background: '#00285D' }} />
                            </Col>
                        </Stack>
                    </Row>
                    {/* <SearchPanel FormPlaceHolder={'Search'} /> */}
                    <div className='MainTable'>
                        <Table responsive className="table table-hover">
                            <thead>
                                <tr className='text-center'>
                                    <th>USER NAME</th>
                                    <th>ROLE NAME</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {predata && predata.groupusers.map((e, index) => (
                                    <tr key={index} className='text-center'>
                                        <td>{e.userId && e.userId.first_name + " "} {e.userId && e.userId.last_name}</td>
                                        <td>{e.userId && e.userId && e.userId.role && e.userId.role.role}</td>
                                        <td>     <Button variant="danger" size="sm" className="me-2"
                                            onClick={() => deleteHandler(e._id)}
                                        ><RiDeleteBinLine />
                                        </Button></td>
                                    </tr>
                                ))}
                            </tbody>
                            <TablePagination />
                        </Table>
                    </div>
                </Container>
                <GroupAddUserModal show={showModal} userlist={userlist} handleClose={handleCloseModal} setLoder={setLoder} mygrpid={mygrpid} />
            </div>
        </>
    )
}
