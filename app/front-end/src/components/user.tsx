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
    fullscreen: boolean;
    waiting_msg: boolean;
    setFriendsChat: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
    setChatUsers: React.Dispatch<React.SetStateAction<Users[]>>;
}

export default function User({ id, src, isConnected, handleChat, username, handleAbout, fullscreen, setFriendsChat , handleShow, waiting_msg, setChatUsers }: UserProps) {

    const updateChat = () => {
        handleChat(username);

        const newFriendComponent = (
            <div key={id}>
                {
                    (fullscreen) ? 
                    (<UserChat handleChat={handleChat} username={username} image_url={src} handleShow={handleShow} handleAbout={handleAbout} waiting_msg={waiting_msg} setChatUsers={setChatUsers} />) :
                    (<UserChatResp  username={username} image_url={src} handleChat={handleChat} handleAbout={handleAbout} setChatUsers={setChatUsers} waiting_msg={waiting_msg} />)
                }
            </div>
        );

        setFriendsChat((prevFriendsChat: JSX.Element[]) => [newFriendComponent, ...prevFriendsChat.filter(element => Number(element.key) !== id)]);
    }

    useEffect(() => {
        const newFriendComponent = (
            <div key={id}>
                {
                    (fullscreen) ? 
                    (<UserChat handleChat={handleChat} username={username} image_url={src} handleShow={handleShow} handleAbout={handleAbout} setChatUsers={setChatUsers} waiting_msg={waiting_msg} />) :
                    (<UserChatResp  username={username} image_url={src} handleChat={handleChat} handleAbout={handleAbout} setChatUsers={setChatUsers} waiting_msg={waiting_msg} />)
                }
            </div>
        );

        setFriendsChat((prevFriendsChat: JSX.Element[]) => [newFriendComponent, ...prevFriendsChat.filter(element => Number(element.key) !== id)]);
    }, [waiting_msg]);

    return (
        <>
            <div onClick={updateChat}>
                <Image
                    className={`${styles.user_img} m-2`}
                    src={src}
                    width={200}
                    height={200} alt='user'
                    style={{
                        borderColor: isConnected ? '#27B299' : '#7E7E8D',
                        filter: isConnected ? '' : 'grayscale(100%)'
                    }} />
            </div>
        </>
    );
}
