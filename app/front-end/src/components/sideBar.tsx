'use client';
import Link from 'next/link';

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from './styles/sideBar.module.css';
import { TbAppsFilled } from "react-icons/tb";
import { IoGameController } from "react-icons/io5"
import { IoMdLogOut } from "react-icons/io";
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { IoChatbubble } from "react-icons/io5";
import { FaTrophy } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import Image from 'next/image';
import {signOut} from '@/components/sign-out/signOut';
import { NextRouter } from 'next/router';
import { IoStatsChart } from "react-icons/io5";

export default function SideBar() {

  const   router = useRouter();
  const pathname = usePathname();
  const [activeIcon, setActiveIcon] = useState(0);

  useGSAP(() => {
    gsap.to(".logo", { rotation: "+=360", duration: 1 });
  });

  useEffect(() => {
    const pathUrls = ["/dashboard", "/game", "/chat", "/achievements", "/statistics", "/settings"];
	  const index = pathUrls.indexOf(pathname);
	  if(index === -1) return;
    setActiveIcon(index);
    gsap.to(`.icon_${index}`, { rotation: "45" });
    gsap.to(".logo", { rotation: "+=1080", duration: 1 });
  }, [pathname]);

  return (
      <div className={`${styles.side_container} d-inline-flex flex-column justify-content-around align-items-center vh-100 py-4 px-2`}>
        <div className="flex-grow-1 pt-3">
          <Link href="/dashboard" >
			<Image src="/LOGO.svg"
				  width={60}
				  height={60}
				  style={{ width: "auto", height: "auto" }}
				  className={`${styles.logo} logo img-fluid rounded rounded-circle`}
				  alt="ying" />
          </Link>
		</div>
        <div className="flex-grow-1 d-flex flex-column justify-content-around">
            <Link className="" href="/dashboard">
        		<TbAppsFilled className={`${styles.side_icon} icon_0`}  color={activeIcon === 0 ? '#FF4755' : '#FFEBEB'}/>
            </Link>
            <Link className="" href="/game">
            	<IoGameController className={`${styles.side_icon} icon_1`} color={activeIcon === 1 ? '#FF4755' : '#FFEBEB'}/>
            </Link>
            <Link className="" href="/chat">
             	<IoChatbubble className={`${styles.side_icon} icon_2`} color={activeIcon === 2 ? '#FF4755' : '#FFEBEB'}/>
            </Link>
            <Link className="" href="/achievements">
            	<FaTrophy className={`${styles.side_icon} icon_3`} color={activeIcon === 3 ? '#FF4755' : '#FFEBEB'}/>
            </Link>
            <Link className="" href="/statistics">
            	<IoStatsChart className={`${styles.side_icon} icon_4`} color={activeIcon === 4 ? '#FF4755' : '#FFEBEB'}/>
            </Link>
            <Link className="" href="/settings">
            	<IoMdSettings className={`${styles.side_icon} icon_5`} color={activeIcon === 5 ? '#FF4755' : '#FFEBEB'}/>
            </Link>
		</div>
		<div className="flex-grow-1 d-flex align-items-end pb-3">
			<IoMdLogOut className={`${styles.side_icon} ${styles.icon_5}`} color={activeIcon === 6 ? '#FF4755' : '#FFEBEB'} onClick={() => signOut(router)}/>
		</div>
      </div>
  );
}
