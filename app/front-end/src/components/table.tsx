import React from 'react';
import styles from './styles/table.module.css';
import Table from 'react-bootstrap/Table';


interface GameData {
  player: string;
  score: number;
  date: string;
  result: 'WIN' | 'LOSS';
}

const GameHistoryCard: React.FC = () => {

  return (
    <Table responsive className={`${styles.table}`}>
      <thead>
			<tr className='text-center'>
				<th className={`${styles.titles} itim-font`}>Player</th>
				<th className={`${styles.titles} itim-font`}>Score</th>
				<th className={`${styles.titles} itim-font`}>Date</th>
				<th className={`${styles.titles} itim-font`}>Result</th>
			</tr>
      </thead>
      <tbody className='text-center'>
			<tr className={`${styles.game_row}`}>
			<td className={`${styles.game_col} ${styles.left_col}`}>
					<div className={`${styles.player_info}`}>
               			<img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg" alt="Player Avatar" />
             			<span className='itim-font'>Zakariae7910</span>
            		</div>
				</td>
				<td className={`${styles.game_col} itim-font`}>1337</td>
				<td className={`${styles.game_col} itim-font`}>2024-01-13</td>
				<td className={`${styles.game_col} ${styles.right_col} itim-font`}>WIN</td>
			</tr>
			<tr className={`${styles.game_main_col}`}>
			<td className={`${styles.game_col} ${styles.left_col}`}>
					<div className={`${styles.player_info}`}>
               			<img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg" alt="Player Avatar" />
             			<span className='itim-font'>Zakariae7910</span>
            		</div>
				</td>
				<td className={`${styles.game_col} itim-font`}>1337</td>
				<td className={`${styles.game_col} itim-font`}>2024-01-13</td>
				<td className={`${styles.game_col} ${styles.right_col} itim-font`}>WIN</td>
			</tr>
			<tr>
				<td className={`${styles.game_col} ${styles.left_col}`}>
					<div className={`${styles.player_info}`}>
               			<img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg" alt="Player Avatar" />
             			<span className='itim-font'>Zakariae7910</span>
            		</div>
				</td>
				<td className={`${styles.game_col} itim-font`}>1337</td>
				<td className={`${styles.game_col} itim-font`}>2024-01-13</td>
				<td className={`${styles.game_col} ${styles.right_col} itim-font`}>LOSE</td>
			</tr>
			<tr>
				<td className={`${styles.game_col} ${styles.left_col}`}>
					<div className={`${styles.player_info}`}>
               			<img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg" alt="Player Avatar" />
             			<span className='itim-font'>Zakariae7910</span>
            		</div>
				</td>
				<td className={`${styles.game_col} itim-font`}>1337</td>
				<td className={`${styles.game_col} itim-font`}>2024-01-13</td>
				<td className={`${styles.game_col} ${styles.right_col} itim-font`}>LOSE</td>
			</tr>
      </tbody>
    </Table>
  );
};

export default GameHistoryCard;