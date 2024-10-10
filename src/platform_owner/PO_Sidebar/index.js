import React, { useCallback, useEffect, useState } from 'react'
import { Image, Stack } from 'react-bootstrap'
import { LinkSidebar } from '../../components/LinkSidebar';
import { Avatar } from '../../components/Avatar';
import { SharedButton } from '../../components/Button';
import { CgLogOut } from "react-icons/cg";
import { useLocation, useNavigate } from 'react-router-dom';
import { MdHelpOutline } from 'react-icons/md';
import { AvatarNew } from '../../components/AvatarNew';
import { errorAlert } from '../../components/Alert';

export const PoSidebar = ({ img = "" }) => {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [mydata, setMydata] = useState(JSON.parse(localStorage.getItem('userData')));
    const [guestData, setGuestData] = useState();
    const [roles, setRoles] = useState();

    useEffect(() => {
        const guest = mydata?.guestData;
        const roleData = mydata?.guestData?.role;
        setRoles(roleData);
        setGuestData(guest);
    }, [mydata])

    const logoutClientHandler = () => {
        localStorage.setItem("mydata", "");
        localStorage.removeItem("mydata");
        localStorage.removeItem('id');
        localStorage.removeItem('Authorization');
        localStorage.removeItem('type');
        localStorage.removeItem('userData');
        navigate('/');
    };

    // {
    //     "_id": "66ed79ab584402553de2efff",
    //     "role": "Role-1",
    //     "User_Profile_Module": true,
    //     "Training_Module": false,
    //     "Inventory_Module": false,
    //     "Availability_Module": false,
    //     "Qualification_Module": true,
    //     "Reporting_Module": false,
    //     "Role_Administration": true,
    //     "Dashboard": false,
    //     "Gear_Administration": false,
    //     "status": "Active"
    // }

    const noAccess = () => { console.log("Hello"); errorAlert("Access permission denied."); }

    return (
        <>
            <div className='CO_Sidebar p-md-4' style={{}}>
                <Stack direction='vertical' gap={1}>
                    <img src='./assets/images/MainLogo.png' className='img-fluid w-75' alt='' />
                    <h6 style={{
                        color: '#64748B'
                    }}>Menu</h6>
                    {mydata && mydata.isGuest === false ?
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <Stack direction='vertical' gap={3}>
                                <li className={pathname === "/dashboard" ? 'active' : ""} style={{ padding: '10px' }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/dashboard_new.svg' />} LinkLabel={'Dashboard'} LinkPath={'/dashboard'} />
                                </li>
                                <li className={pathname === "/roleadminstratorlist" || pathname == "/rolelistdetail" || pathname === "/roleadminstrator" || pathname === "/qualificationlist" || pathname === "/qualification" || pathname === "/qualificationdetail" ? 'active' : ""} style={{
                                    padding: '10px'
                                }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/Role.svg' />} LinkLabel={'Role and Qualifications Administration'} LinkPath={'/roleadminstratorlist'} />
                                </li>
                                <li className={pathname === "/adminstratorprofilelist" || pathname === "/editprofileadminstrator" || pathname === "/profileadminstrator" || pathname === "/unavailability" ? 'active' : ""} style={{
                                    padding: '10px', position: 'relative'
                                }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/User.svg' />} LinkLabel={'User Profile Administration'} LinkPath={'/adminstratorprofilelist'} />
                                </li>

                                <li className={pathname === "/messages" ? 'active' : ""} style={{ padding: '10px' }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/Message.svg' />} LinkLabel={'Messaging'} LinkPath={'/messages'} />
                                </li>
                                <li className={pathname === "/traininglist" || pathname === "/TraningListDetail" || pathname === "/training" ? 'active' : ""} style={{ padding: '10px' }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/Text.svg' />} LinkLabel={'Event Administration'} LinkPath={'/traininglist'} />
                                </li>
                                <li className={pathname === "/inventorymodulelist" || pathname === "/apparatusInfoDetails" || pathname === "/createGeareType" || pathname === "/gearinfo" || pathname === "/CreateGear" || pathname === "/CreateApparatus" || pathname === "/GearListDetail" ? 'active' : ""} style={{
                                    padding: '10px'
                                }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/Icon.svg' />} LinkLabel={'Gear and Apparatus Administration'} LinkPath={'/inventorymodulelist'} />
                                </li>

                                <li className={pathname === "/reports" ? 'active' : ""} style={{ padding: '10px' }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/Todo.svg' />} LinkLabel={'Reports '} LinkPath={'#'} />
                                </li>

                                <li className={pathname === "/reports" ? 'active' : ""} style={{ padding: '10px' }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/Add.svg' />} LinkLabel={'Custom Field'} LinkPath={'/addfield'} />
                                </li>

                                <li className={pathname === "/support" ? 'active' : ""} style={{ padding: '10px' }}>
                                    <LinkSidebar LinkIcon={<MdHelpOutline style={{ width: "24px", height: "24px" }} />
                                        // <Image src='./assets/images/Support.svg' />
                                    } LinkLabel={'Support'} LinkPath={'/support'} />
                                </li>

                            </Stack>
                        </ul>
                        :
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <Stack direction='vertical' gap={3}>
                                <li className={pathname === "#" ? 'active' : ""} style={{ padding: '10px' }}>
                                    {roles && roles.Dashboard === true ?
                                        <LinkSidebar LinkIcon={<Image src='./assets/images/dashboard_new.svg' />} LinkLabel={'Dashboard'} LinkPath={'#'} />
                                        :
                                        <div onClick={noAccess}>
                                            <LinkSidebar LinkIcon={<Image src='./assets/images/dashboard_new.svg' />} LinkLabel={'Dashboard'} LinkPath={'#'} />
                                        </div>
                                    }
                                </li>
                                <li className={pathname === "/roleadminstratorlist" || pathname == "/rolelistdetail" || pathname === "/roleadminstrator" || pathname === "/qualificationlist" || pathname === "/qualification" || pathname === "/qualificationdetail" ? 'active' : ""} style={{
                                    padding: '10px'
                                }}>
                                    {roles?.Role_Administration === true ?
                                        <LinkSidebar LinkIcon={<Image src='./assets/images/Role.svg' />} LinkLabel={'Role and Qualifications Administration'} LinkPath={'/roleadminstratorlist'} />
                                        :
                                        <div onClick={noAccess}>
                                            <LinkSidebar LinkIcon={<Image src='./assets/images/Role.svg' />} LinkLabel={'Role and Qualifications Administration'} LinkPath={'#'} />
                                        </div>
                                    }
                                </li>
                                <li className={pathname === "/adminstratorprofilelist" || pathname === "/editprofileadminstrator" || pathname === "/profileadminstrator" || pathname === "/unavailability" ? 'active' : ""} style={{
                                    padding: '10px', position: 'relative'
                                }}>
                                    {roles?.User_Profile_Module === true ?
                                        <LinkSidebar LinkIcon={<Image src='./assets/images/User.svg' />} LinkLabel={'User Profile Administration'} LinkPath={'/adminstratorprofilelist'} />
                                        :
                                        <div onClick={noAccess}>
                                            <LinkSidebar LinkIcon={<Image src='./assets/images/User.svg' />} LinkLabel={'User Profile Administration'} LinkPath={'#'} />
                                        </div>
                                    }
                                </li>

                                <li className={pathname === "/messages" ? 'active' : ""} style={{ padding: '10px' }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/Message.svg' />} LinkLabel={'Messaging'} LinkPath={'/messages'} />
                                </li>
                                <li className={pathname === "/traininglist" || pathname === "/TraningListDetail" || pathname === "/training" ? 'active' : ""} style={{ padding: '10px' }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/Text.svg' />} LinkLabel={'Event Administration'} LinkPath={'/traininglist'} />
                                </li>
                                <li className={pathname === "/inventorymodulelist" || pathname === "/apparatusInfoDetails" || pathname === "/createGeareType" || pathname === "/gearinfo" || pathname === "/CreateGear" || pathname === "/CreateApparatus" || pathname === "/GearListDetail" ? 'active' : ""} style={{
                                    padding: '10px'
                                }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/Icon.svg' />} LinkLabel={'Gear and Apparatus Administration'} LinkPath={'/inventorymodulelist'} />
                                </li>

                                <li className={pathname === "/reports" ? 'active' : ""} style={{ padding: '10px' }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/Todo.svg' />} LinkLabel={'Reports '} LinkPath={'#'} />
                                </li>

                                <li className={pathname === "/reports" ? 'active' : ""} style={{ padding: '10px' }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/Add.svg' />} LinkLabel={'Custom Field'} LinkPath={'/addfield'} />
                                </li>

                                <li className={pathname === "/support" ? 'active' : ""} style={{ padding: '10px' }}>
                                    <LinkSidebar LinkIcon={<MdHelpOutline style={{ width: "24px", height: "24px" }} />
                                    } LinkLabel={'Support'} LinkPath={'/support'} />
                                </li>

                            </Stack>
                        </ul>
                    }
                    <hr />
                    <h6 style={{
                        color: '#64748B'
                    }}>Profile</h6>
                    <ul style={{
                        listStyle: 'none',
                        padding: 0
                    }}>
                        {mydata && mydata.isGuest === false ?
                            <Stack direction='vertical' gap={3}>
                                <li className={'active'} style={{ padding: '0px 0.2rem', border: '1px', borderRadius: "5px" }} onClick={() => navigate('/myprofile')} >
                                    <Avatar img={img} LinkLabel={mydata && mydata.account_name} Description={mydata && mydata.email} />
                                </li>
                                <li>
                                    <SharedButton BtnLabel={"Logout"} onClick={logoutClientHandler} BtnVariant={"light"} startIcon={<CgLogOut />} BtnClass={"w-100"} style={{ background: '#e7eaee' }} />
                                </li>
                            </Stack>
                            :
                            <Stack direction='vertical' gap={3}>
                                <li className={'active'} style={{ padding: '0px 0.2rem', border: '1px', borderRadius: "5px" }} onClick={() => navigate('/my_guest_profile', { state: { data: guestData } })} >
                                    <AvatarNew img={guestData?.image} LinkLabel={guestData?.first_name + " " + guestData?.last_name} Description={guestData?.email} />
                                </li>
                                <li>
                                    <SharedButton BtnLabel={"Logout"} onClick={logoutClientHandler} BtnVariant={"light"} startIcon={<CgLogOut />} BtnClass={"w-100"} style={{ background: '#e7eaee' }} />
                                </li>
                            </Stack>

                        }
                    </ul>
                </Stack>
            </div>
        </>
    )
}
