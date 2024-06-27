import React from 'react';
import {  Table } from 'react-bootstrap';
import { TablePagination } from '../../../components/TablePagination';



export const UserQualificationTable = ({quadata=[]}) => {

  return (
    <>
      <div className='MainTable my-md-4'>
        <Table responsive>
          <thead>
            <tr>
              <th>Qualifications Type</th>
              <th>Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {quadata && quadata.map((e, index) => (
              <tr key={index}>
                <td>{e.qualifications_id && e.qualifications_id.name}</td>
                <td>{e.exp_date}</td>                
              </tr>
            ))}
          </tbody>
        </Table>
        <TablePagination />
      </div>
    </>
  )
}
