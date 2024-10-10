import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Stack, Table, Button } from 'react-bootstrap'
import { getApparatus_API } from '../../../api_services/Apiservices';
import moment from 'moment';
import { TablePagination } from '../../../components/TablePagination';
import { useNavigate } from 'react-router-dom';
import { FaSortAlphaDownAlt, FaSortAlphaUp, FaSortNumericDownAlt, FaSortNumericUp } from 'react-icons/fa';
import { sortEventName } from '../../../helper/Helper';

export const ApparatusList = ({ setLoder }) => {
    const navigate = useNavigate();
    const [trdata, setTrdata] = useState([]);
    const [nameOrder, setNameOrder] = useState(true);
    const [typeOrder, setTypeOrder] = useState(true);
    const [statusOrder, setStatusOrder] = useState(true);
    const [dateOrder, setDateOrder] = useState(true);
    const [update, setUpdate] = useState(true);

    const getdata = async (order = "") => {
        setLoder(true);
        const resp = await getApparatus_API(order);
        if (resp && resp.success) {
            setLoder(false);
            let data = resp.data;
            data = data.map((e) => (
                {
                    "name": e.name,
                    "type": e.type_Id && e.type_Id.type,
                    "receiveDate": e.recevied_date,
                    "updateDate": e.lastUpdate,
                    "item_status": e.item_status === "in_service" ? "In Service" : "Out of Service",
                    "allData": e
                }));

            const sortData = sortEventName(data, true);
            setTrdata(sortData);
        }
        setLoder(false);
    }
    useEffect(() => { getdata(); }, [])


    const handleEditClick = (data) => { navigate("/apparatusInfoDetails", { state: { data } }); }




    const orderChange = (name) => {
        let myOrder = true;
        if (name === "nameOrder") {
            myOrder = !nameOrder
            const searchData = ({ "nameOrder": true, "order": myOrder })
            const orderString = JSON.stringify(searchData);
            getdata(orderString);
            setNameOrder(myOrder);
        } else if (name === "typeOrder") {
            myOrder = !typeOrder
            const searchData = ({ "typeOrder": true, "order": myOrder })
            const orderString = JSON.stringify(searchData);
            getdata(orderString);
            setTypeOrder(myOrder);
        } else if (name === "statusOrder") {
            myOrder = !statusOrder
            const searchData = ({ "statusOrder": true, "order": myOrder })
            const orderString = JSON.stringify(searchData);
            getdata(orderString);
            setStatusOrder(myOrder);
        } else if (name === "dateOrder") {
            myOrder = !dateOrder
            const searchData = ({ "dateOrder": true, "order": myOrder })
            const orderString = JSON.stringify(searchData);
            getdata(orderString);
            setDateOrder(myOrder);
        } else if (name === "update") {
            myOrder = !update
            const searchData = ({ "update": true, "order": myOrder })
            const orderString = JSON.stringify(searchData);
            getdata(orderString);
            setUpdate(myOrder);
        }
    }
    return (
        <>
            <div className='ApparatusList'>
                <Container>
                    <div className='MainTable'>
                        <Table responsive className="table table-hover">
                            <thead>
                                <tr>
                                    <th
                                        onClick={() => orderChange("nameOrder")} style={{ cursor: "pointer" }}
                                    >{nameOrder ? <span> <FaSortAlphaUp style={{ color: "#198754" }} /> </span> : <span> <FaSortAlphaDownAlt style={{ color: "#198754" }} /> </span>}Name</th>
                                    <th
                                        onClick={() => orderChange("typeOrder")} style={{ cursor: "pointer" }}
                                    >{typeOrder ? <span> <FaSortAlphaUp style={{ color: "#198754" }} /> </span> : <span> <FaSortAlphaDownAlt style={{ color: "#198754" }} /> </span>}Type</th>
                                    <th
                                        onClick={() => orderChange("dateOrder")} style={{ cursor: "pointer" }}
                                    >
                                        {dateOrder ? <span> <FaSortNumericUp style={{ color: "#198754" }} /></span>
                                            : <span><FaSortNumericDownAlt style={{ color: "#198754" }} /></span>
                                        }
                                        Date Received</th>
                                    <th
                                        onClick={() => orderChange("update")} style={{ cursor: "pointer" }}
                                    >
                                        {update ? <span> <FaSortNumericUp style={{ color: "#198754" }} /></span>
                                            : <span><FaSortNumericDownAlt style={{ color: "#198754" }} /></span>
                                        }
                                        Last Update</th>
                                    <th
                                        onClick={() => orderChange("statusOrder")} style={{ cursor: "pointer" }}
                                    >{statusOrder ? <span> <FaSortAlphaUp style={{ color: "#198754" }} /> </span> : <span> <FaSortAlphaDownAlt style={{ color: "#198754" }} /> </span>}Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trdata.map((e, index) => (
                                    <tr key={index}>
                                        <td>{e.name}</td>
                                        <td>{e.type}</td>
                                        <td>{e.receiveDate && moment.unix(e.receiveDate).format('MM/DD/YYYY')}</td>
                                        <td>{e.updateDate && moment.unix(e.updateDate).format('MM/DD/YYYY')}</td>
                                        <td>{e.item_status}</td>
                                        <td>     <Button variant="success" size="sm" className="me-2"
                                            onClick={() => handleEditClick(e.allData)}
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
