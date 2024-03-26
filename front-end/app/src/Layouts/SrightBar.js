import Dropdown from 'react-bootstrap/Dropdown';
import { IoIosSearch } from "react-icons/io";
import { ImUserPlus } from "react-icons/im";
import './SrightBar.css'
import Splayer from "../Components/player/Splayer";
import Notification from "../Components/Notification/Notification";
import friends from '../services/friends.json';
import React from 'react';


function SrightBar(props) {
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
        return(
        <div
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }} >
          {children}
        </div>
        );
    });

    const friendsData = friends.sort((usr1, usr2) => {
        if (usr1.connected && !usr2.connected) {
            return -1;
        }
          // Sort disconnected users second
        if (!usr1.connected && usr2.connected) {
            return 1;
        }
          // Sort by ID if isConnected flag is the same
        return usr1.id - usr2.id;
    })
    // .slice(0, 5)
    .map((user, index) => 
        <Splayer key={index} nickname={user.nickname} id={user.id} image={user.image_url} isConnected={user.connected}/>
    );
    return (
            <div className="d-flex flex-column vh-100 py-2">
                <div className="pb-1" style={{width: '91%'}}>
                            <div className=' d-flex flex-column align-items-center justify-content-center p-0'>
                                <div className='holder text-center p-2'>
                                    <div className="col-inline notification1">
                                       <Dropdown>
                                           <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                                <img className="img-class1" src="assets/char3.png" alt='Profile'/>
                                                <span className="badge1">3</span>
                                           </Dropdown.Toggle>
                                           <Dropdown.Menu className="drop-class">
                                             <Dropdown.Item eventKey="1"><Notification /></Dropdown.Item>
                                             <Dropdown.Item eventKey="2"><Notification /></Dropdown.Item>
                                             <Dropdown.Item eventKey="3"><Notification /></Dropdown.Item>
                                           </Dropdown.Menu>
                                       </Dropdown>
                                    </div>
                                    <div className="usr col pt-1">
                                         <h5 className="valo-font">Me</h5>
                                    </div>
                                </div>
                            </div>
                         <div className='row d-flex text-center justify-content-center m-0'>
                            <div className="col-6 search-inpt1 p-2 m-2" onClick={props.toggleShow}>
                                 <IoIosSearch color="#FFEBEB"/>
                            </div>
                         </div>
                </div>
                <div className=" mb-2 flex-grow-1 text-center" style={{ overflowY: 'auto', width: '91%' }}>
                    {friendsData}
                </div>
                <div className="flex-grow-3 row-inline d-flex justify-content-center text-center" style={{width: '91%'}}>
                    <div className="col-6 search-inpt my-1 p-2  mx-2 text-center" style={{cursor: "pointer"}}>
                            <ImUserPlus color="#FFEBEB"/>
                    </div>
                </div>
            </div>
    );
}

export default SrightBar;