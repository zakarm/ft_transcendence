import styles from '@/app/statistics/styles.module.css'

interface   StatisticCardTypes {
    title : string;
    body : number | string;
    imgSrc : string;
}

function    StatisticCard({title, body, imgSrc} : StatisticCardTypes) {
    if (title === "Average Score") {
        body += " Hits"
    }
    return (
        <>
            <div className={`row ${styles.player_card_container}`}>

                    <h3 className={`col-12 itim-font p-4 ${styles.player_card_title}`}>
                        { title }
                    </h3>

                    <h2 className={`col-12 valo-font ps-4 font-color ${styles.player_card_body} `}>
                        { body }
                    </h2>

                    <img src={imgSrc} loading='lazy' className={`${styles.card_image}`}/>
            </div>
        </>
    )
}

export { StatisticCard };