import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { TablePagination } from '../../components/TablePagination';
import { useNavigate } from 'react-router-dom';
import { SearchPanel } from '../../components/SearchPanel';

const sampleData = [];
  

export const UnavailabilityTableList = () => {
  const navigate = useNavigate();

  const handleViewClick = () => {
      navigate('/userunavailability');
  }

  return (
    <>
      <SearchPanel FormPlaceHolder={"Search by user name"}/>
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
            {sampleData.map((account, index) => (
              <tr key={index}>
                <td>{account.firstName}</td>
                <td>{account.lastName}</td>
                <td style={{
                  textAlign: 'right'
                }}>
                  <Button variant="info" size="sm" className="me-2" style={{
                    background: '#ECFDF5',
                    color: '#064E3B',
                    borderColor: '#ECFDF5',
                    fontWeight: '500'
                  }}
                    onClick={handleViewClick}
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
