
import Image from 'next/image';
import styles from './styles/user.module.css'
import React from "react";

interface UserProps{
    src: string;
    isConnected: boolean;
}

export default function User( { src , isConnected }: UserProps ) {
    return (
        <>
            <div>
                <Image 
                        className={`${styles.user_img} m-2`} 
                        src={src} 
                        width={200} 
                        height={200} alt='user' 
                        style={{
                            borderColor: isConnected ? '#27B299': '#7E7E8D',
                            filter: isConnected ? '' : 'grayscale(100%)'
                        }}/>
            </div>
        </>
    );
}