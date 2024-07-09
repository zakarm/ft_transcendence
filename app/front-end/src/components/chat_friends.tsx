'use client';
import styles from './styles/chat_friends.module.css';
import { InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import User from './user';
import { CiSearch } from 'react-icons/ci';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import UserChatResp from './user_chat_resp';
import UserChat from './user_chat';

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

interface User {
  id: number;
  username: string;
  image_url: string;
  message_waiting: boolean;
}

interface Friend_ {
  user: User;
  is_accepted: boolean;
  is_user_from: boolean;
  blocked: boolean;
}

interface LastMesg {
  username: string;
  message: string;
  time: string;
}

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setAbout: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedChat: React.Dispatch<React.SetStateAction<string>>;
  setChatUsers: React.Dispatch<React.SetStateAction<Users[]>>;
  fullscreen: boolean;
  chatUsers: Users[];
  messages: Message[];
}

export default function ChatFriends({
  setSelectedChat,
  setShow,
  setAbout,
  setChatUsers,
  fullscreen,
  chatUsers,
  messages,
}: Props) {
  const [friendsData, setFriendsData] = useState<JSX.Element[]>([]);
  const [friendsChat, setFriendsChat] = useState<JSX.Element[]>([]);
  const [usersLastMessage, setUsersLastMessage] = useState<LastMesg[]>([]);
  const [search, setSearch] = useState<string>('');

  const handleAbout = () => setAbout(true);
  const handleShow = () => setShow(true);
  const handleChat = (username: string) => setSelectedChat(username);

  const fetchUsersData = async () => {
    const access = Cookies.get('access');
    if (access) {
      try {
        const csrftoken = Cookies.get('csrftoken') || '';
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/friends`, {
          headers: { Authorization: `Bearer ${access}`, 'X-CSRFToken': csrftoken },
        });

        if (!res.ok) throw new Error('Failed to fetch data');

        const data = await res.json();

        const friendsArray = data.friends.map((friend: Friend_) => ({
          id: friend.user.id,
          username: friend.user.username,
          image_url: friend.user.image_url,
          message_waiting: false,
        }));
        setChatUsers(friendsArray);
      } catch (error) {
        console.error(`Error : ${error}`);
      }
    } else {
      toast.error('Access token is undefined or falsy');
    }
  };

  const generateUserComponents = (users: User[]) => {
    return users.map((friend: User) => (
      <div key={friend.id}>
        <User
          id={friend.id}
          src={friend.image_url}
          isConnected={true}
          username={friend.username}
          handleChat={handleChat}
          setFriendsChat={setFriendsChat}
          handleAbout={handleAbout}
          handleShow={handleShow}
          fullscreen={fullscreen}
          waiting_msg={friend.message_waiting}
          setChatUsers={setChatUsers}
          last_message={
            usersLastMessage.filter((msg: LastMesg) => msg.username === friend.username).at(0)?.message ??
            'Start Chatting :}'
          }
          time={usersLastMessage.filter((msg: LastMesg) => msg.username === friend.username).at(0)?.time ?? 'now'}
        />
      </div>
    ));
  };

  const formatDate = (timestamp: string): string => {
    if (timestamp === 'now') return timestamp;

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
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  useEffect(() => {
    const newMessages = chatUsers
      .map((friend: User) => {
        const lastMessage = messages
          .filter((msg: Message) => msg.receiver === friend.username || msg.sender === friend.username)
          .at(-1);
        return lastMessage
          ? { username: friend.username, message: lastMessage.message, time: lastMessage.timestamp }
          : null;
      })
      .filter((msg): msg is LastMesg => msg !== null);

    setUsersLastMessage(newMessages);
  }, [messages]);

  useEffect(() => {
    if (search.length > 2) {
      const filteredUsers = chatUsers.filter((friend: User) =>
        friend.username.toLowerCase().includes(search.toLowerCase()),
      );
      setFriendsData(generateUserComponents(filteredUsers));
    } else {
      // Reset to all users if search length is 2 or less
      setFriendsData(generateUserComponents(chatUsers));
    }
  }, [search, usersLastMessage]);

  return (
    <>
      <div className="d-flex flex-column vh-100">
        <div className="">
          <div className={`${styles.welcome}`}>
            <span className={`d-flex flex-column p-2 text-center valo-font`}>
              <span className="display-5" style={{ color: '#FF4755' }}>
                GAME HUB
              </span>
              <span className="h2" style={{ color: '#FFEBEB' }}>
                LET'S CHAT
              </span>
              <span className="h2" style={{ color: '#FFEBEB' }}>
                & PLAY
              </span>
            </span>
          </div>
          <div className={`mx-3 mb-2`}>
            <InputGroup size="lg">
              <InputGroup.Text style={{ backgroundColor: '#2C3143' }}>
                <CiSearch color="#FFEBEB" />
              </InputGroup.Text>
              <Form.Control
                className={`${styles.form_control}`}
                type="text"
                color="red"
                aria-label="search"
                id="search"
                placeholder="Enter for search..."
                style={{ backgroundColor: '#2C3143' }}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className={`${styles.usr_container} d-flex overflow-auto`}>{friendsData}</div>
          <hr className="mt-1" style={{ color: '#FFEBEB', borderWidth: '2px' }} />
        </div>
        <div className={`${styles.chat_container} p-2 flex-grow-1`}>
          {chatUsers &&
            chatUsers.map((friend: User) => (
              <div key={friend.id}>
                {fullscreen ? (
                  <UserChat
                    username={friend.username}
                    image_url={friend.image_url}
                    waiting_msg={friend.message_waiting}
                    handleChat={handleChat}
                    handleShow={handleShow}
                    handleAbout={handleAbout}
                    setChatUsers={setChatUsers}
                    last_message={
                      usersLastMessage.filter((msg: LastMesg) => msg.username === friend.username).at(0)?.message ??
                      'Start Chatting :}'
                    }
                    time={formatDate(
                      usersLastMessage.filter((msg: LastMesg) => msg.username === friend.username).at(0)?.time ?? 'now',
                    )}
                  />
                ) : (
                  <UserChatResp
                    username={friend.username}
                    image_url={friend.image_url}
                    waiting_msg={friend.message_waiting}
                    handleChat={handleChat}
                    handleAbout={handleAbout}
                    setChatUsers={setChatUsers}
                    last_message={
                      usersLastMessage.filter((msg: LastMesg) => msg.username === friend.username).at(0)?.message ??
                      'Start Chatting :}'
                    }
                    time={formatDate(
                      usersLastMessage.filter((msg: LastMesg) => msg.username === friend.username).at(0)?.time ?? 'now',
                    )}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
