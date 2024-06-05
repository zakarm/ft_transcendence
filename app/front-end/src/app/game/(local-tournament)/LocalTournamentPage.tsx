'use client';
import './localtour.css';
import { NextPage } from 'next';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect, use } from 'react';
import TournamentLobby from '../(tournamet-lobby)/TournamentLobby';
import Link from 'next/link';
import type {
    TournamentData,
    LocalTournamentProps,
    TournamentData_User,
    Tournament_User,
} from '@/types/game/Tournament';
import PongGameLocal from '@/components/PongGame/PongGameLocal';
import PlayerCard from '@/components/PlayerCard/PlayerCard';

const initialUser = {
    name: '',
    photoUrl: '',
    score: 0,
    status: true,
};

const initialMatch = {
    user1: { ...initialUser },
    user2: { ...initialUser },
};
const initialMatchFinal = {
    user1: { ...initialUser },
};

const initialRound = [{ ...initialMatch }, { ...initialMatch }];

const initialTournamentData = {
    TournamentName: 'Local Tournament',
    difficulty: '0',
    side1: {
        index: 1,
        quarterfinals: [...initialRound],
        semifinals: [{ ...initialMatch }],
        finals: [{ ...initialMatchFinal }],
    },
    side2: {
        index: 2,
        quarterfinals: [...initialRound],
        semifinals: [{ ...initialMatch }],
        finals: [{ ...initialMatchFinal }],
    },
};

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
}

