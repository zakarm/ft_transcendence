

import Dropdown from 'react-bootstrap/Dropdown';
import { IoIosSearch } from "react-icons/io";
import { ImUserPlus } from "react-icons/im";
import styles from './styles/srightBar.module.css'
import Splayer from "./Splayer";
import Notification from "./Notification";
import React, { forwardRef, useState, useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import {useGlobalContext} from './webSocket'
import Spinner from 'react-bootstrap/Spinner'

interface Friend {
	id: number;
	username: string;
	image_url: string;
	connected: boolean;
}

interface User {
    id: number;
    username: string;
    image_url: string;
	is_online: number;
}

interface Notification{
	notification_id: number;
	image_url: string;
	message: string;
	title: string;
	link: string;
}

interface Props
{
    webSocketNotifications: any;
    notifications_data: any;
    userdata: User;
    friends_data : any;
    toggleShow: () => void;
    setfriendModal: () => void;
}

interface NotificationWebSocket {
    notification_id: number;
    message: string;
    title: string;
    user: number;
    image_url: string;
  }

interface CustomToggleProps {
    children: React.ReactNode;
    onClick: () => void;
}

const CustomToggle = forwardRef<HTMLDivElement, CustomToggleProps>(
    ({ children, onClick }, ref) => (
      <div ref={ref} onClick={onClick}>
        {children}
      </div>
    )
  );

CustomToggle.displayName = 'CustomToggle';

export default function SrightBar({webSocketNotifications, notifications_data, userdata, toggleShow, setfriendModal, friends_data} : Props) {

    const data = friends_data.sort((usr1: any, usr2: any) => {
        if (usr1.connected && !usr2.connected) {
            return -1;
        }
        if (!usr1.connected && usr2.connected) {
            return 1;
        }
        return usr1.id - usr2.id;
    })
    .map((user: Friend, index: number) =>
        <Splayer  nickname={user.username} id={user.id} image={user.image_url} isConnected={user.connected}/>
    );

    const router = useRouter();

    return (
            <div className="d-flex flex-column vh-100 py-2">
                <div className="pb-1" style={{width: '91%'}}>
                            <div className=' d-flex flex-column align-items-center justify-content-center p-0'>
                                <div className={`${styles.holder} text-center p-2`}>
                                    <div className={`col-inline ${styles.notification1}`}>
                                       <Dropdown>
                                            <Image className={`${styles.img_class1}`} width={60} height={60} src={userdata.image_url || "/Def_pfp.png"} alt='Profile' onClick={() => router.push('/profile')}/>
                                           <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                                <span className={`${styles.badge1}`}>3</span>
                                           </Dropdown.Toggle>
                                           <Dropdown.Menu className="drop-class">
                                           {webSocketNotifications.map((key: Notification, index:number) => (
                                                    <Dropdown.Item key={index} eventKey={index}><Notification notification={key} /></Dropdown.Item>
                                            ))}
                                            {notifications_data &&
                                                notifications_data.map((key: Notification, index: number) =>
                                                    <Dropdown.Item key={index} eventKey={index}><Notification notification={key} /></Dropdown.Item>
                                                )
                                            }
                                           </Dropdown.Menu>
                                       </Dropdown>
                                    </div>
                                    <div className={`${styles.usr} col pt-1`}>
                                         <h5 className="valo-font">Me</h5>
                                    </div>
                                </div>
                            </div>
                         <div className='row d-flex text-center justify-content-center m-0'>
                            <div className={`col-6 ${styles.search_inpt1} p-2 m-2`} onClick={toggleShow}>
                                 <IoIosSearch color="#FFEBEB"/>
                            </div>
                         </div>
                </div>
                <div className=" mb-2 flex-grow-1 text-center" style={{ overflowY: 'auto', width: '91%' }}>
                    {data}
                </div>
                <div className="flex-grow-3 row-inline d-flex justify-content-center text-center" style={{width: '91%'}}>
                    <div className={`col-6 ${styles.search_inpt1} my-1 p-2 mx-2 text-center`} style={{cursor: "pointer"}} onClick={setfriendModal}>
                            <ImUserPlus color="#FFEBEB"/>
                    </div>
                </div>
            </div>
    );
}
