import React, { useEffect, useState } from 'react'
import { SearchPanel } from '../../../components/SearchPanel'
import { IoSearch } from 'react-icons/io5'
import { Button, Table } from 'react-bootstrap'
import { TablePagination } from '../../../components/TablePagination'
import { getGearType_API } from '../../../api_services/Apiservices'
import { useNavigate } from 'react-router-dom'

export const GearTypeTable = ({ setLoder }) => {
  
    const [pagination, setPagination] = useState();
    const navigate = useNavigate();

    const pageHanlder = () => { }

    const [trdata, setTrdata] = useState([]);
    const getdata = async () => {
        setLoder(true);
        const resp = await getGearType_API();
        if (resp && resp.success) {
            setLoder(false);
            setTrdata(resp.data);
        }
        setLoder(false);
    }
    useEffect(() => {  getdata();}, [])

    const handleEditClick = (data) => {
        navigate("/GearListDetail", { state: { data } });

    }


    return (
        <>
            <div className='MainTable'>
                <Table responsive className="table table-hover">
                    <thead>
                        <tr>
                            <th>Gear Type</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trdata.map((e, i) => (
                            <tr key={i}>
                                <td>{e.name}</td>
                                <td style={{ maxWidth: "300px" }}>{e.description}</td>
                                <td>     <Button variant="success" size="sm" className="me-2"
                                    onClick={() => handleEditClick(e)}
                                >Detail
                                </Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <TablePagination pagination={pagination} pageHanlder={pageHanlder} />
            </div>
        </>
    )
}
