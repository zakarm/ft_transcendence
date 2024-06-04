import React from 'react';
import './TournamentLarge.css';
import SafeImage from '@/components/SafeImage/SafeImage';
import { TournamentData, TournamentData_Match, TournamentData_Side, TournamentData_User } from '@/types/game/Tournament';

const TournamentLarge: React.FC<TournamentData> = (data: TournamentData) => {
    return (
        <div className="container_lg">
            <div className="Tournament_container border">
                <div className="Tournament_name" style={{ height: '10%', width: '100%' }}>
                    {data.TournamentName}
                </div>
                <div className="Tournament_container_" style={{ width: '100%' }}>
                    <TournamentSide {...data.side1} />
                    <TournamentSide {...data.side2} />
                </div>
            </div>
        </div>
    );
};

const TournamentSide: React.FC<TournamentData_Side> = (side: TournamentData_Side) => {
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

const Team: React.FC<TournamentData_Match> = (Matches: TournamentData_Match) => {
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

const TeamFinal: React.FC<TournamentData_Match> = (match: TournamentData_Match) => {
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

const UserComponent: React.FC<TournamentData_User> = (user:TournamentData_User) => {
    return (
        <>
            <div className="tour_score">{user.score}</div>
            <div className="user_profile">
                <div className={`placeholder_image ${user.status ? '' : 'garyscaleimg'}`}>
                    <SafeImage src={`${user.photoUrl}`} alt={user.name} />
                </div>
            </div>
            <marquee style={{ width: '120px', marginTop: '35px' }}>{user.name}</marquee>
        </>
    );
};

export default TournamentLarge;
