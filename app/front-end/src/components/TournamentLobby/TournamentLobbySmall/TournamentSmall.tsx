import React from 'react';
import './TournamentSmall.css';
import SafeImage from '../../../components/SafeImage/SafeImage';

interface User {
    name: string;
    photoUrl: string;
    score: number;
    status: boolean;
}

interface Match {
    user1: User;
    user2: User;
}

interface Side {
    index: number;
    quarterfinals: Match[];
    semifinals: Match[];
    finals: Match[];
}

interface TournamentData {
    side1: Side;
    side2: Side;
}

interface UserProps {
    user: {
        name: string;
        photoUrl: string;
        score: number;
        status: boolean;
    };
}

const User: React.FC<UserProps> = ({ user }) => {
    return (
        <div className="user_sm">
            <div className="tour_score">{user.score}</div>
            <div className={`placeholder_image_sm ${user.status ? '' : 'garyscaleimg'}`}>
                <SafeImage src={user.photoUrl} alt={user.name} />
            </div>
            <marquee style={{ width: '100px', marginTop: '15px' }}>{user.name}</marquee>
        </div>
    );
};

interface MatchProps {
    match: {
        user1: UserProps['user'];
        user2: UserProps['user'];
    };
}

const Match: React.FC<MatchProps> = ({ match }) => {
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

interface StageProps {
    title: string;
    matches: {
        user1: UserProps['user'];
        user2: UserProps['user'];
    }[];
}

const Stage: React.FC<StageProps> = ({ title, matches }) => {
    return (
        <div className={`Tournament_${title.toLowerCase()}`}>
            <h1 className={`${title.toLowerCase()}_title`}>{title}</h1>
            <div className="teams_sm">
                {matches.map((match: any, index : any) => (
                    <Match key={index} match={match} />
                ))}
            </div>
        </div>
    );
};

const TournamentSmall: React.FC<TournamentData> = (data: TournamentData) => {
    return (
        <div className="container_sm">
            <div className="Tournament_container_sm">
                <div className="Tournament_name" style={{ height: '100px', width: '100%' }}>
                    {'tournament name'}
                </div>
                <Stage title="Quarterfinals" matches={data.side1.quarterfinals.concat(data.side2.quarterfinals)} />
                <hr style={{ width: '70%', height: '5px', margin: 'auto', backgroundColor: 'white' }} />
                <Stage title="Semifinals" matches={data.side1.semifinals.concat(data.side2.semifinals)} />
                <hr style={{ width: '70%', height: '5px', margin: 'auto', backgroundColor: 'white' }} />
                <Stage title="Finals" matches={data.side1.finals.concat(data.side2.finals)} />
            </div>
        </div>
    );
};

export default TournamentSmall;
