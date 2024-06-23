'use client';

import React, { useState, useEffect, useRef } from 'react';
import './Tournament.css';
import styles from './styles.module.css';
import NavBar from '@/components/NavBar/NavBar';
// import { TournamentsData } from '@/app/api/testTournament/route';
import { RemoteTournamentForm } from '@/components/TournamentForm/remoteForm';
import { LocalTournamentForm } from '@/components/TournamentForm/localForm';
import TournamentCard from '@/components/TournamentCard/TournamentCard';
import { LocalTournamentProps } from '@/types/game/Tournament';
import TournamentOngoing from '@/components/TournamentOngoing/tournamentOngoing';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify'

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

interface   RemoteTournamentHTMLTypes {
    obj : TournamentDetails;
    currentTab : string;
    setTournamentID : React.Dispatch<React.SetStateAction<string>>;
}

/********** Utils */

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

/********** Remote Tournaments */

async function fetchTournamentsData(): Promise<TournamentsData | null> {
    const getData = async () => {
        const access: string | undefined = Cookies.get('access');
        if (access) {
            try {
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
            } catch (error) {
                toast.error("Error : cannot get data");
            }
        }
        return null;
    };

    return getData();
}

function    RemoteTournamentHTML(
    { obj, currentTab, setTournamentID } : RemoteTournamentHTMLTypes)
: React.JSX.Element {
    return (
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
                id={obj.tournament_id.toString()}
                pageUrl={`/game/Tournament/${obj.tournament_id}`}
                buttonText={obj.tournament_end === null && obj.participantsJoined === 8 ? 'WATCH': 'JOIN' }
                setTournamentID={setTournamentID}
                isDisabled={
                    ((obj.tournament_end !== null))
                    ? true : false
                }
            />
        </div>
    )
}

async function getTournamentsTabData(
    currentTab: string,
    setTournamentID: React.Dispatch<React.SetStateAction<string>>,
    setAllTournaments : React.Dispatch<React.SetStateAction<Partial<{ [key: string]: TournamentDetails; }>>>
): Promise<React.JSX.Element[]> {
    let data : TournamentsData | null = await fetchTournamentsData();
    const tournamentCards: React.JSX.Element[] = [];
    if (data) {
        data = rename_keys_to_match_tab_options(data);
        setAllTournaments(data['All']);
        Object.values(data[currentTab]).map((obj) => {
            tournamentCards.push(
                RemoteTournamentHTML({obj, currentTab, setTournamentID})
            );
        });
    }

    return tournamentCards;
}

/********** Local Tournaments */

function    getLocalTournamentFromStorage() {
    const data = localStorage.getItem('tournaments');
    let tournaments: LocalTournamentProps[] = [];
    if (data) {
        try {
            tournaments = JSON.parse(data);
        } catch (error) {
            console.error('Error parsing JSON data from localStorage:', error);
        }
    }
    return tournaments
}

function    LocalTournamentHTML(value : LocalTournamentProps, index : number) : React.JSX.Element {
    return (
        <div key={value.tournament_name as string}>
            <TournamentCard
                name={value.tournament_name as string}
                date={value.date as string}
                participantsJoined={value.Participants as number}
                imageUrl={value.tournamentImage as string}
                id={index.toString()}
                pageUrl={`/game/LocalTournament/${index}`}
                buttonText="GO"
            />
        </div>
    )
}

function renderLocalTournaments(setLocalTournaments: React.Dispatch<React.SetStateAction<React.JSX.Element[]>>) {
    const tournamentCards: React.JSX.Element[] = [];
    let tournaments: LocalTournamentProps[] = getLocalTournamentFromStorage();

    tournaments.forEach((value, index) => {
        tournamentCards.push(
            LocalTournamentHTML(value, index)
        );
    });

    setLocalTournaments(tournamentCards);
}

/********** Search Bar */

interface   findNeedleInHaystackTypes extends RemoteTournamentHTMLTypes {
    haystack : unknown[];
    needle : string;
}

function    findNeedleInHaystack(
    { haystack , needle, currentTab, setTournamentID } : findNeedleInHaystackTypes)
: React.JSX.Element[] {
    const   tournamentCards : React.JSX.Element[] = [];
    let     filteredArray : unknown[] = [];

    if (haystack) {
        filteredArray = haystack.filter((val) => {
            if (val && typeof val === 'object' && 'tournament_name' in val) {
                if ((val.tournament_name as string).includes(needle)) {
                    return !!val.tournament_name;
                }
            }
        });
    }

    filteredArray.map((obj, index) => {
        if (obj && typeof obj === 'object') {
            if ("Participants" in obj) {
                tournamentCards.push( LocalTournamentHTML(obj as LocalTournamentProps, index) )
            } else {
                tournamentCards.push( RemoteTournamentHTML({obj, currentTab, setTournamentID} as RemoteTournamentHTMLTypes) );
            }
        }
    })
    console.log(filteredArray);
    return tournamentCards;
    
}

