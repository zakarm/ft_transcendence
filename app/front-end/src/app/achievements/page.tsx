'use client';

import React from 'react';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import styles from './styles.module.css';
import Cookies from 'js-cookie';
import NavBar from '@/components/NavBar/NavBar';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: React.DetailedHTMLProps<React.HTMLAttributes<React.ElementType>, React.ElementType>;
        }
    }
}

interface Props {
    title?: string;
    subTitle?: string;
    imageURL?: string;
    achieved?: boolean;
}

type AchievementsType = {
    [key: string]: {
        [key: string]: boolean;
    };
};

type AchievementsProps = {
    achievements: Partial<AchievementsType>;
    choosenTab: string;
};

interface RenderBadgesProps {
    content: {
        title: string;
        subTitle: string;
        imageURL: string;
        achieved: any;
    }[];
}

type AchivProps = {
    choosenTab: string;
    achievements: Partial<AchievementsType>;
    setAchievements: Dispatch<SetStateAction<Partial<AchievementsType>>>;
};

const AchievementsProgressBar: React.FC<AchievementsProps> = React.memo(
    ({ achievements, choosenTab }: AchievementsProps) => {
        let achivementsUnlockedCount: number = 0;
        let totalUnlocked: number = 0;
        Object.values(achievements).map((value) => {
            if (value) {
                Object.values(value).map((v) => {
                    if (v === true) {
                        achivementsUnlockedCount += 1;
                    }
                    totalUnlocked++;
                });
            }
        });

        const unlockedAchievements: number =
            choosenTab === 'All'
                ? Math.ceil((achivementsUnlockedCount / totalUnlocked) * 100)
                : choosenTab === 'Match' && achievements.match
                ? Math.ceil(
                      (Object.values(achievements.match).filter((value) => value === true).length /
                          Object.entries(achievements.match).length) *
                          100
                  )
                : choosenTab === 'Tournament' && achievements.tournament
                ? Math.ceil(
                      (Object.values(achievements.tournament).filter((value) => value === true).length /
                          Object.entries(achievements.tournament).length) *
                          100
                  )
                : 0;
        return (
            <>
                <div className="col-12 d-flex">
                    <div
                        className={`${styles.progress} progress`}
                        role="progressbar"
                        aria-label="Animated striped example"
                        aria-valuenow={75}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        <div
                            className={`${styles.progress_bar} itim-font progress-bar`}
                            style={{ width: `${unlockedAchievements}%` }}
                        >
                            {unlockedAchievements}%
                        </div>
                    </div>
                    <span className="valo-font ms-2 p-0">100%</span>
                </div>
            </>
        );
    },
);

