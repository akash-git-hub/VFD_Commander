import { useEffect, useState } from 'react';
import { Row, Col, Tab, Tabs, Container } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { SharedButton } from '../../../components/Button'
import { useNavigate } from 'react-router-dom';
import { Plans } from './Plans';
import { Loader } from '../../../components/Loader';
import { Cosidebar } from '../../CO_Sidebar';
import { getSubscriptionPlan_api } from '../../../api_services/Apiservices';

export const ListViewPlan = () => {
  const [planList, setPlanList] = useState([]);
  const [loder, setLoder] = useState(false);

  const [key, setKey] = useState('home');
  const navigate = useNavigate();
  const handleSubscriptionPlan = () => {
    navigate('/subscriptionplan');
  }

  const get_plan = async () => {
    setLoder(true);
    const resp = await getSubscriptionPlan_api();
    if (resp && resp.data) {
      setLoder(false);
      const data = resp.data;
      setPlanList(data);
    } else { setPlanList([]); setLoder(false); }
    setLoder(false);
  }

  useEffect(() => { get_plan(); }, [])


  return (
    <>
      <Loader show={loder} />
      <div className='CreateSubscription AccountModulePage'>
        <Container fluid>
          <Row>
            <Col md={3}>
              <Cosidebar />
            </Col>
            <Col md={9}>
              <Headings MainHeading={"Subscriptions"}
              //  SubHeading={"View Plans"}
                HeadButton={<SharedButton onClick={handleSubscriptionPlan} BtnLabel={"Create"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 mt-3"
              >
                <Tab eventKey="home" 
                title="Information"
                >
                  <Plans planList={planList}/>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
