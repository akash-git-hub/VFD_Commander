import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Stack, Table, Button } from 'react-bootstrap'
import { getGear_API } from '../../../api_services/Apiservices';
import { TablePagination } from '../../../components/TablePagination';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { FaSortAlphaDownAlt, FaSortAlphaUp, FaSortNumericDownAlt, FaSortNumericUp } from 'react-icons/fa';

export const GearList = ({ setLoder }) => {
    const [trdata, setTrdata] = useState([]);
    const [nameOrder, setNameOrder] = useState(true);
    const [typeOrder, setTypeOrder] = useState(true);
    const [statusOrder, setStatusOrder] = useState(true);
    const [dateOrder, setDateOrder] = useState(true);
    const navigate = useNavigate();

    const getdata = async (order = "") => {
        setLoder(true);
        const resp = await getGear_API(order);
        if (resp && resp.success) {
            setLoder(false);
            let data = resp.data;
            data = data.map((e) => (
                {
                    "name": e.gear_item_name,
                    "date": e.recevied_date,
                    "description": e.description,
                    "cost": e.item_cost,
                    "type": e.gearttype_id && e.gearttype_id.type,
                    "location": e.location,
                    "item_status": e.item_status === "in_service" ? "In Service" : "Out of Service",
                    "inventory_status": e.inventory_status,
                    "add_field": e.add_field,
                    "allData":e
                }))
            setTrdata(data);
        }
        setLoder(false);
    }
    useEffect(() => { getdata(); }, []);

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
        }
    }


    const handleEditClick = (data) => {
        navigate("/gearinfo", { state: { data } });
    }
    return (
        <>
            <div className='GearList'>
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
                                    <th>Description</th>
                                    <th
                                        onClick={() => orderChange("statusOrder")} style={{ cursor: "pointer" }}
                                    >{statusOrder ? <span> <FaSortAlphaUp style={{ color: "#198754" }} /> </span> : <span> <FaSortAlphaDownAlt style={{ color: "#198754" }} /> </span>}Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trdata.map((e, i) => (
                                    <tr key={i}>
                                        <td>{e.name}</td>
                                        <td>{e.type}</td>
                                        <td>{e.date && moment.unix(e.date).format('MM-DD-YYYY')}</td>
                                        <td style={{ maxWidth: "300px" }}>{e.description}</td>
                                        <td>{e.item_status && e.item_status}</td>
                                        <td>
                                            <Button variant="success" size="sm" className="me-2"
                                                onClick={() => handleEditClick(e.allData)}>Detail
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