/********** Main Component */

const Tournament: React.FC = () => {
    /************ used for NavBar */
    const NavBarOptions: string[] = ['All', 'Ongoing', 'Completed', 'My Tournament', 'Local'];
    /************ used to decide which tab to render */
    const [choosenTab, setChoosenTab] = useState<string>('All');
    /************ holds the JSX elements that will be rendered */
    const [tournamentsToRender, setTournamentsToRender] = useState<React.JSX.Element[]>([]);
    const [tournamentsToRenderSearch, setTournamentsToRenderSearch] = useState<React.JSX.Element[]>([]);
    /************ used to rerender localTournament */
    const [localTournaments, setLocalTournaments] = useState<React.JSX.Element[]>([]);
    const [rerenderLocalTourn, setRerenderLocalTourn] = useState<boolean>(false);
    /************ used to capture id from pageURL for TournamentOngoing cards */
    const [tournamentID, setTournamentID] = useState<string>('');
    /************ used to style content */
    const leftStyle: string = 'col-12 col-xl-5 col-xxl-7 order-2 order-xl-1 d-flex flex-wrap justify-content-center';
    const rightStyle: string = 'col-12 col-xl-5 order-1 order-xl-2 d-flex justify-content-center';
    /************ used for search bar */
    const [ allTournaments, setAllTournaments ] = useState<Partial<{ [key: string]: TournamentDetails }>>({});
    const [isSearching, setIsSearching] = useState<Boolean>(false);

    /************  Fetches all tournament data from the backend */
    useEffect(() => {
        if (choosenTab !== 'Local') {
            const data = async () => {
                const promise = await getTournamentsTabData(choosenTab, setTournamentID, setAllTournaments);
                setTournamentsToRender(choosenTab === 'All' ? promise.concat(localTournaments) : promise);
            };
            data();
        }
    }, [
        choosenTab, // cause re-render when switching tab
        isSearching, // cause re-render when search is finished
        localTournaments // cause re-render to display local tournament in "All" tab
    ]);

    /************ Renders Local Tournaments from Session Storage inside localTournaments state */
    useEffect(() => {
        renderLocalTournaments(setLocalTournaments);
    }, [rerenderLocalTourn]);

    /************ handles Local Tournament in Session Storage */
    useEffect(() => {
        window.addEventListener<'storage'>('storage', () => {
                setRerenderLocalTourn((prev: boolean) => (prev = !prev));
        });
    }, []);

    /************ Search Bar */
    const   searchTournament = (needle : string) => {
        if (needle == '') {
            setIsSearching(false);
            return ;
        }
        const   haystack = [...Object.values(allTournaments), ...getLocalTournamentFromStorage()];
        let     toRender : React.JSX.Element[] = [];
        const   currentTab = choosenTab
        toRender = findNeedleInHaystack({haystack, needle, currentTab, setTournamentID} as findNeedleInHaystackTypes);
        setTournamentsToRenderSearch(toRender);
        setIsSearching(true);
    }

    return (
        <div className="containerTournament">
            <div className="Tournament_title">TOURNAMENT</div>
            <div className="Tournament_search">
                <input
                    className="p-3 itim-font"
                    style={{color : "#feebeb"}}
                    type="search"
                    name=""
                    id="search_input"
                    placeholder="Search Tournament"
                    onChange={(e : React.ChangeEvent<HTMLInputElement>) => searchTournament(e.target.value)}
                />
            </div>
            <div className="Tournament_nav_bar">
                <NavBar options={NavBarOptions} setChoosenTab={setChoosenTab} />
            </div>
            <section className={`Tournament_section p-0 m-0 ${!isSearching ? styles.visible : styles.hide}`}>
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
                            <LocalTournamentForm setRerender={setRerenderLocalTourn} />
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
            <section
                className={`text-center itim-font Tournament_section p-0 m-0 ${!isSearching ? styles.hide : styles.visible}`}
                style={{color : "#feebeb"}}
            >
                    <div className="col d-flex flex-wrap justify-content-center">
                    {
                        tournamentsToRenderSearch.length > 0 ? tournamentsToRenderSearch : "Nothing Found"

                    }
                    </div>
            </section>
        </div>
    );
};

export default Tournament;
