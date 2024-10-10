import React, { useEffect, useState } from 'react'
import { SearchPanel } from '../../components/SearchPanel'
import { Button, Container, Row, Table } from 'react-bootstrap'
import moment from 'moment';
import { IndividualTrainingModal } from './IndividualTrainingModal';
import { SearchDaterange } from '../../components/SearchDaterange';
import { sortEventByDate } from '../../helper/Helper';
import { Space, DatePicker } from 'antd';
const { RangePicker } = DatePicker;

export default function IndividualTraining({ preData = [], totalTime }) {
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState();
    const [eventSearchDate, setEventSearchDate] = useState({ "start": "", "end": "" });
    const [filterData, setFilterData] = useState([]);


    const handleViewClick = (e) => {
        setModalData(e);
        setShow(true);
    }

    useEffect(() => {
        setFilterData(preData);
    }, [preData])

    const EventDateChange = (value) => {
        if (value && value.length === 2) {
            const fStart = moment(value[0].$d).startOf('day').unix();
            const fEnd = moment(value[1].$d).endOf('day').unix();
            setEventSearchDate({ "start": fStart, "end": fEnd });

            const flData = preData.filter(e => {
                const eventDate = e.training_id && e.training_id.date;
                return eventDate >= fStart && eventDate <= fEnd;
            });
            const final = sortEventByDate(flData, true);
            setFilterData(final);
        } else {
            setFilterData(preData);
        }
    };
    return (
        <>
            <div className='SearchBox pb-2' style={{ border: "1px solid #e6e6e6", borderRadius: "10px" }}>
                <Container>
                    <Row style={{ textAlign: 'center' }}><h4 className='mt-2'>Event Tracker</h4></Row>
                    <Row className='my-2'>                      
                        <Space direction="horizontal" className='mt-2' style={{justifyContent:"space-between"}}>
                        <h6>Total Credit Hours - {parseFloat(totalTime.totalHours).toFixed(2)}</h6>
                            <RangePicker onChange={EventDateChange} format={"MM/DD/YYYY"} />
                        </Space>
                    </Row>
                </Container>
            </div>
            <div className='MainTable'>
                <Table responsive className="table table-hover">
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Event Date</th>
                            <th>Duration</th>
                            <th>Qualifications</th>
                            <th>Details </th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterData.length > 0 && filterData.map((e, index) => (
                            <tr key={index}>
                                <td>{e.training_id && e.training_id.name}</td>
                                <td>{e.training_id && e.training_id.date && moment.unix(e.training_id.date).format("MM/DD/YYYY")}</td>
                                <td>{e.credit_duration ? parseFloat(e.credit_duration).toFixed(2) : "0.00"}</td>
                                <td>{e.training_id && e.training_id && e.training_id.qualification_id ? e.training_id.qualification_id.name : ""}</td>
                                <td>
                                    <Button variant="info" size="sm" className="me-2" style={{
                                        background: '#ECFDF5',
                                        color: '#064E3B',
                                        borderColor: '#ECFDF5',
                                        fontWeight: '500'
                                    }}
                                        onClick={() => handleViewClick(e)}
                                    >View
                                    </Button>
                                </td>
                                <td>{e.current_status != "select" ?
                                    (e.current_status === "planning_to_attend" || e.current_status === "Planning to Attend") ? "Planning to Attend"
                                        : (e.current_status === "cannot_attend" || e.current_status === "Will Not Attend") ? "Will Not Attend"
                                            : (e.current_status === "did_not_attend" || e.current_status === "Did Not Attend") ? "Did Not Attend"
                                                : (e.current_status === "completed" || e.current_status === "Completed") ? "Completed"
                                                    : (e.current_status === "removed" || e.current_status === "Removed") ? "Removed"
                                                        : (e.current_status === "cancelled" || e.current_status === "Cancelled") ? "Cancelled" : ""
                                    : ""}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {/* <TablePagination /> */}
            </div>
            <IndividualTrainingModal show={show} handleClose={() => { setShow(false); setModalData(); }} data={modalData} />
        </>
    )
}
