// dashboard/layout.tsx
'use client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// import Chat from "./pages/Chat";
// import Game from "./pages/Game";
// import Home from "./pages/Home";
// import Settings from "./pages/Settings";
// import Achievement from './pages/Achievement';
// import SideBar from "./Layouts/Sidebar";
// import RightBar from "./Layouts/Rightbar";
// import SrightBar from './Layouts/SrightBar';

import { FaAngleLeft } from "react-icons/fa";

import Offcanvas from 'react-bootstrap/Offcanvas';

import { useState } from 'react';
// import './App.css';
// import Togglebar from './Components/SideBar/Togglebar';
import SideBar from "../../components/sideBar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [showSide, setShowSide] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const handleToggle = () => setShowSide(false);
  const showToggle = () => setShowSide(true);
  return (
    <>
      <div className="container-fluid p-0 vh-100" style={{backgroundColor: '#000000', overflow: 'hidden'}}>
      <div className="row">
        <Router >
          <div className='col-1 toglle p-0'>
            <img src="assets/LOGO.svg" className="logo img-fluid rounded rounded-circle" alt="ying" onClick={showToggle}/>
            <Offcanvas show={showSide} placement='start' onHide={handleToggle} scroll={false} backdrop={true} >
              <div className='sidebar-toggle vh-100'>
                <Offcanvas.Header closeButton closeVariant='white'>
                  <Offcanvas.Title><img src="assets/LOGO.svg" className="logo img-fluid rounded rounded-circle" alt="ying"/></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='pt-0 d-flex justify-content-center' style={{height: '93%'}}>
                  {/* <Togglebar handleToggle={handleToggle}/> */}
                </Offcanvas.Body>
                </div>
            </Offcanvas>
            <div className='col-1 slider d-flex align-items-center justify-content-center' onClick={toggleShow}>
              <FaAngleLeft  color="#FFEBEB"/>
            </div>
          </div>
          <div className="sidebar col-md-1 d-none d-sm-none d-md-block border" style={{backgroundColor: '#000000'}}>
            <SideBar />
          </div>
          <div className="col-md-10 col-sm-12 p-0 border border-danger" style={{backgroundColor: '#000000'}}>
            <Routes>
              {/* <Route path='/'         element={<Home />}      />
              <Route path='/chat'     element={<Chat />}      />
              <Route path='/settings' element={<Settings />}  />
              <Route path='/game'     element={<Game />}      />
              <Route path='/achievement'     element={<Achievement />}      /> */}
            </Routes>
          </div>
          <div className="rightbar col-md-1 d-none d-sm-none d-md-block p-0 border" style={{backgroundColor: '#161625'}}>
            <div className='row-fluid d-flex flex-row align-items-center p-0 vh-100'>
              <div className='col-1 vh-100 d-flex justify-content-end align-items-center text-center' style={{backgroundColor: '#000000'}}>
                <div className='drag-class pt-3 pb-3' style={{backgroundColor: '#161625', borderRadius: '15px 0 0 15px', cursor: 'pointer'}} onClick={toggleShow}>
                  <FaAngleLeft  color="#FFEBEB" size='1.2em'/>
                  {/* <RightBar show={show} setShow={setShow} handleClose={handleClose} toggleShow={toggleShow}/> */}
                </div>
              </div>
              <div className='col-11'>
                {/* <SrightBar toggleShow={toggleShow}/> */}
              </div>
            </div>
          </div>
        </Router>
      </div>
    </div>
    </>
  );
}