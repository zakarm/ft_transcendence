'use client';

import React, { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import Cookies from 'js-cookie';

interface WebSocketContextValue {
  socket: WebSocket | null;
  isLoading: boolean;
}

interface WebSocketProviderProps {
  children: ReactNode;
}

const WebSocketContext = createContext<WebSocketContextValue>({
  socket: null,
  isLoading: true,
});

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const access = Cookies.get('access');
    const newSocket = new WebSocket(`${process.env.NEXT_PUBLIC_BACKEND_WS_HOST}/ws/user_data?token=${access}`);
    newSocket.onopen = () => {
      setIsLoading(false);
    };
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return <WebSocketContext.Provider value={{ socket, isLoading }}>{children}</WebSocketContext.Provider>;
};

export const useGlobalContext = () => useContext(WebSocketContext);
