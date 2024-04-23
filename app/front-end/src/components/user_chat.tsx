
import React from 'react';
import styles from './styles/user_chat.module.css';
import Image from 'next/image';

export default function UserChat ()
{
    return (
        <>
            <div className={`${styles.message_container} row m-2 p-2`}>
                <div className={`${styles.img_holder} col-2 d-flex justify-content-center align-items-center`}>
                    <Image className={`${styles.profile_img}`} src='/profile.jpeg' height={200} width={200} alt='profile_image'/>
                    <div className={`${styles.status}`}>
                        <div className={`${styles.status_flag}`}></div>
                    </div>
                </div>
                <div className={`col d-flex flex-column d-flex justify-content-evenly align-items-start`}>
                    <span>!Snake_007</span>
                    <span style={{color: '#bebebe'}}>Hey, do you wanna play, i dear you to win.</span>
                </div>
                <div className='col-2 text-end'>
                    <span>now</span>
                </div>
            </div>
        </>
    );
}