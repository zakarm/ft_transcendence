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

const styles___: any = {
    overlay_: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '5',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '80%',
        overflow: 'auto',
        borderRadius: '8px',
        border: '1px solid #ffffff',
        color: '#ffffff',
    },
    dialog: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: '#161625',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        height: 'max-content',
    },
    closeButton: {
        position: 'fixed',
        top: '0',
        right: '10px',
        background: 'none',
        border: 'none',
        color: '#ffffff',
        fontSize: '40px',
        cursor: 'pointer',
    },
    title: {
        color: '#ff3e3e',
        marginBottom: '10px',
        fontFamily: 'Valorax',
    },
    content: {
        lineHeight: '2',
        fontFamily: 'itim',
    },
    semi_title: {
        margin: '0 0 0 20px',
        fontSize: '30px',
    },
    p: {
        margin: '0 0 0 40px',
        fontSize: '20px',
    },
};

const Dialog = ({ isOpen, onClose }: DialogProps) => {
    if (!isOpen) return null;

    return (
        <div style={styles___.overlay_}>
            <div style={styles___.dialog}>
                <button onClick={onClose} style={styles___.closeButton}>
                    ×
                </button>
                <h2 style={styles___.title}>GAME RULES</h2>
                <div style={styles___.content}>
                    <h3 style={styles___.semi_title}>1 - Objective:</h3>
                    <p style={styles___.p}>The objective is to be the first player to score 7 points.</p>
                    <h3 style={styles___.semi_title}>2 - Scoring:</h3>
                    <p style={styles___.p}>A point is scored when the opponent fails to return the ball and it passes their paddle.</p>
                    <h3 style={styles___.semi_title}>3 - Game Start:</h3>
                    <p style={styles___.p}>The game starts with the ball placed in the center of the table. The ball moves automatically.</p>
                    <h2 style={styles___.title}>CONTROLES</h2>
                    <h3 style={styles___.semi_title}>1 - Movement Local:</h3>
                    <ul style={styles___.p}>
                        <li style={styles___.p}>
                            Player 1 Controls:
                            <ul>
                                <li>Up Arrow: Move paddle up</li>
                                <li>Down Arrow: Move paddle down</li>
                            </ul>
                        </li>
                        <li style={styles___.p}>
                            Player 2 Controls:
                            <ul>
                                <li>W Key: Move paddle up</li>
                                <li>S Key: Move paddle down</li>
                            </ul>
                        </li>
                    </ul>
                    <h3 style={styles___.semi_title}>2 - Movement Remote:</h3>
                    <ul style={styles___.p}>
                        <li style={styles___.p}>Left Arrow: Move paddle left</li>
                        <li style={styles___.p}>Right Arrow: Move paddle right</li>
                    </ul>
                    <h3 style={styles___.semi_title}>3 - Pause:</h3>
                    <ul style={styles___.p}>
                        <li style={styles___.p}>Space: Pause the game</li>
                    </ul>
                    <h2 style={styles___.title}>TOURNAMENT</h2>
                    <h3 style={styles___.semi_title}>1 - Local Tournament</h3>
                    <p style={styles___.p}>
                        The tournament will consist of multiple players who can take turns playing against each other. Two players will play on the same browser, with each player using their respective section of the
                        keyboard.
                    </p>
                    <h3 style={styles___.semi_title}>2 - Remote Tournament</h3>
                    <p style={styles___.p}>
                        Players can compete against each other online in a traditional tournament format. Matches are scheduled, and players compete remotely until a winner is declared. The tournament follows a knockout
                        format, starting after 8 players have joined. Players will compete in single-elimination matches until only one player remains as the champion.
                    </p>
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
                <h1 className={`${styles.header_text} valo-font mt-3`}>CHOOSE YOUR OPPONENT</h1>
            </div>
            <div className="d-flex justify-content-end" style={{ width: '95%', height: '40px' }}>
                <div className="bg-white d-flex justify-content-center align-items-center" style={{ width: '40px', height: '40px', borderRadius: '50%', fontSize: '24px' }}>
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
