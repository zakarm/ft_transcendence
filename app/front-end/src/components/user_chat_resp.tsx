
import React from 'react';
import styles from './styles/user_chat.module.css';
import Image from 'next/image';

interface Props{
    handleShow: () => void;
}

export default function UserChatResp ({handleShow}: Props)
{
    return (
        <>
            <div className={`${styles.message_container} row m-2 p-2`}>
                <div className={`${styles.img_holder} col-2 d-flex justify-content-center align-items-center`}>
                    <div>
                        <Image className={`${styles.profile_img}`} src='/profile.jpeg' height={200} width={200} alt='profile_image' onClick={handleShow}/>
                    </div>
                </div>
                <div className={`col d-flex flex-column d-flex justify-content-evenly align-items-start`}>
                    <span>!Appolo_007</span>
                    <span style={{color: '#bebebe'}}>Hey, do you wanna play, i dare you to win.</span>
                </div>
                <div className='col-2 text-end'>
                    <span>now</span>
                </div>
            </div>
        </>
    );
}