'use client';
import styles from './styles/chat_messages.module.css';
import { InputGroup } from 'react-bootstrap';
import Image from 'next/image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';

import { FaTableTennisPaddleBall } from 'react-icons/fa6';
import { ImUserMinus } from 'react-icons/im';
import { IoIosSend } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import { CgHello } from 'react-icons/cg';

interface Users {
    id: number;
    username: string;
    image_url: string;
    message_waiting: boolean;
}

interface Props {
    selectedChat: string;
    setChatUsers: React.Dispatch<React.SetStateAction<Users[]>>;
    messages: Message[] | undefined;
    chatSocketRef: React.RefObject<WebSocket | null>;
}

interface Friend {
    id: number;
    username: string;
    image_url: string;
    is_online: boolean;
    freindship_id: number;
}

interface User {
    id: number;
    username: string;
    image_url: string;
    is_online: boolean;
}

interface Friends {
    user: User;
    freindship_id: number;
    is_accepted: boolean;
    is_user_from: boolean;
    blocked: boolean;
}

interface Message {
    chat_id: string;
    message: string;
    sender: string;
    receiver: string;
    timestamp: string;
}

export default function ChatMessages({ selectedChat, setChatUsers, messages, chatSocketRef }: Props) {
    const [searchedChat, setSearchedChat] = useState<Friend | undefined>(undefined);
    const chatLogRef = useRef<HTMLDivElement | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [me, setMe] = useState<string>('');

    const fetchSearchUser = async () => {
        const access = Cookies.get('access');
        if (access) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/friends`, {
                    headers: { Authorization: `Bearer ${access}` },
                });

                if (!res.ok) throw new Error('Failed to fetch data');
                const data = await res.json();

                const friendsArray = data.friends.map((friend: Friends) => ({
                    id: friend.user.id,
                    username: friend.user.username,
                    image_url: friend.user.image_url,
                    freindship_id: friend.freindship_id,
                    is_online: friend.user.is_online,
                }));

                const friend = friendsArray.filter((friend: Friend) =>
                    friend.username.toLowerCase().includes(selectedChat.toLowerCase()),
                );
                setSearchedChat(friend.length ? friend[0] : undefined);
                setMe(data.username);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        } else {
            console.log('Access token is undefined or falsy');
        }
    };

    useEffect(() => {
        if (chatLogRef.current) {
            chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
        }
    }, [inputValue]);

    useEffect(() => {
        fetchSearchUser();
    }, [selectedChat]);

    const sendMessage = () => {
        if (inputValue.trim() !== '') {
            chatSocketRef.current?.send(
                JSON.stringify({
                    chat_id: searchedChat?.freindship_id ?? -1,
                    message: inputValue,
                    sender: me,
                    receiver: selectedChat,
                    timestamp: new Date().toISOString(),
                }),
            );
            setChatUsers((prevUsers) =>
                prevUsers.map((user) => (user.username === selectedChat ? { ...user, message_waiting: false } : user)),
            );
            setInputValue('');
        }
    };

    return (
        <>
            {
            (searchedChat === undefined) ? 
            (<div className='vh-100 border border-dark d-flex flex-column align-items-center justify-content-center'>
                <span style={{ fontFamily: 'itim', color: 'white' }}>
                    Chat not available !!
                </span>
            </div>) : (
            <div className="vh-100 d-flex flex-column border border-dark">
                <div
                    className="row p-0 m-0 d-flex justify-content-center "
                    style={{ fontFamily: 'itim', color: '#FFEBEB' }}
                >
                    <div
                        className="col-2 py-3 text-end"
                        style={{ backgroundColor: '#161625', borderBottomLeftRadius: '25px' }}
                    >
                        <Image
                            className={`${styles.chat_img}`}
                            width={200}
                            height={200}
                            src={searchedChat ? searchedChat.image_url : '/Def_pfp.png'}
                            alt="welcome"
                        />
                    </div>
                    <div
                        className="col-5 py-3 d-flex flex-column justify-content-evenly"
                        style={{ backgroundColor: '#161625' }}
                    >
                        <div>
                            <span>{searchedChat ? searchedChat.username : 'unknow'}</span>
                        </div>
                        <div>
                            {searchedChat ? (
                                searchedChat.is_online ? (
                                    <span>Online</span>
                                ) : (
                                    <span>Offline</span>
                                )
                            ) : (
                                <span>Offline</span>
                            )}
                        </div>
                    </div>
                    <div
                        className="col-3 py-3 d-flex align-items-center justify-content-end"
                        style={{ backgroundColor: '#161625', borderBottomRightRadius: '25px' }}
                    >
                        <FaTableTennisPaddleBall className="mx-2" size="1.8em" style={{ cursor: 'pointer' }} />
                        <ImUserMinus className="mx-2" size="1.8em" style={{ cursor: 'pointer' }} />
                    </div>
                </div>
                <div
                    className="flex-grow-1 valo-font d-flex row p-0 m-0 py-3 align-items-end"
                    style={{ overflow: 'auto' }}
                >
                    {(messages && messages.filter((message: Message) => Number(message.chat_id) === searchedChat?.freindship_id ?? -1).length) ? (
                        <div>
                            {messages
                                .filter(
                                    (message: Message) => Number(message.chat_id) === searchedChat?.freindship_id ?? -1,
                                )
                                .map((message, index) => (
                                    <div
                                        className=""
                                        key={index}
                                        style={{ textAlign: message.sender === me ? 'right' : 'left' }}
                                    >
                                        {message.sender === selectedChat ? (
                                            <div className="my-4" style={{ fontFamily: 'itim' }}>
                                                <span
                                                    style={{
                                                        backgroundColor: '#181b20',
                                                        padding: '10px',
                                                        borderRadius: '15px',
                                                    }}
                                                >
                                                    {message.message}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="my-4" style={{ fontFamily: 'itim' }}>
                                                <span
                                                    style={{
                                                        backgroundColor: '#222a38',
                                                        padding: '10px',
                                                        borderRadius: '15px',
                                                    }}
                                                >
                                                    {message.message}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="justify-content-center text-center">
                            Be the first to start this conversation!{' '}
                            <CgHello className="mx-2" size="1.8em" color="#FF4755" />
                        </div>
                    )}
                </div>
                <div
                    className="p-4 mx-2"
                    style={{ backgroundColor: '#181B20', borderTopRightRadius: '25px', borderTopLeftRadius: '25px' }}
                >
                    <InputGroup size="lg" style={{ fontFamily: 'itim' }}>
                        <Form.Control
                            placeholder="Type..."
                            aria-label="Type..."
                            aria-describedby="basic-addon2"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    sendMessage();
                                }
                            }}
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={sendMessage}>
                            <IoIosSend className="mx-2" size="1.8em" color="#FF4755" style={{ cursor: 'pointer' }} />
                        </Button>
                    </InputGroup>
                </div>
            </div>
            )}
        </>
    );
}
