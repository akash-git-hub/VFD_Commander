import React, { useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { SearchDaterange } from '../../components/SearchDaterange';
import moment from 'moment';
import { deleteEventUsers_API, getTrainingByUserID_API } from '../../api_services/Apiservices';
import { IndividualTrainingModal } from '../User_Profile_Adminstrator/IndividualTrainingModal';
import Swal from 'sweetalert2';
import { errorAlert } from '../../components/Alert';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import { EditTraningModel } from './EditTraningModel';

export const TrackTraining = ({ setLoder, tableData, dateChange, setIsDetails, isDetails, getAllAttendees, searchDate }) => {
    const [trainingData, setTrainingData] = useState([]);
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState();


    const [crTrainingId, setCrTrainingId] = useState();

    const [totalTime, setTotalTime] = useState({ "totalHours": "", "remainingMinutes": "" });

    const get_My_Training = async (id) => {
        const resp = await getTrainingByUserID_API(id);
        if (resp && resp.success) {
            setLoder(false);
            let pre = resp.data;
            pre = pre.filter((e) => e.current_status === "completed")
            let totalCredit = 0
            let usName = "";
            pre.forEach(e => {
                const sum = parseFloat(e.credit_duration);
                totalCredit += Math.round(sum * 100) / 100;
                usName = e.user_name;
            });
            setTotalTime({ "totalCredit": totalCredit, "userName": usName });
            getAllAttendees();
            setTrainingData(pre);
        }
        setLoder(false);

    }

    const handleNavigation = (id) => {
        setCrTrainingId(id);
        get_My_Training(id);
        setIsDetails(true);
    };



    const handleViewClick = (e) => {
        setModalData(e);
        setShow(true);
    }

    const attendeesDeleteHandler = (data) => {
        if (!data._id) { errorAlert("Something wrong"); return; }
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
                const formData = { "delete_id": data._id };
                const resp = await deleteEventUsers_API(formData);
                if (resp && resp.success) {
                    setLoder(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            get_My_Training(crTrainingId);
                        }
                    })
                }
            }
        });
    }

    const [mdData, setMdData] = useState();
    const [editModal, setEditModal] = useState(false);

    const useredithandler = (e) => {
        setMdData(e);
        setEditModal(true);
    }

    return (
        <>
            <div className='TrainingViewList'>
                <Container>
                    {!isDetails ?
                        <>
                            <SearchDaterange onChange={dateChange} />
                            <div className='MainTable'>
                                <Table responsive className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>USER NAME</th>
                                            <th style={{ textAlign: "center" }}>Total Training Hours Completed</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((e, index) => (
                                            <tr key={index}>
                                                <td>{e.user_name}</td>
                                                <td style={{ textAlign: "center" }}>{parseFloat(e.total_hours).toFixed(2)}</td>
                                                <td>     <Button variant="success" size="sm" className="me-2"
                                                    onClick={() => handleNavigation(e.userId, e)}
                                                >Detail
                                                </Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    {/* <TablePagination /> */}
                                </Table>
                            </div>
                        </>
                        :
                        <>
                        {searchDate && searchDate.start && searchDate.end &&
                            <div className='SearchBox mb-3' style={{ border: "1px solid #e6e6e6", borderRadius: "10px" }}>
                                <Container>
                                    <Row style={{ padding: "8px 0px"}} cla >
                                        <Col className='d-flex' style={{justifyContent:"end"}}>
                                            <h5 style={{marginRight:"10px"}}>
                                                {moment.unix(searchDate.start).format("MM/DD/yyyy")}
                                            </h5>
                                            <b>To</b>
                                            <h5 style={{marginLeft:"10px"}}>
                                                {moment.unix(searchDate.end).format("MM/DD/yyyy")}
                                            </h5>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                             }
                            <div className='SearchBox pb-2 pt-2' style={{ border: "1px solid #e6e6e6", borderRadius: "10px" }}>
                                <Container>
                                    <Row style={{ textAlign: 'center' }} >
                                        <Col md={11}>
                                            <h4 className='mt-2'>Event Tracker : {totalTime.userName} </h4>
                                        </Col>
                                        <Col md={1} className='mt-1'>
                                            <Button variant="danger" size="sm" className="me-2"
                                                onClick={() => setIsDetails(false)}
                                            >back
                                            </Button>
                                        </Col></Row>
                                    <Row className='my-2'>
                                        <h6>Total Credit Hours - {parseFloat(totalTime.totalCredit).toFixed(2)}</h6>
                                    </Row>
                                </Container>
                            </div>


                            <div className='MainTable'>
                                <Table responsive className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Event Type</th>
                                            <th>Event Name</th>
                                            <th>Event Date</th>
                                            <th>Credit Hours</th>
                                            <th>Details</th>
                                            <th>Status</th>
                                            <th className='text-center'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {trainingData.map((e, index) => (
                                            <tr key={index}>
                                                <td>{e.training_id && e.training_id.event_type_id && e.training_id.event_type_id.event_name}</td>
                                                <td>{e.training_id && e.training_id && e.training_id.name}</td>
                                                <td>{e.training_id && e.training_id && e.training_id.date && moment.unix(e.training_id.date).format("MM/DD/YYYY")}</td>
                                                <td>{e.credit_duration && parseFloat(e.credit_duration).toFixed(2)}</td>
                                                <td >
                                                    <span onClick={() => handleViewClick(e)} style={{ color: "#6baddf", cursor: "pointer" }}>view</span>
                                                </td>
                                                <td>Completed</td>
                                                <td className='text-center'>
                                                    <Button variant="success" size="sm"
                                                        onClick={() => useredithandler(e)} style={{
                                                            fontWeight: '500',
                                                            maxWidth: '38px'
                                                        }}><TbEdit />
                                                    </Button>
                                                    {/* <Button variant="danger" size="sm"
                                                        onClick={() => attendeesDeleteHandler(e)} style={{
                                                            fontWeight: '500',
                                                            maxWidth: '38px'
                                                        }}><RiDeleteBinLine />
                                                    </Button> */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </>
                    }
                </Container>
            </div>
            <IndividualTrainingModal show={show} handleClose={() => { setShow(false); setModalData(); }} data={modalData} />
            <EditTraningModel show={editModal} handleClose={() => { setEditModal(false); }} setLoder={setLoder} modalData={mdData}
                get_My_Training={get_My_Training} crTrainingId={crTrainingId}
            />
        </>
    )
}
