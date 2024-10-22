'use client';

import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useLayoutEffect, useState, useEffect } from 'react';

import {
  FuturePredictionsTypes,
  StatisticsDataTypes,
  AchivementTypes,
  PlayerMatchesTypes,
  PlayerStatsTypes,
} from '@/lib/StatisticsPageTypes/StatisticsPageTypes';
import styles from './styles.module.css';
import { FuturePredictionGraph } from '@/components/statistics/graph';
import { GameHistoryTable, GameHistoryTableTypes } from '@/components/statistics/historyTable';
import { StatisticCard } from '@/components/statistics/playerCard';
import { PlayerStats } from '@/components/statistics/playerStats';

const achivImage: { [key: string]: string } = {
  early: '/assets/images/achievement/achiv_tourn1.png',
  unstoppable: '/assets/images/achievement/achiv_tourn2.png',
  front: '/assets/images/achievement/achiv_tourn3.png',
  speedy: '/assets/images/achievement/achiv_match1.png',
  win20: '/assets/images/achievement/achiv_match2.png',
  king: '/assets/images/achievement/achiv_match3.png',
};

async function getData(): Promise<StatisticsDataTypes> {
  let data: Partial<Promise<StatisticsDataTypes>> = {};
  const access = Cookies.get('access');
  if (access) {
    try {
      const csrftoken = Cookies.get('csrftoken') || '';
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/statistics`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${access}`, 'X-CSRFToken': csrftoken },
      });

      data = await response.json();
    } catch (error: any) {
      // console.error(`Error : ${error.message}`);
    }
  }

  return data as StatisticsDataTypes;
}

function getPlayerStatsFromData(data: Partial<StatisticsDataTypes>): PlayerStatsTypes {
  const stats: PlayerStatsTypes = {
    scores: 0,
    tackles: 0,
    win_rate: 0,
    wins: 0,
    loses: 0,
  };

  stats.scores = data.scores ?? 0;
  stats.loses = data.loses ?? 0;
  stats.tackles = data.tackles ?? 0;
  stats.wins = data.wins ?? 0;
  stats.win_rate = data.win_rate ?? 0;
  return stats;
}

function StatisticsPage() {
  const [futurePredictions, setFuturePredictions] = useState<FuturePredictionsTypes[] | string[]>([]);
  const [topPlayer, setTopPlayer] = useState<string>('');
  const [image_url, setImageURL] = useState<string>('');
  const [playerMatches, setPlayerMatches] = useState<PlayerMatchesTypes[]>([]);
  const [avgScore, setAvgScore] = useState<number>(0);
  const [lastAchiv, setLastAchiv] = useState<Partial<AchivementTypes>>({});
  const [playerStats, setPlayerStats] = useState<Partial<PlayerStatsTypes>>({});

  let data: Partial<StatisticsDataTypes> = {};

  useEffect(() => {
    (async () => {
      data = await getData();
      setTopPlayer(data.top_player ?? '');
      setFuturePredictions(data.future_predictions ?? []);
      setAvgScore(data.avg_score ? +data.avg_score.toFixed(2) : 0);
      setLastAchiv((data.last_achiev as AchivementTypes) ?? (data.last_achiev as undefined));
      setPlayerMatches(data.player_matches ?? []);
      setPlayerStats(getPlayerStatsFromData(data));
      setImageURL(data.image_url ?? '');
    })();
  }, []);

  return (
    <div className={`container-fluid ${styles.page_container}`}>
      <div className={`row`}>
        {/* Page Title */}
        <div className={`col-12`}>
          <h1 className={`valo-font mt-5`}>STATISTICS</h1>
        </div>
        <div className="row flex-xxl-nowrap">
          {/*  Left Side */}
          <div className={`col-12 col-xxl-8 order-1 order-xxl-0 m-2 row`}>
            <section className={`col-12 m-2 order-0`}>
              <FuturePredictionGraph futurePredictions={futurePredictions} />
            </section>

            <section className="col-12 m-2 order-1 order-xxl-1 ">
              <div className={`row mt-3 flex-nowrap justify-content-around ${styles.outter_player_card_container}`}>
                <div className={`col-3 mt-3 mx-1 ${styles.player_card} `}>
                  <StatisticCard title="Top Player" body={topPlayer} imgSrc="/assets/images/Top_Player.png" />
                </div>
                <div className={`col-3 mt-3 mx-1 ${styles.player_card} `}>
                  <StatisticCard title="Average Score" body={avgScore} imgSrc="/assets/images/Average_Score.png" />
                </div>
                <div className={`col-3 mt-3 mx-1 ${styles.player_card} `}>
                  <StatisticCard
                    title="Last Achivement"
                    body={lastAchiv && lastAchiv.achievement_name ? lastAchiv.achievement_name : ''}
                    imgSrc={lastAchiv && lastAchiv.achievement_name ? achivImage[lastAchiv.achievement_name] : ''}
                  />
                </div>
              </div>
            </section>

            <section className="col-12 m-2 order-2 order-xxl-1 align-items-center">
              <div className={`row ${styles.stats_container} mt-3 `}>
                <PlayerStats stats={playerStats as PlayerStatsTypes} />
              </div>
            </section>
          </div>

          {/*  Right Side */}
          <div className={`col-12 col-xxl-4 order-0 order-xxl-2 m-2`}>
            <GameHistoryTable playerMatches={playerMatches} image_url={image_url} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsPage;
