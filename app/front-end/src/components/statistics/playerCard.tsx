import styles from '@/app/statistics/styles.module.css';

interface StatisticCardTypes {
    title: string;
    body: number | string;
    imgSrc: string;
}

function StatisticCard({ title, body, imgSrc }: StatisticCardTypes) {
    if (title === 'Average Score') {
        body += ' Hits';
    }

    return (
        <>
            <div className={`row ${styles.player_card_container}`}>
                <h3 className={`col-10 m-1 itim-font ${styles.player_card_title}`}>{title}</h3>
                {body ? (
                    body.toString().length <= 8 ? (
                        <h2
                            className={`col-12 m-1 valo-font  font-color ${styles.player_card_body} d-flex align-items-center`}
                        >
                            {body ? body.toString().toUpperCase() : ''}
                        </h2>
                    ) : (
                        <marquee
                            className={`col-12 valo-font font-color ${styles.player_card_body} d-flex align-items-center`}
                        >
                            {body ? body.toString().toUpperCase() : ''}
                        </marquee>
                    )
                ) : (
                    ''
                )}
                <div
                    className={`row flex-row  ${
                        title === 'Top Player'
                            ? styles.image_container_player
                            : title === 'Average Score'
                            ? styles.image_container_hits
                            : styles.image_container_achiv
                    }`}
                >
                    <img
                        src={imgSrc}
                        loading="lazy"
                        style={{ objectFit: 'contain' }}
                        className={`${styles.card_image}`}
                    />
                </div>
            </div>
        </>
    );
}

export { StatisticCard };
