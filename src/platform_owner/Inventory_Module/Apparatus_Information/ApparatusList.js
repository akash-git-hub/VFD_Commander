import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Stack, Table, Button } from 'react-bootstrap'
import { getApparatus_API } from '../../../api_services/Apiservices';
import moment from 'moment';
import { TablePagination } from '../../../components/TablePagination';
import { useNavigate } from 'react-router-dom';

export const ApparatusList = ({ setLoder }) => {
    const navigate = useNavigate();
    const [trdata, setTrdata] = useState([]);
    const getdata = async () => {
        setLoder(true);
        const resp = await getApparatus_API();
        if (resp && resp.success) {
            setLoder(false);
            setTrdata(resp.data);
        }
        setLoder(false);
    }
    useEffect(() => { getdata(); }, [])


    const handleEditClick = (data) => {  navigate("/apparatusInfoDetails", { state: { data } });  }
    return (
        <>
            <div className='ApparatusList'>
                <Container>
                <div className='MainTable'>
                        <Table responsive className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>                                   
                                    <th>Service Date</th>
                                    <th>Replacement Date</th>
                                    <th>Cost</th>                                   
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>                          
                            <tbody>   
                                {console.log("=====================",trdata)}
                                {trdata.map((account, index) => (
                                    <tr key={index}>
                                        <td>{account.name}</td>
                                        <td>{account.apparatus_type && account.apparatus_type}</td>
                                        <td>{account.service_date && moment.unix(account.service_date).format('MM-DD-YYYY')}</td>
                                        <td>{account.replace_date && moment.unix(account.replace_date).format('MM-DD-YYYY')}</td>
                                        <td>$ {account.cost && account.cost}</td>
                                        <td style={{ maxWidth: "300px" }}>{account.description}</td>
                                        <td>     <Button variant="success" size="sm" className="me-2"
                                            onClick={() => handleEditClick(account)}
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
