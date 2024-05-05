import React from 'react'
import styles from './styles.module.css'

declare global {
    namespace JSX {
      interface IntrinsicElements {
        [elemName: string]: React.DetailedHTMLProps<React.HTMLAttributes<React.ElementType>, React.ElementType>;
      }
    }
}

interface   Props {
    title ?: string;
    subTitle ?: string;
    imageURL ?: string;
    achieved ?: boolean;
}

function    AchivementsProgressBar() {
    return (
        <>
            <div className="col-12 d-flex">
                <div
                    className={`${styles.progress} progress`}
                    role="progressbar"
                    aria-label="Animated striped example"
                    aria-valuenow={75}
                    aria-valuemin={0}
                    aria-valuemax={100}>
                        <div
                            className={`${styles.progress_bar} itim-font progress-bar`}>44%
                        </div>
                </div>
                <span className="valo-font ms-2 p-0">100%</span>
            </div>
        </>
    );
}

function    AchivementBadge({title, subTitle, imageURL, achieved} : Props) {
    return (
        <>
            <div className={`${styles.card_container} ${achieved ? styles.achived : styles.not_achived} row p-0 m-1 align-items-center justify-content-between`}>
                <div className={`row ${styles.test} align-items-center m-0 p-0`}>

                    <div className={`${styles.right_subcard} col-8 p-3 m-0 `}>
                        <div className="row p-0 m-0"> 
                            <h3 className={`${styles.title} valo-font col p-0 m-2`}>{title}</h3>
                        </div>
                        <div className="row p-0 m-0">
                            <div className="itim-font col">{subTitle}</div>
                        </div>
                        <div className="row p-0 m-0 mt-4 ">
                            <h3 className={`col valo-font ${styles.achieved_text}`}>{achieved ? "ACHIEVED" : ""}</h3>
                        </div>
                    </div>
                    <div className={`col-4 p-0 m-0`}>
                        <div className={`row p-0 m-0`}>
                            <div className={`col`}>
                                <img className={`${styles.achiv_img}`} src={imageURL}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function    Achivements() {
    return (
        <>
        {/* AI BOT */}
        <div className="row p-0 m-1">
            <div className="col-12 col-md-6 col-xxl-4 d-flex d-flex justify-content-center justify-content-md-start">
                <AchivementBadge
                    title="AI CHALLENGER"
                    subTitle="Defeat the AI bot at the highest difficulty level"
                    imageURL="achiv_ai1.png"
                    achieved={true}>
                </AchivementBadge>
            </div>
            <div className="col-12 col-md-6 col-xxl-4 d-flex d-flex justify-content-center justify-content-md-start">
                <AchivementBadge
                    title="ROBO-RIVALRY"
                    subTitle="Engage in a match against the AI bot lasting longer than 20 minutes and win"
                    imageURL="achiv_ai2.png"
                    achieved={true}>
                </AchivementBadge>
            </div>
            <div className="col-12 col-md-6 col-xxl-4 d-flex d-flex justify-content-center justify-content-md-start">
                <AchivementBadge
                    title="I'M A LEGEND"
                    subTitle="Defeat the AI bot with a score of 11-0"
                    imageURL="achiv_ai3.png"
                    achieved={false}>
                </AchivementBadge>
            </div>
        </div>
        {/* TOURNAMENT */}
        <div className="row p-0 m-1">
            <div className="col-12 col-md-6 col-xxl-4 d-flex d-flex justify-content-center justify-content-md-start">
                <AchivementBadge
                    title="EARLY BIRD"
                    subTitle="Win a match within the first three minutes"
                    imageURL="achiv_tourn1.png"
                    achieved={false}>
                </AchivementBadge>
            </div>
            <div className="col-12 col-md-6 col-xxl-4 d-flex d-flex justify-content-center justify-content-md-start">
                <AchivementBadge
                    title="TRIPLE THREAT"
                    subTitle="Score a hat-trick (three consecutive points) at least twice in a match"
                    imageURL="achiv_tourn2.png"
                    achieved={true}>
                </AchivementBadge>
            </div>
            <div className="col-12 col-md-6 col-xxl-4 d-flex d-flex justify-content-center justify-content-md-start">
                <AchivementBadge
                    title="FRONTRUNNER"
                    subTitle="Reach the finals of the tournament"
                    imageURL="achiv_tourn3.png"
                    achieved={false}>
                </AchivementBadge>
            </div>
        </div>
        {/* MATCH GAME */}
        <div className="row p-0 m-1">
            <div className="col-12 col-md-6 col-xxl-4 d-flex d-flex justify-content-center justify-content-md-start">
                <AchivementBadge
                    title="SPEEDY VICTORY"
                    subTitle="Win a game with a score of 11-0 within three minutes"
                    imageURL="achiv_match1.png"
                    achieved={false}>
                </AchivementBadge>
            </div>
            <div className="col-12 col-md-6 col-xxl-4 d-flex d-flex justify-content-center justify-content-md-start">
                <AchivementBadge
                    title="LAST-MINUTE COMEBACK"
                    subTitle="Win a game after being down by five points"
                    imageURL="achiv_match2.png"
                    achieved={false}>
                </AchivementBadge>
            </div>
            <div className="col-12 col-md-6 col-xxl-4 d-flex d-flex justify-content-center justify-content-md-start">
                <AchivementBadge
                    title="FRONTRUNNER"
                    subTitle="Reach the finals of the tournament"
                    imageURL="achiv_match3.png"
                    achieved={true}>
                </AchivementBadge>
            </div>
        </div>
        </>
    );
}

export default function() {
    return (
        <div className={`${styles.wrapper} container-fluid vh-100`}>
            <div className="row p-0 m-0 mt-5">
                <div className="col">
                    <h1 className="valo-font col-6">ACHIEVEMENTS</h1>
                </div>
            </div>
            <div className="row p-0 m-0 my-3">
                <AchivementsProgressBar></AchivementsProgressBar>
            </div>
            <div className="row p-0 m-1">
                <div className="col">
                    <h2>NavBar</h2>
                </div>
            </div>
            <div className="row p-0 m-0 h-75 align-items-center justify-content-start">
                <Achivements></Achivements>
            </div>
        </div>
    );
}