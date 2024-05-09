import React from "react";
import SafeImage from "../SafeImage/SafeImage";
import "./TournamentCard.css";
import Link from "next/link";

interface TournamentCardProps {
  name: string;
  date: string;
  participantsJoined: number;
  imageUrl: string;
  pageUrl: string;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  name,
  date,
  participantsJoined,
  imageUrl,
  pageUrl,
}) => {
  return (
    <div className="Tournament_card">
      <div className="Tournament_card_image">
        <SafeImage src={imageUrl} alt="" />
      </div>
      <div className="Tournament_card_info">
        <p className="Tournament_card_name">{name}</p>
        <p className="Tournament_card_date">{date}</p>
      </div>
      <hr />
      <div className="Tournament_card_info_row">
        <Link href={pageUrl}>
          <button>JOIN</button>
        </Link>
        <div className="Tournament_card_participants">
          <p>Participants joined</p>
          <p className="Tournament_card_participants_nbr">
            {participantsJoined}/8
          </p>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
