import { RiNotification4Fill } from "react-icons/ri";
import './Rightbar.css'
function RightBar() {
    return (
        <div className="conatinaer">
            <div className="row">
                <div className="col">
                {/* <a href="/" class="notification border">    */}
                <div className="notification">
                    <RiNotification4Fill color="#FF4755" size='1.5em'/>
                    <span class="badge">3</span>
                </div>
                {/* </a> */}
                </div>
            </div>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row"></div>
        </div>
    );
}

export default RightBar;