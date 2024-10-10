import React from 'react'
import { Button,  Container,  Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { StatusFilter } from '../../helper/Helper';



export const GroupsListTable = ({ trdata }) => {
    const navigate = useNavigate();
    const navigateHandler = (data) => {
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
                                    <th>Total Items</th>
                                    <th>Status</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trdata.map((e, index) => (
                                    <tr key={index}>
                                        <td>{e.name}</td>
                                        <td>{e.gearTotal}</td>
                                        <td>{StatusFilter(e.group_status)}</td>
                                        <td>
                                            <Button variant="success" size="sm" className="me-2"
                                                onClick={() => navigateHandler(e)}
                                            >
                                                Detail
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                </Container >
                {/* <EditGroupModal show={showModal} grpdata={grpdata} setGrpdata={setGrpdata} handleClose={handleCloseModal} getdata={getdata} setLoder={setLoder} /> */}
            </div >
        </>
    )
}
