import { Table } from "react-bootstrap";

export const UnavailableStaffTodayTable = ({ data }) => {


    return (
        <div className="MainTable">
            <Table className="table table-hover mt-4" responsive>
                <thead>
                    <tr>
                        <th>NAME</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((items, index) => {
                        return (
                            <tr key={index}>
                                <td>{items.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
} 