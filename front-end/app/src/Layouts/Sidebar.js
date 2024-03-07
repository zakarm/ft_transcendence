
import { Link } from 'react-router-dom';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import './Sidebar.css';

import { IoSettings , IoChatbubbles} from "react-icons/io5";
import { GiLaurelsTrophy } from "react-icons/gi";
import { GiGamepad } from "react-icons/gi";
import { BiSolidDashboard } from "react-icons/bi";

import { useState } from 'react';

function SideBar() {
  const [activeIcon, setActiveIcon] = useState(null);
  return (
      <div className="d-inline-flex flex-column justify-content-around align-items-center vh-100 p-3" style={{backgroundColor: '#161625', borderRadius: '25px 25px 25px 25px'}}>
        <div className="flex-grow-1 pt-3">
          <img src="assets/LOGO.svg" className="img-fluid rounded rounded-circle" alt="ying" style={{height: '64px', width: '64px'}} />
        </div>
        <div className="flex-grow-1 d-flex flex-column justify-content-around">
          <Link className="" to="/"             ><BiSolidDashboard className="side-icon" color={activeIcon === 0 ? '#FF4755' : '#FFEBEB'} onClick={() => {setActiveIcon(0)}}/></Link>
          <Link className="" to="/game"         ><GiGamepad className="side-icon" color={activeIcon === 1 ? '#FF4755' : '#FFEBEB'} onClick={() => {setActiveIcon(1)}}/></Link>
          <Link className="" to="/chat"         ><IoChatbubbles className="side-icon" color={activeIcon === 2 ? '#FF4755' : '#FFEBEB'} onClick={() => {setActiveIcon(2)}}/></Link>
          <Link className="" to="/achievement"  ><GiLaurelsTrophy className="side-icon" color={activeIcon === 3 ? '#FF4755' : '#FFEBEB'} onClick={() => {setActiveIcon(3)}}/></Link>
          <Link className="" to="/settings"     ><IoSettings className="side-icon" color={activeIcon === 4 ? '#FF4755' : '#FFEBEB'} onClick={() => {setActiveIcon(4)}}/></Link>
        </div>
        <div className="flex-grow-1 d-flex align-items-end pb-3">
          <img className="" src="assets/Logout.svg" alt="logout"/>
        </div>
      </div>
  );
}

export default SideBar;
