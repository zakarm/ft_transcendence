import styles from '@/components/TournamentOngoing/styles.module.css';

function    GetPlayerImageTitle({p1, imgWidth, fontSize="1"} : {p1 : string, imgWidth : string, fontSize ?: string}) {
    console.log(imgWidth)
    return (
        <div className={`row justify-content-center p-0 m-0 align-items-center`} style={{width : `${imgWidth}`}}>
            <div className="row p-0 m-1">
                <div className={`col d-flex justify-content-center`}>
                    <img
                        className={`${styles.player_image}`}
                        src="/profile.jpeg"
                        alt="profile photo"
                        style={{width : `${imgWidth}`, height: "100%", minWidth : '140px'}}
                    />
                </div>
            </div>
            <div className="row p-0 m-1">
                <marquee className={`col text-center valo-font p-1 ${styles.player_name}`} style={{fontSize : `${fontSize}`}}>
                    {p1}
                </marquee>
            </div>
        </div>
    );
}

function    LiveTournamentMatches() {
    return (
            <div className="col-10 flex-wrap p-0 m-0">
                <div className="row text-center p-1 m-1">
                    <h3 className="col itim-font">
                        Live Match
                    </h3>
                </div>
                <div className="row text-center p-1 m-1">
                    <h3 className={`col ${styles.match_title}`}>
                        DANCE BATTLE
                    </h3>
                </div>
                <div className="row text-center flex-wrap p-1 m-1 h-75">
                    <div className="col-12 col-sm-4 align-self-center">
                        <GetPlayerImageTitle p1="Chabakro#1" imgWidth='100%' fontSize='2rem'/>
                    </div>
                    <div className={`col-12 col-sm-4 order-1 order-sm-0 align-self-center ${styles.vs_text} `}>
                        <span className={`col valo-font ${styles.match_score} `} >
                            1 - 1
                        </span>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center">
                        <GetPlayerImageTitle p1="LAH LAH#1" imgWidth='100%' fontSize='2rem'/>
                    </div>
                </div>
            </div>
    )
}

export {LiveTournamentMatches, GetPlayerImageTitle};