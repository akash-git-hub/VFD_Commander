import React from 'react'
import { Button, Container, Table, Row, Col } from 'react-bootstrap'
import { TablePagination } from '../../components/TablePagination';



const sampleData = [
    {
        trainingName: 'Firefighters',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        status:1
    },
    {
        trainingName: 'Administrative Staff',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        status:2
    },
    {
        trainingName: 'Volunteers',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        status:3
    },
    {
        trainingName: 'Command Staff,',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        status:2
    },
    {
        trainingName: 'Manager',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        status:2
    },
    {
        trainingName: 'Product Manager',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        status:2
    },
    {
        trainingName: 'CEO',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        status:2
    },
    {
        trainingName: 'Staff',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        status:2
    },
];


export const TrainingDetail = () => {
    return (
        <>
            <div className='TrainingViewList'>
                <Container>
                    <div className='SearchBox p-4'>
                        <Row>
                            <Col md={6}>
                                <div className='d-flex' style={{
                                    alignItems: 'center'
                                }}>
                                    <h4 className='mb-0'>User ID :</h4>
                                    <h6 className='mb-0 mx-3'>dkajksfklfksdfsl;d</h6>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className='d-flex' style={{
                                    alignItems: 'center'
                                }}>
                                    <h4 className='mb-0'>User Name :</h4>
                                    <h6 className='mb-0 mx-3'>Test Coder;d</h6>
                                </div>

                            </Col>
                        </Row>
                    </div>
                    <div className='MainTable'>
                        <Table responsive className="table table-hover">
                            <thead>
                                <tr>
                                    <th>TRAINING NAME</th>
                                    <th>DESCRIPTION</th>
                                    <th>CURRENT STATUS</th>

                                </tr>
                            </thead>
                            <tbody>
                                {sampleData.map((account, index) => (
                                    <tr key={index}>
                                        <td>{account.trainingName}</td>
                                        <td>{account.description}</td>
                                        <td>
                                            {account.status === 1 ?
                                                <Button variant="success" size="sm" className="me-2" style={{
                                            
                                                    minWidth:'100px'
                                                }}
                                                // onClick={handleEditClick}
                                                >Completed
                                                </Button>


                                                : account.status === 2 ?

                                                    <Button variant="danger" size="sm" className="me-2" style={{
                                                    
                                                        minWidth:'100px'
                                                    }}
                                                    // onClick={handleEditClick}
                                                    >Incomplete
                                                    </Button>

                                                    : account.status === 3 ?
                                                        <Button variant="info" size="sm" className="me-2" style={{
                
                                                            minWidth:'100px'
                                                        }}
                                                        // onClick={handleEditClick}
                                                        >Progess
                                                        </Button>
                                                        : ""}
                                        </td>
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
