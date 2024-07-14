'use client';
import React, { useEffect, useState } from 'react';
import Web_Socket from '../../../components/webSoket/WebSocketTournament';
import Cookies from 'js-cookie';
import './TournamentPage.css';
import PlayerCard from '@/components/PlayerCard/PlayerCard';
import PongGame from '@/components/PongGame/PongGame';
import { usePathname } from 'next/navigation';
import TournamentLobby from '../(tournamet-lobby)/TournamentLobby';
import Link from 'next/link';

interface Player {
  name: string;
  imageUrl: string;
  stats: {
    win_games: number;
    lose_games: number;
    total_games: number;
    scores: number;
    total_minutes: number;
  };
  index: number;
  boxShadowsWinner: boolean;
}

const TournamentPage: React.FC = () => {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const access = Cookies.get('access');
  const { webSocket, gameState, connectionInfo, countDown, filteredTournamentData, winner } = Web_Socket(
    `${process.env.NEXT_PUBLIC_BACKEND_WS_HOST}/ws/pingpong/tournament/${id}/?token=${access}&watch=false`,
  );

  const defaultPlayer: Player = {
    name: '',
    imageUrl: '',
    stats: {
      win_games: 0,
      lose_games: 0,
      total_games: 0,
      scores: 0,
      total_minutes: 0,
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
        win_games: connectionInfo.win_games,
        lose_games: connectionInfo.lose_games,
        total_games: connectionInfo.total_games,
        scores: connectionInfo.scores,
        total_minutes: connectionInfo.total_minutes,
      },
    });

    setOpponents([
      {
        ...defaultPlayer,
        name: connectionInfo.username1,
        imageUrl: connectionInfo.user1_image,
        stats: {
            win_games: connectionInfo.win_games,
            lose_games: connectionInfo.lose_games,
            total_games: connectionInfo.total_games,
            scores: connectionInfo.scores,
            total_minutes: connectionInfo.total_minutes,
        },
        index: 1,
        boxShadowsWinner: false,
      },
      {
        ...defaultPlayer,
        name: connectionInfo.username2,
        imageUrl: connectionInfo.user2_image,
        stats: {
            win_games: connectionInfo.win_games2,
            lose_games: connectionInfo.lose_games2,
            total_games: connectionInfo.total_games2,
            scores: connectionInfo.scores2,
            total_minutes: connectionInfo.total_minutes2,
        },
        index: 2,
        boxShadowsWinner: false,
      },
    ]);
  }, [connectionInfo]);

  return (
    <div className="Lobby_container">
      {(gameState === 'TournamentLobby' || gameState === 'winnerpage' || gameState === 'lobby') && (
        <>
          <TournamentLobby {...filteredTournamentData} />
          {gameState === 'lobby' && (
            <>
              <div className="blurred-background"></div>
              <div className="t-text">
                <div className="search-text">SEARCHING...</div>
              </div>
            </>
          )}
          {gameState === 'winnerpage' && (
            <div className="winner_page">
              <div className="winner_container">
                <PlayerCard {...winner} />
                <div className="winner_btn">
                  <Link href="/game/Tournament" style={{ textDecoration: 'none' }}>
                    <div className="go_back">go back</div>
                  </Link>
                </div>
              </div>
            </div>
          )}
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
                </div>
              </>
            )}
            {gameState === 'loser' && (
              <>
                <div className="blurred-background"></div>
                <div className="t-text">
                  <div className="loser-text">LOSER</div>
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

export default TournamentPage;
