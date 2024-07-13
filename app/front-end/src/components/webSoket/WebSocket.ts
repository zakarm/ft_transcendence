// Web_Socket.ts
'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// Define the interface for the connection information
interface ConnectionInfo {
  index: number;
  roomName: string;
  user: string;
  user_image: string;
  username: string;
  user1: string;
  user1_image: string;
  username1: string;
  user2: string;
  user2_image: string;
  username2: string;
  table_color: string;
  ball_color: string;
  paddle_color: string;
    table_position: string;
    win_games: number;
    lose_games: number;
    total_games: number;
    scores: number;
    total_minutes: number;
    win_games2: number;
    lose_games2: number;
    total_games2: number;
    scores2: number;
    total_minutes2: number;
}

// Define the hook function with TypeScript
const useWebSocket = (url: string) => {
  const router = useRouter();
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [gameState, setGameState] = useState<string>('lobby');
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo>({
    index: 0,
    roomName: '',
    user: '',
    user_image: '',
    username: '',
    user1: '',
    user1_image: '',
    username1: '',
    user2: '',
    user2_image: '',
    username2: '',
    table_color: '#161625',
    ball_color: '#ffffff',
    paddle_color: '#ff4655',
      table_position: '6,8,0',
    win_games: 0,
    lose_games: 0,
    total_games: 0,
    scores: 0,
      total_minutes: 0,
     win_games2: 0,
    lose_games2: 0,
    total_games2: 0,
    scores2: 0,
    total_minutes2: 0,
  });

  const [countDown, setCountDown] = useState<number>(15);
  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {};

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message.action === 'created') {
        setGameState('lobby');
      }

      if (data.message.action === 'connection_ack') {
        setConnectionInfo((prev: ConnectionInfo) => ({
          ...prev,
          index: data.message.index,
          roomName: data.message.Room_name,
          user: data.message.User,
          user_image: data.message.image_url,
          username: data.message.username,
          table_color: data.message.table_color,
          ball_color: data.message.ball_color,
          paddle_color: data.message.paddle_color,
            table_position: data.message.table_position,
            win_games: data.message.win_games,
            lose_games: data.message.lose_games,
            total_games: data.message.total_games,
            scores: data.message.scores,
            total_minutes: data.message.total_minutes,
        }));
      }

      if (data.message.action === 'opponents') {
        setGameState('opponentFound');
        setConnectionInfo((prev: ConnectionInfo) => ({
          ...prev,
          user1: data.message.user1,
          user1_image: data.message.user1_image_url,
          username1: data.message.user1_username,
          user2: data.message.user2,
          user2_image: data.message.user2_image_url,
            username2: data.message.user2_username,
              win_games: data.message.win_games,
            lose_games: data.message.lose_games,
            total_games: data.message.total_games,
            scores: data.message.scores,
            total_minutes: data.message.total_minutes,
            win_games2: data.message.win_games2,
            lose_games2: data.message.lose_games2,
            total_games2: data.message.total_games2,
            scores2: data.message.scores2,
            total_minutes2: data.message.total_minutes2,
        }));
      }

      if (data.message.action === 'load_game') {
        setGameState('load_game');
      }

      if (data.message.action === 'start_game') {
        setGameState('start_game');
      }
      if (data.message.action === 'reconnected') {
        setGameState('lobby');
      }
      if (data.message.action === 'reconnecting') {
        setGameState('reconnecting');
      }
      if (data.message.action === 'pause') {
        setGameState('pause');
      }
      if (data.message.action === 'countdown') {
        setCountDown(data.message.count);
      }
      if (data.message.action === 'end_game') {
        if (data.message.status === 'winner') setGameState('winner');
        else setGameState('loser');
      }
      if (data.message.action === 'error') {
        router.push('/game');
        toast.error(data.message.error);
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

  return { webSocket, gameState, connectionInfo, countDown };
};

export default useWebSocket;
