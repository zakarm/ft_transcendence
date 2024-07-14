import React from 'react';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';

import './PlayerCard.css';

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

const PlayerCard: React.FC<Player> = ({ name, imageUrl, stats, index, boxShadowsWinner }: Player) => {
  const data = [
    { subject: 'Win', A: stats.win_games },
    { subject: 'Lose', A: stats.lose_games },
    { subject: 'Total game', A: stats.total_games },
    { subject: 'Scores', A: stats.scores },
    { subject: 'Time', A: stats.total_minutes },
  ];
  const isNameTooLong = name.length > 10;
  const class_ = index === 1 ? 'left' : index === 2 ? 'right' : '';
  const class__ = boxShadowsWinner ? 'box_shadow' : '';

  return (
    <div className={`PlayerCard ${class_} ${class__}`}>
      <img className="image" src={imageUrl} alt={name} />
      <div className="chart">
        {isNameTooLong ? (
          <marquee className="name">{name || 'player'}</marquee>
        ) : (
          <h2 className="name">{name || 'player'}</h2>
        )}
        <RadarChart outerRadius={60} width={250} height={250} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar name={name} dataKey="A" stroke="#DF3D4B" fill="#DF3D4B" fillOpacity={0.6} />
        </RadarChart>
      </div>
    </div>
  );
};

export default PlayerCard;
