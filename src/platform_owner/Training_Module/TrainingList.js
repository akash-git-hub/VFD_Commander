import { useEffect, useState } from 'react';
import { PoSidebar } from '../PO_Sidebar'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { ListView } from './ListView';
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { TrackTraining } from './TrackTraining';
import { SearchPanel } from '../../components/SearchPanel';
import { IoSearch } from 'react-icons/io5';
import { getTraningAll_API } from '../../api_services/Apiservices';
import { Loader } from '../../components/Loader';

export const TrainingList = () => {
    const [key, setKey] = useState('home');
    const [trdata, setTrdata] = useState([]);
    const [loder,setLoder] = useState(false);

    const navigate = useNavigate();

    const getdata = async () => {
        setLoder(true);
        const resp = await getTraningAll_API();
        if(resp && resp.success){
            setLoder(false);
            setTrdata(resp.data);
        }
        setLoder(false);
    }
    useEffect(() => {
        getdata();
    }, [])

    const handleNavigation = () => {
        navigate('/training');
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
                            <Headings MainHeading={"Training Module"} HeadButton={<SharedButton BtnLabel={"Create Training "} BtnVariant={'primary'} onClick={handleNavigation} />} />
                                {/* {key == "home" ?
                                    <SearchPanel StartIcon={<IoSearch />} FormPlaceHolder={"Search by Name"} />
                                    :
                                    <SearchPanel StartIcon={<IoSearch />} FormPlaceHolder={"Search by Name"} />

                                } */}

                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="my-4"
                                >
                                    <Tab eventKey="home" title="Training List">
                                        <ListView  trdata={trdata}/>
                                    </Tab>
                                    <Tab eventKey="tracking" title="Track Trainy">
                                        <TrackTraining />
                                    </Tab>
                                </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
