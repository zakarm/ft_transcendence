import React from 'react';
import styles from './styles/table.module.css';
import Table from 'react-bootstrap/Table';


interface GameData {
  player: string;
  score: number;
  date: string;
  result: 'WIN' | 'LOSS';
}
interface GameHistoryCardProps {
	data: GameData[];
  }
  
const GameHistoryCard: React.FC<GameHistoryCardProps> = ({ data }) => {

	return (
		<Table responsive className={`${styles.table}`}>
		<thead>
			<tr className="text-center">
			<th className={`${styles.titles} itim-font`}>Player</th>
			<th className={`${styles.titles} itim-font`}>Score</th>
			<th className={`${styles.titles} itim-font`}>Date</th>
			<th className={`${styles.titles} itim-font`}>Result</th>
			</tr>
		</thead>
		<tbody className="text-center">
			{data.map((game, index) => (
			<tr key={index} className={`${styles.game_row}`}>
				<td className={`${styles.game_col} ${styles.left_col}`}>
				<div className={`${styles.player_info}`}>
					<img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg" alt="Player Avatar" />
					<span className="itim-font">{game.player}</span>
				</div>
				</td>
				<td className={`${styles.game_col} itim-font`}>{game.score}</td>
				<td className={`${styles.game_col} itim-font`}>{game.date}</td>
				<td className={`${styles.game_col} ${styles.right_col} itim-font`}>{game.result}</td>
			</tr>
			))}
		</tbody>
		</Table>
	);
};

export default GameHistoryCard;