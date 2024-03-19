import { RxDotsVertical } from "react-icons/rx";
import { useState } from "react";
import './Player.css'

function Player({ nickname , id }) {
    const [isHoverd, setIsHoverd] = useState(false);
    return (
        <div className="usr-class row-inline d-flex flex-row">
            <div className="col-9 d-flex flex-row align-items-center">
                    <img className="img-usr-class m-2" src="assets/char3.png" alt='Profile'/>
                    <div className="text-center p-2">
                        <h5 style={{fontFamily: 'intim', color: '#FFEBEB'}}>{nickname}</h5>
                        <h6 style={{fontFamily: 'intim', color: '#FFEBEB'}}>#{id}</h6>
                    </div>
            </div>
            <div className="col d-flex align-items-center justify-content-center">
                <RxDotsVertical
                    onMouseEnter={() => setIsHoverd(true)}
                    onMouseLeave={() => setIsHoverd(false)}
                    className="opt-class" color={isHoverd ? "#27B299" : "#FFEBEB"} size='2em'
                />
            </div>
        </div>
    );
}

export default Player;