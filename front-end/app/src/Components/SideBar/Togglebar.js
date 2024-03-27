
import { Link, useLocation } from 'react-router-dom';

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import './Togglebar.css';

import { IoSettings , IoChatbubbles} from "react-icons/io5";
import { GiPingPongBat , GiTrophy } from "react-icons/gi";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

import { useEffect, useState } from 'react';


function Togglebar(props) {
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
        <div className="d-inline-flex flex-column justify-content-around align-items-center py-4 px-2" style={{height: '100%'}}>
            <div className="flex-grow-1 d-flex flex-column justify-content-around">
                <Link className="title link valo-font d-flex flex-row align-items-center justify-content-start p-2" to="/" onClick={props.handleToggle}>
                    <MdSpaceDashboard className={`side-icon icon-0`} color={activeIcon === 0 ? '#FF4755' : '#FFEBEB'}/>
                    <h3 className='px-4'>HOME</h3>
                </Link>
              <Link className="title link valo-font d-flex flex-row align-items-center justify-content-start p-2" to="/game" onClick={props.handleToggle}>
                <GiPingPongBat className={`side-icon icon-1`} color={activeIcon === 1 ? '#FF4755' : '#FFEBEB'}/>
                <h3 className='px-4'>GAME</h3>
                </Link>
              <Link className="title link valo-font d-flex flex-row align-items-center justify-content-start p-2" to="/chat" onClick={props.handleToggle}>
                <IoChatbubbles className={`side-icon icon-2`} color={activeIcon === 2 ? '#FF4755' : '#FFEBEB'}/>
                <h3 className='px-4'>CHAT</h3>
                </Link>
              <Link className="title link valo-font d-flex flex-row align-items-center justify-content-start p-2" to="/achievement" onClick={props.handleToggle}>
                <GiTrophy className={`side-icon icon-3`} color={activeIcon === 3 ? '#FF4755' : '#FFEBEB'}/>
                <h3 className='px-4'>ACHIEVEMENT</h3>
                </Link>
              <Link className="title link valo-font d-flex flex-row align-items-center justify-content-start p-2" to="/settings" onClick={props.handleToggle}>
                <IoSettings className={`side-icon icon-4`} color={activeIcon === 4 ? '#FF4755' : '#FFEBEB'}/>
                <h3 className='px-4'>SETTINGS</h3>
                </Link>
            </div>
            <div className="flex-grow-1 d-flex align-items-end pb-3">
              <IoMdLogOut className={`side-icon icon-5`} color={activeIcon === 5 ? '#FF4755' : '#FFEBEB'}/>
            </div>
      </div>
    );
}

export default Togglebar;