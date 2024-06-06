import React from 'react'
import { Badge, Image, Stack } from 'react-bootstrap'
import { LinkSidebar } from '../../components/LinkSidebar';
import { Avatar } from '../../components/Avatar';
import { SharedButton } from '../../components/Button';
import { CgLogOut } from "react-icons/cg";

export const PoSidebar = () => {
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
                            <li className='active' style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Role.svg' />} LinkLabel={'Role Module'} LinkPath={'/'} />
                            </li>
                            <li style={{
                                padding: '10px',
                                position: 'relative'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/User.png' />} LinkLabel={'User Profile Module'} LinkPath={'/'} />  <Badge bg="secondary" style={{
                                    position: 'absolute',
                                    top: '2vh',
                                    right: '5vh'

                                }}>14</Badge>
                            </li>
                            <li style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Text.png' />} LinkLabel={'Training Module'} LinkPath={'/'} />
                            </li>
                            <li style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Message.png' />} LinkLabel={'Messaging Module'} LinkPath={'/'} />
                            </li>
                            <li style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Icon.png' />} LinkLabel={'Inventory Module'} LinkPath={'/'} />
                            </li>
                            <li style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Todo.png' />} LinkLabel={'Availability Module'} LinkPath={'/'} />
                            </li>
                            <li style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Qualification.png' />} LinkLabel={'Availability Module'} LinkPath={'/'} />
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
                                <Avatar LinkLabel={'Jenny Wilson'} Description={'Jenny@wilsongmail.com'} />
                            </li>
                            <li>
                                <SharedButton BtnLabel={"Logout"} BtnVariant={"light"} startIcon={<CgLogOut />} BtnClass={"w-100"} style={{
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
