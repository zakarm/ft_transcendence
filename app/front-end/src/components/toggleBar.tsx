'use client';
import Link from 'next/link';
import styles from './styles/toggleBar.module.css';
import { IoSettings, IoChatbubbles } from "react-icons/io5";
import { GiPingPongBat, GiTrophy } from "react-icons/gi";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { useState } from 'react';

interface Props {
  handleToggle: () => void;
}

const Togglebar: React.FC<Props> = ({ handleToggle }) => {
  const [activeIcon, setActiveIcon] = useState(0);

  const handleLinkClick = (index: number) => {
    handleToggle();
    setActiveIcon(index);
  };

  return (
    <div className="d-inline-flex flex-column justify-content-around align-items-center py-4 pt-0 px-2" style={{ height: '100%' }}>
      <div className="flex-grow-1 d-flex flex-column justify-content-around">
        <Link className={`${styles.title} ${styles.link} valo-font d-flex flex-row align-items-center justify-content-start p-2`} href="/dashboard" onClick={() => handleLinkClick(0)}>
          <MdSpaceDashboard className={`${styles.side_icon} ${styles.icon_0}`} color={activeIcon === 0 ? '#FF4755' : '#FFEBEB'} />
          <h3 className='px-4'>HOME</h3>
        </Link>
        <Link className={`${styles.title} ${styles.link} valo-font d-flex flex-row align-items-center justify-content-start p-2`} href="/game" onClick={() => handleLinkClick(1)}>
          <GiPingPongBat className={`${styles.side_icon} ${styles.icon_1}`} color={activeIcon === 1 ? '#FF4755' : '#FFEBEB'} />
          <h3 className='px-4'>GAME</h3>
        </Link>
        <Link className={`${styles.title} ${styles.link} valo-font d-flex flex-row align-items-center justify-content-start p-2`} href="/chat" onClick={() => handleLinkClick(2)}>
          <IoChatbubbles className={`${styles.side_icon} ${styles.icon_2}`} color={activeIcon === 2 ? '#FF4755' : '#FFEBEB'} />
          <h3 className='px-4'>CHAT</h3>
        </Link>
        <Link className={`${styles.title} ${styles.link} valo-font d-flex flex-row align-items-center justify-content-start p-2`} href="/achievement" onClick={() => handleLinkClick(3)}>
          <GiTrophy className={`${styles.side_icon} ${styles.icon_3}`} color={activeIcon === 3 ? '#FF4755' : '#FFEBEB'} />
          <h3 className='px-4'>ACHIEVEMENT</h3>
        </Link>
        <Link className={`${styles.title} ${styles.link} valo-font d-flex flex-row align-items-center justify-content-start p-2`} href="/settings" onClick={() => handleLinkClick(4)}>
          <IoSettings className={`${styles.side_icon} ${styles.icon_4}`} color={activeIcon === 4 ? '#FF4755' : '#FFEBEB'} />
          <h3 className='px-4'>SETTINGS</h3>
        </Link>
      </div>
      <div className="flex-grow-1 d-flex align-items-end pb-3">
        <IoMdLogOut className={`${styles.side_icon} ${styles.icon_5}`} color={activeIcon === 5 ? '#FF4755' : '#FFEBEB'} />
      </div>
    </div>
  );
};

export default Togglebar;