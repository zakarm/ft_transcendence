
import React from 'react';
import styles from './styles/user_chat.module.css';
import Image from 'next/image';

interface Props{
    handleAbout: () => void;
    handleShow: () => void;
    handleChat: (username: string) => void;
    username: string;
    image_url: string;
}

export default function UserChat ( {handleChat, username, image_url, handleAbout , handleShow}: Props )
{
    return (
        <>
            <div className={`${styles.message_container} row m-2 p-2`} onClick={() => handleChat(username)}>
                <div className={`${styles.img_holder} col-2 d-flex justify-content-center align-items-center`}>
                    <div>
                        <Image className={`${styles.profile_img}`} src={image_url} height={200} width={200} alt='profile_image' onClick={handleAbout}/>
                    </div>
                </div>
                <div className={`col d-flex flex-column d-flex justify-content-evenly align-items-start`} onClick={handleShow}>
                    <span>{username}</span>
                    <span style={{color: '#bebebe'}}>Hey, do you wanna play, i dare you to win.</span>
                </div>
                <div className='col-2 text-end'>
                    <span>now</span>
                </div>
            </div>
        </>
    );
}