import { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { LiveTournamentMatches, GetPlayerImageTitle } from '@/components/TournamentOngoing/liveMatches';
import styles from '@/components/TournamentOngoing/styles.module.css';

interface UpcomingMatchesProps {
    p1: string;
    p2: string;
}

function UpcomingMatch({ p1, p2 }: UpcomingMatchesProps) {
    return (
        <div className={`row p-0 m-1 justify-content-center ${styles.upcoming_match}`}>
            <div className="col-4 d-flex align-items-center justify-content-center">
                <GetPlayerImageTitle p1={p1} imgWidth='130px'/>
            </div>
            <div className="col-2 valo-font align-self-center text-center m-2 p-1">
                <span className={`${styles.vs_text}`}>VS</span>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center">
                <GetPlayerImageTitle p1={p2} imgWidth='130px'/>
            </div>
        </div>
    );
}

function TournamentOngoing() {
    const options = ['Quarter Final', 'Semi Final', 'Final'];
    const MatchBackgroundStyle = {
        backgroundImage : `url("../../../back.png")`,
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

    return (
        <>
            <div className={`row p-0 m-0`}>
                <section className={`row p-0 m-0 justify-content-center align-content-center ${styles.live_wrapper}`}>
                    <div className={`${styles.liveMatchContainer}`}>
                        <div className={`${styles.liveMatchBackground}`} 
                            style={MatchBackgroundStyle}
                        />
                        <div
                            className={`${styles.liveMatchInfo} row w-100 p-0 m-0 justify-content-center valo-font`}
                        >
                            <LiveTournamentMatches />
                        </div>
                    </div>
                </section>
                <section className={`row p-0 m-0   ${styles.navbar}`}>
                    <div className="col">
                        <NavBar options={options} />
                    </div>
                </section>
                <section className={`row p-0 m-0 justify-content-center`}>
                    <div className="row col-xxl-6 justify-content-center p-2 m-0">
                        <UpcomingMatch p1="CHABAKRO" p2="LAH LAH" />
                    </div>
                    <div className="row col-xxl-6 justify-content-center p-2 m-0">
                        <UpcomingMatch p1="CHABAKRO" p2="LAH LAH" />
                    </div>
                    <div className="row col-xxl-6 justify-content-center p-2 m-0">
                        <UpcomingMatch p1="CHABAKRO" p2="LAH LAH" />
                    </div>
                    <div className="row col-xxl-6 justify-content-center p-2 m-0">
                        <UpcomingMatch p1="CHABAKRO" p2="LAH LAH" />
                    </div>
                    <div className="row col-xxl-6 justify-content-center p-2 m-0">
                        <UpcomingMatch p1="CHABAKRO" p2="LAH LAH" />
                    </div>
                    <div className="row col-xxl-6 justify-content-center p-2 m-0">
                        <UpcomingMatch p1="CHABAKRO" p2="LAH LAH" />
                    </div>
                </section>
            </div>
        </>
    );
}

export default TournamentOngoing;
