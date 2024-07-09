'use client';
import { transform } from 'next/dist/build/swc';
import styles from './styles.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { ZAxis } from 'recharts';
import { BiFontFamily, BiFontSize } from 'react-icons/bi';
import { color } from 'three/examples/jsm/nodes/Nodes';

interface Props {
  setPageId?: string;
  cardTitle?: string;
  imageSrc?: string;
}

function OptionCard({ cardTitle, imageSrc }: Props) {
  return (
    <>
      <div className={`${styles.image_container} responsive_image row`}>
        <img src={imageSrc} alt={cardTitle} className={`${styles.cards} p-0 m-0`}></img>
      </div>
      <div className={`row text-nowrap`}>
        <h1 className={`${styles.cards} valo-font py-3 px-0 m-0 text-center`}>{cardTitle}</h1>
      </div>
    </>
  );
}

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const Dialog = ({ isOpen, onClose }: DialogProps) => {
  if (!isOpen) return null;

  return (
    <div className={`${styles.overlay_}`}>
      <div className=" h-100 w-100">
        <div className={`d-flex justify-content-end align-items-start ${styles.buttonContainer}`}>
          <button onClick={onClose} className={`${styles.closeButton}`}>
            ×
          </button>
        </div>
        <div className={`${styles.dialog}`}>
          <h2 className={`${styles.title}`}>GAME RULES</h2>
          <div className={`${styles.content}`}>
            <h3 className={`${styles.semiTitle}`}>1 - Objective:</h3>
            <p className={`${styles.p}`}>The objective is to be the first player to score 7 points.</p>
            <h3 className={`${styles.semiTitle}`}>2 - Scoring:</h3>
            <p className={`${styles.p}`}>
              A point is scored when the opponent fails to return the ball and it passes their paddle.
            </p>
            <h3 className={`${styles.semiTitle}`}>3 - Game Start:</h3>
            <p className={`${styles.p}`}>
              The game starts with the ball placed in the center of the table. The ball moves automatically.
            </p>
            <h2 className={`${styles.title}`}>CONTROLES</h2>
            <h3 className={`${styles.semiTitle}`}>1 - Movement Local:</h3>
            <ul className={`${styles.p}`}>
              <li className={`${styles.p}`}>
                Player 1 Controls:
                <ul>
                  <li>Up Arrow: Move paddle up</li>
                  <li>Down Arrow: Move paddle down</li>
                </ul>
              </li>
              <li className={`${styles.p}`}>
                Player 2 Controls:
                <ul>
                  <li>W Key: Move paddle up</li>
                  <li>S Key: Move paddle down</li>
                </ul>
              </li>
            </ul>
            <h3 className={`${styles.semiTitle}`}>2 - Movement Remote:</h3>
            <ul className={`${styles.p}`}>
              <li className={`${styles.p}`}>Left Arrow: Move paddle left</li>
              <li className={`${styles.p}`}>Right Arrow: Move paddle right</li>
            </ul>
            <h3 className={`${styles.semiTitle}`}>3 - Pause:</h3>
            <ul className={`${styles.p}`}>
              <li className={`${styles.p}`}>Space: Pause the game</li>
            </ul>
            <h2 className={`${styles.title}`}>TOURNAMENT</h2>
            <h3 className={`${styles.semiTitle}`}>1 - Local Tournament</h3>
            <p className={`${styles.p}`}>
              The tournament will consist of multiple players who can take turns playing against each other. Two players
              will play on the same browser, with each player using their respective section of the keyboard.
            </p>
            <h3 className={`${styles.semiTitle}`}>2 - Remote Tournament</h3>
            <p className={`${styles.p}`}>
              Players can compete against each other online in a traditional tournament format. Matches are scheduled,
              and players compete remotely until a winner is declared. The tournament follows a knockout format,
              starting after 8 players have joined. Players will compete in single-elimination matches until only one
              player remains as the champion.
            </p>
            <h2 className={`${styles.title}`}>PAUSE RULES</h2>
            <h3 className={`${styles.semi_title}`}>1 - Local Games:</h3>
            <p className={`${styles.p}`}>
              Players can pause the game at any time by pressing the 'Space' key. The game will resume when 'Space' is
              pressed again.
            </p>
            <h3 className={`${styles.semiTitle}`}>2 - Remote Games:</h3>
            <p className={`${styles.p}`}>
              Each player has two pauses per match. To pause the game, press the 'Space' key. The game will resume when
              either player presses 'Space' again. Use pauses strategically to take short breaks or regain focus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function ChooseOpponent() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <div className={`container-fluid p-0 m-0 ${styles.game_container_s}`}>
      <div className={`${styles.header} row justify-content-center align-items-center w-100 p-0 m-0`}>
        <h1 className={`${styles.header_text} valo-font mt-5`}>CHOOSE YOUR OPPONENT</h1>
      </div>
      <div className="d-flex justify-content-end" style={{ width: '95%', height: '40px' }}>
        <div
          className=" bg-white d-flex justify-content-center align-items-center"
          style={{ width: '40px', height: '40px', borderRadius: '50%', fontSize: '24px' }}
        >
          <button onClick={openDialog} style={{ background: 'none', border: 'none' }}>
            ?
          </button>
          <Dialog isOpen={isDialogOpen} onClose={closeDialog} />
        </div>
      </div>
      <div className={`${styles.wrapper} row justify-content-center align-items-center w-100 vh-100 p-0 m-0`}>
        <div className={`${styles.option} col-10 col-sm-3 col-md-8 col-xl-3 mx-3`}>
          <Link href="/game/Tournament" style={{ textDecoration: 'none' }}>
            <OptionCard cardTitle="TOURNAMENT" imageSrc="/assets/images/Backgrounds/back.png"></OptionCard>
          </Link>
        </div>

        <div className={`${styles.option} col-10 col-sm-3 col-md-8 col-xl-3 mx-3`}>
          <Link href="/game/RemoteMatchGame" style={{ textDecoration: 'none' }}>
            <OptionCard cardTitle="MATCH GAME" imageSrc="/assets/images/Backgrounds/back3.png"></OptionCard>
          </Link>
        </div>

        <div className={`${styles.option} col-10 col-sm-3 col-md-8 col-xl-3 mx-3`}>
          <Link href="/game/Local" style={{ textDecoration: 'none' }}>
            <OptionCard cardTitle="LOCAL GAME" imageSrc="/assets/images/Backgrounds/back2.png"></OptionCard>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChooseOpponent;
