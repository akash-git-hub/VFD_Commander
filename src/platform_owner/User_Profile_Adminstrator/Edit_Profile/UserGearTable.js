import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { TablePagination } from '../../../components/TablePagination';
import moment from 'moment';
import { TbEdit } from 'react-icons/tb';
import Select from '../../../components/Select';
import { InputField } from '../../../components/InputField';
import { multiUpdateUserGear_API } from '../../../api_services/Apiservices';
import { successAlert } from '../../../components/Alert';

export const UserGearTable = ({ grdata = [], grOption,setLoder,refreshHandler }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState([]);



  useEffect(() => {
    if (grdata && grdata.length > 0) {
      const atd = grdata.map(e => ({
        "id": e._id,
        "gear_id": e.gear_id && e.gear_id._id,
        "issue_date": e.issue_date,
        "replacement_date": e.replacement_date,
      }));
      setData(atd);
    }
  }, [grdata])

  const editInputHandler = (e, i) => {
    const { name, value } = e.target;
    const prd = [...data];
    prd[i][name] = value;
    setData(prd);
  }

  const update_Handler = async (data) => {
    const final={"data":data};
    const resp = await multiUpdateUserGear_API(final);
    if (resp && resp.success) {
      setLoder(false);
      successAlert(resp.message);
      refreshHandler();
    }
  };
  return (
    <>
      <Row className='mb-3'>
        <Col className={grdata.length > 0 ? "md-11 text-center" : "md-12 text-center"} ><h6 style={{ textTransform: "uppercase", fontWeight: "bold" }}>Gear List</h6></Col>
        {grdata.length > 0 &&
          <Col md={1} >
            {!isEdit ?
              <Button variant="success" size="sm"
                onClick={() => setIsEdit(true)} style={{
                  fontWeight: '500',
                  marginRight: '1rem',
                  maxWidth: '38px'
                }}><TbEdit />
              </Button>
              :
              <Button variant="danger" size="sm" style={{
                fontWeight: '500',
                marginRight: '1rem',
                maxWidth: '60px'
              }}
                onClick={() => setIsEdit(false)} >Cancel
              </Button>
            }
          </Col>
        }
      </Row>

      <div className='MainTable'>
        {!isEdit ?
          <Table responsive className="table table-hover">
            <thead>
              <tr className='text-center'>
                <th>GEAR NAME</th>
                <th>ISSUE DATE</th>
                <th>REPLACEMENT DATE</th>
              </tr>
            </thead>
            <tbody>
              {grdata && grdata.map((e, index) => (
                <tr key={index}>
                  <td className='text-center'>{e.gear_id && e.gear_id.gear_item_name}</td>
                  <td className='text-center'>{e.issue_date && moment.unix(e.issue_date).format("MM-DD-YYYY")}</td>
                  <td className='text-center'>{e.replacement_date && moment.unix(e.replacement_date).format("MM-DD-YYYY")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          :
          <Table responsive className="table table-hover">
            <thead>
              <tr className='text-center'>
                <th>GEAR NAME</th>
                <th>ISSUE DATE</th>
                <th>REPLACEMENT DATE</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, i) => (
                <tr key={i}>
                  <td className='text-center'>
                    <Select Array={grOption} name='gear_id' value={e.gear_id} onChange={(e) => editInputHandler(e, i)} />
                  </td>
                  <td className='text-center'>
                    <InputField FormType={'date'} name='issue_date' value={e.issue_date} onChange={(e) => editInputHandler(e, i)} />
                  </td>
                  <td className='text-center'>
                    <InputField FormType={'date'} name='replacement_date' value={e.replacement_date} onChange={(e) => editInputHandler(e, i)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        }
        {isEdit &&
        <Button variant='success' type='button' style={{ width: "100%" }} className='mt-3 mb-5' onClick={()=>update_Handler(data)}>Update</Button>
      }
        {/* <TablePagination /> */}
      </div>


    </>
  )
}