const AchivementCard: React.FC<Props> = React.memo(({ title, subTitle, imageURL, achieved }: Props) => {
    return (
        <>
            <div
                className={`${styles.card_container} ${
                    achieved ? styles.achived : styles.not_achived
                } row p-0 m-1 align-items-center justify-content-between`}
            >
                <div className={`row ${styles.cardHolder} align-items-center m-0 p-0`}>
                    <div className={`${styles.right_subcard} col-8 p-3 m-0 `}>
                        <div className="row p-0 m-0 h-25 w-100">
                            <h3 className={`${styles.title} valo-font col d-flex align-items-center p-0 m-0`}>
                                {title}
                            </h3>
                        </div>
                        <div className="row p-0 m-0 mt-1 h-50 w-100">
                            <p className={`${styles.font_size} itim-font col-12 p-2`}>{subTitle}</p>
                        </div>
                        <div className="row p-0 m-0 mt-1 h-25 w-100">
                            <h3 className={`col d-flex align-items-end valo-font ${styles.achieved_text}`}>
                                {achieved ? 'ACHIEVED' : ''}
                            </h3>
                        </div>
                    </div>
                    <div className={`col-4 p-0 m-0`}>
                        <div className={`row p-0 m-0`}>
                            <div className={`col`}>
                                <img className={`${styles.achiv_img}`} src={imageURL} alt={title}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

const RenderBadges: React.FC<RenderBadgesProps> = React.memo(({ content }: RenderBadgesProps) => {
    return (
        <div className={`${styles.achi_container} row p-1 m-1`}>
            {content.map(({ title, subTitle, imageURL, achieved }) => {
                return (
                    <div
                        className="col-12 col-md-6 col-xxl-4 d-flex justify-content-center"
                        key={title}
                    >
                        <AchivementCard
                            title={title}
                            subTitle={subTitle}
                            imageURL={imageURL}
                            achieved={achieved}
                        ></AchivementCard>
                    </div>
                );
            })}
        </div>
    );
});

const Achievements: React.FC<AchivProps> = React.memo(({ choosenTab, achievements, setAchievements }: AchivProps) => {
    const access = Cookies.get('access');

    useEffect(() => {
        const getAchievements = async () => {
            try {
                const csrftoken = Cookies.get('csrftoken') || '';
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/achievements`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${access}`, 'X-CSRFToken': csrftoken },
                });

                const data = await response.json();
                setAchievements(data);
            } catch (error) {
                console.log('An unexpected error happened:', error);
            }
        };
        getAchievements();
    }, []);

    const badgeContent = [
        // TOURNAMENT achievements
        {
            title: 'EARLY BIRD',
            subTitle: 'Win a match within the first three minutes',
            imageURL: '/assets/images/achievement/achiv_tourn1.png',
            achieved: achievements.tournament ? achievements.tournament['early'] : false,
        },
        {
            title: 'GRAND SLAM',
            subTitle: 'Win three consecutive tournaments',
            imageURL: '/assets/images/achievement/achiv_tourn4.png',
            achieved: achievements.tournament ? achievements.tournament['slam'] : false,
        },
        {
            title: 'TRIPLE THREAT',
            subTitle: 'Score a hat-trick (three consecutive points) at least twice in a match',
            imageURL: '/assets/images/achievement/achiv_tourn2.png',
            achieved: achievements.tournament ? achievements.tournament['triple'] : false,
        },
        {
            title: 'FRONTRUNNER',
            subTitle: 'Reach the finals of the tournament',
            imageURL: '/assets/images/achievement/achiv_tourn3.png',
            achieved: achievements.tournament ? achievements.tournament['front'] : false,
        },
        // MATCH GAME achievements
        {
            title: 'IRON DEFENSE',
            subTitle: 'Win a game without letting your opponent score more than five points',
            imageURL: '/assets/images/achievement/achiv_match4.png',
            achieved: achievements.match ? achievements.match['iron'] : false,
        },
        {
            title: 'SPEEDY VICTORY',
            subTitle: 'Win a game with a score of 7-0 within three minutes',
            imageURL: '/assets/images/achievement/achiv_match1.png',
            achieved: achievements.match ? achievements.match['speedy'] : false,
        },
        {
            title: 'LAST-MINUTE COMEBACK',
            subTitle: 'Win a game after being down by five points',
            imageURL: '/assets/images/achievement/achiv_match2.png',
            achieved: achievements.match ? achievements.match['last'] : false,
        },
        {
            title: 'TABLE KING/QUEEN',
            subTitle: 'Win ten games in a row without losing',
            imageURL: '/assets/images/achievement/achiv_match3.png',
            achieved: achievements.match ? achievements.match['king'] : false,
        },
    ];

    return (
        <>
            {choosenTab === 'All' ? (
                <RenderBadges content={badgeContent} />
            ) : choosenTab === 'Match' ? (
                <RenderBadges content={badgeContent.slice(4, 8)} />
            ) : (
                <RenderBadges content={badgeContent.slice(0, 4)} />
            )}
        </>
    );
});

function AchievementsPage() {
    const options = ['All', 'Tournament', 'Match'];
    const [choosenTab, setChoosenTab] = useState<string>('All');
    const [achievements, setAchievements] = useState<Partial<AchievementsType>>({});

    return (
        <div className={`${styles.wrapper} container-fluid vh-100`}>
            <div className="row p-0 m-0 mt-4">
                <div className="col">
                    <h1 className="valo-font col-6">ACHIEVEMENTS</h1>
                </div>
            </div>
            <div className="row p-0 m-0 mt-4">
                <AchievementsProgressBar achievements={achievements} choosenTab={choosenTab}></AchievementsProgressBar>
            </div>
            <div className="row p-0 mt-4">
                <div className="col">
                    <NavBar options={options} setChoosenTab={setChoosenTab} />
                </div>
            </div>
            <div className={`row p-1 mt-4 h-75`}>
                <Achievements
                    choosenTab={choosenTab}
                    achievements={achievements}
                    setAchievements={setAchievements}
                ></Achievements>
            </div>
        </div>
    );
}

export default AchievementsPage;
