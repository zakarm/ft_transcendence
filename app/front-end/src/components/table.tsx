import React from 'react';
import styles from './styles/table.module.css';

interface GameData {
  player: string;
  score: number;
  date: string;
  result: 'WIN' | 'LOSS';
}

const GameHistoryCard: React.FC = () => {
  const gameData: GameData[] = [
    { player: 'IBsela_001', score: 65135, date: '2024-02-19', result: 'WIN' },
    { player: 'IBsela_001', score: 65135, date: '2024-02-19', result: 'WIN' },
    { player: 'IBsela_001', score: 65135, date: '2024-02-19', result: 'WIN' },
    { player: 'IBsela_001', score: 65135, date: '2024-02-19', result: 'WIN' },
  ];

  return (
    <div className={`${styles.game_history_card}`}>
      <div className={`${styles.header}`}>
        <div>player</div>
        <div>score</div>
        <div>date</div>
        <div>result</div>
      </div>
      <div className={`${styles.card_body}`}>
        {gameData.map((game, index) => (
          <div className={`${styles.game_row} mt-3`} key={index}>
            <div className={`${styles.player_info}`}>
              <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg" alt="Player Avatar" />
              <span>{game.player}</span>
            </div>
            <div>{game.score}</div>
            <div>{game.date}</div>
            <div>{game.result}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameHistoryCard;