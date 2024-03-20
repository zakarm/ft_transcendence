import React from 'react';
import { RiNotification4Fill } from "react-icons/ri";
import Dropdown from 'react-bootstrap/Dropdown';

function Home(){


    const CustomToggle = ({children, onClick}) => (
        <div onClick={onClick}>
         {children}
         </div>
    );

    return(
        <div className="d-flex justify-content-center align-items-center vh-100 border ">
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              <div className="notification">
                 <div className="">
                     <RiNotification4Fill color="#FF4755" size='1.5em'/>
                 </div>
                  <span class="badge">3</span>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu >
              <Dropdown.Item eventKey="1">Red</Dropdown.Item>
              <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
              <Dropdown.Item eventKey="3">Orange</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </div>
    );
}

export default Home;