import React from 'react';
import { Table } from 'react-bootstrap'; // Import Table from react-bootstrap
import moment from 'moment'; // Import moment for date formatting

const GearUserTable = ({ tableData }) => {
    return (
        <div style={{ maxHeight: '300px', overflowY: 'auto', width: '100%' }}>
            <Table responsive style={{ marginBottom: 0 }}>
                <thead style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
                    <tr className='text-center' >
                        <th>Name</th>
                        <th>Issue Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((e, index) => (
                        <tr key={index}>
                            <td style={{textAlign:"center"}} >{e.name}</td>
                            <td style={{textAlign:"center"}}>
                                {e.issue_date && moment.unix(e.issue_date).format('MM/DD/YYYY')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default GearUserTable;
