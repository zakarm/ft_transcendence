import React from "react";
import "./BoardItem.css";

interface boardItemProps {
  championName: string;
  hashtag: string;
  score: number;
  imageSrc: string;
}

const BoardItem: React.FC<boardItemProps> = ({
  championName,
  hashtag,
  score,
  imageSrc,
}) => {
  return (
    <div className="board-item">
      <img src={imageSrc} alt={championName} className="board-image" />
      <div className="board-name">
        <div className="board-text">{championName}</div>
        <div className="board-hashtag">{hashtag}</div>
      </div>
      <div className="score">{score}</div>
    </div>
  );
};

export default BoardItem;
