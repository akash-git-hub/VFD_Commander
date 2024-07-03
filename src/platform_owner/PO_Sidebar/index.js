import React, { useState } from 'react'
import { Image, Stack } from 'react-bootstrap'
import { LinkSidebar } from '../../components/LinkSidebar';
import { Avatar } from '../../components/Avatar';
import { SharedButton } from '../../components/Button';
import { CgLogOut } from "react-icons/cg";
import { useLocation, useNavigate } from 'react-router-dom';

export const PoSidebar = () => {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [mydata, setMydata] = useState(JSON.parse(localStorage.getItem('userData')));


    const logoutClientHandler = () => {

        localStorage.setItem("mydata", "");
        localStorage.removeItem("mydata");
        localStorage.removeItem('id');
        localStorage.removeItem('Authorization');
        localStorage.removeItem('type');
        localStorage.removeItem('userData');
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
                            <li className={pathname === "/roleadminstratorlist" || pathname == "/rolelistdetail" || pathname === "/roleadminstrator" ? 'active' : ""} style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Role.svg' />} LinkLabel={'Role'} LinkPath={'/roleadminstratorlist'} />
                            </li>
                            <li className={pathname === "/adminstratorprofilelist" || pathname === "/editprofileadminstrator" || pathname === "/profileadminstrator" ? 'active' : ""} style={{
                                padding: '10px',
                                position: 'relative'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/User.svg' />} LinkLabel={'User Profile'} LinkPath={'/adminstratorprofilelist'} />
                                {/* <Badge bg="secondary" style={{
                                    position: 'absolute',
                                    top: '2vh',
                                    right: '5vh'

                                }}>14</Badge> */}
                            </li>
                            <li className={pathname === "/traininglist" || pathname === "/TraningListDetail" || pathname === "/training" ? 'active' : ""} style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Text.svg' />} LinkLabel={'Training'} LinkPath={'/traininglist'} />
                            </li>
                            <li className={pathname === "/messages" ? 'active' : ""} style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Message.svg' />} LinkLabel={'Messaging'} LinkPath={'/messages'} />
                            </li>
                            <li className={pathname === "/inventorymodulelist" || pathname === "/apparatusInfoDetails" || pathname === "/createGeareType" || pathname === "/gearinfo" || pathname === "/CreateGear" || pathname === "/CreateApparatus" || pathname === "/GearListDetail" ? 'active' : ""} style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Icon.svg' />} LinkLabel={'Inventory'} LinkPath={'/inventorymodulelist'} />
                            </li>
                            <li className={pathname === "/unavailability" ? 'active' : ""} style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Todo.svg' />} LinkLabel={'Availability '} LinkPath={'/unavailability'} />
                            </li>
                            <li className={pathname === "/qualificationlist" || pathname === "/qualification" || pathname === "/qualificationdetail" ? 'active' : ""} style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Qualification.svg' />} LinkLabel={'Qualifications '} LinkPath={'/qualificationlist'} />
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
                            <li className={pathname === "/myprofile" ? 'active' : ""} style={{ padding: '0px 10px' }} onClick={() => navigate('/myprofile')} >
                                <Avatar LinkLabel={mydata && mydata.account_name} Description={mydata && mydata.email} />
                            </li>
                            <li>
                                <SharedButton BtnLabel={"Logout"} onClick={logoutClientHandler} BtnVariant={"light"} startIcon={<CgLogOut />} BtnClass={"w-100"} style={{
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
