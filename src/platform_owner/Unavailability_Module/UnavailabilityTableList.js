import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { TablePagination } from '../../components/TablePagination';
import { useNavigate } from 'react-router-dom';
import { SearchPanel } from '../../components/SearchPanel';


export const UnavailabilityTableList = ({ preData = [] }) => {
  const navigate = useNavigate();


  const handleViewClick = (pre) => {
    navigate('/userunavailability', { state: { data: pre } });
  }

  return (
    <>
      <SearchPanel FormPlaceHolder={"Search by user name"} />
      <div className='MainTable'>
        <Table responsive className="table table-hover">
          <thead>
            <tr>
              <th>USER NAME</th>
              <th>ROLE</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {preData.length > 0 && preData.map((account, index) => (
              <tr key={index}>
                <td>{account.first_name + " " + account.last_name}</td>
                <td>{account.role_name}</td>
                <td style={{
                  textAlign: 'right'
                }}>
                  <Button variant="info" size="sm" className="me-2" style={{
                    background: '#ECFDF5',
                    color: '#064E3B',
                    borderColor: '#ECFDF5',
                    fontWeight: '500'
                  }}
                    onClick={() => handleViewClick(account)}
                  >View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <TablePagination />
      </div>
    </>
  )
}
