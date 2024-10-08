import { useState } from "react";
import { Table } from "react-bootstrap";
 
export const ApparatusStatusTable = ({count,data}) => {
    
    const displayRows = count ? data.slice(0, count) : data;
    console.log(displayRows);
    return(
        <div className="MainTable">
            <Table className="table table-hover" responsive>
                 <thead>
                    <tr>
                    <th>NAME</th>
                    <th>TYPE</th> 
                    <th>STATUS</th>
                    </tr>
                 </thead>
                 <tbody>
                    {displayRows.map((items,index)=>{
                        return(
                            <tr key={index}>
                                <td>{items.name}</td>
                                <td>{items.type}</td>
                                <td><span className={`px-2 py-1 rounded ${items.status === 'in service' ?'text-darksuccess bg-lightsuccess':'text-darkdanger bg-lightdanger'}` } >{items.status}</span></td>
                            </tr>
                        );
                    })}
                 </tbody>
            </Table>
        </div>
    );
} 