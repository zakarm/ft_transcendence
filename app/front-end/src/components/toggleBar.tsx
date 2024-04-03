'use client';

import { Link, useLocation } from 'react-router-dom';

// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";

import styles from './styles/toggleBar.module.css'

import { IoSettings , IoChatbubbles} from "react-icons/io5";
import { GiPingPongBat , GiTrophy } from "react-icons/gi";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

import { useEffect, useState } from 'react';

interface Props
{
    handleToggle: () => void;
}

export default function Togglebar({handleToggle}: Props) {
    const [activeIcon, setActiveIcon] = useState(0);
    // const location = useLocation();
    
    // useGSAP(() => {
    //   gsap.to(".side-icon", { rotation: "+=360", duration: 1 });
    //   gsap.to(".logo", { rotation: "+=360", duration: 1 });
    // });
    
    // useEffect(() => {
    //   console.log("updated");
    //   const pathUrls = ["/", "/game", "/chat", "/achievement", "/settings"];
    //   const index = pathUrls.indexOf(location.pathname);
    //   setActiveIcon(index);
    //   gsap.to(".side-icon", { rotation: "0" });
    //   gsap.to(`.icon-${index}`, { rotation: "45" });
    //   gsap.to(".logo", { rotation: "+=1080", duration: 1 });
    // }, [location]);

    return (
        <div className="d-inline-flex flex-column justify-content-around align-items-center py-4 pt-0 px-2" style={{height: '100%'}}>
            <div className="flex-grow-1 d-flex flex-column justify-content-around">
                <Link className={`${styles.title} link valo-font d-flex flex-row align-items-center justify-content-start p-2`} to="/" onClick={handleToggle}>
                    <MdSpaceDashboard className={`${styles.side_icon} ${styles.icon_0}`} color={activeIcon === 0 ? '#FF4755' : '#FFEBEB'}/>
                    <h3 className='px-4'>HOME</h3>
                </Link>
              <Link className={`${styles.title} ${styles.link} valo-font d-flex flex-row align-items-center justify-content-start p-2`} to="/game" onClick={handleToggle}>
                <GiPingPongBat className={`${styles.side_icon} ${styles.icon_1}`} color={activeIcon === 1 ? '#FF4755' : '#FFEBEB'}/>
                <h3 className='px-4'>GAME</h3>
                </Link>
              <Link className={`${styles.title} ${styles.link} valo-font d-flex flex-row align-items-center justify-content-start p-2`} to="/chat" onClick={handleToggle}>
                <IoChatbubbles className={`${styles.side_icon} ${styles.icon_2}`} color={activeIcon === 2 ? '#FF4755' : '#FFEBEB'}/>
                <h3 className='px-4'>CHAT</h3>
                </Link>
              <Link className={`${styles.title} ${styles.link} valo-font d-flex flex-row align-items-center justify-content-start p-2`} to="/achievement" onClick={handleToggle}>
                <GiTrophy className={`${styles.side_icon} ${styles.icon_3}`} color={activeIcon === 3 ? '#FF4755' : '#FFEBEB'}/>
                <h3 className='px-4'>ACHIEVEMENT</h3>
                </Link>
              <Link className={`${styles.title} ${styles.link} valo-font d-flex flex-row align-items-center justify-content-start p-2`} to="/settings" onClick={handleToggle}>
                <IoSettings className={`${styles.side_icon} ${styles.icon_4}`} color={activeIcon === 4 ? '#FF4755' : '#FFEBEB'}/>
                <h3 className='px-4'>SETTINGS</h3>
                </Link>
            </div>
            <div className="flex-grow-1 d-flex align-items-end pb-3">
              <IoMdLogOut className={`${styles.side_icon} ${styles.icon_5}`} color={activeIcon === 5 ? '#FF4755' : '#FFEBEB'}/>
            </div>
      </div>
    );
}