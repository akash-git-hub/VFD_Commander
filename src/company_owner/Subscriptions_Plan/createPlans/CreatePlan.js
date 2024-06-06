import { useState } from 'react';
import { CoSidebar } from '../../CO_Sidebar'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { SubscriptionForm } from './SubscriptionForm'

export const CreatePlan = () => {
  const [key, setKey] = useState('home');
  return (
    <>
      <div className='CreateSubscription'>
        <Container fluid>
          <Row>
            <Col md={3}>
              <CoSidebar />
            </Col>
            <Col md={9}>
              <Headings MainHeading={"Subscription Plan"} SubHeading={"Creating A New Subscription Plan"} />
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="home" title="Create a Subscription Plan">
                  <SubscriptionForm />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
