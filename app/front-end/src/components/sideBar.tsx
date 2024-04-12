'use client';
import Link from 'next/link';

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from './styles/sideBar.module.css';
import { TbAppsFilled } from "react-icons/tb";
import { IoGameController } from "react-icons/io5"
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { IoChatbubble } from "react-icons/io5";
import { FaTrophy } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import Image from 'next/image'
export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeIcon, setActiveIcon] = useState(0);

//   useGSAP(() => {
//     gsap.to(".side_icon", { rotation: "+=360", duration: 1 });
//     gsap.to(".logo", { rotation: "+=360", duration: 1 });
//   });

//   useEffect(() => {
//     const pathUrls = ["/", "/game", "/chat", "/achievement", "/settings"];
//     const index = pathUrls.indexOf(pathname);
//     setActiveIcon(index);
//     gsap.to(".side_icon", { rotation: "0" });
//     gsap.to(`.icon${index}`, { rotation: "45" });
//     gsap.to(".logo", { rotation: "+=1080", duration: 1 });
//   }, [pathname]);

  return (
      <div className={`${styles.side_container} d-inline-flex flex-column justify-content-around align-items-center vh-100 py-4 px-2`}>
        <div className="flex-grow-1 pt-3">
          <Link href="/" >
            <Image src="/LOGO.svg" className={`${styles.logo} logo img-fluid rounded rounded-circle`} alt="ying"/>
          </Link>
		</div>
        <div className="flex-grow-1 d-flex flex-column justify-content-around">
            <Link className="" href="/">
        		<TbAppsFilled className={`${styles.side_icon} side_icon icon-0`}  color={activeIcon === 0 ? '#FF4755' : '#FFEBEB'}/>
            </Link>
            <Link className="" href="/game">
            	<IoGameController className={`${styles.side_icon} side_icon icon-1`} color={activeIcon === 1 ? '#FF4755' : '#FFEBEB'}/>
            </Link>
            <Link className="" href="/chat">
             	<IoChatbubble className={`${styles.side_icon} side_icon icon-2`} color={activeIcon === 2 ? '#FF4755' : '#FFEBEB'}/>
            </Link>
            <Link className="" href="/achievement">
            	<FaTrophy className={`${styles.side_icon} side_icon icon-3`} color={activeIcon === 3 ? '#FF4755' : '#FFEBEB'}/>
            </Link>
            <Link className="" href="/settings">
            	<IoMdSettings className={`${styles.side_icon} side_icon icon-4`} color={activeIcon === 4 ? '#FF4755' : '#FFEBEB'}/>
            </Link>
		</div>
		<div className="flex-grow-1 d-flex align-items-end pb-3">
			<IoMdLogOut className={`${styles.side_icon} ${styles.icon_5} icon-5`} color={activeIcon === 5 ? '#FF4755' : '#FFEBEB'}/>
		</div>
      </div>
  );
}
