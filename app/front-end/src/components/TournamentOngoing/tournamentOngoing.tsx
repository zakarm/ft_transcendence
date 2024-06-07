import { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { LiveTournamentMatches, GetPlayerImageTitle } from '@/components/TournamentOngoing/liveMatches';
import styles from '@/components/TournamentOngoing/styles.module.css';
import { CSSProperties } from 'react';
import Cookies from 'js-cookie'
import { 
    LiveMatchesTypes, 
    QuarterFinalMatchTypes, 
    SemiFinalMatchTypes,
    FinalMatchTypes }
from '@/lib/tournament-ongoing-type/ongoingTypes'

let data :  LiveMatchesTypes = {
    action :"update_live",
    data: {
        quatre_final: {
            match1: {
                user1: { name: 'chabakro', photoUrl: '/yoru.jpeg', score: 0 },
                user2: { name: 'lah', photoUrl: '/yoru.jpeg', score: 0 },
            },
            match2: {
                user1: { name: 'lah', photoUrl: '/yoru.jpeg', score: 1 },
                user2: { name: 'chabakro', photoUrl: '/yoru.jpeg', score: 0 },
            },
            match3: {
                user1: { name: 'chbeg', photoUrl: '/yoru.jpeg', score: 0 },
                user2: { name: 'rbeg', photoUrl: '/yoru.jpeg', score: 0 },
            },
            match4: {
                user1: { name: 'chabakro', photoUrl: '/yoru.jpeg', score: 0 },
                user2: { name: 'lah lah', photoUrl: '/yoru.jpeg', score: 0 },
            },
        },
        semi_final: {
            match1: { user1: { name: '', photoUrl: '', score: 0 }, user2: { name: '', photoUrl: '', score: 0 } },
            match2: { user1: { name: '', photoUrl: '', score: 0 }, user2: { name: '', photoUrl: '', score: 0 } },
        },
        final: {
            match1: { user1: { name: '', photoUrl: '', score: 0 }, user2: { name: '', photoUrl: '', score: 0 } },
        },
    }
}

let wss : WebSocket | null = null;

function    connectToSocket({ pageUrl } : { pageUrl : string }) {
    const   tournamentID : string | undefined = pageUrl.split('/').pop();
    const   access : string | undefined = Cookies.get("access");
    if (tournamentID && access) {
        try {
            
            if (wss) {
                wss.close();
                wss = null;
            };
            wss = new WebSocket(`ws://localhost:8000/ws/data/tournament/${tournamentID}?token=${access}&spect=true`);
            
            wss.onopen = () => {
                console.log("connected to socket successfully");
            }
            wss.onmessage = (event) => {
                data = event.data;
                console.log(event.data);
            }
            wss.onerror = (error) => {
                console.log(`Error : ${error}`);
            }
            wss.onclose = () => {
                console.log("closed connection");
            }
        } catch (error) {
            console.error(`Error : ${error}`);
        }

    }
}

function UpcomingMatch({ p1, p2 }: {p1 : string, p2 : string}) {
    return (
        <div className={`row p-0 m-1 justify-content-center ${styles.upcoming_match}`}>
            <div className="col-4 d-flex align-items-center justify-content-center">
                <GetPlayerImageTitle p1={p1} imgWidth='90px' imgHeight="90px"/>
            </div>
            <div className="col-2 valo-font align-self-center text-center m-2 p-1">
                <span className={`${styles.vs_text}`}>VS</span>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center">
                <GetPlayerImageTitle p1={p2} imgWidth='90px' imgHeight="90px"/>
            </div>
        </div>
    );
}

function    RenderUpcomingMatches(round : QuarterFinalMatchTypes | SemiFinalMatchTypes |  FinalMatchTypes) : JSX.Element
{
    return (
        <>
        {
            Object.keys(round).map((key) => (
                <div key={key} className="row col-xxl-6 justify-content-center p-2 m-0">
                    <UpcomingMatch p1={round[key].user1.name} p2={round[key].user2.name} />
                </div>
            ))   
        }
        </>
    )
}

function TournamentOngoing(pageUrl : {pageUrl : string}) : JSX.Element {
    const   options = ['Quarter Final', 'Semi Final', 'Final'];
    const   [currentOptionTab, setcurrentOptionTab] = useState<string>('Quarter Final');
    const MatchBackgroundStyle : CSSProperties = {
        backgroundImage : `url("/back.png")`,
        backgroundPosition : "center",
        backgroundSize : "cover",
        backgroundRepeat : "no-repeat",
        borderRadius: "25px",
        filter: "blur(2px)",
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        zIndex: "1",
    };
    // Disconnect from old socket endpoint and connect to a new one
    useEffect(() => {
        connectToSocket(pageUrl);
    }, [pageUrl])

    return (
            <>
                <section className={`row p-0 m-0 justify-content-center align-content-center ${styles.live_wrapper}`}>
                    <div className={`${styles.liveMatchContainer}`}>
                        <div className={`${styles.liveMatchBackground}`} 
                            style={MatchBackgroundStyle}
                        />
                        <div
                            className={`${styles.liveMatchInfo} row w-100 p-0 m-0 justify-content-center valo-font`}
                        >
                            <LiveTournamentMatches user1={data.data.final.match1.user1} user2={data.data.final.match1.user2}/>
                        </div>
                    </div>
                </section>
                <section className={`row p-0 m-0 ${styles.navbar}`}>
                    <div className="col">
                        <NavBar options={options} setChoosenTab={setcurrentOptionTab}/>
                    </div>
                </section>
                <section className={`row p-0 m-0 justify-content-start`}>
                    <>
                        {
                            currentOptionTab === "Quarter Final" ?
                                RenderUpcomingMatches(data.data["quatre_final"])

                            : currentOptionTab === "Semi Final" ?
                                RenderUpcomingMatches(data.data["semi_final"])

                            : currentOptionTab === "Final" ?
                                RenderUpcomingMatches(data.data["final"])
                            :
                                <></>
                        }
                    </>
                </section>
        </>
    );
}

export default TournamentOngoing;
