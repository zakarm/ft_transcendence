import styles from "./styles.module.css";
import Link from "next/link";

interface Props {
  setPageId?: string;
  cardTitle?: string;
  imageSrc?: string;
}

function OptionCard({ cardTitle, imageSrc, setPageId }: Props) {
  return (
    <>
      <div className={`${styles.image_container} responsive_image row`}>
        <img src={imageSrc} alt="" className={`${styles.cards} p-0 m-0`}></img>
      </div>
      <div className={`row text-nowrap`}>
        <h1 className={`${styles.cards} valo-font py-3 px-0 m-0 text-center`}>
          {cardTitle}
        </h1>
      </div>
    </>
  );
}

function ChooseOpponent({ setPageId }: Props) {
  return (
    <div className={`container-fluid p-0 m-0`}>
      <div
        className={`${styles.wrapper} row justify-content-center align-items-center w-100 vh-100 p-0 m-0`}
      >
        <div
          className={`${styles.option} col-10 col-sm-3 col-md-8 col-xl-3`}
        >
          <OptionCard
            cardTitle="TOURNAMENT"
            imageSrc="back.png"
            setPageId={setPageId}
          ></OptionCard>
        </div>

        <div
          className={`${styles.option} col-10 col-sm-3 col-md-8 col-xl-3`}
        >
          <Link href="/game/RemoteMatchGame"style={{ textDecoration: "none" }}>
              <OptionCard
                cardTitle="MATCH GAME"
                imageSrc="back3.png"
                setPageId={setPageId}
              ></OptionCard>
          </Link>
        </div>

        <div
          className={`${styles.option} col-10 col-sm-3 col-md-8 col-xl-3`}
        >
          <OptionCard
            cardTitle="AI BOT GAME"
            imageSrc="back2.png"
            setPageId={setPageId}
          ></OptionCard>
        </div>
      </div>
    </div>
  );
}

export default ChooseOpponent;
