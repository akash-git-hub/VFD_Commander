import React, { useEffect, useState } from 'react'
import { Loader } from '../../components/Loader'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import { MessageList } from './MessageList'
import { MessageTable } from './MessageTable'
import { getMessage_API } from '../../api_services/Apiservices'
import { IoSearch } from 'react-icons/io5'
import { SearchDaterange } from '../../components/SearchDaterange'

export const Messages = () => {
  const [loder, setLoder] = useState(false);
  const [key, setKey] = useState('viewmsg');
  const [messagedata, setMessagedata] = useState([]);

  const msgHandler = async () => {
    setLoder(true);
    setKey("viewmsg");
    const resp = await getMessage_API();
    if (resp && resp.success) {
      setLoder(false);
      const data = resp.data;
      setMessagedata(data);
    } else {
      setMessagedata([]);
    }
    setLoder(false);
  }

  useEffect(() => { msgHandler(); }, [])

  const searchandler = (e) => {
    const key = e.target.value;
    console.log(key);
    // msgHandler(key);
  }


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
                <Tab eventKey="viewmsg"
                  title="View Messages"
                >
                  <SearchDaterange StartIcon={<IoSearch />} FormPlaceHolder={"Search by Name"} onChange={searchandler} />
                  <MessageTable setLoder={setLoder} messagedata={messagedata} />
                </Tab>
                <Tab eventKey="endmsg"
                  title="Send Message"
                >
                  <MessageList setLoder={setLoder} msgHandler={msgHandler} />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}


