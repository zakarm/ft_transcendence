"use client";
import styles from './styles/chat_friends.module.css';
import Image from 'next/image';
import { InputGroup } from 'react-bootstrap';
import UserChat from './user_chat';
import friends from '@/components/friends.json';
import Form from 'react-bootstrap/Form';
import User from './user';
import { CiSearch } from "react-icons/ci";

interface Props{
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    setAbout: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChatFriends( {setShow , setAbout}: Props ) {

    const friendsData = friends.sort((usr1, usr2) => {
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
    .map((user, index) => 
        <User key={index} src={user.image_url} isConnected={user.connected}/>
    );

    const handleShow = () => setAbout(true);

    return (
        <>
            <div className="d-flex flex-column vh-100">
              <div className="">
                <div className={`${styles.welcome}`}>
                    <span className={`d-flex flex-column p-2 text-center valo-font`}>
                        <span className='display-5' style={{color: '#FF4755'}}>GAME HUB</span>
                        <span className='h2' style={{color: '#FFEBEB'}}>LET'S CHAT</span>
                        <span className='h2' style={{color: '#FFEBEB'}}>& PLAY</span>
                    </span>
                    <Image className={`${styles.welcome_img}`} width={300} height={300} src="/welcome.png" alt='welcome' />
                </div>
                  <div className={`mx-3 mb-2`}>
                      <InputGroup size="lg">
                        <InputGroup.Text style={{backgroundColor: '#2C3143'}}><CiSearch color='#FFEBEB'/></InputGroup.Text>
                        <Form.Control className={`${styles.form_control}`} type="text" color='red' aria-label='search' placeholder='Enter for search...' style={{backgroundColor: '#2C3143'}}/>
                      </InputGroup>
                  </div>
                  <div className={`${styles.usr_container} d-flex overflow-auto`}>
                      {friendsData}
                  </div>
                  <hr className="mt-1" style={{color: '#FFEBEB', borderWidth: '2px'}}/>
              </div>
              <div className={`${styles.chat_container} p-2 flex-grow-1`}>
                      <UserChat setShow={setShow} handleShow={handleShow}/>
                      <UserChat setShow={setShow} handleShow={handleShow}/>
                      <UserChat setShow={setShow} handleShow={handleShow}/>
                      <UserChat setShow={setShow} handleShow={handleShow}/>
                      <UserChat setShow={setShow} handleShow={handleShow}/>
                      <UserChat setShow={setShow} handleShow={handleShow}/>
                      <UserChat setShow={setShow} handleShow={handleShow}/>
                      <UserChat setShow={setShow} handleShow={handleShow}/>
                      <UserChat setShow={setShow} handleShow={handleShow}/>
                      <UserChat setShow={setShow} handleShow={handleShow}/>
                      <UserChat setShow={setShow} handleShow={handleShow}/>
                      <UserChat setShow={setShow} handleShow={handleShow}/>
                      <UserChat setShow={setShow} handleShow={handleShow}/>
                      <UserChat setShow={setShow} handleShow={handleShow}/>
              </div>
            </div>
        </>
    );
}