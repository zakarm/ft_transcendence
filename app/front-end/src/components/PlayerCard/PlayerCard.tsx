import React from 'react';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';

import './PlayerCard.css';

interface PlayerStats {
  adaptation: number;
  agility: number;
  winStreaks: number;
  endurance: number;
  eliteTierRanking: number;
}

interface PlayerCardProps {
  name: string;
  imageUrl: string;
  stats: PlayerStats;
  index: number;
  boxShadowsWinner: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ name, imageUrl, stats, index, boxShadowsWinner }: PlayerCardProps) => {
  const data = [
    { subject: 'Adaptation', A: stats.adaptation },
    { subject: 'Agility', A: stats.agility },
    { subject: 'Win Streaks', A: stats.winStreaks },
    { subject: 'Endurance', A: stats.endurance },
    { subject: 'Ranking', A: stats.eliteTierRanking },
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
