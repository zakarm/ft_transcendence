'use client';
import React, { useEffect, useState } from 'react';
import Web_Socket from '../../../components/webSoket/WebSocket';
import Cookies from 'js-cookie';
import './RemoteMatchGame.css';
import PlayerCard from '@/components/PlayerCard/PlayerCard';
import PongGame from '@/components/PongGame/PongGame';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';


interface Player {
    name: string;
    imageUrl: string;
    stats: {
        adaptation: number;
        agility: number;
        winStreaks: number;
        endurance: number;
        eliteTierRanking: number;
    };
    index: number;
    boxShadowsWinner: boolean;
}

const RemoteMatchGame: React.FC = () => {
    const searchParams = useSearchParams();
    const room = searchParams.get('room');
    const status = room ? true : false;
    const access = Cookies.get('access');
    const { webSocket, gameState, connectionInfo, countDown } = Web_Socket(
        `${process.env.NEXT_PUBLIC_BACKEND_WS_HOST}/ws/pingpong/?token=${access}&private=${status}&room=${room}`,
    );

    const defaultPlayer: Player = {
        name: '',
        imageUrl: '',
        stats: {
            adaptation: 0,
            agility: 0,
            winStreaks: 0,
            endurance: 0,
            eliteTierRanking: 0,
        },
        index: 0,
        boxShadowsWinner: false,
    };

    const [myProfile, setMyProfile] = useState<Player>(defaultPlayer);
    const [opponents, setOpponents] = useState<Player[]>([defaultPlayer, defaultPlayer]);

    useEffect(() => {
        setMyProfile({
            ...myProfile,
            name: connectionInfo.username,
            imageUrl: connectionInfo.user_image,
            stats: {
                adaptation: 80,
                agility: 60,
                winStreaks: 70,
                endurance: 90,
                eliteTierRanking: 75,
            },
        });

        setOpponents([
            {
                ...defaultPlayer,
                name: connectionInfo.username1,
                imageUrl: connectionInfo.user1_image,
                stats: {
                    adaptation: 80,
                    agility: 60,
                    winStreaks: 70,
                    endurance: 90,
                    eliteTierRanking: 75,
                },
                index: 1,
            },
            {
                ...defaultPlayer,
                name: connectionInfo.username2,
                imageUrl: connectionInfo.user2_image,
                stats: {
                    adaptation: 80,
                    agility: 60,
                    winStreaks: 70,
                    endurance: 90,
                    eliteTierRanking: 75,
                },
                index: 2,
            },
        ]);
    }, [connectionInfo]);

    return (
        <div className="Lobby_container">
            {gameState === 'lobby' && (
                <>
                    <PlayerCard {...myProfile} />
                    <div className="blurred-background"></div>
                    <div className="t-text">
                        <div className="search-text">SEARCHING...</div>
                    </div>
                </>
            )}

            {gameState === 'opponentFound' && (
                <>
                    <PlayerCard {...opponents[0]} />
                    <h1 className="vs_key">VS</h1>
                    <PlayerCard {...opponents[1]} />
                </>
            )}
            {(gameState === 'load_game' ||
                gameState === 'start_game' ||
                gameState === 'winner' ||
                gameState === 'loser' ||
                gameState === 'pause' ||
                gameState === 'reconnecting') &&
                webSocket && (
                    <>
                        {gameState === 'load_game' && (
                            <>
                                <div className="blurred-background"></div>
                                <div className="t-text">
                                    <div className="load-text">LOADING...</div>
                                </div>
                            </>
                        )}
                        {gameState === 'winner' && (
                            <>
                                <div className="blurred-background"></div>
                                <div className="t-text">
                                    <div className="winner-text">WINNER</div>
                                    <Link href="/game">
                                        <button className="play-again-button">play again</button>
                                    </Link>
                                    <Link href="/dashboard">
                                        <button className="back-to-home">back to home</button>
                                    </Link>
                                </div>
                            </>
                        )}
                        {gameState === 'loser' && (
                            <>
                                <div className="blurred-background"></div>
                                <div className="t-text">
                                    <div className="loser-text">LOSER</div>
                                    <Link href="/game">
                                        <button className="play-again-button">play again</button>
                                    </Link>
                                    <Link href="/dashboard">
                                        <button className="back-to-home">back to home</button>
                                    </Link>
                                </div>
                            </>
                        )}
                        {gameState === 'pause' && (
                            <>
                                <div className="blurred-background"></div>
                                <div className="t-text">
                                    <div className="pause-text">PAUSED</div>
                                    <div className="pause-text">{countDown}</div>
                                </div>
                            </>
                        )}
                        {gameState === 'reconnecting' && (
                            <>
                                <div className="blurred-background"></div>
                                <div className="t-text">
                                    <div className="reconnect-text">RECONNECTING...</div>
                                    <div className="reconnect-text">{countDown}</div>
                                </div>
                            </>
                        )}
                        <PongGame webSocket={webSocket} connectionInfo={connectionInfo} players={opponents} />
                    </>
                )}
        </div>
    );
};

export default RemoteMatchGame;
