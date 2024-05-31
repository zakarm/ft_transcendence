import React from 'react';
import './TournamentSmall.css';
import SafeImage from '../../../components/SafeImage/SafeImage';
import { TournamentData, TournamentMatchProps, TournamentStageProps, TournamentUserProps } from '@/types/game/Tournament';

const User: React.FC<TournamentUserProps> = ({ user }) => {
    return (
        <div className="user_sm">
            <div className="tour_score">{user?.score}</div>
            <div className={`placeholder_image_sm ${user?.status ? '' : 'garyscaleimg'}`}>
                <SafeImage src={user?.photoUrl} alt={user?.name} />
            </div>
            <marquee style={{ width: '100px', marginTop: '15px' }}>{user?.name}</marquee>
        </div>
    );
};


const Match: React.FC<TournamentMatchProps> = ({ match }) => {
    return (
        <div className="match">
            <User user={match.user1} />
            <div className="user_hr">
                <h1 className="vs">VS</h1>
            </div>
            <User user={match.user2} />
        </div>
    );
};


const Stage: React.FC<TournamentStageProps> = ({ title, matches }) => {
    return (
        <div className={`Tournament_${title.toLowerCase()}`}>
            <h1 className={`${title.toLowerCase()}_title`}>{title}</h1>
            <div className="teams_sm">
                {matches.map((match: any, index: any) => (
                    <Match key={index} match={match} />
                ))}
            </div>
        </div>
    );
};

const TournamentSmall: React.FC<TournamentData> = (data: TournamentData) => {
    const res = [
        {
            user1: data.side1.finals[0].user1,
            user2: data.side2.finals[0].user1,
        },
    ];
    return (
        <div className="container_sm">
            <div className="Tournament_container_sm">
                <div className="Tournament_name" style={{ height: '100px', width: '100%' }}>
                    {data.TournamentName}
                </div>
                <Stage title="Quarterfinals" matches={data.side1.quarterfinals.concat(data.side2.quarterfinals)} />
                <hr style={{ width: '70%', height: '5px', margin: 'auto', backgroundColor: 'white' }} />
                <Stage title="Semifinals" matches={data.side1.semifinals.concat(data.side2.semifinals)} />
                <hr style={{ width: '70%', height: '5px', margin: 'auto', backgroundColor: 'white' }} />
                <Stage title="Finals" matches={res} />
            </div>
        </div>
    );
};

export default TournamentSmall;
