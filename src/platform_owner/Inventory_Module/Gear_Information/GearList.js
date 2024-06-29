import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Stack, Table, Button } from 'react-bootstrap'
import { getGear_API } from '../../../api_services/Apiservices';
import { TablePagination } from '../../../components/TablePagination';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export const GearList = ({ setLoder }) => {
    const [trdata, setTrdata] = useState([]);
    const navigate = useNavigate();
    const getdata = async () => {
        setLoder(true);
        const resp = await getGear_API();
        if (resp && resp.success) {
            setLoder(false);
            setTrdata(resp.data);
        }
        setLoder(false);
    }
    useEffect(() => { getdata(); }, []);

   
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
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>received Date</th>
                                    <th>Cost</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>   
                                {trdata.map((account, index) => (
                                    <tr key={index}>
                                        <td>{account.gear_item_name}</td>
                                        <td>{account.gearttype_id && account.gearttype_id.name}</td>
                                        <td>{account.recevied_date && moment.unix(account.recevied_date).format('MM-DD-YYYY')}</td>
                                        <td>{account.item_cost && account.item_cost}</td>
                                        <td style={{ maxWidth: "300px" }}>{account.description}</td>
                                        <td>     
                                        <Button variant="success" size="sm" className="me-2"
                                            onClick={() => handleEditClick(account)}>Detail
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
