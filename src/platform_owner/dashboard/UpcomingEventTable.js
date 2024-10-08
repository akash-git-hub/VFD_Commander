import { Button, Table } from "react-bootstrap";
import { TablePagination } from "../../components/TablePagination";

export const UpcomingEventTable = ({ data, count }) => {

    const displayRows = count ? data.slice(0, count) : data;

    return (
        <div className="MainTable">
            <Table className="table table-hover" responsive>
                <thead>
                    <tr>
                        <th colSpan={4} className="border-0"></th>
                        <th colSpan={3} className="text-center">Attendees</th>
                    </tr>
                    <tr>
                        <th>EVENT TYPE</th>
                        <th>EVENT NAME</th>
                        <th>EVENT DATE</th>
                        <th>Start TIME</th>
                        <th>INTEREST</th>
                        <th>ACTUAL</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {displayRows.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.eventType}</td>
                                <td>{item.eventName}</td>
                                <td>{item.eventDate}</td>
                                <td>{item.eventTime}</td>
                                <td></td>
                                <td>n/a</td>
                                <td> <Button variant="success" size="sm" className="me-2">Detail</Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {/* <TablePagination pagination={pagination} pageHanlder={pageHanlder} /> */}
        </div>
    );
} 