
import React from 'react';
import styles from './styles/user_chat.module.css';
import Image from 'next/image';

export default function UserChat ()
{
    return (
        <>
            <div className='row  m-0 border'>
                <div className='col'>
                    <Image className={`${styles.profile_img}`} src='/profile.jpeg' height={200} width={200} alt='profile_image'/>
                </div>
                <div className='col'>
                    <span>!Snake_007</span>
                    <span>Hey, do you wanna play, i dear you to win ,</span>
                </div>
            </div>
        </>
    );
}