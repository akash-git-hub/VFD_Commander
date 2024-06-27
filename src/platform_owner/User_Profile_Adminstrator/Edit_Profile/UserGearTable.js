import React from 'react';
import {  Table } from 'react-bootstrap';
import { TablePagination } from '../../../components/TablePagination';

export const UserGearTable = ({grdata=[]}) => {
  return (
    <>
      <div className='MainTable my-md-4'>
        <Table responsive>
          <thead>
            <tr>
              <th>Gear Type</th>
              <th>Issue Date</th>
              <th>Replacement Date</th>
            </tr>
          </thead>
          <tbody>
            {grdata && grdata.map((e, index) => (
              <tr key={index}>
                <td>{e.gear_id && e.gear_id.gear_item_name}</td>
                <td>{e.issue_date}</td>  
                <td>{e.replacement_date}</td>                
              </tr>
            ))}
          </tbody>
        </Table>
        <TablePagination />
      </div>
    </>
  )
}
