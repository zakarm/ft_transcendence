"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Spinner from 'react-bootstrap/Spinner'
import styles from './styles/authChecker.module.css'

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<{ id: number; username: string }[]>([]);

  useEffect(() => {
    const authentication = async () => {
      const access = Cookies.get('access');
      console.log(access)
      if (access) {
        const response = await fetch('http://localhost:8000/api/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: access })
        });
        if (response.ok) {
          setIsAuthenticated(true);
          const newSocket = new WebSocket(`ws://localhost:8000/ws/user-status?token=${access}`);
          newSocket.addEventListener('open', () => {
            newSocket.send(JSON.stringify({ access: access }));
            newSocket.send(JSON.stringify({ action: 'get_friends' }));
          });
          newSocket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'online_users') {
              setOnlineUsers(data.users);
            } else if (data.type === 'online_notification') {
              setOnlineUsers((prevUsers) => [...prevUsers, data.user]);
            }
          });
          setSocket(newSocket);
        } else {
          setIsAuthenticated(false);
          router.push('/sign-in');
        }
      } else {
        setIsAuthenticated(false);
        router.push('/sign-in');
      }
    };
    authentication();
  }, []);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  if (isAuthenticated === null) {
    return (
      <div className={`${styles.spinnerContainer} ${styles.darkBackground}`}>
        <Spinner animation="border" variant="danger" />
        <p className={`${styles.loadingMessage} valo-font`}>LOADING ...</p>
      </div>
    );
  }

  return isAuthenticated ? (
    <>
      {children}
      <div>
        <h2>Online Users</h2>
        <ul>
          {onlineUsers.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    </>
  ) : null;
};

export default AuthChecker;