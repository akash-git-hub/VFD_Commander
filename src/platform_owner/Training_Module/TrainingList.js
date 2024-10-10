import { useEffect, useState } from 'react';
import { PoSidebar } from '../PO_Sidebar'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { ListView } from './ListView';
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { TrackTraining } from './TrackTraining';
import { getAllTrane_API, getTraningAll_API } from '../../api_services/Apiservices';
import { Loader } from '../../components/Loader';
import { getTotalHoursAndUserNames, sortEventByDate, sortEventName } from '../../helper/Helper';
import moment from 'moment';

export const TrainingList = () => {
    const [key, setKey] = useState('home');
    const [trdata, setTrdata] = useState([]);
    const [loder, setLoder] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [fullTrData, setFullTrData] = useState();
    const [nameOrder, setNameOrder] = useState(true);
    const [dateOrder, setDateOrder] = useState(true);
    const [isDetails, setIsDetails] = useState(false);
    const [searchDate, setSearchDate] = useState({ "start": "", "end": "" });
    const [eventSearchDate, setEventSearchDate] = useState({ "start": "", "end": "" });
    const [trainingData, setTrainingData] = useState([]);


    const navigate = useNavigate();

    const getdata = async () => {
        setLoder(true);
        const resp = await getTraningAll_API();
        if (resp && resp.success) {
            const preData = resp.data;
            const pre1Data = sortEventByDate(preData, true);
            const currentDate = moment().startOf('day').unix();
            const filteredData = pre1Data.filter(item => item.date >= currentDate);            
            setTrdata(filteredData);
            setTrainingData(filteredData);
            setLoder(false);
        }
        setLoder(false);
    }

    const EventDateChange = (value) => {
        if (value && value.length === 2) {
            const fStart = moment(value[0].$d).startOf('day').unix();
            const fEnd = moment(value[1].$d).endOf('day').unix();
            setEventSearchDate({"start": fStart,"end": fEnd });
            const flData = trainingData.filter(e => {
                const eventDate = e.date;
                return eventDate >= fStart && eventDate <= fEnd;
            });
            const final = sortEventByDate(flData, true);
            setTrdata(final);
        } else {
            setTrdata(trainingData)
        }
    };

    const orderByName = () => {
        const myord = !nameOrder;
        setNameOrder(myord);
        const data = sortEventName(trdata, myord);
        setTrdata(data);

    }

    const orderByDateHandler = () => {
        const dOrd = !dateOrder;
        setDateOrder(dOrd);
        const data = sortEventByDate(trdata, dOrd);
        setTrdata(data);
    }

    const handleNavigation = () => {
        navigate('/training');
    };


    const getAllAttendees = async () => {
        const resp = await getAllTrane_API();
        if (resp && resp.success) {
            setLoder(false);
            let pre = resp.data;
            pre = pre.filter((e) => e.current_status === "completed");
            setFullTrData(pre);
            let filterData = getTotalHoursAndUserNames(pre);
            setTableData(filterData);
        }
        setLoder(false);
    }



    useEffect(() => {
        getdata();
        getAllAttendees();
        setIsDetails(false);
    }, [key]);


    const dateChange = (value) => {
        if (value && value.length === 2) {
            const fStart = moment(value[0].$d).startOf('day').unix();
            const fEnd = moment(value[1].$d).endOf('day').unix();
            setSearchDate({ "start": fStart, "end": fEnd });
            const flData = fullTrData.filter(e => {
                const eventDate = moment.unix(e.training_id.date).unix();
                return eventDate > fStart && eventDate < fEnd;
            });
            let filterData = getTotalHoursAndUserNames(flData);
            setTableData(filterData);
        } else {
            getAllAttendees();
        }
    };


    return (
        <>
            <Loader show={loder} />
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings
                                MainHeading={"Event Administration"}
                                HeadButton={
                                    <SharedButton BtnLabel={"Create "}
                                        BtnVariant={'primary'}
                                        onClick={handleNavigation}
                                    />
                                } />
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="my-4"
                            >
                                <Tab eventKey="home" title="Event Information">
                                    <ListView
                                        trdata={trdata}
                                        orderByName={orderByName}
                                        nameOrder={nameOrder}
                                        orderByDateHandler={orderByDateHandler}
                                        dateOrder={dateOrder}
                                        EventDateChange={EventDateChange}
                                        eventSearchDate={eventSearchDate}
                                    />
                                </Tab>
                                <Tab eventKey="tracking" title="Event Tracking">
                                    <TrackTraining
                                        setLoder={setLoder}
                                        tableData={tableData}
                                        getAllAttendees={getAllAttendees}
                                        dateChange={dateChange}
                                        setIsDetails={setIsDetails}
                                        isDetails={isDetails}
                                        searchDate={searchDate}
                                    />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
