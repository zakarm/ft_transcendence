"use client";

import TournamentLarge from '@/components/TournamentLobby/TournamentLobbyLarge/TournamentLarge';
import TournamentSmall from '@/components/TournamentLobby/TournamentLobbySmall/TournamentSmall';
import React, { useState } from 'react';

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

const TournamentLobby: React.FC<TournamentData> = (data: TournamentData) => {
    const [isSmall, setIsSmall] = useState(window.innerWidth < 1000);
    window.addEventListener('resize', () => {
        setIsSmall(window.innerWidth < 1000);
    });
    return (
        <div className="container-fluid vh-100 p-0 m-0" style={{ overflow: 'auto' }}>
            {isSmall ? <TournamentSmall {...data} /> : <TournamentLarge {...data} />}
        </div>
    );
};

export default TournamentLobby;
