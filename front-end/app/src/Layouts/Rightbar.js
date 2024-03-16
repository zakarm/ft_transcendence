import { RiNotification4Fill } from "react-icons/ri";
import './Rightbar.css'

function RightBar() {
    return (
        <div className="conatinaer p-2">
            <div className="row">
                <div className="col">
                    <div className="notification">
                        <RiNotification4Fill color="#FF4755" size='1.5em'/>
                        <span class="badge">3</span>
                    </div>
                </div>
            </div>
            <div className="row d-flex flex-column text-center">
                <div className="col">
                    <img className="img-class" src="assets/char3.png" alt='Profile'/>
                </div>
                <div className="col mt-2">
                    <h3 className="valo-font">!SNAKE_007</h3>
                    <h4 style={{fontFamily: 'intim', color: '#FFEBEB'}}>#7777</h4>
                </div>
            </div>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row"></div>
        </div>
    );
}

export default RightBar;