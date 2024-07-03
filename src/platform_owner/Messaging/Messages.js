import React, { useEffect, useState } from 'react'
import { Loader } from '../../components/Loader'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import { SharedButton } from '../../components/Button'
import { Plans } from '../../company_owner/Subscriptions_Plan/viewPlans/Plans'
// import { getSubscriptionPlan_api } from '../../../api_services/Apiservices';
import { useNavigate } from 'react-router-dom'
import { MessageList } from './MessageList'

export const Messages = () => {
    const [planList, setPlanList] = useState([]);
    const [loder, setLoder] = useState(false);
  
    const [key, setKey] = useState('home');
    const navigate = useNavigate();
    const handleSubscriptionPlan = () => {
      navigate('/subscriptionplan');
    }
  
    // const get_plan = async () => {
    //   setLoder(true);
    //   const resp = await getSubscriptionPlan_api();
    //   if (resp && resp.data) {
    //     setLoder(false);
    //     const data = resp.data;
    //     setPlanList(data);
    //   } else { setPlanList([]); setLoder(false); }
    //   setLoder(false);
    // }
  
    // useEffect(() => { get_plan(); }, [])

    
  return (
    <>
    <Loader show={loder} />
    <div className='CreateSubscription AccountModulePage'>
      <Container fluid>
        <Row>
          <Col md={3}>
            <PoSidebar />
          </Col>
          <Col md={9}>
            <Headings MainHeading={"Message"} />
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3 mt-3"
            >
              <Tab eventKey="home"
                title="Send Message"
              >
                <MessageList/>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  </>
  )
}


