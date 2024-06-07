import styles from '@/components/TournamentOngoing/styles.module.css';
import { GetPlayerImageTitleTypes, UserTypes } from '@/lib/tournament-ongoing-type/ongoingTypes';

function GetPlayerImageTitle({
    p1 = 'coming soon',
    imgWidth,
    imgHeight,
    fontSize = '1rem',
    imageSrc = '',
}: GetPlayerImageTitleTypes) {
    return (
        <div className={`row justify-content-center align-items-center p-0 m-0 `} style={{ width: `${imgWidth}` }}>
            <div className="col   order-0 p-2 m-0">
                {imageSrc === '' ? (
                    <div
                        className={`${fontSize !== '1rem' ? styles.player_image : styles.player_image_small}`}
                        style={{ width: `${imgWidth}`, height: `${imgHeight}`, backgroundColor: 'var(--clr--white)' }}
                    ></div>
                ) : (
                    <img
                        className={`${fontSize !== '1rem' ? styles.player_image : styles.player_image_small}`}
                        src={imageSrc}
                        alt="profile photo"
                        style={{ width: `${imgWidth}`, height: `${imgHeight}` }}
                    />
                )}
            </div>
            <div className="col order-1 col-sm-12  p-0 m-0 align-items-center " style={{ width: `${imgWidth}` }}>
                <marquee
                    className={`text-center valo-font p-1`}
                    style={{ fontSize: `${fontSize}`, width: `${imgWidth}` }}
                >
                    {p1}
                </marquee>
            </div>
        </div>
    );
}

function LiveTournamentMatches({ user1, user2 }: UserTypes) {
    return (
        <div className={`row flex-wrap p-0 m-0  justify-content-center ${styles.live_wrapper}`}>
            <div className="row text-center p-1 m-1 ">
                <h3 className="col itim-font align-self-end">Live Match</h3>
            </div>
            {/* <div className="row text-center p-1 m-1 ">
                <h3 className={`col ${styles.match_title} text-nowrap`}>DANCE BATTLE</h3>
            </div> */}
            <div className="row text-center flex-wrap p-4 m-1 justify-content-center ">
                <div className="col-sm-4 d-flex justify-content-center order-0 align-self-center  ">
                    <GetPlayerImageTitle p1={user1.name} imgWidth="190px" imgHeight="190px" fontSize="2rem" />
                </div>
                <div className={`col-sm-4 d-flex justify-content-center order-1 align-self-center ${styles.vs_text} `}>
                    <p className={`valo-font ${styles.match_score}  `}>{user1.score} - {user2.score}</p>
                </div>
                <div className="col-sm-4 d-flex justify-content-center order-2 align-self-center ">
                    <GetPlayerImageTitle p1={user2.name} imgWidth="190px" imgHeight="190px" fontSize="2rem" />
                </div>
            </div>
        </div>
    );
}

export { LiveTournamentMatches, GetPlayerImageTitle };
