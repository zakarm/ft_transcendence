'use client';
import styles from './style.module.css';
import ChatAbout from '@/components/chat_about';
import ChatFriendsResp from '@/components/chat_friend_resp';
import ChatFriends from '@/components/chat_friends';
import ChatMessages from '@/components/chat_messages';
import { useEffect, useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import Spinner from 'react-bootstrap/Spinner';
import { GiAmericanFootballPlayer } from 'react-icons/gi';
import { PiChatsFill } from 'react-icons/pi';
import { toast } from 'react-toastify';

interface Users {
  id: number;
  username: string;
  image_url: string;
  message_waiting: boolean;
}

interface Message {
  chat_id: string;
  message: string;
  sender: string;
  receiver: string;
  timestamp: string;
}

export default function () {
  const chatSocketRef = useRef<WebSocket | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [showAbout, setAbout] = useState(false);
  const [selectedChat, setSelectedChat] = useState<string>('none');
  const [chatUsers, setChatUsers] = useState<Users[]>([]);
  const [fullscreen, setFullscreen] = useState(window.innerWidth <= 768 ? true : false);
  const [newMessage, setNewMessage] = useState<Message | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [me, setMe] = useState<string>('');

  const handleClose = () => setAbout(false);

  const fetchUserMessages = async () => {
    const access = Cookies.get('access');
    if (access) {
      try {
        const csrftoken = Cookies.get('csrftoken') || '';
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/messages`, {
          headers: { Authorization: `Bearer ${access}`, 'X-CSRFToken': csrftoken },
        });

        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        const storedMessages = data.messages
          .map((msg: any) => ({
            chat_id: msg.chat_id.toString(),
            message: msg.message_content,
            sender: msg.sender,
            receiver: msg.receiver,
            timestamp: msg.message_date,
          }))
          .reverse();
        setMessages(storedMessages);
      } catch (error) {
        console.error(`Error : ${error}`);
      }
    } else {
      toast.error('Access token is undefined or falsy');
    }
  };

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
        setMe(data.username);
      } catch (error) {
        // console.error(`Error : ${error}`);
      }
    } else {
      toast.error('Access token is undefined or falsy');
    }
  };

  const startChatting = () => {
    const access = Cookies.get('access');
    if (access) {
      try {
        const newChatSocket = new WebSocket(`${process.env.NEXT_PUBLIC_BACKEND_WS_HOST}/ws/chat/lobby?token=${access}`);

        newChatSocket.onmessage = (e: MessageEvent) => {
          const data = JSON.parse(e.data);
          setNewMessage({
            chat_id: data.chat_id,
            message: data.message,
            sender: data.sender,
            receiver: data.receiver,
            timestamp: data.timestamp,
          });
          if (data.sender !== selectedChat && data.receiver === me) {
            setChatUsers((prevUsers) =>
              prevUsers.map((user) => (user.username === data.sender ? { ...user, message_waiting: true } : user)),
            );
          }
        };

        newChatSocket.onclose = () => {
          // console.error('Chat socket closed');
        };

        chatSocketRef.current = newChatSocket;

        return () => {
          newChatSocket.close();
        };
      } catch (error) {
        console.error(`Error : ${error}`);
      }
    }
  };

  useEffect(() => {
    fetchUserMessages();
  }, []);

  useEffect(() => {
    if (window.innerWidth > 768 && show) setShow(false);
  }, [window.innerWidth]);

  useEffect(() => {
    const usernameParam = searchParams.get('username');
    if (usernameParam) {
      setSelectedChat(usernameParam);
      if (fullscreen) setShow(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (
      newMessage &&
      (messages?.length === 0 || messages?.at(messages.length - 1)?.timestamp !== newMessage?.timestamp) &&
      (newMessage.sender === me || newMessage.receiver === me)
    )
      setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, [newMessage]);

  useEffect(() => {
    fetchSearchUser();

    const handleResize = () => {
      if (window.innerWidth <= 768) setFullscreen(true);
      else setFullscreen(false);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    startChatting();
  }, [me]);

  return (
    <>
      <div className={`row vh-100 p-0 m-0 ${styles.chat_container_}`}>
        <div className="col-xl-4 col-md-6 col-sm-12">
          {fullscreen ? (
            <ChatFriends
              setSelectedChat={setSelectedChat}
              setShow={setShow}
              setAbout={setAbout}
              fullscreen={fullscreen}
              chatUsers={chatUsers}
              setChatUsers={setChatUsers}
              messages={messages}
            />
          ) : (
            <ChatFriendsResp
              setSelectedChat={setSelectedChat}
              setAbout={setAbout}
              setShow={setShow}
              fullscreen={fullscreen}
              chatUsers={chatUsers}
              setChatUsers={setChatUsers}
              messages={messages}
            />
          )}
          &nbsp;
        </div>
        <div className={`col-xl-5 col-md-6 p-0 m-0 ${styles.chat}`}>
          {selectedChat === 'none' ? (
            <div className="vh-100 d-flex flex-column align-items-center justify-content-center border border-dark">
              <div>
                <PiChatsFill className="mx-2" size="1.8em" color="#FF4755" />
              </div>
              <div>
                <span style={{ fontFamily: 'itim', color: 'white' }}>
                  Please chose a conversation to start chatting!
                </span>
              </div>
            </div>
          ) : (
            <ChatMessages
              selectedChat={selectedChat}
              setChatUsers={setChatUsers}
              chatSocketRef={chatSocketRef}
              messages={messages}
            />
          )}
          <Modal
            contentClassName={`${styles.chat_modal}`}
            show={show}
            fullscreen="md-down"
            onHide={() => setShow(false)}
            animation
          >
            <Modal.Header closeButton closeVariant="white"></Modal.Header>
            <ChatMessages
              selectedChat={selectedChat}
              setChatUsers={setChatUsers}
              chatSocketRef={chatSocketRef}
              messages={messages}
            />
          </Modal>
          <Offcanvas className={`${styles.canvas}`} show={showAbout} onHide={handleClose} backdrop={false}>
            <Offcanvas.Body className={`p-0 m-0`}>
              <ChatAbout selectedChat={selectedChat} handleClose={handleClose} />
            </Offcanvas.Body>
          </Offcanvas>
        </div>
        <div className={`${styles.about_container} ${styles.about} col-xl-3 p-0 m-0`}>
          {/* {selectedChat === 'none' ? (
                        <div className="vh-100 d-flex flex-column align-items-center justify-content-center border border-dark">
                            <div>
                                <GiAmericanFootballPlayer className="mx-2" size="2em" color="#FF4755" />
                            </div>
                            <div>
                                <Spinner variant="danger" />
                            </div>
                        </div>
                    ) : ( */}
          <ChatAbout selectedChat={selectedChat} handleClose={handleClose} />
          {/* )} */}
        </div>
      </div>
    </>
  );
}
