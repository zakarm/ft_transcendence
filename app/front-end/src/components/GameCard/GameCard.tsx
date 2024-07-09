import React from 'react';
import './GameCard.css';
import Link from 'next/link';

interface GameCardProps {
  title: string;
  imageUrl: string;
  pageUrl: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, imageUrl, pageUrl }) => {
  return (
    <div className="game-card">
      <Link href={pageUrl}>
        <img src={imageUrl} alt={title} />
        <div className="title">{title}</div>
      </Link>
    </div>
  );
};

export default GameCard;
