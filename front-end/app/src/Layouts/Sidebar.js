
import { Link } from 'react-router-dom';

import { RxDashboard } from "react-icons/rx";
import { LiaGamepadSolid } from "react-icons/lia";
import { IoChatbubblesOutline , IoSettingsOutline , IoTrophy } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { GiPingPongBat } from "react-icons/gi";
import './Sidebar.css'

function SideBar() {
  return (
    <div class="items">
        <div class="logo">
          <GiPingPongBat color='#FFFFFF' size='3em'/>
        </div>
        <div class="nav">
          <Link class="nav-item" to="/"><RxDashboard color='#FFFFFF' size='3em'/></Link>
          <Link class="nav-item" to="/game"><LiaGamepadSolid color='#FFFFFF' size='3em'/></Link>
          <Link class="nav-item" to="/chat"><IoChatbubblesOutline color='#FFFFFF' size='3em'/></Link>
          <Link class="nav-item" to="/settings"><IoSettingsOutline color='#FFFFFF' size='3em'/></Link>
          <Link class="nav-item" to="/settings"><IoTrophy color='#FFFFFF' size='3em'/></Link>
        </div>
        <div class="logout">
          <AiOutlineLogout color='#FFFFFF' size='3em'/>
        </div>
    </div>
  );
}

export default SideBar;
