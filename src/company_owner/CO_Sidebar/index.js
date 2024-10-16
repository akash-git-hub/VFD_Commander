import React, { useContext, useEffect, useState } from 'react'
import { Badge, Stack } from 'react-bootstrap'
import { TfiPieChart } from "react-icons/tfi";
import { SlBell } from "react-icons/sl";
import { FiAward } from "react-icons/fi";
import { LinkSidebar } from '../../components/LinkSidebar';
import { Avatar } from '../../components/Avatar';
import { SharedButton } from '../../components/Button';
import { CgLogOut } from "react-icons/cg";
import { useLocation, useNavigate } from 'react-router-dom';
import { Mycontext } from '../../App';

export const Cosidebar = () => {
    const navigate = useNavigate();
    const [host, setHost] = useState("accountmodule");
    const path = useLocation().pathname;
    const {pdata} = useContext(Mycontext);
    const [mydata,setMydata] = useState();

    useEffect(()=>{
        if(JSON.parse(pdata)){
            setMydata(JSON.parse(pdata));
        }

    },[pdata])

   

    useEffect(() => { setHost(path); }, [path]);

   
 const logoutHandler = () => {  
    localStorage.setItem("mydata", "");
    localStorage.removeItem("mydata");
    localStorage.removeItem('id');
    localStorage.removeItem('Authorization');
    localStorage.removeItem('type');  
    navigate('/');
  };

 
    return (
        <>
            <div className='CO_Sidebar p-md-4' style={{}}>
                <Stack direction='vertical' gap={3}>
                    <img src='./assets/images/MainLogo.png' className='img-fluid w-75' alt='' />
                    <h6 style={{
                        color: '#64748B'
                    }}>Menu</h6>
                    <ul style={{
                        listStyle: 'none',
                        padding: 0
                    }}>
                        <Stack direction='vertical' gap={3}>
                            <li className={host === "/accountmodule" || host === "/accountdetail" || host === "/createaccount" ? "active" : ""} style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<TfiPieChart />} LinkLabel={'Accounts'} LinkPath={'/accountmodule'} />
                            </li>
                         
                            <li className={host === "/subscriptionview" || host==="/editplan" || host === "/subscriptionplan"? "active" : ""} style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<FiAward />} LinkLabel={'Subscriptions'} LinkPath={'/subscriptionview'} />
                            </li>
                            <li className={host === "/notifications" ? "active" : ""} style={{
                                padding: '10px',
                                position: 'relative'
                            }}>
                                <LinkSidebar LinkIcon={<SlBell />} LinkLabel={'Notifications'} LinkPath={'#'} />  <Badge bg="secondary" style={{
                                    position: 'absolute',
                                    top: '2vh',
                                    right: '5vh'

                                }}>14</Badge>
                            </li>
                        </Stack>
                    </ul>
                    <hr />
                    <h6 style={{
                        color: '#64748B'
                    }}>Profile</h6>
                    <ul style={{
                        listStyle: 'none',
                        padding: 0
                    }}>
                        <Stack direction='vertical' gap={3}>
                            <li style={{
                                padding: '10px'
                            }}>
                                <Avatar LinkLabel={mydata && mydata.accountName} Description={mydata && mydata.email} />
                            </li>
                            <li>
                                <SharedButton BtnLabel={"Logout"} BtnVariant={"light"} startIcon={<CgLogOut />} onClick={logoutHandler} BtnClass={"w-100"} style={{
                                    background: '#F7F8F9'
                                }} />
                            </li>
                        </Stack>
                    </ul>
                </Stack>
            </div>
        </>
    )
}
