import Image from 'next/image';
import styles from './styles/user.module.css'
import React from "react";
import UserChatResp from './user_chat_resp';
import UserChat from './user_chat';

interface UserProps{
    id: number;
    src: string;
    isConnected: boolean;
    handleChat: (username: string) => void;
    handleShow: () => void;
    handleAbout: () => void;
    username: string;
    fullscreen: boolean;
    setFriendsChat: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
}

export default function User({ id, src, isConnected, handleChat, username, handleAbout, fullscreen, setFriendsChat , handleShow }: UserProps) {

    const updateChat = () => {
        handleChat(username);

        const newFriendComponent = (
            <div key={id}>
                {
                    (fullscreen) ? 
                    (<UserChat handleChat={handleChat} username={username} image_url={src} handleShow={handleShow} handleAbout={handleAbout} />) :
                    (<UserChatResp  username={username} image_url={src} handleChat={handleChat} handleAbout={handleAbout} handleShow={handleShow}/>)
                }
            </div>
        );

        setFriendsChat((prevFriendsChat: JSX.Element[]) => [newFriendComponent, ...prevFriendsChat.filter(element => Number(element.key) !== id)]);
    }

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
