'use client';
import PongGameLocal from '@/components/PongGame/PongGameLocal';
import { useState } from 'react';
type SetScore = (
    side: 'side1' | 'side2',
    round: 'quarterfinals' | 'semifinals' | 'finals',
    matchIndex: number,
    userIndex: 0 | 1,
    newscore: number,
) => void;

type PromoteWinner = (
    side: 'side1' | 'side2',
    round: 'quarterfinals' | 'semifinals' | 'finals',
    matchIndex: number,
    userIndex: 0 | 1,
) => void;

type SetPageState = (pageState: string) => void;

interface LocalGame {
    user1name: string;
    user2name: string;
    user1image: string;
    user2image: string;
    side: 'side1' | 'side2';
    round: 'quarterfinals' | 'semifinals' | 'finals';
    matchIndex: number;
    user1Index: 0 | 1;
    user2Index: 0 | 1;
    setScore: SetScore | null;
    promoteWinner: PromoteWinner | null;
    setPageState_: SetPageState | null;
    usesetter: 0 | 1;
}

function Local() {
    const [match, setMatch] = useState<LocalGame>({
        user1name: 'player1',
        user2name: 'player2',
        user1image: '/assets/images/gameProfiles/yoru.jpeg',
        user2image: '/assets/images/gameProfiles/omen.jpeg',
        side: 'side1',
        round: 'quarterfinals',
        matchIndex: 0,
        user1Index: 0,
        user2Index: 1,
        setScore: null,
        promoteWinner: null,
        setPageState_: null,
        usesetter: 0,
    });
    return <PongGameLocal data={match} />;
}

export default Local;
