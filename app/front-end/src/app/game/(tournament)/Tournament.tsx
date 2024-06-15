'use client';

import React, { useState, useEffect } from 'react';
import './Tournament.css';
import NavBar from '@/components/NavBar/NavBar';
// import { TournamentsData } from '@/app/api/testTournament/route';
import { RemoteTournamentForm } from '@/components/TournamentForm/remoteForm';
import { LocalTournamentForm } from '@/components/TournamentForm/localForm';
import TournamentCard from '@/components/TournamentCard/TournamentCard';
import { LocalTournamentProps } from '@/types/game/Tournament';
import TournamentOngoing from '@/components/TournamentOngoing/tournamentOngoing';
import Cookies from 'js-cookie';

type TournamentDetails = {
    tournament_name: string;
    tournament_start: string;
    tournament_end: string;
    image_url: string;
    pageUrl: string;
    date: string;
    crated_by_me: boolean;
    tournament_id: number;
    game_difficulty: number;
    participantsJoined: number;
};

type TournamentsData = {
    [key: string]: {
        [key: string]: TournamentDetails;
    };
};

async function fetchTournamentsData(): Promise<TournamentsData | null> {
    const getData = async () => {
        const access: string | undefined = Cookies.get('access');
        if (access) {
            const promise = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/tournaments`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access}`,
                    'content-type': 'application/json',
                },
            });

            if (promise.ok) {
                const data: TournamentsData = await promise.json();
                return data;
            }
        }
        return null;
    };

    return getData();
}

function rename_keys_to_match_tab_options(data: TournamentsData) {
    data['All'] = data['all_tournaments'];
    data['Ongoing'] = data['ongoing_tournaments'];
    data['Completed'] = data['completed_tournaments'];
    data['My Tournament'] = data['my_tournaments'];
    delete data['all_tournaments'];
    delete data['ongoing_tournaments'];
    delete data['completed_tournaments'];
    delete data['my_tournaments'];

    return data;
}

function formatDate(str: string): string {
    const date = new Date(str);
    const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const newTime: string = Intl.DateTimeFormat('en-US', timeOptions).format(date);
    const newDate: string = Intl.DateTimeFormat('en-US', dateOptions).format(date);
    return `${newDate}, ${newTime}`;
}

// all_tournaments, ongoing_tournaments, completed_tournaments, my_tournaments
async function getTournamentsTabData(
    currentTab: string,
    setTournamentID: React.Dispatch<React.SetStateAction<string>>,
): Promise<React.JSX.Element[]> {
    let data = await fetchTournamentsData();
    const tournamentCards: React.JSX.Element[] = [];

    if (data) {
        data = rename_keys_to_match_tab_options(data);
        Object.values(data[currentTab]).map((obj) => {
            tournamentCards.push(
                <div key={obj.tournament_name}>
                    <TournamentCard
                        key={obj.tournament_name}
                        name={obj.tournament_name}
                        date={
                            currentTab === 'Completed'
                                ? formatDate(obj.tournament_end)
                                : formatDate(obj.tournament_start)
                        }
                        participantsJoined={obj.participantsJoined}
                        imageUrl={obj.image_url}
                        pageUrl={obj.pageUrl}
                        buttonText={currentTab === 'Ongoing' ? 'WATCH' : 'JOIN'}
                        setTournamentID={setTournamentID}
                    />
                </div>,
            );
        });
    }

    return tournamentCards;
}

function renderLocalTournaments(setLocalTournaments: React.Dispatch<React.SetStateAction<React.JSX.Element[]>>) {
    const tournamentCards: React.JSX.Element[] = [];
    const data = localStorage.getItem('tournaments');
    let tournaments: LocalTournamentProps[] = [];

    if (data) {
        try {
            tournaments = JSON.parse(data);
        } catch (error) {
            console.error('Error parsing JSON data from localStorage:', error);
            tournaments = [];
        }
    }

    tournaments.forEach((value, index) => {
        tournamentCards.push(
            <div key={value.tournament_name as string}>
                <TournamentCard
                    name={value.tournament_name as string}
                    date={value.date as string}
                    participantsJoined={value.Participants as number}
                    imageUrl={value.tournamentImage as string}
                    pageUrl={`/game/LocalTournament/${index}`}
                    buttonText="GO"
                />
            </div>,
        );
    });

    setLocalTournaments(tournamentCards);
}

