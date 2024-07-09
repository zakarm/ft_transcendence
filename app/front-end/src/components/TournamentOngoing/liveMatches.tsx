import styles from '@/components/TournamentOngoing/styles.module.css';
import { GetPlayerImageTitleTypes, UserTypes } from '@/lib/tournament-ongoing-type/ongoingTypes';
import { ChangeEvent } from 'react';

function GetPlayerImageTitle({
  p1 = 'coming soon',
  imgWidth,
  imgHeight,
  fontSize = '1rem',
  imageSrc = '',
}: GetPlayerImageTitleTypes) {
  const handleError = (event: ChangeEvent<HTMLImageElement>) => {
    event.target.src = '/assets/images/gameProfiles/default_profile.png';
  };

  return (
    <div className={`row justify-content-center  p-0 m-0 `} style={{ width: `${imgWidth}` }}>
      <div className="col order-0 p-2 m-0">
        <img
          className={`${fontSize !== '1rem' ? styles.player_image : styles.player_image_small}`}
          src={imageSrc}
          alt="profile photo"
          style={{ width: `${imgWidth}`, height: `${imgHeight}` }}
          onError={handleError}
        />
      </div>
      <div className="col order-1 col-sm-12  p-0 m-0  " style={{ width: `${imgWidth}` }}>
        {p1.length > 6 ? (
          <marquee
            className={`text-center valo-font  m-0 p-0`}
            style={{ fontSize: `${fontSize}`, width: `${imgWidth}` }}
          >
            {p1}
          </marquee>
        ) : (
          <div
            className={`text-center valo-font  m-0 p-0 mb-2`}
            style={{ fontSize: `${fontSize}`, width: `${imgWidth}` }}
          >
            {p1}
          </div>
        )}
      </div>
    </div>
  );
}

function LiveTournamentMatches({ user1, user2 }: UserTypes) {
  return (
    <div className={`row flex-wrap p-0 m-0  justify-content-center ${styles.live_wrapper}`}>
      <div className={`row text-center p-1 m-1  ${styles.live_match_text}`}>
        <h3 className="col itim-font align-self-end">{user1.name !== '' ? 'Live Match' : 'No live matches'}</h3>
      </div>
      <div className={`row text-center flex-wrap p-4 m-1 justify-content-center  ${styles.live_players_match}`}>
        <div
          className={`col-sm-4 d-flex justify-content-center order-0 align-self-center  ${styles.live_player_container}`}
        >
          <GetPlayerImageTitle
            p1={user1.name}
            imgWidth="190px"
            imgHeight="190px"
            fontSize="2rem"
            imageSrc={user1.photoUrl}
          />
        </div>
        <div className={`col-sm-4 d-flex justify-content-center order-1 align-self-center ${styles.vs_text} `}>
          <p className={`valo-font ${styles.match_score}  `}>
            {user1.score} - {user2.score}
          </p>
        </div>
        <div
          className={`col-sm-4 d-flex justify-content-center order-2 align-self-center  ${styles.live_player_container}`}
        >
          <GetPlayerImageTitle
            p1={user2.name}
            imgWidth="190px"
            imgHeight="190px"
            fontSize="2rem"
            imageSrc={user2.photoUrl}
          />
        </div>
      </div>
    </div>
  );
}

export { LiveTournamentMatches, GetPlayerImageTitle };
