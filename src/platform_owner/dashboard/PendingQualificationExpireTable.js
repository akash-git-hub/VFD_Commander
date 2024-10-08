import { Table } from "react-bootstrap";

export const PendingQualificationTable = ({ data, count }) => {
    const displayRows = count ? data.slice(0, count) : data;
    return (
        <div className="MainTable">
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>QUALIFICATION</th>
                        <th>EXPIRATION DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {displayRows.map((items, index) => {
                        return (
                            <tr key={index}>
                                <td>{items.name}</td>
                                <td>{items.qualification}</td>
                                <td>{items.expiration}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {/* <TablePagination pagination={pagination} pageHanlder={pageHanlder} /> */}
        </div>
    );
}