
import { Link } from 'react-router-dom';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import './Sidebar.css';

import { IoSettings , IoChatbubbles} from "react-icons/io5";
import { GiLaurelsTrophy } from "react-icons/gi";
import { BiSolidDashboard } from "react-icons/bi";
import { GiGamepad } from "react-icons/gi";
import { IoChatbubblesSharp , IoSettings , IoTrophy } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import './Sidebar.css'

function SideBar() {
  return (
    <div class="container vh-100">
      <div class="d-flex flex-column justify-content-around align-items-center vh-100" >
        <div class="flex-grow-1 d-flex align-items-start pt-3">
          <img src="yin_yang.jpg" class="img-thumbnail" alt="ying" />
        </div>
        <div class="flex-grow-1 d-flex flex-column justify-content-around align-items-center">
          <Link class="" to="/"         ><BiSolidDashboard color='#FFEBEB' size='3em'/></Link>
          <Link class="" to="/game"     ><GiGamepad color='#FFEBEB' size='3em'/></Link>
          <Link class="" to="/chat"     ><IoChatbubblesSharp color='#FFEBEB' size='3em'/></Link>
          <Link class="" to="/settings" ><IoSettings color='#FFEBEB' size='3em'/></Link>
          <Link class="" to="/settings" ><IoTrophy color='#FFEBEB' size='3em'/></Link>
        </div>
        <div class="flex-grow-1 d-flex align-items-end pb-3">
          <AiOutlineLogout color='#FFEBEB' size='3em'/>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
