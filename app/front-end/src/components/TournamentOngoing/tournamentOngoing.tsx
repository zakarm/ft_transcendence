import { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { LiveTournamentMatches, GetPlayerImageTitle } from '@/components/TournamentOngoing/liveMatches';
import styles from '@/components/TournamentOngoing/styles.module.css';
import { CSSProperties } from 'react';
import Cookies from 'js-cookie';
import {
  LiveMatchesTypes,
  UserInfoTypes,
  RenderUpcomingMatchesTypes,
  QuarterFinalMatchTypes,
  SemiFinalMatchTypes,
  FinalMatchTypes,
} from '@/lib/tournament-ongoing-type/ongoingTypes';
import React from 'react';
import { toast } from 'react-toastify';

interface connectSocketTypes {
  pageUrl: string;
  setData: React.Dispatch<React.SetStateAction<LiveMatchesTypes>>;
}

const initData = {
  action: 'update_live',
  data: {
    quarter_final: {
      match1: {
        user1: { name: '', photoUrl: '', score: 0, status: false },
        user2: { name: '', photoUrl: '', score: 0, status: false },
      },
      match2: {
        user1: { name: '', photoUrl: '', score: 0, status: false },
        user2: { name: '', photoUrl: '', score: 0, status: false },
      },
      match3: {
        user1: { name: '', photoUrl: '', score: 0, status: false },
        user2: { name: '', photoUrl: '', score: 0, status: false },
      },
      match4: {
        user1: { name: '', photoUrl: '', score: 0, status: false },
        user2: { name: '', photoUrl: '', score: 0, status: false },
      },
    },
    semi_final: {
      match1: {
        user1: { name: '', photoUrl: '', score: 0, status: false },
        user2: { name: '', photoUrl: '', score: 0, status: false },
      },
      match2: {
        user1: { name: '', photoUrl: '', score: 0, status: false },
        user2: { name: '', photoUrl: '', score: 0, status: false },
      },
    },
    final: {
      match1: {
        user1: { name: '', photoUrl: '', score: 0, status: false },
        user2: { name: '', photoUrl: '', score: 0, status: false },
      },
    },
  },
};

let wss: WebSocket | null = null;
let oldpg = '';
function connectToSocket({ pageUrl, setData }: connectSocketTypes) {
  let tmpData: LiveMatchesTypes = initData;
  const tournamentID: string = pageUrl;
  const access: string | undefined = Cookies.get('access');

  const reinitializeData = () => {
    oldpg = '';
    setData(initData);
    tmpData = initData;
  };

    if (tournamentID && access) {
        try {
            console.log(oldpg, tournamentID)
            if (wss && oldpg !== tournamentID) {
                reinitializeData();
                wss.close();
                wss = null;
            }
            wss = new WebSocket(
                `${process.env.NEXT_PUBLIC_BACKEND_WS_HOST}/ws/pingpong/tournament/${tournamentID}/?token=${access}&watch=true`,
            );

            wss.onopen = () => {
                setData(initData);
                tmpData = initData
                // console.log('connected to socket successfully');
                oldpg = tournamentID;
                if (wss) {
                    wss.onmessage = (event) => {
                        const dt = JSON.parse(event.data);
                        if(dt.message.action === 'TournamentData'){
                            tmpData = initData;
                            tmpData.data.quarter_final = dt.message.tournamentdata.quarter_final as QuarterFinalMatchTypes;
                            tmpData.data.semi_final = dt.message.tournamentdata.semi_final as SemiFinalMatchTypes;
                            tmpData.data.final = dt.message.tournamentdata.final as FinalMatchTypes;
                            setData(tmpData);
                        }
                        // console.log(event.data);
                    };
                }
            };

            wss.onerror = (error) => {
                reinitializeData();
                // console.log(`Error : ${error}`);
            };
            wss.onclose = () => {
                reinitializeData();
                // console.log('closed connection');
            };
        } catch (error) {
            // console.error(`Error : ${error}`);
        }
    }
}

function UpcomingMatch({ p1, p2 }: { p1: UserInfoTypes; p2: UserInfoTypes }) {
  return (
    <div className={`row p-0 m-1 justify-content-center ${styles.upcoming_match}`}>
      <div className="col-4 d-flex align-items-center justify-content-center">
        <GetPlayerImageTitle p1={p1.name} imgWidth="90px" imgHeight="90px" imageSrc={p1.photoUrl} />
      </div>
      <div className="col-2 valo-font align-self-center text-center m-2 p-1">
        <span className={`${styles.vs_text}`}>VS</span>
      </div>
      <div className="col-4 d-flex align-items-center justify-content-center">
        <GetPlayerImageTitle p1={p2.name} imgWidth="90px" imgHeight="90px" imageSrc={p2.photoUrl} />
      </div>
    </div>
  );
}

function RenderUpcomingMatches({ round, setmatchToRenderLive }: RenderUpcomingMatchesTypes): JSX.Element {
  return (
    <>
      {Object.keys(round).map((key) => (
        <div
          key={key}
          onClick={() => setmatchToRenderLive(key)}
          className={`row col-xxl-6 justify-content-center p-2 m-0`}
        >
          <UpcomingMatch p1={round[key].user1} p2={round[key].user2} />
        </div>
      ))}
    </>
  );
}

function TournamentOngoing({ pageUrl }: { pageUrl: string }): JSX.Element {
  const options = ['Quarter Final', 'Semi Final', 'Final'];
  const [currentOptionTab, setcurrentOptionTab] = useState<string>('Quarter Final');
  const [matchToRenderLive, setmatchToRenderLive] = useState<string>('match1');
  let key: string = 'quarter_final';
  const MatchBackgroundStyle: CSSProperties = {
    backgroundImage: `url("/assets/images/Backgrounds/back.png")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '25px',
    filter: 'blur(2px)',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '1',
  };

  const [data, setData] = useState<LiveMatchesTypes>(initData);
  // Disconnect from old socket endpoint and connect to a new one
  useEffect(() => {
    connectToSocket({ pageUrl, setData });
  }, [pageUrl]);

  return (
    <>
      <section className={`row p-0 m-0 justify-content-center align-content-center ${styles.live_wrapper}`}>
        <div className={`${styles.liveMatchContainer}`}>
          <div className={`${styles.liveMatchBackground}`} style={MatchBackgroundStyle} />
          <div className={`${styles.liveMatchInfo} row w-100 p-0 m-0 justify-content-center valo-font`}>
            <LiveTournamentMatches
              user1={
                data.data[(currentOptionTab as string).replace(' ', '_').toLowerCase()][matchToRenderLive]
                  ? data.data[(currentOptionTab as string).replace(' ', '_').toLowerCase()][matchToRenderLive].user1
                  : data.data[(currentOptionTab as string).replace(' ', '_').toLowerCase()]['match1'].user1
              }
              user2={
                data.data[(currentOptionTab as string).replace(' ', '_').toLowerCase()][matchToRenderLive]
                  ? data.data[(currentOptionTab as string).replace(' ', '_').toLowerCase()][matchToRenderLive].user2
                  : data.data[(currentOptionTab as string).replace(' ', '_').toLowerCase()]['match1'].user2
              }
            />
          </div>
        </div>
      </section>
      <section className={`row p-0 m-0 ${styles.navbar}`}>
        <div className="col">
          <NavBar options={options} setChoosenTab={setcurrentOptionTab} />
        </div>
      </section>
      <section className={`row p-0 m-0 justify-content-start`}>
        <>
          {currentOptionTab === 'Quarter Final' ? (
            <RenderUpcomingMatches round={data.data['quarter_final']} setmatchToRenderLive={setmatchToRenderLive} />
          ) : currentOptionTab === 'Semi Final' ? (
            <RenderUpcomingMatches round={data.data['semi_final']} setmatchToRenderLive={setmatchToRenderLive} />
          ) : currentOptionTab === 'Final' ? (
            <RenderUpcomingMatches round={data.data['final']} setmatchToRenderLive={setmatchToRenderLive} />
          ) : (
            <></>
          )}
        </>
      </section>
    </>
  );
}

export default TournamentOngoing;