const Tournament: React.FC = () => {
    /* used for NavBar */
    const NavBarOptions: string[] = ['All', 'Ongoing', 'Completed', 'My Tournament', 'Local'];
    /* used to decide which tab to render */
    const [choosenTab, setChoosenTab] = useState<string>('All');
    /* holds the JSX elements that will be rendered */
    const [tournamentsToRender, setTournamentsToRender] = useState<React.JSX.Element[]>([]);
    /* used to rerender localTournament */
    const [localTournaments, setLocalTournaments] = useState<React.JSX.Element[]>([]);
    const [prevLocalStorageLength, setPrevLocalStorageLength] = useState<number>(localStorage.length);
    const [rerender, setRerender] = useState<boolean>(false);
    /* used to capture id from pageURL for TournamentOngoing cards */
    const [tournamentID, setTournamentID] = useState<string>('');
    /* used to style content */
    const leftStyle: string = 'col-12 col-xl-5 col-xxl-7 order-2 order-xl-1 d-flex flex-wrap justify-content-center';
    const rightStyle: string = 'col-12 col-xl-5 order-1 order-xl-2 d-flex justify-content-center';

    /*  Fetches all tournament data from the backend */
    useEffect(() => {
        if (choosenTab !== 'Local') {
            const data = async () => {
                const promise = await getTournamentsTabData(choosenTab, setTournamentID);
                setTournamentsToRender(promise);
            };
            data();
        }
    }, [choosenTab]);

    /* handles Local Tournament in Session Storage */
    useEffect(() => {
        renderLocalTournaments(setLocalTournaments);
    }, [rerender, localStorage.length]);

    /* Renders Local Tournaments from Session Storage */
    useEffect(() => {
        const test = () => {
            if (localStorage.length !== prevLocalStorageLength) {
                setRerender((prev: boolean) => (prev = !prev));
                setPrevLocalStorageLength(localStorage.length);
            }
        };
        window.addEventListener<'storage'>('storage', test);
    }, [rerender]);

    return (
        <div className="containerTournament">
            <div className="Tournament_title">TOURNAMENT</div>
            <div className="Tournament_search">
                <input className="ps-3" type="search" name="" id="" placeholder="Search Tournament" />
            </div>
            <div className="Tournament_nav_bar">
                <NavBar options={NavBarOptions} setChoosenTab={setChoosenTab} />
            </div>
            <section className="row Tournament_section p-0  m-0">
                {choosenTab === 'My Tournament' ? (
                    <>
                        <div className={leftStyle}>{tournamentsToRender}</div>
                        <div className={rightStyle}>
                            <RemoteTournamentForm />
                        </div>
                    </>
                ) : choosenTab === 'Local' ? (
                    <>
                        <div className={leftStyle}>{localTournaments}</div>
                        <div className={rightStyle}>
                            <LocalTournamentForm setRerender={setRerender} />
                        </div>
                    </>
                ) : choosenTab === 'Ongoing' ? (
                    <>
                        <div
                            className={
                                tournamentsToRender.length > 0
                                    ? `col-12 col-xl-7 col-xxl-7 order-1 p-0 m-0`
                                    : `col-12 order-1 p-0 m-0`
                            }
                        >
                            <TournamentOngoing pageUrl={tournamentID} />
                        </div>
                        <div className={`${rightStyle} flex-wrap`}>{tournamentsToRender}</div>
                    </>
                ) : (
                    <div className="col d-flex flex-wrap justify-content-center">{tournamentsToRender}</div>
                )}
            </section>
        </div>
    );
};

export default Tournament;
