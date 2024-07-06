// Web_Socket.ts
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useWebSocket = (url: string) => {
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

export default useWebSocket;
