
import { Link, useLocation } from 'react-router-dom';

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import './Sidebar.css';

import { IoSettings , IoChatbubbles} from "react-icons/io5";
import { GiLaurelsTrophy } from "react-icons/gi";
import { GiGamepad } from "react-icons/gi";
import { BiSolidDashboard } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";

import { useEffect, useState } from 'react';

function SideBar() {

  const [activeIcon, setActiveIcon] = useState(0);
  const location = useLocation();

  useGSAP(() => {
    gsap.to(".side-icon", { rotation: "+=360", duration: 1 });
    gsap.to(".logo", { rotation: "+=360", duration: 1 });
  });

  useEffect(() => {
    console.log("updated");
    const pathUrls = ["/", "/game", "/chat", "/achievement", "/settings"];
    const index = pathUrls.indexOf(location.pathname);
    setActiveIcon(index);
    gsap.to(".side-icon", { rotation: "0" });
    gsap.to(`.icon-${index}`, { rotation: "45" });
    gsap.to(".logo", { rotation: "+=1080", duration: 1 });
  }, [location]);

  return (
      <div className="side-container d-inline-flex flex-column justify-content-around align-items-center vh-100 p-3">
        <div className="flex-grow-1 pt-3">
          <Link to="/" >
            <img src="assets/LOGO.svg" className="logo img-fluid rounded rounded-circle" alt="ying"/>
          </Link>
          </div>
        <div className="flex-grow-1 d-flex flex-column justify-content-around">
          <Link className="" to="/"             >
            <BiSolidDashboard className={`side-icon icon-0`} color={activeIcon === 0 ? '#FF4755' : '#FFEBEB'}/>
            </Link>
          <Link className="" to="/game"         >
            <GiGamepad className={`side-icon icon-1`} color={activeIcon === 1 ? '#FF4755' : '#FFEBEB'}/>
            </Link>
          <Link className="" to="/chat"         >
            <IoChatbubbles className={`side-icon icon-2`} color={activeIcon === 2 ? '#FF4755' : '#FFEBEB'}/>
            </Link>
          <Link className="" to="/achievement"  >
            <GiLaurelsTrophy className={`side-icon icon-3`} color={activeIcon === 3 ? '#FF4755' : '#FFEBEB'}/>
            </Link>
          <Link className="" to="/settings"     >
            <IoSettings className={`side-icon icon-4`} color={activeIcon === 4 ? '#FF4755' : '#FFEBEB'}/>
            </Link>
          </div>
        <div className="flex-grow-1 d-flex align-items-end pb-3">
          <IoMdLogOut className={`side-icon icon-5`} color={activeIcon === 5 ? '#FF4755' : '#FFEBEB'}/>
          </div>
      </div>
  );
}

export default SideBar;
