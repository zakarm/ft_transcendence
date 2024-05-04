import React, { createContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface WebSocketContextValue {
  socket: WebSocket | null;
}

export const WebSocketContext = createContext<WebSocketContextValue | null>(null);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const access = Cookies.get('access');
    const newSocket = new WebSocket(`ws://localhost:8000/ws/user-status?token=${access}`);

    newSocket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};