const LocalTournamentPage: NextPage = () => {
    const [LocaltournamentData, setLocalTournamentData] = useState<LocalTournamentProps | null>(null);
    const [filteredTournamentData, setFilteredTournamentData] = useState<TournamentData>(initialTournamentData);
    const [pageState, setPageState] = useState<string>('Tournamentlobby');
    const [match, setMatch] = useState<LocalGame>({
        user1name: '',
        user2name: '',
        user1image: '',
        user2image: '',
        side: 'side1',
        round: 'quarterfinals',
        matchIndex: 0,
        user1Index: 0,
        user2Index: 1,
        setScore: () => {},
        promoteWinner: () => {},
        setPageState_: () => {},
        usesetter: 1,
    });
    const [winner, setwinner] = useState<Player>({
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
    });
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        const data = localStorage.getItem('tournaments');
        const tournaments: LocalTournamentProps[] = data ? JSON.parse(data) : [];
        const id = pathname.split('/').pop();
        const index = id ? parseInt(id, 10) : -1;

        if (index >= 0 && index < tournaments.length) {
            const tournament = tournaments[index];
            tournament.data.quatre_final.match1.user1.name = tournament.player_1;
            tournament.data.quatre_final.match1.user2.name = tournament.player_2;
            tournament.data.quatre_final.match2.user1.name = tournament.player_3;
            tournament.data.quatre_final.match2.user2.name = tournament.player_4;
            tournament.data.quatre_final.match3.user1.name = tournament.player_5;
            tournament.data.quatre_final.match3.user2.name = tournament.player_6;
            tournament.data.quatre_final.match4.user1.name = tournament.player_7;
            tournament.data.quatre_final.match4.user2.name = tournament.player_8;
            setLocalTournamentData(tournament);
            const updatedData = JSON.stringify(tournaments);
            localStorage.setItem('tournaments', updatedData);
            setwinner((prevState: Player) => {
                return {
                    ...prevState,
                    name: tournament.data.final.match1.user1.status
                        ? tournament.data.final.match1.user1.name
                        : tournament.data.final.match1.user2.name,
                    imageUrl: tournament.data.final.match1.user1.status
                        ? tournament.data.final.match1.user1.photoUrl
                        : tournament.data.final.match1.user2.photoUrl,
                };
            });
        } else {
            router.back();
        }
    }, [pathname, router, localStorage]);

    const updateLocalTournamentData = () => {
        setLocalTournamentData((prevState: LocalTournamentProps | null) => {
            if (prevState) {
                return {
                    ...prevState,
                    data: {
                        quatre_final: {
                            match1: {
                                user1: filteredTournamentData.side1.quarterfinals[0].user1,
                                user2: filteredTournamentData.side1.quarterfinals[0].user2,
                            },
                            match2: {
                                user1: filteredTournamentData.side1.quarterfinals[1].user1,
                                user2: filteredTournamentData.side1.quarterfinals[1].user2,
                            },
                            match3: {
                                user1: filteredTournamentData.side2.quarterfinals[0].user1,
                                user2: filteredTournamentData.side2.quarterfinals[0].user2,
                            },
                            match4: {
                                user1: filteredTournamentData.side2.quarterfinals[1].user1,
                                user2: filteredTournamentData.side2.quarterfinals[1].user2,
                            },
                        },
                        semi_final: {
                            match1: {
                                user1: filteredTournamentData.side1.semifinals[0].user1,
                                user2: filteredTournamentData.side1.semifinals[0].user2,
                            },
                            match2: {
                                user1: filteredTournamentData.side2.semifinals[0].user1,
                                user2: filteredTournamentData.side2.semifinals[0].user2,
                            },
                        },
                        final: {
                            match1: {
                                user1: filteredTournamentData.side1.finals[0].user1,
                                user2: filteredTournamentData.side2.finals[0].user1,
                            },
                        },
                    },
                };
            }
            return prevState;
        });
    };
    useEffect(() => {
        const data = localStorage.getItem('tournaments');
        const tournaments: LocalTournamentProps[] = data ? JSON.parse(data) : [];
        const id = pathname.split('/').pop();
        const index = id ? parseInt(id, 10) : -1;

        if (index >= 0 && index < tournaments.length) {
            if (LocaltournamentData) {
                tournaments[index] = LocaltournamentData;
                const updatedData = JSON.stringify(tournaments);
                localStorage.setItem('tournaments', updatedData);
            }
        }
    }, [LocaltournamentData]);

    const setScore = (
        side: 'side1' | 'side2',
        round: 'quarterfinals' | 'semifinals' | 'finals',
        matchIndex: number,
        userIndex: 0 | 1,
        newscore: number,
    ) => {
        setFilteredTournamentData((prevState: TournamentData) => {
            const newTournamentData: TournamentData = { ...prevState };
            const score: number = newTournamentData[side][round][matchIndex][`user${userIndex + 1}`].score;
            if (score < 7) newTournamentData[side][round][matchIndex][`user${userIndex + 1}`].score = newscore;
            return newTournamentData;
        });
        updateLocalTournamentData();
    };

    const promoteWinner = (
        side: 'side1' | 'side2',
        round: 'quarterfinals' | 'semifinals' | 'finals',
        matchIndex: number,
        userIndex: 0 | 1,
    ) => {
        setFilteredTournamentData((prevState: TournamentData) => {
            const newTournamentData: TournamentData = { ...prevState };
            const winnerindex: string = 'user' + (userIndex + 1);
            const loserindex: string =
                round === 'finals' ? 'user' + (userIndex + 1) : 'user' + (userIndex === 0 ? 2 : 1);
            const winner: TournamentData_User = newTournamentData[side][round][matchIndex][winnerindex];
            const loser: TournamentData_User =
                newTournamentData[round === 'finals' ? (side == 'side1' ? 'side2' : 'side1') : side][round][matchIndex][
                    loserindex
                ];
            winner.status = true;
            loser.status = false;
            if (round === 'quarterfinals') {
                newTournamentData[side].semifinals[0][`user${matchIndex + 1}`].name = winner.name;
                newTournamentData[side].semifinals[0][`user${matchIndex + 1}`].photoUrl = winner.photoUrl;
                newTournamentData[side].semifinals[0][`user${matchIndex + 1}`].status = true;
                newTournamentData[side].semifinals[0][`user${matchIndex + 1}`].score = 0;
            } else if (round === 'semifinals') {
                newTournamentData[side].finals[0][`user${matchIndex + 1}`].name = winner.name;
                newTournamentData[side].finals[0][`user${matchIndex + 1}`].photoUrl = winner.photoUrl;
                newTournamentData[side].finals[0][`user${matchIndex + 1}`].status = true;
                newTournamentData[side].finals[0][`user${matchIndex + 1}`].score = 0;
            } else if (round === 'finals') {
                setwinner({
                    name: winner.name,
                    imageUrl: winner.photoUrl,
                    stats: {
                        adaptation: 0,
                        agility: 0,
                        winStreaks: 0,
                        endurance: 0,
                        eliteTierRanking: 0,
                    },
                    index: 0,
                });
            }
            return newTournamentData;
        });
        updateLocalTournamentData();
    };

    const setPageState_ = (pageState: string) => {
        setPageState((prevState: string) => pageState);
    };

    useEffect(() => {
        if (LocaltournamentData) {
            setFilteredTournamentData((prevState: any) => ({
                ...prevState,
                TournamentName: LocaltournamentData.tournament_name,
                difficulty: LocaltournamentData.difficulty,
                side1: {
                    ...prevState.side1,
                    quarterfinals: [
                        LocaltournamentData.data.quatre_final.match1,
                        LocaltournamentData.data.quatre_final.match2,
                    ],
                    semifinals: [LocaltournamentData.data.semi_final.match1],
                    finals: [{ ...prevState.side1.finals[0], user1: LocaltournamentData.data.final.match1.user1 }],
                },
                side2: {
                    ...prevState.side2,
                    quarterfinals: [
                        LocaltournamentData.data.quatre_final.match3,
                        LocaltournamentData.data.quatre_final.match4,
                    ],
                    semifinals: [LocaltournamentData.data.semi_final.match2],
                    finals: [{ ...prevState.side2.finals[0], user1: LocaltournamentData.data.final.match1.user2 }],
                },
            }));
        }
    }, [LocaltournamentData]);

    const createMatch = (
        user1_name: string,
        user1_image: string,
        user2_name: string,
        user2_image: string,
        side: 'side1' | 'side2',
        round: 'quarterfinals' | 'semifinals' | 'finals',
        matchIndex: number,
    ): LocalGame => ({
        user1name: user1_name,
        user2name: user2_name,
        user1image: user1_image,
        user2image: user2_image,
        side: side,
        round: round,
        matchIndex: matchIndex,
        user1Index: 0,
        user2Index: 1,
        setScore: setScore,
        promoteWinner: promoteWinner,
        setPageState_: setPageState_,
        usesetter: 1,
    });
    useEffect(() => {
        const createMatchIfStatusTrue = (
            side: 'side1' | 'side2',
            round: 'quarterfinals' | 'semifinals' | 'finals',
            index: number,
        ): LocalGame | null => {
            const userData = filteredTournamentData[side][round][index];
            if (userData && userData.user1 && userData.user2 && userData.user1.status && userData.user2.status) {
                return createMatch(
                    userData.user1.name,
                    userData.user1.photoUrl,
                    userData.user2.name,
                    userData.user2.photoUrl,
                    side,
                    round,
                    index,
                );
            }
            return null;
        };
        const createFinalsMatchIfStatusTrue = (
            side1: 'side1' | 'side2',
            side2: 'side1' | 'side2',
            round: 'quarterfinals' | 'semifinals' | 'finals',
            index: number,
        ): LocalGame | null => {
            const userData1 = filteredTournamentData[side1][round][index];
            const userData2 = filteredTournamentData[side2][round][index];
            if (userData1 && userData1.user1 && userData1.user1.status) {
                return createMatch(
                    userData1.user1.name,
                    userData1.user1.photoUrl,
                    userData2.user1.name,
                    userData2.user1.photoUrl,
                    side1,
                    round,
                    index,
                );
            }
            return null;
        };
        if (filteredTournamentData) {
            let data = null;
            data =
                createMatchIfStatusTrue('side1', 'quarterfinals', 0) ||
                createMatchIfStatusTrue('side1', 'quarterfinals', 1) ||
                createMatchIfStatusTrue('side2', 'quarterfinals', 0) ||
                createMatchIfStatusTrue('side2', 'quarterfinals', 1) ||
                createMatchIfStatusTrue('side1', 'semifinals', 0) ||
                createMatchIfStatusTrue('side2', 'semifinals', 0) ||
                createFinalsMatchIfStatusTrue('side1', 'side2', 'finals', 0);
            if (!data) setPageState('TournamentWinner');
            if (data) {
                const timer = setTimeout(() => {
                    setMatch(data);
                    setPageState('TournamentGame');
                }, 5000);
                return () => clearTimeout(timer);
            }
        }
    }, [filteredTournamentData]);

    return (
        <div className="container-fluid vh-100 p-0 m-0" style={{ overflow: 'auto' }}>
            <div className="container_localtournament">
                <div className="page_state">
                    {(pageState === 'Tournamentlobby' || pageState === 'TournamentWinner') && (
                        <TournamentLobby {...filteredTournamentData} />
                    )}
                    {pageState === 'TournamentGame' && <PongGameLocal data={match} />}
                </div>
                {pageState === 'TournamentWinner' && (
                    <div className="winner_page">
                        <div className="winner_conatiner">
                            <div className="winner_text">WINNER</div>
                            <PlayerCard {...winner} />
                            <Link href="/game/Tournament" style={{ textDecoration: 'none' }}>
                                <div className="go_back">go back</div>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* <div className="container-fluid d-flex ">
               <div className="conatiner_t">
                   <h1>Local Tournament Page</h1>
                   <pre>{JSON.stringify(LocaltournamentData, null, 2)}</pre>
               </div>
               <div className="conatiner_t1">
                   <h1>Local Tournament Page</h1>
                   <pre>{JSON.stringify(filteredTournamentData, null, 2)}</pre>
               </div>
           </div> */}
        </div>
    );
};

export default LocalTournamentPage;
