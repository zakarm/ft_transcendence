// Web_Socket.ts
'use client';
import { useEffect, useState } from 'react';
import type {
    TournamentData,
    TournamentData_Match,
    LocalTournamentProps,
    TournamentData_User,
    Tournament_User,
} from '@/types/game/Tournament';
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
}
const initialUser = {
    name: '',
    photoUrl: '',
    score: 0,
    status: true,
};

const initialMatch = {
    user1: { ...initialUser },
    user2: { ...initialUser },
};
const initialMatchFinal = {
    user1: { ...initialUser },
};

const initialRound = [{ ...initialMatch }, { ...initialMatch }];

const initialTournamentData = {
    TournamentName: 'Local Tournament',
    difficulty: '0',
    side1: {
        index: 1,
        quarterfinals: [...initialRound],
        semifinals: [{ ...initialMatch }],
        finals: [{ ...initialMatchFinal }],
    },
    side2: {
        index: 2,
        quarterfinals: [...initialRound],
        semifinals: [{ ...initialMatch }],
        finals: [{ ...initialMatchFinal }],
    },
};

// Define the hook function with TypeScript
const useWebSocketTournament = (url: string) => {
    const router = useRouter();
    const [filteredTournamentData, setFilteredTournamentData] = useState<TournamentData>(initialTournamentData);
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
    });

    const [countDown, setCountDown] = useState<number>(15);
    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            console.log('-> Connected to WebSocket');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('-> Message from WebSocket', data.message.action);
            if (data.message.action === 'created') {
                console.log('-> Room Created', data.message);
                setGameState('lobby');
            }
            if (data.message.action === 'TournamentData') {
                console.log('-> TournamentData', data.message);
            setFilteredTournamentData((prevState: any) => ({
                ...prevState,
                TournamentName: data.message.tournamentdata.tournament_name,
                difficulty: data.message.tournamentdata.difficulty,
                side1: {
                    ...prevState.side1,
                    quarterfinals: [
                        data.message.tournamentdata.quarter_final.match1 as TournamentData_Match,
                        data.message.tournamentdata.quarter_final.match2 as TournamentData_Match,
                    ],
                    semifinals: [data.message.tournamentdata.semi_final.match1 as TournamentData_Match],
                    finals: [
                        {
                            ...prevState.side1.finals[0],
                            user1: data.message.tournamentdata.final.match1.user1 as TournamentData_User,
                        },
                    ],
                },
                side2: {
                    ...prevState.side2,
                    quarterfinals: [
                        data.message.tournamentdata.quarter_final.match3 as TournamentData_Match,
                        data.message.tournamentdata.quarter_final.match4 as TournamentData_Match,
                    ],
                    semifinals: [data.message.tournamentdata.semi_final.match2 as TournamentData_Match],
                    finals: [
                        {
                            ...prevState.side2.finals[0],
                            user1: data.message.tournamentdata.final.match1.user2 as TournamentData_User,
                        },
                    ],
                },
            }));
                setGameState('TournamentLobby');
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
                }));
                console.log('-> Connection Acknowledged', data.message);
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
                }));
                console.log('-> opponents', data.message);
                console.log('-> connectionInfo', connectionInfo);
            }

            if (data.message.action === 'load_game') {
                setGameState('load_game');
                console.log('-> load_game', data.message);
            }

            if (data.message.action === 'start_game') {
                setGameState('start_game');
                console.log('-> start_game', data.message);
            }
            if (data.message.action === 'reconnected') {
                setGameState('lobby');
                console.log('-> reconnected', data.message);
            }
            if (data.message.action === 'reconnecting') {
                setGameState('reconnecting');
                console.log('-> reconnecting', data.message);
            }
            if (data.message.action === 'pause') {
                setGameState('pause');
                console.log('-> pause', data.message);
            }
            if (data.message.action === 'countdown') {
                setCountDown(data.message.count);
                console.log('-> pause', data.message);
            }
            if (data.message.action === 'end_game') {
                if (data.message.status === 'winner') setGameState('winner');
                else setGameState('loser');
                console.log('-> end_game', data.message);
            }
        };

        ws.onclose = () => {
            router.back();
            console.log('Disconnected from WebSocket');
        };

        setWebSocket(ws);

        return () => {
            ws.close();
        };
    }, [url]);

    return { webSocket, gameState, connectionInfo, countDown, filteredTournamentData};
};

export default useWebSocketTournament;
