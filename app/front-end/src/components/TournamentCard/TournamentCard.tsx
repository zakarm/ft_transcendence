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
    isDisabled ?: boolean;
    buttonText: string;
    id: string;
    setTournamentID?: React.Dispatch<React.SetStateAction<string>>;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
    name,
    date,
    participantsJoined,
    imageUrl,
    pageUrl = '',
    buttonText = 'JOIN',
    id = '',
    setTournamentID = () => {},
    isDisabled = false
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
                {
                    buttonText === 'Watch' ?
                        <Link href={pageUrl} >
                            <button
                                className={`${isDisabled ? "button_disabled" : "button_enabled"}`}
                                onClick={() => setTournamentID(id)}
                                style={{ fontSize: '100%' }}
                                disabled={isDisabled}
                            >
                                {buttonText}
                            </button>
                        </Link>
                    :
                        <button
                            className={`${isDisabled ? "button_disabled" : "button_enabled"}`}
                            onClick={() => setTournamentID(id)}
                            style={{ fontSize: '100%' }}
                            disabled={isDisabled}
                        >
                            {buttonText}
                        </button>

                }
                <div className="Tournament_card_participants">
                    <p>Participants joined</p>
                    <p className="Tournament_card_participants_nbr">{participantsJoined}/8</p>
                </div>
            </div>
        </div>
    );
};

export default TournamentCard;
