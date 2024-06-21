import React from 'react';
import { Table } from 'react-bootstrap';
import { TablePagination } from '../../components/TablePagination';
import { SearchPanel } from '../../components/SearchPanel';
import { IoSearch } from 'react-icons/io5';

export const RoleAdminstratorTable = ({ rolldata, pagination, pageHanlder }) => {
    return (
        <>
            <SearchPanel StartIcon={<IoSearch />} FormPlaceHolder={"Search by Role Name"} />
            <div className='MainTable'>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>ROLE NAME</th>
                            <th>MODULES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rolldata.map((e, i) => (
                            <tr key={i}>
                                <td>{e.name}</td>
                                <td>{e.modules}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <TablePagination pagination={pagination} pageHanlder={pageHanlder} />
            </div>
        </>
    )
}
