'use client';
import { useState, useEffect } from 'react';

export default function Page() {
    const [data, setData] = useState<any>([]);
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws/pingpong/tournament/15151515/?token=dccdcdcd&watch=cjncjs');
        ws.onopen = () => {
            console.log('connected');
        };
        ws.onmessage = (message) => {
            console.log('message', message);
            setData((prev: any) => prev.concat(JSON.parse(message.data)));
        };
        ws.onclose = () => {
            console.log('disconnected');
        };
        return () => {
            ws.close();
        };
    }, []);
    return (
        <div style={{width: "800px", height: "100vh", color :"white"}}>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
