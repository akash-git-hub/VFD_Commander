import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { Loader } from 'react-bootstrap-typeahead';
import { PoSidebar } from '../PO_Sidebar';
import { Headings } from '../../components/Headings';
import { SharedButton } from '../../components/Button';
import { useLocation } from 'react-router-dom';
import { TbEdit } from 'react-icons/tb';
import { StatusFilter } from '../../helper/Helper';
import { GroupFormEdit } from './GroupFormEdit';
import { getUserByGroupId_API } from '../../api_services/Apiservices';

export default function MyGroupDetails() {
    const [loder, setLoder] = useState(false);
    const location = useLocation();
    const [viewData, setViewData] = useState();
    const [gearList, setGearList] = useState([]);
    const [editMode, setEditMode] = useState(false);

    const [urList, setUrList] = useState([]);


    const preData = (data) => {
        setViewData(data);
        const preGear = data.gear;
        let gearInfo = [];
        if (preGear && preGear.length > 0) {
            preGear.forEach(e => {
                const test = gearInfo.filter((inr) => inr._id === e.gearID._id);
                if (test && test.length === 0) {
                    gearInfo.push(e.gearID);
                }
            });
        }
        setGearList(gearInfo);
    }

    const userList = async (id) => {
        const data = { "grpId": id }
        const resp = await getUserByGroupId_API(data);
        if (resp) {
            let data = resp.data;

            data = data.map(e => ({ first_name: e.userID && e.userID.first_name, last_name: e.userID && e.userID.last_name }));
            setUrList(data);
        }


    }

    useEffect(() => {
        if (location && location.state && location.state.data) {
            const pr = location.state.data;
            if (pr && pr._id) {
                userList(pr._id);
            }
            preData(pr);
        }
    }, [location])
    return (
        <>
            {/* <Loader show={loder} /> */}
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Gear and Apparatus Administration"} HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <div className='TrainingViewList'>
                                <Container>
                                    <Row style={{ background: "#f7f8f9", border: '1px', borderRadius: "10px" }} className='m-1 p-4'>
                                        <Col className='mb-3' md={12} style={{ textAlign: "end" }}>
                                            {!editMode ?
                                                <Button variant="success" size="sm" className="me-2"
                                                    onClick={(e) => setEditMode(true)}
                                                >
                                                    <TbEdit />
                                                </Button>
                                                :
                                                <Button variant="danger" size="sm"
                                                    onClick={() => { setEditMode(false); }}
                                                >Cancel
                                                </Button>
                                            }
                                        </Col>
                                        {!editMode ?
                                            <Stack direction='horizontal' gap={2} style={{
                                                justifyContent: 'space-between'
                                            }}>
                                                <Col md={9}>
                                                    <Row>

                                                    </Row>
                                                    <Row>
                                                        <Col md={12} className='d-flex mb-3'>
                                                            <h6>Group Name : </h6><h6 style={{ paddingLeft: "10px" }}>{viewData && viewData.name}</h6>
                                                        </Col>
                                                        <Col md={6} className='d-flex mb-3'>
                                                            <h6>Status : </h6><h6 style={{ paddingLeft: "10px" }}>{StatusFilter(viewData && viewData.group_status)}</h6>
                                                        </Col>
                                                        <Col md={6} className='d-flex mb-3'>
                                                            <h6>Total Gear : </h6><h6 style={{ paddingLeft: "10px" }}>{viewData && viewData.gearTotal}</h6>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Stack>
                                            :
                                            <Row>
                                                <GroupFormEdit setLoder={setLoder} viewData={viewData} gearList={gearList} />
                                            </Row>
                                        }
                                    </Row>

                                    <div style={{ background: "#f7f8f9", border: '1px', borderRadius: "10px" }} className='m-1 p-4'>
                                        <h4>Gear</h4>
                                        <div className='mt-4 group_info_grid'>
                                            {gearList && gearList.map((e, index) => (
                                                <span key={index} className='px-2 text-center' style={{ border: '1px solid black', borderRadius: "10px", padding: '10px' }}>
                                                    {e.gear_item_name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ background: "#f7f8f9", border: '1px', borderRadius: "10px" }} className='m-1 p-4'>
                                        <h4>Users</h4>
                                        <div className='mt-4 group_info_grid'>
                                            {urList && urList.map((e, index) => (
                                                <span key={index} className='px-2 text-center' style={{ border: '1px solid black', borderRadius: "10px", padding: '10px' }}>
                                                    {e.last_name+" "+e.first_name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                </Container>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
