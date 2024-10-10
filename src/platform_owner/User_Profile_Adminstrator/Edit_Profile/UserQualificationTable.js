import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { TablePagination } from '../../../components/TablePagination';
import moment from 'moment';
import { TbEdit } from 'react-icons/tb';
import Select from '../../../components/Select';
import { InputField } from '../../../components/InputField';
import { multiUpdateUserQualification_API } from '../../../api_services/Apiservices';
import { successAlert } from '../../../components/Alert';



export const UserQualificationTable = ({ quadata = [] ,qualificationOptions,refreshHandler,setLoder}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    if (quadata && quadata.length > 0) {
      const atd = quadata.map(e => ({
        "id": e._id,
        "qualifications_id": e.qualifications_id && e.qualifications_id._id,
        "exp_date": e.exp_date,
      }));
      setMyData(atd);
    }
  }, [quadata])

  const editInputHandler = (e, i) => {
    const { name, value } = e.target;
    const prd = [...myData];
    prd[i][name] = value;
    setMyData(prd);
  }

  const update_Handler = async (data) => {
    const final={"data":data};
    const resp = await multiUpdateUserQualification_API(final);
    if (resp && resp.success) {
      setLoder(false);
      successAlert(resp.message);
      refreshHandler();
    }
  };

  return (
    <>
      <Row className='mb-3'>
        <Col className={quadata.length > 0 ? "md-11 text-center" : "md-12 text-center"} ><h6 style={{ textTransform: "uppercase", fontWeight: "bold" }}>Qualification List</h6></Col>
        {quadata.length > 0 &&
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
                <th>QUALIFICATION</th>
                <th>EXPIRATION DATE </th>
              </tr>
            </thead>
            <tbody>
              {quadata && quadata.map((e, index) => (
                <tr key={index}>
                  <td className='text-center'>{e.qualifications_id && e.qualifications_id.name}</td>
                  <td className='text-center'>{e.exp_date && moment.unix(e.exp_date).format("MM-DD-YYYY")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          :
          <Table responsive className="table table-hover">
            <thead>
              <tr className='text-center'>
                <th>QUALIFICATION TYPE</th>
                <th>EXPIRATION DATE </th>
              </tr>
            </thead>
            <tbody>
              {myData && myData.map((e, i) => (
                <tr key={i}>
                  <td className='text-center'>
                    <Select readOnly={true} Array={qualificationOptions} name='qualifications_id' value={e.qualifications_id} onChange={(e) => editInputHandler(e, i)} />
                  </td>
                  <td className='text-center'>
                    <InputField FormType={'date'} name='exp_date' value={e.exp_date} onChange={(e) => editInputHandler(e, i)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        }
         {isEdit &&
        <Button variant='success' type='button' style={{ width: "100%" }} className='mt-3 mb-5' onClick={()=>update_Handler(myData)}>Update</Button>
      }
      </div>
    </>
  )
}
