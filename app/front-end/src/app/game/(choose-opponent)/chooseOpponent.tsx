'use client';
import styles from './styles.module.css';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
    setPageId?: string;
    cardTitle?: string;
    imageSrc?: string;
}

function OptionCard({ cardTitle, imageSrc }: Props) {
    return (
        <>
            <div className={`${styles.image_container} responsive_image row`}>
                <img src={imageSrc} alt="" className={`${styles.cards} p-0 m-0`}></img>
            </div>
            <div className={`row text-nowrap`}>
                <h1 className={`${styles.cards} valo-font py-3 px-0 m-0 text-center`}>{cardTitle}</h1>
            </div>
        </>
    );
}

function ChooseOpponent() {
    const [active, setActive] = useState('Local');
    return (
        <div className={`container-fluid p-0 m-0`}>
            <div className={`${styles.header} row justify-content-center align-items-center w-100 p-0 m-0`}>
                <h1 className={`${styles.header_text} valo-font mt-3`}>CHOOSE YOUR OPPONENT</h1>
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
