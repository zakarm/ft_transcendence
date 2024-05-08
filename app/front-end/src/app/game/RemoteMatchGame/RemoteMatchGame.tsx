"use client";
import React from "react";
import Web_Socket from "../../../components/webSoket/WebSocket";
import Cookies from "js-cookie";
import "./RemoteMatchGame.css";
import PlayerCard from "@/components/PlayerCard/PlayerCard";
import PongGame from "@/components/PongGame/PongGame";
import Link from "next/link";

const RemoteMatchGame: React.FC = () => {
  const access = Cookies.get("access");

  const { webSocket, gameState, connectionInfo } = Web_Socket(
    `ws://localhost:8000/ws/data/?token=${access}`
  );

  const fakePlayer = {
    name: "YORU",
    imageUrl: "yoru.jpeg",
    stats: {
      adaptation: 80,
      agility: 60,
      winStreaks: 70,
      endurance: 90,
      eliteTierRanking: 75,
    },
    index: 0,
  };

  const players = [
    {
      name: "YORU",
      imageUrl: "yoru.jpeg",
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
      name: "OMEN",
      imageUrl: "omen.jpeg",
      stats: {
        adaptation: 60,
        agility: 90,
        winStreaks: 85,
        endurance: 70,
        eliteTierRanking: 80,
      },
      index: 2,
    },
  ];

  return (
    <div className="Lobby_container">
      {gameState === "lobby" && (
        <>
          <PlayerCard {...fakePlayer} />
          <div className="blurred-background"></div>
          <div className="search-text">SEARCHING...</div>
        </>
      )}

      {gameState === "opponentFound" && (
        <>
          <PlayerCard {...players[0]} />
          <h1 className="vs_key">VS</h1>
          <PlayerCard {...players[1]} />
        </>
      )}
      {(gameState === "load_game" ||
        gameState === "start_game" ||
        gameState === "winner" ||
        gameState === "loser" ||
        gameState === "reconnecting") &&
        webSocket && (
          <>
            {gameState === "load_game" && (
              <>
                <div className="blurred-background"></div>
                <div className="search-text">LOADING...</div>
              </>
            )}
            {gameState === "winner" && (
              <>
                <div className="blurred-background"></div>
                <div className="search-text winner-text">WINNER</div>
                <Link href="/game">
                  <button className="play-again-button">PLAY AGAIN</button>
                </Link>
                <Link href="/">
                  <button className="back-to-home">BACK TO HOME</button>
                </Link>
              </>
            )}
            {gameState === "loser" && (
              <>
                <div className="blurred-background"></div>
                <div className="search-text loser-text">LOSER</div>
                <Link href="/game">
                  <button className="play-again-button">PLAY AGAIN</button>
                </Link>
                <Link href="/dashboard">
                  <button className="back-to-home">BACK TO HOME</button>
                </Link>
              </>
            )}
            {gameState === "reconnecting" && (
              <>
                <div className="blurred-background"></div>
                <div className="search-text">RECONNECTING...</div>
              </>
            )}
            <PongGame webSocket={webSocket} connectionInfo={connectionInfo} />
          </>
        )}
    </div>
  );
};

export default RemoteMatchGame;
