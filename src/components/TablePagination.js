import React from 'react'
import { Pagination } from 'react-bootstrap'

export const TablePagination = ({ pagination, pageHanlder }) => {
    return (
        <>
            {pagination &&
                <Pagination style={{ justifyContent: 'right', gap: '15px' }}>
                    <Pagination.Prev 
                        style={{ cursor: "pointer", border: '1px solid #f7f9fc', marginRight: '5px' }} 
                        onClick={pagination.page > 1 ? () => pageHanlder(pagination.page - 1) : null}
                    >
                        &laquo; Previous
                    </Pagination.Prev>
                    {Array.from({ length: pagination.totalPages }, (_, index) => (
                        <Pagination.Item 
                            key={index} 
                            active={pagination.page === index + 1} 
                            style={{ cursor: "pointer" }} 
                            onClick={() => pageHanlder(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next 
                        style={{ cursor: "pointer", border: '1px solid #f7f9fc', marginLeft: '5px' }} 
                        onClick={pagination.page < pagination.totalPages ? () => pageHanlder(pagination.page + 1) : null}
                    >
                        Next &raquo;
                    </Pagination.Next>
                </Pagination>
            }
        </>
    )
}
