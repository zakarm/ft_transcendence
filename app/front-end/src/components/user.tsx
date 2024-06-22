import Image from 'next/image';
import styles from './styles/user.module.css'
import React, { useEffect } from "react";
import UserChatResp from './user_chat_resp';
import UserChat from './user_chat';

interface Users {
    id: number;
    username: string;
    image_url: string;
    message_waiting: boolean;
  }

interface UserProps{
    id: number;
    src: string;
    isConnected: boolean;
    handleChat: (username: string) => void;
    handleShow: () => void;
    handleAbout: () => void;
    username: string;
    last_message: string;
    time: string;
    fullscreen: boolean;
    waiting_msg: boolean;
    setFriendsChat: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
    setChatUsers: React.Dispatch<React.SetStateAction<Users[]>>;
}

export default function User({ id, src, isConnected, handleChat, username, last_message, time, handleAbout, fullscreen, setFriendsChat , handleShow, waiting_msg, setChatUsers }: UserProps) {

    const formatDate = (timestamp: string): string => {

        if (timestamp === 'now')
            return timestamp;

        const date = new Date(timestamp);
        const now = new Date();
    
        // Check if the date is today
        if (date.toDateString() === now.toDateString()) {
            // Format as HH:mm for today's messages
            return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
        }
    
        // Check if the date is yesterday
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        if (date.toDateString() === yesterday.toDateString()) {
            // Format as "Yesterday, HH:mm" for yesterday's messages
            return `Yesterday, ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
        }
    
        // Otherwise, format as "DD/MM/YYYY, HH:mm"
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        const time = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
        return `${day}/${month}/${year}, ${time}`;
    }

    const updateChat = () => {
        handleChat(username);

        const newFriendComponent = (
            <div key={id}>
                {
                    (fullscreen) ? 
                    (<UserChat handleChat={handleChat} username={username} last_message={last_message} time={formatDate(time)} image_url={src} handleShow={handleShow} handleAbout={handleAbout} waiting_msg={waiting_msg} setChatUsers={setChatUsers} />) :
                    (<UserChatResp  username={username} last_message={last_message} time={formatDate(time)} image_url={src} handleChat={handleChat} handleAbout={handleAbout} setChatUsers={setChatUsers} waiting_msg={waiting_msg} />)
                }
            </div>
        );

        setFriendsChat((prevFriendsChat: JSX.Element[]) => [newFriendComponent, ...prevFriendsChat.filter(element => Number(element.key) !== id)]);
    }

    useEffect(() => {
        if (waiting_msg){
            const newFriendComponent = (
                <div key={id}>
                    {
                        (fullscreen) ? 
                        (<UserChat handleChat={handleChat} username={username} last_message={last_message} time={formatDate(time)} image_url={src} handleShow={handleShow} handleAbout={handleAbout} setChatUsers={setChatUsers} waiting_msg={waiting_msg} />) :
                        (<UserChatResp  username={username} last_message={last_message} time={formatDate(time)} image_url={src} handleChat={handleChat} handleAbout={handleAbout} setChatUsers={setChatUsers} waiting_msg={waiting_msg} />)
                    }
                </div>
            );
    
            setFriendsChat((prevFriendsChat: JSX.Element[]) => [newFriendComponent, ...prevFriendsChat.filter(element => Number(element.key) !== id)]);
        }
    }, [waiting_msg]);

    return (
        <>
            <div className='d-flex flex-column align-items-center justify-content-center' onClick={updateChat}>
                <Image
                    className={`${styles.user_img} m-2`}
                    src={src}
                    width={200}
                    height={200} alt='user'
                    style={{
                        borderColor: isConnected ? '#27B299' : '#7E7E8D',
                        filter: isConnected ? '' : 'grayscale(100%)'
                    }} />
                <p style={{color: 'white', fontFamily: 'itim'}}>{username}</p>
            </div>
        </>
    );
}
