import styles from '@/app/statistics/styles.module.css';
import GameHistoryCard from '@/components/table';
import { PlayerMatchesTypes } from '@/lib/StatisticsPageTypes/StatisticsPageTypes';

interface GameData {
  image: string;
  player: string;
  score: number;
  date: string;
  result: 'WIN' | 'LOSS';
}

interface GameHistoryTableTypes {
  playerMatches: PlayerMatchesTypes[];
  image_url: string;
}

function prepareDataForTable({ playerMatches, image_url }: GameHistoryTableTypes): GameData[] {
  const shit: GameData[] = [];
  let data: GameData = {
    image: '',
    player: '',
    score: 0,
    date: '',
    result: 'WIN',
  };

  playerMatches.forEach((value) => {
    const data = {
      image: image_url,
      player: value.player_name,
      date: value.date,
      score: value.player_score,
      result: value.result,
    };

    shit.push(data);
  });
  return shit;
}

// take a prop, and adapt keys
function GameHistoryTable({ playerMatches, image_url }: GameHistoryTableTypes) {
  const shit = prepareDataForTable({ playerMatches, image_url });

  return (
    <section className={`${styles.table_container}`}>
      <div className="p-3">
        <h2 className={`itim-font ${styles.table_title}`}>My game history</h2>
        <hr
          style={{
            color: '#FFEBEB',
            backgroundColor: '#FFEBEB',
            height: 1,
          }}
        />
        <GameHistoryCard data={shit} />
      </div>
    </section>
  );
}

export type { GameHistoryTableTypes as GameHistoryTableTypes };
export { GameHistoryTable };
