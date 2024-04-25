"use client";

import styles from './style.module.css';
import ChatAbout from '@/components/chat_about';
import ChatFriendsResp from '@/components/chat_friend_resp';
import ChatFriends from '@/components/chat_friends';
import ChatMessages from '@/components/chat_messages';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function ()
{
  const [show, setShow] = useState(false);
  
  const [showAbout, setAbout] = useState(false);

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
                (<ChatFriends setShow={setShow} setAbout={setAbout}/>) :
                (<ChatFriendsResp setAbout={setAbout}/>)
              }
              &nbsp;
            </div>
            <div className={`col-xl-5 col-md-6 p-0 m-0 ${styles.chat}`}>
              <ChatMessages />
              <Modal contentClassName={`${styles.chat_modal}`} show={show} fullscreen="md-down" onHide={() => setShow(false)} animation>
                <Modal.Header closeButton closeVariant='white'>

                </Modal.Header>
                <ChatMessages/>
              </Modal>
              <Offcanvas className={`${styles.canvas}`} show={showAbout} onHide={handleClose} backdrop={false}>
                <Offcanvas.Body className={`p-0 m-0`}>
                  <ChatAbout handleClose={handleClose}/>
                </Offcanvas.Body>
              </Offcanvas>
            </div>
            <div className={`${styles.about_container} ${styles.about} col-xl-3 p-0 m-0`}>
              <ChatAbout handleClose={handleClose}/>
            </div>
          </div>
      </>
  );
}