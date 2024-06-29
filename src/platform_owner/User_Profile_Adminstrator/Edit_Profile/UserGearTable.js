import React from 'react';
import {  Table } from 'react-bootstrap';
import { TablePagination } from '../../../components/TablePagination';
import moment from 'moment';

export const UserGearTable = ({grdata=[]}) => {
  return (
    <>
      <div className='MainTable'>
        <Table responsive className="table table-hover">
          <thead>
            <tr>
              <th>GEAR TYPE</th>
              <th>ISSUE DATE</th>
              <th>REPLACEMENT DATE</th>
            </tr>
          </thead>
          <tbody>
            {grdata && grdata.map((e, index) => (
              <tr key={index}>
                <td>{e.gear_id && e.gear_id.gear_item_name}</td>
                <td>{moment.unix(e.issue_date).format("MM-DD-YYYY")}</td>  
                <td>{moment.unix(e.replacement_date).format("MM-DD-YYYY")}</td>                
              </tr>
            ))}
          </tbody>
        </Table>
        <TablePagination />
      </div>
    </>
  )
}
