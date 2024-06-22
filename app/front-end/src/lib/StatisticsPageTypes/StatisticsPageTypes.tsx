interface   PlayerStatsTypes {
    scores : number;
    tackles : number;
    win_rate : number;
    wins : number;
    loses : number;
}

interface   PlayerMatchesTypes {
    date :string;
    player_name :string;
    opponent_name :string;
    player_score : number;
    opponent_score : number;
    image: string;
    result : 'WIN' | 'LOSS';
}

interface   FuturePredictionsTypes {
    date : string;
    predicted_score : number;
}

interface   AchivementTypes {
    achievement_id: number;
    achievement_name: string;
    achievement_type: string;
}

interface   StatisticsDataTypes {
    id : number;
    username : string;    
    top_player : string;    
    avg_score : number | null;
    last_achiev : AchivementTypes | null,
    future_predictions : string[] | FuturePredictionsTypes[];
    loses : number;
    wins : number;
    scores : number;
    tackles : number;
    win_rate : number;
    player_matches : PlayerMatchesTypes[];
}

export type {
    StatisticsDataTypes as StatisticsDataTypes,
    FuturePredictionsTypes as FuturePredictionsTypes,
    AchivementTypes as AchivementTypes,
    PlayerMatchesTypes as PlayerMatchesTypes,
    PlayerStatsTypes as PlayerStatsTypes
}

/*
******* NO DATA

{
    "id": 2,
    "username": "hh",
    "top_player": "apollo",
    "avg_score": null,
    "last_achiev": null,
    "future_predictions": [
        "Not enough match data to generate future predictions"
    ],
    "loses": 0,
    "wins": 0,
    "scores": 0,
    "tackles": 0,
    "win_rate": 0,
    "player_matches": []
}

******* With Data 


{
    "id": 2,
    "username": "hh",
    "top_player": "hh",
    "avg_score": 4.875,
    "last_achiev": {
        "achievement_id": 5,
        "achievement_name": "early",
        "achievement_type": "tournament"
    },
    "future_predictions": [
        {
            "date": "2024-06-09",
            "predicted_score": 2.049208
        },
    ],
    "loses": 2,
    "wins": 3,
    "scores": 27,
    "tackles": 1119,
    "win_rate": 60.0,
    "player_matches": [
        {
            "date": "2024-06-09",
            "player_name": "hh",
            "opponent_name": "apollo",
            "player_score": 2,
            "opponent_score": 3,
            "result": "Lose"
        },
        {
            "date": "2024-06-09",
            "player_name": "hh",
            "opponent_name": "apollo",
            "player_score": 7,
            "opponent_score": 4,
            "result": "Win"
        },
        {
            "date": "2024-06-09",
            "player_name": "hh",
            "opponent_name": "apollo",
            "player_score": 7,
            "opponent_score": 3,
            "result": "Win"
        },
        {
            "date": "2024-06-09",
            "player_name": "hh",
            "opponent_name": "hh",
            "player_score": 7,
            "opponent_score": 4,
            "result": "Win"
        }
    ]
}

*/