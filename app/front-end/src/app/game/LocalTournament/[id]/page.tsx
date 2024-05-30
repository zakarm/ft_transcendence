'use client';
import { NextPage } from 'next';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import './localtour.css';
import TournamentLobby from '../../(tournamet-lobby)/TournamentLobby';

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

interface Tournament {
    quatre_final: {
        match1: Match;
        match2: Match;
        match3: Match;
        match4: Match;
    };
    semi_final: {
        match1: Match;
        match2: Match;
    };
    final: {
        match1: Match;
    };
}

interface LocalPlayersProps {
    tournament_name: string;
    tournamentImage: string;
    player_1: string;
    player_2: string;
    player_3: string;
    player_4: string;
    player_5: string;
    player_6: string;
    player_7: string;
    player_8: string;
    difficulty: string;
    date: string;
    Participants: number;
    data: Tournament;
}

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

const LocalTournamentPage: NextPage = () => {
    const [tournamentData, setTournamentData] = useState<LocalPlayersProps | null>(null);
    // const [filtredTournamentData, setFiltredTournamentData] = useState<any>(null);
    const [filtredTournamentData, setFiltredTournamentData] = useState<TournamentData | null | any>({
        side1: {
            index: 1,
            quarterfinals: [
                {
                    user1: {
                        name: '',
                        photoUrl: '',
                        score: 0,
                        status: true,
                    },
                    user2: {
                        name: '',
                        photoUrl: '',
                        score: 0,
                        status: true,
                    },
                },
                {
                    user1: {
                        name: '',
                        photoUrl: '',
                        score: 0,
                        status: true,
                    },
                    user2: {
                        name: '',
                        photoUrl: '',
                        score: 0,
                        status: true,
                    },
                },
            ],
            semifinals: [
                {
                    user1: {
                        name: '',
                        photoUrl: '',
                        score: 0,
                        status: true,
                    },
                    user2: {
                        name: '',
                        photoUrl: '',
                        score: 0,
                        status: true,
                    },
                },
            ],
            finals: [
                {
                    user1: {
                        name: '',
                        photoUrl: '',
                        score: 0,
                        status: true,
                    },
                    user2: {
                        name: '',
                        photoUrl: '',
                        score: 0,
                        status: true,
                    },
                },
            ],
        },
        side2: {
            index: 2,
            quarterfinals: [
                {
                    user1: {
                        name: '',
                        photoUrl: '',
                        score: 0,
                        status: true,
                    },
                    user2: {
                        name: '',
                        photoUrl: '',
                        score: 0,
                        status: true,
                    },
                },
                {
                    user1: {
                        name: '',
                        photoUrl: '',
                        score: 0,
                        status: true,
                    },
                    user2: {
                        name: '',
                        photoUrl: '',
                        score: 0,
                        status: true,
                    },
                },
            ],
            semifinals: [
                {
                    user1: {
                        name: '',
                        photoUrl: '',
                        score: 0,
                        status: true,
                    },
                    user2: {
                        name: '',
                        photoUrl: '',
                        score: 0,
                        status: true,
                    },
                },
            ],
            finals: [
                {
                    user1: {
                        name: '',
                        photoUrl: '',
                        score: 0,
                        status: true,
                    },
                    user2: {
                        name: '',
                        photoUrl: '',
                        score: 0,
                        status: true,
                    },
                },
            ],
        },
    });
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        const data = localStorage.getItem('tournaments');
        const tournaments: LocalPlayersProps[] = data ? JSON.parse(data) : [];
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
            setTournamentData(tournament);
            const updatedData = JSON.stringify(tournaments);
            localStorage.setItem('tournaments', updatedData);
        } else {
            router.back();
        }
    }, [pathname, router, localStorage]);

    useEffect(() => {
        if (tournamentData) {
            const data = {
                side1: {
                    index: 1,
                    quarterfinals: [
                        {
                            user1: {
                                name: tournamentData.data.quatre_final.match1.user1.name,
                                photoUrl: tournamentData.data.quatre_final.match1.user1.photoUrl,
                                score: 0,
                                status: true,
                            },
                            user2: {
                                name: tournamentData.data.quatre_final.match1.user2.name,
                                photoUrl: tournamentData.data.quatre_final.match1.user2.photoUrl,
                                score: 0,
                                status: true,
                            },
                        },
                        {
                            user1: {
                                name: tournamentData.data.quatre_final.match2.user1.name,
                                photoUrl: tournamentData.data.quatre_final.match2.user1.photoUrl,
                                score: 0,
                                status: true,
                            },
                            user2: {
                                name: tournamentData.data.quatre_final.match2.user2.name,
                                photoUrl: tournamentData.data.quatre_final.match2.user2.photoUrl,
                                score: 0,
                                status: true,
                            },
                        },
                    ],
                    semifinals: [
                        {
                            user1: {
                                name: tournamentData.data.semi_final.match1.user1.name,
                                photoUrl: tournamentData.data.semi_final.match1.user1.photoUrl,
                                score: 0,
                                status: true,
                            },
                            user2: {
                                name: tournamentData.data.semi_final.match1.user2.name,
                                photoUrl: tournamentData.data.semi_final.match1.user2.photoUrl,
                                score: 0,
                                status: true,
                            },
                        },
                    ],
                    finals: [
                        {
                            user1: {
                                name: tournamentData.data.final.match1.user1.name,
                                photoUrl: tournamentData.data.final.match1.user1.photoUrl,
                                score: 0,
                                status: true,
                            },
                            user2: {
                                name: '',
                                photoUrl: '',
                                score: 0,
                                status: true,
                            },
                        },
                    ],
                },
                side2: {
                    index: 2,
                    quarterfinals: [
                        {
                            user1: {
                                name: tournamentData.data.quatre_final.match3.user1.name,
                                photoUrl: tournamentData.data.quatre_final.match3.user1.photoUrl,
                                score: 0,
                                status: true,
                            },
                            user2: {
                                name: tournamentData.data.quatre_final.match3.user2.name,
                                photoUrl: tournamentData.data.quatre_final.match3.user2.photoUrl,
                                score: 0,
                                status: true,
                            },
                        },
                        {
                            user1: {
                                name: tournamentData.data.quatre_final.match4.user1.name,
                                photoUrl: tournamentData.data.quatre_final.match4.user1.photoUrl,
                                score: 0,
                                status: true,
                            },
                            user2: {
                                name: tournamentData.data.quatre_final.match4.user2.name,
                                photoUrl: tournamentData.data.quatre_final.match4.user2.photoUrl,
                                score: 0,
                                status: true,
                            },
                        },
                    ],
                    semifinals: [
                        {
                            user1: {
                                name: tournamentData.data.semi_final.match2.user1.name,
                                photoUrl: tournamentData.data.semi_final.match2.user1.photoUrl,
                                score: 0,
                                status: true,
                            },
                            user2: {
                                name: tournamentData.data.semi_final.match2.user2.name,
                                photoUrl: tournamentData.data.semi_final.match2.user2.photoUrl,
                                score: 0,
                                status: true,
                            },
                        },
                    ],
                    finals: [
                        {
                            user1: {
                                name: tournamentData.data.final.match1.user2.name,
                                photoUrl: tournamentData.data.final.match1.user2.photoUrl,
                                score: 0,
                                status: true,
                            },
                            user2: {
                                name: '',
                                photoUrl: '',
                                score: 0,
                                status: true,
                            },
                        },
                    ],
                },
            };
            setFiltredTournamentData(data);
        }
    }, [tournamentData]);

    return (
        <div className="container-fluid vh-100 p-0 m-0" style={{ overflow: 'auto' }}>
            <div>
                <TournamentLobby {...filtredTournamentData} />
            </div>
            <div className="container-fluid d-flex ">
                <div className="conatiner_t">
                    <h1>Local Tournament Page</h1>
                    <pre>{JSON.stringify(tournamentData, null, 2)}</pre>
                </div>
                <div className="conatiner_t1">
                    <h1>Local Tournament Page</h1>
                    <pre>{JSON.stringify(filtredTournamentData, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
};

export default function () {
    return <LocalTournamentPage />;
}
