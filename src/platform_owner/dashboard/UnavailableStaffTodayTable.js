import { Table } from "react-bootstrap";
 
export const UnavailableStaffTodayTable = ({count,data}) => {
    
    const displayRows = count ? data.slice(0, count) : data;
     
    return(
        <div className="MainTable">
            <Table className="table table-hover" responsive>
                 <thead>
                    <tr>
                    <th>NAME</th>
                    <th>DEPARTMENT</th> 
                    <th>ADDRESS</th>
                    <th>PHONE NO.</th>
                    </tr>
                 </thead>
                 <tbody>
                    {displayRows.map((items,index)=>{
                        return(
                            <tr key={index}>
                                <td>{items.name}</td>
                                <td>{items.department}</td>
                                <td>{items.address} </td>
                                <td>{items.phone}</td>
                            </tr>
                        );
                    })}
                 </tbody>
            </Table>
        </div>
    );
} 