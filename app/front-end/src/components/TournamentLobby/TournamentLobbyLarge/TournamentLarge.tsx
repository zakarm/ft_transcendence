import React from 'react';
import './TournamentLarge.css';
import SafeImage from '@/components/SafeImage/SafeImage';

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

const TournamentLarge: React.FC<TournamentData> = (data: TournamentData) => {
    return (
        <div className="container_lg">
            <div className="Tournament_container">
                <TournamentSide {...data.side1} />
                <TournamentSide {...data.side2} />
            </div>
        </div>
    );
};

const TournamentSide: React.FC<Side> = (side: Side) => {
    return (
        <div className="tounament_side">
            <div className="Quarterfinals">
                <Team {...side.quarterfinals[0]} />
                <Team {...side.quarterfinals[1]} />
            </div>
            <div className="Semifinals">
                <Team {...side.semifinals[0]} />
            </div>
            <div className="Finals">
                <TeamFinal {...side.finals[0]} />
            </div>
        </div>
    );
};

const Team: React.FC<Match> = (Matches: Match) => {
    return (
        <div className="team">
            <div className="tournamet_side_border">
                <div className="tournamet_side_border_"></div>
            </div>
            <div className="users">
                <div className="user_item1">
                    <UserComponent {...Matches.user1}></UserComponent>
                </div>
                <div className="user_item2">
                    <UserComponent {...Matches.user2}></UserComponent>
                </div>
            </div>
            <div className="tournamet_border"></div>
        </div>
    );
};

const TeamFinal: React.FC<Match> = (match: Match) => {
    return (
        <div className="team">
            <div className="tournamet_side_border"></div>
            <div className="users">
                <div className="user_item3">
                    <UserComponent {...match.user1}></UserComponent>
                </div>
            </div>
            <div className="tournamet_border_"></div>
        </div>
    );
};

const UserComponent: React.FC<User> = (user: User) => {
    return (
        <>
            <div className="user_profile">
                <div className="placeholder_image">
                    <SafeImage src={`${user.photoUrl}`} alt={user.name} />
                </div>
            </div>
            <div>{user.name}</div>
        </>
    );
};

export default TournamentLarge;
