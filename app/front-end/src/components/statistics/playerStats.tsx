import styles from '@/app/statistics/styles.module.css'

function    RectangleText({text, backgroundColor} : {text : string, backgroundColor : string}) {
    return (
        <>
            <h3 className={`col-5 d-flex align-item-center  justify-content-center ${styles.rectangle_text}`} style={{backgroundColor : `${backgroundColor}`}}>
                <div className="align-self-center itim-font font-color">
                    {text}
                </div>
            </h3>
        </>
    )
}

function    PlayerStats() {
    return (
        <>
            <div className="col-5 border">

            </div>
            <div className="col-7 d-flex flex-wrap justify-content-around align-items-center border">
                <RectangleText text={`LOSE`} backgroundColor="#FF4755"/>
                <RectangleText text={`TACKLES`} backgroundColor="#39397C"/>
                <RectangleText text={`WINS`} backgroundColor="#27B299"/>
                <RectangleText text={`SCORES`} backgroundColor="#39397C"/>
            </div>
        </>
    )
}

export { PlayerStats }