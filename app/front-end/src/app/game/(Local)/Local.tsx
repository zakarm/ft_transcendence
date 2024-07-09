'use client';
import PlayerCard from '@/components/PlayerCard/PlayerCard';
import PongGameLocal from '@/components/PongGame/PongGameLocal';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './Local.css';

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

type SetWinner_ = (winner: playerdata) => void;

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
  setWinner: SetWinner_ | null;
  usesetter: 0 | 1;
}

interface Player {
  name: string;
  imageUrl: string;
  stats: {
    adaptation: number;
    agility: number;
    winStreaks: number;
    endurance: number;
    eliteTierRanking: number;
  };
  index: number;
  boxShadowsWinner: boolean;
}

interface playerdata {
  name: string;
  imageUrl: string;
}

function Local() {
  const [pageState, setPageState] = useState<string>('Initial');
  const [effectRunCount, setEffectRunCount] = useState(0);
  const [winner, setWinner] = useState<Player>({
    name: '',
    imageUrl: '',
    stats: {
      adaptation: 0,
      agility: 0,
      winStreaks: 0,
      endurance: 0,
      eliteTierRanking: 0,
    },
    index: 0,
    boxShadowsWinner: true,
  });

  const setWinner_ = (data: playerdata) => {
    setWinner((prev) => ({
      ...prev,
      name: data.name,
      imageUrl: data.imageUrl,
    }));
  };

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
    setWinner: setWinner_,
    usesetter: 0,
  });

  useEffect(() => {
    if (pageState === 'winner') return;
    if (winner.name !== '' && winner.imageUrl !== '') {
      setPageState('Winner');
    }
  }, [winner]);

  return (
    <div className="container_local">
      <div className="page_state">
        <PongGameLocal data={match} />
      </div>
      {pageState === 'Winner' && (
        <div className="winner_page ">
          <div className="winner_container">
            <PlayerCard {...winner} />
            <div className="winner_btn">
              <Link href="/game" style={{ textDecoration: 'none' }}>
                <div className="go_back">go back</div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Local;
