import { useState } from 'react';
import { CoSidebar } from '../CO_Sidebar'
import { Row, Col, Tab, Tabs, Container } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { SharedButton } from '../../components/Button'
import { SearchPanel } from '../../components/SearchPanel';
import { IoSearchOutline } from "react-icons/io5";
import { AccountModuleTable } from './AccountModuleTable';
import { useNavigate } from 'react-router-dom';

export const AccountModule = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState('home');

    const handleCreateAccount = () =>{
        navigate('/createaccount');
    }

    return (
        <>
            <div className='AccountModulePage'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <CoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Account Module"} SubHeading={"Manage your Manage Accounts"} HeadButton={<SharedButton onClick={handleCreateAccount} BtnLabel={"Create Account"} BtnVariant={'primary'} style={{ background: '#00285D' }}/>}/>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="Overview">
                                    <SearchPanel StartIcon={<IoSearchOutline />} FormPlaceHolder={"Search by invoice number, name, amount..."} FormType={"search"} />
                                    <AccountModuleTable/>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
