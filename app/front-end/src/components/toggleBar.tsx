'use client';
import Link from 'next/link';
import styles from './styles/toggleBar.module.css';
import { IoSettings, IoChatbubbles } from 'react-icons/io5';
import { GiPingPongBat, GiTrophy } from 'react-icons/gi';
import { MdSpaceDashboard } from 'react-icons/md';
import { IoStatsChart } from 'react-icons/io5';
import { IoMdLogOut } from 'react-icons/io';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { signOut } from '@/components/sign-out/signOut';

interface Props {
  handleToggle: () => void;
}

const Togglebar: React.FC<Props> = ({ handleToggle }) => {
  const [activeIcon, setActiveIcon] = useState(0);
  const router = useRouter();

  const handleLinkClick = (index: number) => {
    handleToggle();
    setActiveIcon(index);
  };

  return (
    <div
      className={`${styles.container} d-flex flex-column justify-content-center align-items-center py-4 pt-0 px-2`}
      style={{ height: '100%' }}
    >
      <div className="mb-4">
        <Link
          className={`d-flex flex-row align-items-center justify-content-start py-2  ${styles.title} ${styles.link} valo-font`}
          href="/dashboard"
          onClick={() => handleLinkClick(0)}
        >
          <MdSpaceDashboard className={`${styles.icon}`} size="3em" color={activeIcon === 0 ? '#FF4755' : '#FFEBEB'} />
          <div>HOME</div>
        </Link>
        <Link
          className={`d-flex flex-row align-items-center justify-content-start py-2 ${styles.title} ${styles.link} valo-font`}
          href="/game"
          onClick={() => handleLinkClick(1)}
        >
          <GiPingPongBat className={`${styles.icon}`} size="3em" color={activeIcon === 1 ? '#FF4755' : '#FFEBEB'} />
          <div>GAME</div>
        </Link>
        <Link
          className={`d-flex flex-row align-items-center justify-content-start py-2 ${styles.title} ${styles.link} valo-font`}
          href="/chat"
          onClick={() => handleLinkClick(2)}
        >
          <IoChatbubbles className={`${styles.icon}`} size="3em" color={activeIcon === 2 ? '#FF4755' : '#FFEBEB'} />
          <div>CHAT</div>
        </Link>
        <Link
          className={`d-flex flex-row align-items-center justify-content-start py-2 ${styles.title} ${styles.link} valo-font`}
          href="/achievements"
          onClick={() => handleLinkClick(3)}
        >
          <GiTrophy className={`${styles.icon}`} size="3em" color={activeIcon === 3 ? '#FF4755' : '#FFEBEB'} />
          <div>ACHIEVEMENT</div>
        </Link>
        <Link
          className={`d-flex flex-row align-items-center justify-content-start py-2 ${styles.title} ${styles.link} valo-font`}
          href="/statistics"
          onClick={() => handleLinkClick(4)}
        >
          <IoStatsChart className={`${styles.icon}`} size="3em" color={activeIcon === 4 ? '#FF4755' : '#FFEBEB'} />
          <div>STATISTICS</div>
        </Link>
        <Link
          className={`d-flex flex-row align-items-center justify-content-start py-2 ${styles.title} ${styles.link} valo-font`}
          href="/settings"
          onClick={() => handleLinkClick(4)}
        >
          <IoSettings className={`${styles.icon}`} size="3em" color={activeIcon === 4 ? '#FF4755' : '#FFEBEB'} />
          <div>SETTINGS</div>
        </Link>
      </div>
      <div
        className={`d-flex flex-row align-items-end justify-content-end py-2 ${styles.title} ${styles.link} valo-font`}
      >
        <IoMdLogOut
          className={`${styles.icon}`}
          size="2em"
          color={activeIcon === 5 ? '#FF4755' : '#FFEBEB'}
          onClick={() => signOut(router)}
        />
      </div>
    </div>
  );
};

export default Togglebar;
