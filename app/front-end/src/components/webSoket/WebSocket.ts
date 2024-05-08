// Web_Socket.ts
"use client";
import { useEffect, useState } from "react";

// Define the interface for the connection information
interface ConnectionInfo {
  index: number;
  roomName: string;
  user1: string;
  user2: string;
}

// Define the hook function with TypeScript
const useWebSocket = (url: string) => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [gameState, setGameState] = useState<string>("lobby");
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo>({
    index: 0,
    roomName: "",
    user1: "",
    user2: "",
  });

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("-> Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.message.action === "created") {
        setGameState("lobby");
      }

		if (data.message.action === "connection_ack") {
      setConnectionInfo((prev: any) => ({
        ...prev,
        index: data.message.index,
        roomName: data.message.Room_name,
        user1: data.message.User,
      }));
    }

      if (data.message.action === "opponents") {
        setGameState("opponentFound");
        setConnectionInfo((prev: any) => ({
          ...prev,
          user2: data.message.User2,
        }));
      }

      if (data.message.action === "load_game") {
        setGameState("load_game");
      }

      if (data.message.action === "start_game") {
        setGameState("start_game");
      }
      if (data.message.action === "reconected") {
        setGameState("start_game");
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    setWebSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  return { webSocket, gameState, connectionInfo };
};

export default useWebSocket;
