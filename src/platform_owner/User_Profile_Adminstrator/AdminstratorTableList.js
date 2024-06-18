import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { TablePagination } from '../../components/TablePagination';
import { useNavigate } from 'react-router-dom';

const sampleData = [
  {
      firstName: 'Jenny',
      lastName: 'Wilson',
      accountId: '5146846548465',
      accountOwnerId: 'futurristic@gmail.com',
      startDate: '2023-01-01',
      termDate: '2023-01-01',
      mobileNo: '+91 8989898877',
      supervisor: 'Support',
      role: 'Administrator',
      position: 'Manage',
      status: 'Active'
  },
  {
      firstName: 'Jenny',
      lastName: 'Wilson',
      accountId: '5146846548465',
      accountOwnerId: 'futurristic@gmail.com',
      startDate: '2023-01-01',
      termDate: '2023-01-01',
      mobileNo: '+91 8989898877',
      supervisor: 'Support',
      role: 'Administrator',
      position: 'Manage',
      status: 'Active'
  },
  {
      firstName: 'Jenny',
      lastName: 'Wilson',
      accountId: '5146846548465',
      accountOwnerId: 'futurristic@gmail.com',
      startDate: '2023-01-01',
      termDate: '2023-01-01',
      mobileNo: '+91 8989898877',
      supervisor: 'Support',
      role: 'Administrator',
      position: 'Manage',
      status: 'Active'
  },
  {
      firstName: 'Jenny',
      lastName: 'Wilson',
      accountId: '5146846548465',
      accountOwnerId: 'futurristic@gmail.com',
      startDate: '2023-01-01',
      termDate: '2023-01-01',
      mobileNo: '+91 8989898877',
      supervisor: 'Support',
      role: 'Administrator',
      position: 'Manage',
      status: 'Active'
  },
  {
      firstName: 'Jenny',
      lastName: 'Wilson',
      accountId: '5146846548465',
      accountOwnerId: 'futurristic@gmail.com',
      startDate: '2023-01-01',
      termDate: '2023-01-01',
      mobileNo: '+91 8989898877',
      supervisor: 'Support',
      role: 'Administrator',
      position: 'Manage',
      status: 'InActive'
  },
  {
      firstName: 'Jenny',
      lastName: 'Wilson',
      accountId: '5146846548465',
      accountOwnerId: 'futurristic@gmail.com',
      startDate: '2023-01-01',
      termDate: '2023-01-01',
      mobileNo: '+91 8989898877',
      supervisor: 'Support',
      role: 'Administrator',
      position: 'Manage',
      status: 'Active'
  },
  {
      firstName: 'Jenny',
      lastName: 'Wilson',
      accountId: '5146846548465',
      accountOwnerId: 'futurristic@gmail.com',
      startDate: '2023-01-01',
      termDate: '2023-01-01',
      mobileNo: '+91 8989898877',
      supervisor: 'Support',
      role: 'Administrator',
      position: 'Manage',
      status: 'Active'
  },

];

export const AdminstratorTableList = () => {
  const navigate = useNavigate();
  

  const actionHandler = () =>{
    alert();
  }

  const handleEditClick = () => {
      navigate('/editprofileadminstrator');
  };

  return (
    <>
      <div className='MainTable '>
        <Table responsive className='table table-hover'>
          <thead>
            <tr>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>ROLE ID</th>
              <th>EMAIL</th>
              <th>START DATE</th>
              <th>TERM DATE</th>
              <th>MOBILE NO</th>
              <th>SUPERVISOR</th>
              <th>ROLE</th>
              <th>POSITION</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((account, index) => (
              <tr key={index}>
                <td>{account.firstName}</td>
                <td>{account.lastName}</td>
                <td>{account.accountId}</td>
                <td>{account.accountOwnerId}</td>
                <td>{account.startDate}</td>
                <td>{account.termDate}</td>
                <td>{account.mobileNo}</td>
                <td>{account.supervisor}</td>
                <td>{account.role}</td>
                <td>{account.position}</td>
             
                <td>
                {account.status  === "Active" ?


                  <Button variant="info" size="sm" className="me-2" style={{
                    background: '#ECFDF5',
                    color: '#064E3B',
                    borderColor: '#ECFDF5',
                    fontWeight: '500',
                    minWidth:'70px'
                  }}
                    onClick={actionHandler}
                  >Active
                  </Button>
                  :              
                  <Button variant="warning" size="sm" className="me-2" style={{
                    background: '#FEF2F2',
                    color: '#991B1B',
                    borderColor: '#FEF2F2',
                    fontWeight: '500',
                    minWidth:"70px"
                  }}
                    onClick={actionHandler}
                  >Inactive
                  </Button>
                    }
                  <Button variant="warning" size="sm" className="me-2" style={{
                    background: '#E3E7ED',
                    color: '#00285D',
                    borderColor: '#E3E7ED',
                    fontWeight: '500'
                  }}
                    onClick={handleEditClick}
                  >Access
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
