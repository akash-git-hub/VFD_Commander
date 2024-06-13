import { useState } from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { SubscriptionForm } from './SubscriptionForm'
import { Cosidebar } from '../../CO_Sidebar';
import { Loader } from '../../../components/Loader';
import { SharedButton } from '../../../components/Button';

export const CreatePlan = () => {
  const [loder,setLoder] = useState(false)
  const [key, setKey] = useState('home');
  return (
    <>
     <Loader show={loder} />
      <div className='CreateSubscription'>
        <Container fluid>
          <Row>
            <Col md={3}>
              <Cosidebar />
            </Col>
            <Col md={9}>
            <Headings MainHeading={"Subscription Plan"} SubHeading={"Creating A New Subscription Plan"} HeadButton={<SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
              {/* <Headings MainHeading={"Subscription Plan"} SubHeading={"Creating A New Subscription Plan"} /> */}
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="home" title="Create a Subscription Plan">
                  <SubscriptionForm setLoder={setLoder} />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
