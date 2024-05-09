'use client'

import React from 'react'
import { useEffect, useState, useContext, createContext } from 'react'
import styles from './styles.module.css'
import Cookies from 'js-cookie'

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

function    AchievementsProgressBar() {
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

function    AchivementCard({title, subTitle, imageURL, achieved} : Props) {
    return (
        <>
            <div className={`${styles.card_container} ${achieved ? styles.achived : styles.not_achived} row p-0 m-1 align-items-center justify-content-between`}>
                <div className={`row ${styles.cardHolder} align-items-center m-0 p-0`}>

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

function    RenderBadges({ content } : { content: { title: string; subTitle: string; imageURL: string; achieved: any; }[]; }) {
    return (
        <div className={`${styles.achi_container} row p-1 m-1`}>
            {content.map(({title, subTitle, imageURL, achieved}) => {
                return(
                <div
                    className="col-12 col-md-6 col-xxl-4 d-flex justify-content-center justify-content-md-start"
                    key={title}>
                    <AchivementCard
                        title={title}
                        subTitle={subTitle}
                        imageURL={imageURL}
                        achieved={achieved}>
                    </AchivementCard>
                </div>
            );
        })}
        </div>
    );
}


function    Achievements() {
    
    const [achievements, setAchievements] = useState<Record<string, boolean>>({});
    const   access = Cookies.get('access');

    useEffect(() => {
        const   getAchievements = async () => {
            try {
                const response = await fetch('', {
                    method : "GET",
                    headers : { Authorization : `Bearer ${access}`}
                });
                
                // const data = await response.json();
                setAchievements({
                    challenger: true,
                    rivalry: true,
                    legend: false,
                    early: false,
                    triple: true,
                    front: false,
                    speedy: false,
                    last: true,
                    king: true
                });
            }
            catch (error) {
                console.log('An unexpected error happened:', error)
            }
        }
        getAchievements();
    }, [])

    const   badgeContent = [
        // MATCH achievements
        {title : "AI CHALLENGER", subTitle : "Defeat the AI bot at the highest difficulty level", imageURL : "achiv_ai1.png", achieved : achievements['challenger']},
        {title : "ROBO-RIVALRY", subTitle : "Engage in a match against the AI bot lasting longer than 20 minutes and win", imageURL : "achiv_ai2.png", achieved : achievements['rivalry']},
        {title : "I'M A LEGEND", subTitle : "Defeat the AI bot with a score of 11-0", imageURL : "achiv_ai3.png", achieved : achievements['legend']},
        // TOURNAMENT achievements
        { title: "EARLY BIRD", subTitle: "Win a match within the first three minutes", imageURL: "achiv_tourn1.png", achieved: achievements['early'] },
        { title: "TRIPLE THREAT", subTitle: "Score a hat-trick (three consecutive points) at least twice in a match", imageURL: "achiv_tourn2.png", achieved: achievements['triple'] },
        { title: "FRONTRUNNER", subTitle: "Reach the finals of the tournament", imageURL: "achiv_tourn3.png", achieved: achievements['front'] },
        // MATCH GAME achievements
        { title: "SPEEDY VICTORY", subTitle: "Win a game with a score of 11-0 within three minutes", imageURL: "achiv_match1.png", achieved: achievements['speedy'] },
        { title: "LAST-MINUTE COMEBACK", subTitle: "Win a game after being down by five points", imageURL: "achiv_match2.png", achieved: achievements['last'] },
        { title: "TABLE KING/QUEEN", subTitle: "Win ten games in a row without losing", imageURL: "achiv_match3.png", achieved: achievements['king'] },
    ]

    return (
        <>
            <RenderBadges content={badgeContent} />
        </>
    );
}

function AchievementsPage() {
    return (
        <div className={`${styles.wrapper} container-fluid vh-100`}>
            <div className="row p-0 m-0 mt-4">
                <div className="col">
                    <h1 className="valo-font col-6">ACHIEVEMENTS</h1>
                </div>
            </div>
            <div className="row p-0 m-0 mt-4">
                <AchievementsProgressBar></AchievementsProgressBar>
            </div>
            <div className="row p-0 mt-4">
                <div className="col">
                    <h2>NavBar</h2>
                </div>
            </div>
            <div className={` row p-1 mt-4 h-75`}>
                <Achievements></Achievements>
            </div>
        </div>
    );
}

export default AchievementsPage;