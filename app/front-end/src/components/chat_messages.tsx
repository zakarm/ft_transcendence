"use client";
import styles from './styles/chat_messages.module.css';
import { InputGroup } from 'react-bootstrap';
import Image from 'next/image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';

import { FaTableTennisPaddleBall } from 'react-icons/fa6';
import { ImUserMinus } from 'react-icons/im';
import { IoIosSend } from "react-icons/io";
import { useEffect, useRef, useState } from 'react';

import { CgHello } from "react-icons/cg";

interface Props{
  selectedChat: string;
}

interface User {
  id: number;
  username: string;
  image_url: string;
  is_online: number;
}

interface Message{
  text: string;
  user: string;
}

export default function ChatMessages( { selectedChat }: Props ) {

  const [searchedChat, setSearchedChat] = useState<User | undefined>(undefined);
  const chatLogRef = useRef<HTMLDivElement | null>(null);
  const chatSocketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const fetchSearchUser = async () => {
    const access = Cookies.get('access');
    if (access) {
      try {
        const res = await fetch('http://localhost:8000/api/user-search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
          },
          body: JSON.stringify({ username_search: selectedChat })
        });

        if (!res.ok)
          throw new Error('Failed to fetch data');

        const data = await res.json();
        console.log('Fetched data:', data);

        if (Array.isArray(data) && data.length > 0) {
          const user = data[0];
          setSearchedChat({
            id: user.id,
            username: user.username,
            image_url: user.image_url,
            is_online: user.is_online
          });
        } else {
          setSearchedChat(undefined);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    } else {
      console.log('Access token is undefined or falsy');
    }
  }

    useEffect(() => {
      const chatSocket = new WebSocket(`ws://127.0.0.1:8080/ws/chat/lobby/`);
    
      chatSocket.onmessage = (e: MessageEvent) => {
        const data = JSON.parse(e.data);
        setMessages((prevMessages) => [...prevMessages, {text: data.message, user: data.user}]);
      };
    
      chatSocket.onclose = () => {
        console.error('Chat socket closed unexpectedly');
      };
    
      chatSocketRef.current = chatSocket;
    
      return () => {
        chatSocket.close();
      };
    }, []);
  
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
        chatSocketRef.current?.send(JSON.stringify({ 'message': inputValue, 'user': selectedChat }));
        setInputValue('');
      }
    };

  return (
      <>
        <div className='vh-100 d-flex flex-column border border-dark' >
          <div className='row p-0 m-0 d-flex justify-content-center ' style={{fontFamily: 'itim', color: '#FFEBEB'}}>
              <div className='col-2 py-3 text-end' style={{backgroundColor: '#161625', borderBottomLeftRadius: '25px'}}>
                  <Image className={`${styles.chat_img}`} width={200} height={200} src={(searchedChat) ? searchedChat.image_url : '/Def_pfp.png'} alt='welcome'/>
              </div>
              <div className='col-5 py-3 d-flex flex-column justify-content-evenly' style={{backgroundColor: '#161625'}}>
                <div><span>{(searchedChat) ? searchedChat.username : 'unknow'}</span></div>
                <div>
                  {
                    (searchedChat) ?
                    ((searchedChat.is_online) ? (<span>Online</span>) : (<span>Offline</span>)) :
                    ((<span>Offline</span>))
                  }
                  </div>
              </div>
              <div className='col-3 py-3 d-flex align-items-center justify-content-end' style={{backgroundColor: '#161625', borderBottomRightRadius: '25px'}}>
                <FaTableTennisPaddleBall className='mx-2' size='1.8em' style={{cursor: 'pointer'}}/>
                <ImUserMinus className='mx-2' size='1.8em' style={{cursor: 'pointer'}}/>
              </div>
          </div>
          
          <div className='flex-grow-1 valo-font d-flex row p-0 m-0 py-3 align-items-end' style={{overflow: 'auto'}}>
            {
              (messages.length) ? 
              (
                <div>
                  {messages.map((message, index) => (
                    <div className='' key={index} style={{ textAlign: (message.user === selectedChat) ? 'right' : 'left' }}>
                      {
                        (message.user === selectedChat) ?
                        (
                          <div className='my-4' style={{fontFamily: 'itim'}}>
                            <span style={{backgroundColor: '#181b20', padding: '10px', borderRadius: '15px'}}>{message.text}</span>
                          </div>
                        ) :
                        (
                          <div className='my-4' style={{fontFamily: 'itim'}}>
                            <span style={{backgroundColor: '#222a38', padding: '10px', borderRadius: '15px'}}>{message.text}</span>
                          </div>
                        )
                      }
                    </div>
                  ))}
                </div>
              ) : 
              (<div className='justify-content-center text-center'>Be the first to start this conversation! <CgHello className='mx-2' size='1.8em' color='#FF4755'/></div>)
            }
          </div>
          <div className='p-4 mx-2' style={{backgroundColor: '#181B20', borderTopRightRadius: '25px', borderTopLeftRadius: '25px'}}> 
            <InputGroup size="lg" style={{fontFamily: 'itim'}}>
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
                <IoIosSend className='mx-2' size='1.8em' color='#FF4755' style={{cursor: 'pointer'}}/>
              </Button>
            </InputGroup>
          </div>
        </div>
      </>
  );
}
