'use client';
import './localtour.css';
import { NextPage } from 'next';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import TournamentLobby from '../(tournamet-lobby)/TournamentLobby';
import type { TournamentData, LocalTournamentProps } from '@/types/game/Tournament';

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

const LocalTournamentPage: NextPage = () => {
    const [LocaltournamentData, setLocalTournamentData] = useState<LocalTournamentProps | null>(null);
    const [filteredTournamentData, setFilteredTournamentData] = useState<TournamentData>(initialTournamentData);
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
        } else {
            router.back();
        }
    }, [pathname, router, localStorage]);

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

    return (
        <div className="container-fluid vh-100 p-0 m-0" style={{ overflow: 'auto' }}>
            <div>
                <TournamentLobby {...filteredTournamentData} />
            </div>
            <div className="container-fluid d-flex ">
                <div className="conatiner_t">
                    <h1>Local Tournament Page</h1>
                    <pre>{JSON.stringify(LocaltournamentData, null, 2)}</pre>
                </div>
                <div className="conatiner_t1">
                    <h1>Local Tournament Page</h1>
                    <pre>{JSON.stringify(filteredTournamentData, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
};

export default LocalTournamentPage;
