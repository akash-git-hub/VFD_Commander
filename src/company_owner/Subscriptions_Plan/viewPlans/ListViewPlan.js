import { useState } from 'react';
import { CoSidebar } from '../../CO_Sidebar'
import { Row, Col, Tab, Tabs, Container } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { SharedButton } from '../../../components/Button'
import { useNavigate } from 'react-router-dom';
import { Plans } from './Plans';
import { Loader } from '../../../components/Loader';

export const ListViewPlan = () => {

  const [key, setKey] = useState('home');
  const navigate = useNavigate();
  const handleSubscriptionPlan = () => {
    navigate('/subscriptionplan');
  }


  return (
    <>
      <Loader  show={false}/>
      <div className='CreateSubscription'>
        <Container fluid>
          <Row>
            <Col md={3}>
              <CoSidebar />
            </Col>
            <Col md={9}>
              <Headings MainHeading={"Subscription Plan"} SubHeading={"View Plans"} HeadButton={<SharedButton onClick={handleSubscriptionPlan} BtnLabel={"Create Subscriptions"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="home" title="Subscription Plan">
                  <Plans />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
