import React from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { TablePagination } from '../../components/TablePagination';
import { useNavigate } from 'react-router-dom';


const sampleData = [ ];
//     {
//         userName: 'Firefighters',
//         totalTraining: '10',
//         incomplete: "5",
//         inProgress: '5'
//     },
//     {
//         userName: 'Administrative Staff',
//         totalTraining: '10',
//         incomplete: "5",
//         inProgress: '5'
//     },
//     {
//         userName: 'Volunteers',
//         totalTraining: '10',
//         incomplete: "5",
//         inProgress: '5'
//     },
//     {
//         userName: 'Command Staff,',
//         totalTraining: '10',
//         incomplete: "5",
//         inProgress: '5'
//     },
//     {
//         userName: 'Manager',
//         totalTraining: '10',
//         incomplete: "5",
//         inProgress: '5'
//     },
//     {
//         userName: 'Product Manager',
//         totalTraining: '10',
//         incomplete: "5",
//         inProgress: '5'
//     },
//     {
//         userName: 'CEO',
//         totalTraining: '10',
//         incomplete: "5",
//         inProgress: '5'
//     },
//     {
//         userName: 'Staff',
//         totalTraining: '10',
//         incomplete: "5",
//         inProgress: '5'
//     },
// ];


export const TrackTraining = () => {

    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/usertrainingdetail');
    };
    return (
        <>
            <div className='TrainingViewList'>
                <Container>
                    <div className='MainTable'>
                        <Table responsive className="table table-hover">
                            <thead>
                                <tr>
                                    <th>USER NAME</th>
                                    <th>TOTAL TRAINING</th>
                                    <th>TOTAL COMPLETED</th>
                                    <th>TOTAL IN PROGESS</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sampleData.map((account, index) => (
                                    <tr key={index}>
                                        <td>{account.userName}</td>
                                        <td>{account.totalTraining}</td>
                                        <td>{account.incomplete}</td>
                                        <td>{account.inProgress}</td>
                                        <td>     <Button variant="success" size="sm" className="me-2" 
                                        onClick={handleNavigation}
                                        >Detail
                                        </Button></td>
                                    </tr>
                                ))}
                            </tbody>
                            <TablePagination />
                        </Table>
                    </div>
                </Container>
            </div>
        </>
    )
}
