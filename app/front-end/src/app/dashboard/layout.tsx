'use client'
// import { FaAngleLeft } from "react-icons/fa";
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import { useState } from 'react';
// import SideBar from "../../components/sideBar";
// import RightBar from '../../components/rightBar';
// import SrightBar from '../../components/srightBar';
// import Togglebar from '../../components/toggleBar';
// import styles from './style.module.css'
import MainContainer from "../../components/mainContainer";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  
  return (
		<>
			<MainContainer children={children}></MainContainer>
		</>
  );
}