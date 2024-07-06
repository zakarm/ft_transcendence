
import React from 'react';
import styles from './styles/user_chat.module.css';

import Spinner from 'react-bootstrap/Spinner';

interface Users {
    id: number;
    username: string;
    image_url: string;
    message_waiting: boolean;
  }

interface Props{
    handleChat: (username: string) => void;
    handleAbout: () => void;
    setChatUsers: React.Dispatch<React.SetStateAction<Users[]>>;
    username: string;
    last_message: string;
    time: string;
    image_url: string;
    waiting_msg: boolean;
}

export default function UserChatResp ({handleChat, username, last_message, time, image_url, handleAbout , setChatUsers, waiting_msg}: Props)
{
    const updateState = () => {
        handleChat(username);

        setChatUsers(prevUsers =>
            prevUsers.map(user =>
              user.username === username ? { ...user, message_waiting: false } : user
            )
          );
    }
    const expandAbout = () => {
        if (window.innerWidth < 1200)
            handleAbout();
    }

    return (
        <>
            <div className={`${styles.message_container} row m-2 p-2`} onClick={updateState}>
                <div className={`${styles.img_holder} col-2 d-flex justify-content-center align-items-center`}>
                    <div>
                        <img className={`${styles.profile_img}`} src={image_url} height={200} width={200} alt='profile_image' onClick={expandAbout}/>
                    </div>
                </div>
                <div className={`col d-flex flex-column d-flex justify-content-evenly align-items-start`}>
                    <span>{username}</span>
                    <span style={{color: '#bebebe'}}>{last_message.length < 10 ? last_message : last_message.slice(0,7) + "..."}</span>
                </div>
                <div className='col-2 text-end'>
                <span>
                    {
                        (waiting_msg) ? 
                        (<Spinner animation="grow" variant="danger" />) :
                        (time)
                    }
                </span>
                </div>
            </div>
        </>
    );
}