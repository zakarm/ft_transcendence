import React from 'react';
import SafeImage from '../SafeImage/SafeImage';
import './TournamentCard.css';
import Link from 'next/link';
import { toast } from 'react-toastify'
import { LocalTournamentProps } from '@/lib/game/Tournament'

interface TournamentCardProps {
  name: string;
  date: string;
  participantsJoined: number;
  imageUrl: string;
  pageUrl?: string;
  isDisabled?: boolean;
  buttonText: string;
  id: string;
  setTournamentID?: React.Dispatch<React.SetStateAction<string>>;
  setRerenderLocalTourn ?:React.Dispatch<React.SetStateAction<number>>;
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
  isDisabled = false,
  setRerenderLocalTourn = () => {}
}: TournamentCardProps) => {

    function    deleteLocalTournament() {
        const   item : string | null = localStorage.getItem('tournaments')
        if (!item)
            return ;
        try {
            const   tournaments : Array<LocalTournamentProps> = JSON.parse(item);
            const   newTournaments = tournaments.filter((elem) => { if (elem.tournament_name !== name) return elem })
            if (newTournaments.length === 0) {
                localStorage.removeItem('tournaments')
            } else {
                localStorage.setItem('tournaments', JSON.stringify(newTournaments));
            }
            setRerenderLocalTourn((prev : number) => prev += 1)
        } catch (error) {
            toast.error('Error : cannot read tournaments data');
            localStorage.removeItem('tournaments')
        }
    }

    return (
        <div className="Tournament_card">
            <div className="Tournament_card_image">
                <SafeImage src={imageUrl} alt="" />
            </div>
            <div className="Tournament_card_info mt-2">
                {
                    name && (name.length > 25) ? 
                        <marquee className="Tournament_card_name h-50 d-flex align-items-center">
                            {name}
                        </marquee>
                    :
                        <p className="Tournament_card_name m-0 p-0 h-50 d-flex align-items-center">{name}</p>
                }
                <p className="Tournament_card_date">{date}</p> 
            </div>
            <hr />
            <div className="Tournament_card_info_row mt-3">
                {buttonText === 'WATCH' ? (
                    <button
                        className={`${isDisabled ? 'button_disabled' : 'button_enabled'}`}
                        onClick={() => setTournamentID(id)}
                        style={{ fontSize: '100%' }}
                        disabled={isDisabled}
                        >
                            {buttonText}
                    </button>
                ) : buttonText === 'GO' ? (
                    <>
                        <Link href={pageUrl}>
                            <button
                                className={`${isDisabled ? 'button_disabled' : 'button_enabled'}`}
                                onClick={() => setTournamentID(id)}
                                style={{ fontSize: '100%' }}
                                disabled={isDisabled}
                                >
                                    {buttonText}
                            </button>
                        </Link>
                        <button
                            className={`${isDisabled ? 'button_disabled' : 'button_enabled'}`}
                            onClick={() => deleteLocalTournament()}
                            style={{ fontSize: '100%', width : '15%', borderRadius : '15px', cursor : 'pointer', backgroundColor : '#2c3143' }}
                            disabled={isDisabled}
                            >
                                ✖️
                        </button>
                    </>
                ) :
                    <Link href={pageUrl}>
                        <button
                            className={`${isDisabled ? 'button_disabled' : 'button_enabled'}`}
                            onClick={() => setTournamentID(id)}
                            style={{ fontSize: '100%' }}
                            disabled={isDisabled}
                            >
                                {buttonText}
                        </button>
                    </Link>
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
