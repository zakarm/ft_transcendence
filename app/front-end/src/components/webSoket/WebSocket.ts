// Web_Socket.ts
"use client";
import { useEffect, useState } from "react";

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
}

// Define the hook function with TypeScript
const useWebSocket = (url: string) => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [gameState, setGameState] = useState<string>("lobby");
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo>({
    index: 0,
    roomName: "",
    user: "",
    user_image: "",
    username: "",
    user1: "",
    user1_image: "",
    username1: "",
    user2: "",
    user2_image: "",
    username2: "",
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
		setConnectionInfo((prev: ConnectionInfo) => ({
			...prev,
			index: data.message.index,
			roomName: data.message.Room_name,
			user: data.message.User,
			user_image: data.message.image_url,
			username: data.message.username,
		}));
        console.log("-> Connection Acknowledged", data.message);
      }

      if (data.message.action === "opponents") {
        setGameState("opponentFound");
		setConnectionInfo((prev: ConnectionInfo) => ({
			...prev,
			user1: data.message.user1,
			user1_image: data.message.user1_image_url,
			username1: data.message.user1_username,
			user2: data.message.user2,
			user2_image: data.message.user2_image_url,
			username2: data.message.user2_username,
		}));
        console.log("-> opponents", data.message);
      }

      if (data.message.action === "load_game") {
        setGameState("load_game");
      }

      if (data.message.action === "start_game") {
        setGameState("start_game");
      }
      if (data.message.action === "reconnected") {
        setGameState("start_game");
      }
      if (data.message.action === "reconnecting") {
        setGameState("reconnecting");
	  }
		if (data.message.action === "pause") {
      setGameState("pause");
    }
      if (data.message.action === "end_game") {
        if (data.message.status === "winner") setGameState("winner");
        else setGameState("loser");
        console.log(data.message);
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
