import styles from '@/app/statistics/styles.module.css'
import GameHistoryCard from "@/components/table";
import { PlayerMatchesTypes } from '@/lib/StatisticsPageTypes/StatisticsPageTypes'

interface GameData {
    image: string;
    player: string;
    score: number;
    date: string;
    result: 'WIN' | 'LOSS';
}


function    prepareDataForTable({player_matches} : { player_matches: PlayerMatchesTypes[] }) : GameData[]  {
    const shit : GameData[] = []
    let data: GameData = {
        image:"",
        player: "",
        score: 0,
        date: "",
        result: 'WIN'
    }
    player_matches.map((value) => {
        data.image = value.image;
        data.player = value.player_name;
        data.date = value.date;
        data.score = value.player_score;
        data.result = value.result;

        shit.push(data);
    })

    return (shit);
}

// take a prop, and adapt keys
function    GameHistoryTable(player_matches  : { player_matches: PlayerMatchesTypes[] }) {

    const   shit = prepareDataForTable(player_matches);

    return (
        <section className={`${styles.table_container}`}>
            <div className="p-3">
            <h2 className={`itim-font ${styles.table_title}`}>My game history</h2>
            <hr
            style={{
                color: "#FFEBEB",
                backgroundColor: "#FFEBEB",
                height: 1,
            }}
            />
                <GameHistoryCard data={shit} />

            </div>
        </section>
    )
}

export { GameHistoryTable };
