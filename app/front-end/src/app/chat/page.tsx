"use client";
import styles from './style.module.css';
import ChatAbout from '@/components/chat_about';
import ChatFriendsResp from '@/components/chat_friend_resp';
import ChatFriends from '@/components/chat_friends';
import ChatMessages from '@/components/chat_messages';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Spinner from 'react-bootstrap/Spinner';
import { GiAmericanFootballPlayer } from "react-icons/gi";

import { PiChatsFill } from "react-icons/pi";

interface Users {
  id: number;
  username: string;
  image_url: string;
  message_waiting: boolean;
}

export default function ()
{
  const [show, setShow] = useState(false);
  
  const [showAbout, setAbout] = useState(false);

  const [selectedChat, setSelectedChat] = useState<string>('none');

  const [chatUsers, setChatUsers] = useState<Users[]>([]);

  const handleClose = () => setAbout(false);


  const [fullscreen, setFullscreen] = useState((window.innerWidth <= 768) ? true : false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768)
        setFullscreen(true);
      else
        setFullscreen(false);
    };
  
    window.addEventListener('resize', handleResize);
  
    // Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount
  

  return (
      <>
          <div className="row vh-100 p-0 m-0">
            <div className="col-xl-4 col-md-6 col-sm-12">
              {
                (fullscreen) ?
                (<ChatFriends setSelectedChat={setSelectedChat} setShow={setShow} setAbout={setAbout} fullscreen={fullscreen} chatUsers={chatUsers} setChatUsers={setChatUsers}/>) :
                (<ChatFriendsResp setSelectedChat={setSelectedChat} setAbout={setAbout} setShow={setShow} fullscreen={fullscreen} chatUsers={chatUsers} setChatUsers={setChatUsers}/>)
              }
              &nbsp;
            </div>
            <div className={`col-xl-5 col-md-6 p-0 m-0 ${styles.chat}`}>
              {
                (selectedChat === 'none') ? 
                (<div className='vh-100 d-flex flex-column align-items-center justify-content-center border border-dark'>
                  <div><PiChatsFill className='mx-2' size='1.8em' color='#FF4755'/></div>
                  <div><span style={{fontFamily: 'itim', color: 'white'}}>Please chose a conversation to start chatting!</span></div>
                </div>):
                (<ChatMessages selectedChat={selectedChat} chatUsers={chatUsers} setChatUsers={setChatUsers}/>)
              }
              <Modal contentClassName={`${styles.chat_modal}`} show={show} fullscreen="md-down" onHide={() => setShow(false)} animation>
                <Modal.Header closeButton closeVariant='white'>

                </Modal.Header>
                <ChatMessages selectedChat={selectedChat} chatUsers={chatUsers} setChatUsers={setChatUsers}/>
              </Modal>
              <Offcanvas className={`${styles.canvas}`} show={showAbout} onHide={handleClose} backdrop={false}>
                <Offcanvas.Body className={`p-0 m-0`}>
                  <ChatAbout selectedChat={selectedChat} handleClose={handleClose}/>
                </Offcanvas.Body>
              </Offcanvas>
            </div>
            <div className={`${styles.about_container} ${styles.about} col-xl-3 p-0 m-0`}>
              {
                (selectedChat === 'none') ? 
                (<div className='vh-100 d-flex flex-column align-items-center justify-content-center border border-dark'>
                  <div><GiAmericanFootballPlayer className='mx-2' size='2em' color='#FF4755'/></div>
                  <div><Spinner  variant="danger"/></div>
                </div>):
                (<ChatAbout selectedChat={selectedChat} handleClose={handleClose}/>)
              }
            </div>
          </div>
      </>
  );
}