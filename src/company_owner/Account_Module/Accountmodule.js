import { useEffect, useState } from 'react';
import { Row, Col, Tab, Tabs, Container } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { SharedButton } from '../../components/Button'
import { SearchPanel } from '../../components/SearchPanel';
import { IoSearchOutline } from "react-icons/io5";
import { AccountModuleTable } from './AccountModuleTable';
import { useNavigate } from 'react-router-dom';
import { Cosidebar } from '../CO_Sidebar';
import { Loader } from '../../components/Loader';
import { getAccount_API } from '../../api_services/Apiservices';
import { sortAccountName } from '../../helper/Helper';

export const Accountmodule = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState('home');
    const [loder, setLoder] = useState(false);
    const [maindata, setMaindata] = useState([]);
    const [account_data, setAccount_data] = useState([]);
    const [pagination, setPagination] = useState()


    const get_account_list = async (page, key) => {
        const resp = await getAccount_API({ "page": page, "srkey": key });
        if (resp) {
            const data = resp.data;
            setMaindata(data);
            setPagination(resp.pagination);
            const transformedData = data.map(item => ({
                accountName: item.account_name,
                accountId: item._id,
                accountOwnerId: item.email,
                billingDate: item.renewal_date,
                location: `${item.state} ${item.city}`,
                subscription: item.subscription_id.name,
                contact_name: item.first_name + " " + item.last_name,
                status: item.status,
                data: item
            }));
            const sortData = sortAccountName(transformedData, true);
            setAccount_data(sortData);
        }
    }

    useEffect(() => { get_account_list(); }, [])


    const handleCreateAccount = () => {
        navigate('/createaccount');
    }

    const searchHanlder = (e) => {
        const key = e.target.value;
        get_account_list("", key);
    }

    const pageHanlder = (page) => {
        get_account_list(page);
    }


    return (
        <>
            <Loader show={loder} />
            <div className='AccountModulePage AccountModulePage'>
                <Container fluid>
                    <Row >
                        <Col md={3}>
                            <Cosidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Accounts"} HeadButton={<SharedButton onClick={handleCreateAccount} BtnLabel={"Create"} BtnVariant={'primary'} style={{ background: '#00285D' }} />} />
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3 mt-3"
                            >
                                <Tab eventKey="home"
                                    title="Accounts List"
                                >
                                    <SearchPanel StartIcon={<IoSearchOutline />} FormPlaceHolder={"Search by first name, last name, or email.."} FormType={"search"} onChange={searchHanlder} />
                                    <AccountModuleTable setLoder={setLoder} mydata={account_data} pagination={pagination} pageHanlder={pageHanlder} />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
