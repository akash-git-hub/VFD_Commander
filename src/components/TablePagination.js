import React from 'react'
import { Pagination } from 'react-bootstrap'

export const TablePagination = () => {
    return (
        <>
            <Pagination style={{ justifyContent: 'right', gap: '15px' }}>
                <Pagination.Prev style={{
                    order: '1px solid #f7f9fc !important'
                }}>&laquo; Previous</Pagination.Prev>
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Next>Next &raquo;</Pagination.Next>
            </Pagination>
        </>
    )
}
