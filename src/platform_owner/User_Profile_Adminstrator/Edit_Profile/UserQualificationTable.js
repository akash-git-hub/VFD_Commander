import React from 'react';
import {  Table } from 'react-bootstrap';
import { TablePagination } from '../../../components/TablePagination';
import moment from 'moment';



export const UserQualificationTable = ({quadata=[]}) => {

  return (
    <>
      <div className='MainTable'>
        <Table responsive className="table table-hover">
          <thead>
            <tr>
              <th>QUALIFICATION TYPE</th>
              <th>EXPIRATION DATE </th>
            </tr>
          </thead>
          <tbody>
            {quadata && quadata.map((e, index) => (
              <tr key={index}>
                <td>{e.qualifications_id && e.qualifications_id.name}</td>
                <td>{moment.unix(e.exp_date).format("MM-DD-YYYY")}</td>                
              </tr>
            ))}
          </tbody>
        </Table>
        <TablePagination />
      </div>
    </>
  )
}
