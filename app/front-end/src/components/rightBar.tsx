import { RiNotification4Fill } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import { IoIosSearch } from "react-icons/io";
import { ImUserPlus } from "react-icons/im";
import Player from "./Player";
import Notification from "./Notification";
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { forwardRef, useState, useEffect } from 'react';
import styles from './styles/rightBar.module.css';
import Image from 'next/image';

interface User {
    id: number;
    username: string;
    image_url: string;
	is_online: number;
}

interface Props
{
    webSocketNotifications: any;
    friends_data: any;
    notifications_data: any;
    userdata: User;
    show?: boolean;
    setShow: (show: boolean) => void;
    handleClose: () => void;
    toggleShow: () => void;
    setfriendModal: () => void;
}

interface CustomToggleProps {
    children: React.ReactNode;
    onClick: () => void;
}

interface Notification{
	notification_id: number;
	image_url: string;
	message: string;
	title: string;
	link: string;
}

interface Friend {
	id: number;
	username: string;
	image_url: string;
	connected: boolean;
}

const CustomToggle = forwardRef<HTMLDivElement, CustomToggleProps>(
    ({ children, onClick }, ref) => (
        <div ref={ref} onClick={onClick}>
        {children}
        </div>
    )
);

CustomToggle.displayName = 'CustomToggle';

export default function RightBar({webSocketNotifications, notifications_data, userdata, friends_data, setShow, show, handleClose, toggleShow, setfriendModal} : Props) {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

    const filteredFriends = friends_data
    .filter((friend: Friend) => friend.username.toLowerCase().startsWith(searchTerm.toLowerCase()))
    .sort((usr1: Friend, usr2: Friend) => {
      if (usr1.connected && !usr2.connected) {
        return -1;
      }
      if (!usr1.connected && usr2.connected) {
        return 1;
      }
      return usr1.id - usr2.id;
    })
    .map((user: Friend, index: number) => (
      <Player
        key={index}
        nickname={user.username}
        id={user.id}
        image={user.image_url}
        isConnected={user.connected}
      />
    ));

    const searchOnlineFriends = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        console.log(webSocketNotifications.length);
        if (webSocketNotifications.length > 0) {
            setDropdownVisible(true);
        }
    }, [webSocketNotifications]);
    
    return (
        <Offcanvas className={`${styles.offcanvas} border-0`}  show={show} onHide={handleClose} placement='end' scroll={true} backdrop={false} >
            <Offcanvas.Body className={`p-0 m-0`}>
                <div className={`row-fluid d-flex flex-row align-items-center p-0 vh-100`}>
                    <div className='col-1 vh-100 d-flex justify-content-end align-items-center text-center'>
                        <div className={`${styles.drag_class} pt-3 pb-3`} style={{backgroundColor: '#161625', borderRadius: '15px 0 0 15px', cursor: 'pointer'}}>
                            <FaAngleRight  color="#FFEBEB" size='1.2em' />
                        </div>
                    </div>
                    <div className='col-11' onClick={toggleShow} style={{backgroundColor: '#161625'}}>
                        <div className="container vh-100">
                            <div className="d-flex flex-column vh-100">
                                <div className="flex-grow-2">
                                    <div className="row-inline">
                                         <div className="col">
                                            <Dropdown show={dropdownVisible} onToggle={() => setDropdownVisible(!dropdownVisible)}>
                                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                                  <div className={`${styles.notification}`}>
                                                     <div>
                                                         <RiNotification4Fill color="#FF4755" size='1.5em'/>
                                                     </div>
                                                      <span className={`${styles.badge}`}>5</span>
                                                  </div>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className={`${styles.drop_class}`}>
                                                {webSocketNotifications.map((key: Notification, index:number) => (
                                                    <Dropdown.Item key={index} eventKey={index}><Notification notification={key} /></Dropdown.Item>
                                                ))}
                                                {notifications_data && 
                                                    notifications_data.map((key: Notification, index: number) => 
                                                        <Dropdown.Item key={index} eventKey={index}><Notification notification={key}/></Dropdown.Item>
                                                    )
                                                }
                                                </Dropdown.Menu>
                                            </Dropdown>
                                         </div>
                                         <div className="row d-flex flex-column text-center">
                                             <div className="col">
                                                 <Image className={`${styles.img_class}`} width={60} height={60} src={userdata && userdata.image_url} alt='Profile'/>
                                             </div>
                                             <div className={`col ${styles.profile} mt-2`}>
                                                 <h3 className="valo-font">{userdata && userdata.username}</h3>
                                                 <h4 style={{fontFamily: 'intim', color: '#FFEBEB'}}>#{userdata && userdata.id}</h4>
                                             </div>
                                         </div>
                                         <div className={`col ${styles.search_inpt} p-2 d-flex align-items-center`}>
                                             <div className="col-md-2">
                                                 <IoIosSearch className={`${styles.ico}`} color="#FFEBEB"/>
                                             </div>
                                             <div className="col-md-2 p-2">
                                                 <input className={`${styles.place} ${styles.data}`} type="text" placeholder="Find a player ..."  onChange={(e) => searchOnlineFriends(e)} style={{backgroundColor: '#2C3143', border: 0}}/>
                                             </div>
                                         </div>
                                    </div>
                                </div>
                                <div className="p-3 mb-2 flex-grow-1" style={{ overflowY: 'auto' }}>
                                    {filteredFriends}
                                </div>
                                <div className="flex-grow-3">
                                    <div className={`row ${styles.search_inpt2} p-2 mb-2 m-1 text-center`} style={{cursor: "pointer"}} onClick={setfriendModal}>
                                        <div className={`col-xl-8 col-6 ${styles.place}`}>
                                            <div style={{fontFamily: 'intim', color: '#FFEBEB'}}>Add Friend</div>
                                        </div>
                                        <div className="col-xl-4 col-6">
                                            <ImUserPlus className={`${styles.ico}`} color="#FFEBEB" size='2em'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
