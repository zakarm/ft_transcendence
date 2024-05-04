

import Dropdown from 'react-bootstrap/Dropdown';
import { IoIosSearch } from "react-icons/io";
import { ImUserPlus } from "react-icons/im";
import styles from './styles/srightBar.module.css'
import Splayer from "./Splayer";
import Notification from "./Notification";
import React, { forwardRef } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface Friend {
	id: number;
	username: string;
	image_url: string;
	connected: boolean;
}

interface Props
{
    friends_data : any;
    toggleShow: () => void;
    setfriendModal: () => void;
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

export default function SrightBar({toggleShow, setfriendModal, friends_data} : Props) {

    console.log(friends_data);
    const data = friends_data.sort((usr1: any, usr2: any) => {
        if (usr1.connected && !usr2.connected) {
            return -1;
        }
          // Sort disconnected users second
        if (!usr1.connected && usr2.connected) {
            return 1;
        }
          // Sort by ID if isConnected flag is the same
        return usr1.id - usr2.id;
    })
    // .slice(0, 5)
    .map((user: Friend, index: number) => 
        <Splayer key={index} nickname={user.username} id={user.id} image={user.image_url} isConnected={user.connected}/>
    );

    const router = useRouter();

    return (
            <div className="d-flex flex-column vh-100 py-2">
                <div className="pb-1" style={{width: '91%'}}>
                            <div className=' d-flex flex-column align-items-center justify-content-center p-0'>
                                <div className={`${styles.holder} text-center p-2`}>
                                    <div className={`col-inline ${styles.notification1}`}>
                                       <Dropdown>
                                            <Image className={`${styles.img_class1}`} width={60} height={60} src="/char3.png" alt='Profile' onClick={() => router.push('/profile')}/>
                                           <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                                <span className={`${styles.badge1}`}>3</span>
                                           </Dropdown.Toggle>
                                           <Dropdown.Menu className="drop-class">
                                             <Dropdown.Item eventKey="1"><Notification /></Dropdown.Item>
                                             <Dropdown.Item eventKey="2"><Notification /></Dropdown.Item>
                                             <Dropdown.Item eventKey="3"><Notification /></Dropdown.Item>
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