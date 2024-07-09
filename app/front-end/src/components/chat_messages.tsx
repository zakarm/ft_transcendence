'use client';
import styles from './styles/chat_messages.module.css';
import { InputGroup } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';

import { FaTableTennisPaddleBall } from 'react-icons/fa6';
import { IoIosSend } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import { CgHello } from 'react-icons/cg';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';
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

const Web_Socket = (url: string) => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  const router = useRouter();
  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {};

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message.action === 'generated') {
        router.push(`/game/RemoteMatchGame/?${data.message.roomName}`);
      }
    };

    ws.onclose = () => {
      // setWebSocket(null);
    };
    setWebSocket(ws);
    return () => {
      ws.close();
    };
  }, [url]);

  return webSocket;
};

export default function ChatMessages({ selectedChat, setChatUsers, messages, chatSocketRef }: Props) {
  const [searchedChat, setSearchedChat] = useState<Friend | undefined>(undefined);
  const chatLogRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [myId, setMyId] = useState<number>(-1);
  const [me, setMe] = useState<string>('');
  const [hello, setHello] = useState<boolean>(true);

  const fetchSearchUser = async () => {
    const access = Cookies.get('access');
    if (access) {
      try {
        const csrftoken = Cookies.get('csrftoken') || '';
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/friends`, {
          headers: { Authorization: `Bearer ${access}`, 'X-CSRFToken': csrftoken },
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
        setMyId(data.id);
      } catch (error) {
        console.error(`Error : ${error}`);
      }
    } else {
      toast.error('Access token is undefined or falsy');
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

  useEffect(() => {
    const messageBody = document.querySelector('#test');
    if (messageBody) {
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }
  }, [messages, searchedChat]);

  // WebSocket initialization
  const SocketRef = useRef<WebSocket | null>(null);
  const router = useRouter();

  // Function to handle private game WebSocket connection
  const handlePrivateGame = () => {
    if (searchedChat) {
      const access = Cookies.get('access');
      if (access) {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_WS_HOST}/ws/pingpong/private/?token=${access}&private=${
          myId + '_' + searchedChat.id
        }`;
        const ws = new WebSocket(url);
        ws.onopen = () => {
          console.log('WebSocket connection established');
        };
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.message.action === 'generated') {
            router.push(`/game/RemoteMatchGame/?room=${data.message.room_name}`);
          }
        };
        ws.onclose = () => {};
        return () => {
          ws.close();
        };
      }
    }
  };

  return (
    <>
      {searchedChat === undefined ? (
        <div className="vh-100 border border-dark d-flex flex-column align-items-center justify-content-center">
          <span style={{ fontFamily: 'itim', color: 'white' }}>Chat not available !!</span>
        </div>
      ) : (
        <div className="vh-100 d-flex flex-column border border-dark">
          <div className="row p-0 m-0 d-flex justify-content-center " style={{ fontFamily: 'itim', color: '#FFEBEB' }}>
            <div className="col-2 py-3 text-end" style={{ backgroundColor: '#161625', borderBottomLeftRadius: '25px' }}>
              <img
                className={`${styles.chat_img}`}
                width={200}
                height={200}
                src={searchedChat ? searchedChat.image_url : '/assets/images/gameProfiles/default_profile.png'}
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
              <FaTableTennisPaddleBall
                className="mx-2"
                size="1.8em"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePrivateGame()}
              />
            </div>
          </div>
          <div
            className="flex-grow-1 valo-font d-flex row p-0 m-0 py-3 align-items-end"
            style={{ overflowY: 'auto' }}
            id="test"
            onChange={() => setHello(!hello)}
          >
            {messages &&
            messages.filter((message: Message) => Number(message.chat_id) === searchedChat?.freindship_id ?? -1)
              .length ? (
              <div>
                {messages
                  .filter((message: Message) => Number(message.chat_id) === searchedChat?.freindship_id ?? -1)
                  .map((message, index) => (
                    <div className="" key={index} style={{ textAlign: message.sender === me ? 'right' : 'left' }}>
                      {message.sender === selectedChat ? (
                        <div className="d-flex flex-column align-items-start " style={{ fontFamily: 'itim' }}>
                          <p
                            style={{
                              backgroundColor: '#181b20',
                              padding: '10px',
                              borderRadius: '15px',
                              wordBreak: 'break-word',
                              maxWidth: '50%',
                            }}
                          >
                            {message.message}
                          </p>
                        </div>
                      ) : (
                        <div className="d-flex flex-column align-items-end " style={{ fontFamily: 'itim' }}>
                          <p
                            style={{
                              backgroundColor: '#222a38',
                              padding: '10px',
                              borderRadius: '15px',
                              textAlign: 'left',
                              wordBreak: 'break-word',
                              maxWidth: '50%',
                            }}
                          >
                            {message.message}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <div className="justify-content-center text-center">
                Be the first to start this conversation! <CgHello className="mx-2" size="1.8em" color="#FF4755" />
              </div>
            )}
          </div>
          <div
            className="p-4"
            style={{
              backgroundColor: '#181B20',
              borderTopRightRadius: '25px',
              borderTopLeftRadius: '25px',
            }}
          >
            <InputGroup className="row p-0 m-0" style={{ fontFamily: 'itim' }}>
              <textarea
                className="col-9"
                placeholder="Type..."
                aria-label="Type..."
                aria-describedby="basic-addon2"
                maxLength={512}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    sendMessage();
                  }
                }}
              />
              <Button className="col-3" variant="outline-secondary" id="button-addon2" onClick={sendMessage}>
                <IoIosSend className="mx-2" size="1.8em" color="#FF4755" style={{ cursor: 'pointer' }} />
              </Button>
            </InputGroup>
          </div>
        </div>
      )}
    </>
  );
}
