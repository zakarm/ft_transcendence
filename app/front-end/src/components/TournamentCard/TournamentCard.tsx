import React from 'react';
import SafeImage from '../SafeImage/SafeImage';
import './TournamentCard.css';
import Link from 'next/link';

interface TournamentCardProps {
    name: string;
    date: string;
    participantsJoined: number;
    imageUrl: string;
    pageUrl?: string;
    buttonText: string;
    setTournamentID?: React.Dispatch<React.SetStateAction<string>>;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
    name,
    date,
    participantsJoined,
    imageUrl,
    pageUrl = '',
    buttonText = 'JOIN',
    setTournamentID = () => {},
}: TournamentCardProps) => {
    return (
        <div className="Tournament_card">
            <div className="Tournament_card_image">
                <SafeImage src={imageUrl} alt="" />
            </div>
            <div className="Tournament_card_info mt-3">
                <p className="Tournament_card_name">{name}</p>
                <p className="Tournament_card_date">{date}</p>
            </div>
            <hr />
            <div className="Tournament_card_info_row mt-3">
                    <Link href={pageUrl} >
                        <button onClick={() => setTournamentID(pageUrl)} style={{ fontSize: '100%' }}>
                            {buttonText}
                        </button>
                    </Link>
                <div className="Tournament_card_participants">
                    <p>Participants joined</p>
                    <p className="Tournament_card_participants_nbr">{participantsJoined}/8</p>
                </div>
            </div>
        </div>
    );
};

export default TournamentCard;
