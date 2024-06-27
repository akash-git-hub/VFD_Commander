import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { TablePagination } from '../../components/TablePagination';
import { useNavigate } from 'react-router-dom';
import { update_actice_inactive_API } from '../../api_services/Apiservices';
import { SearchPanel } from '../../components/SearchPanel';
import { IoSearch } from 'react-icons/io5';
import moment from 'moment';


export const AdminstratorTableList = ({ pagination, maindata = [], actionHandler,pageHanlder }) => {
  const navigate = useNavigate();


  const handleEditClick = (mydata) => { navigate('/editprofileadminstrator', { state: { data: mydata } }); };

  return (
    <>
      <div className='MainTable '>
        <Table responsive className='table table-hover'>
          <thead>
            <tr>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>MOBILE NO</th>
              <th>ROLE</th>
              <th>START DATE</th>
              <th>TERM DATE</th>
              <th>SUPERVISOR</th>
              <th>POSITION</th>
              <th style={{ textAlign: "center" }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {maindata.map((account, index) => (
              <tr key={index}>
                <td>{account.first_name}</td>
                <td>{account.last_name}</td>
                <td>{account.email}</td>
                <td>{account.mobile_no}</td>
                <td>{account.role}</td>
                <td>{moment(account.start_date).format("YYYY-MMM-DD")}</td>
                <td>{moment(account.term_date).format('YYYY-MMM-DD')}</td>
                <td>{account.supervisor}</td>
                <td>{account.position}</td>
                <td>
                  {account.status === "Active" ?
                    <Button variant="info" size="sm" className="me-2" style={{
                      background: '#ECFDF5',
                      color: '#064E3B',
                      borderColor: '#ECFDF5',
                      fontWeight: '500',
                      minWidth: '70px'
                    }}
                      onClick={() => actionHandler(account.id, 'Inactive')}
                    >Active
                    </Button>
                    :
                    <Button variant="warning" size="sm" className="me-2" style={{
                      background: '#FEF2F2',
                      color: '#991B1B',
                      borderColor: '#FEF2F2',
                      fontWeight: '500',
                      minWidth: "70px"
                    }}
                      onClick={() => actionHandler(account.id, 'Active')}
                    >Inactive
                    </Button>
                  }
                  <Button variant="success" size="sm" className="me-2"
                    onClick={() => handleEditClick(account.full_data)}
                  >Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <TablePagination pagination={pagination} pageHanlder={pageHanlder}/>
      </div>
    </>
  )
}
