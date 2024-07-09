interface PlayerStatsTypes {
  scores: number;
  tackles: number;
  win_rate: number;
  wins: number;
  loses: number;
}

interface PlayerMatchesTypes {
  date: string;
  player_name: string;
  opponent_name: string;
  player_score: number;
  opponent_score: number;
  result: 'WIN' | 'LOSS';
}

interface FuturePredictionsTypes {
  date: string;
  predicted_score: number;
}

interface AchivementTypes {
  achievement_id: number;
  achievement_name: string;
  achievement_type: string;
}

interface StatisticsDataTypes {
  id: number;
  username: string;
  image_url: string;
  top_player: string;
  avg_score: number | null;
  last_achiev: AchivementTypes | null;
  future_predictions: string[] | FuturePredictionsTypes[];
  loses: number;
  wins: number;
  scores: number;
  tackles: number;
  win_rate: number;
  player_matches: PlayerMatchesTypes[];
}

export type {
  StatisticsDataTypes as StatisticsDataTypes,
  FuturePredictionsTypes as FuturePredictionsTypes,
  AchivementTypes as AchivementTypes,
  PlayerMatchesTypes as PlayerMatchesTypes,
  PlayerStatsTypes as PlayerStatsTypes,
};
