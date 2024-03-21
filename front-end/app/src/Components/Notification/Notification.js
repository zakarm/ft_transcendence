
function Notification() {
    return(
        <div className="container-fluid p-1" style={{fontFamily: 'itim', color: '#212529'}}>
            <div className="row-inline d-flex flex-row">
                <div className="col-2 p-0 ">
                    <img className="" src="./assets/char3.png" alt="notification status" style={{height: '30px', width: '30px'}}/>
                </div>
                <div className="col d-flex align-items-center justify-content-start p-0 ">
                    <h5 className="m-0">Notif Title</h5>
                </div>
                <div className="col d-flex align-items-center justify-content-end p-0 ">
                    <p className=" m-0">10 min ago</p>
                </div>
            </div>
            <div className="row d-flex flex-column">
                <div className="col ">
                    <b>Invitation</b>
                </div>
                <div className="col ">
                    <p class="fixed-width-p">Appolo has requested to follow you</p>
                </div>
            </div>
        </div>
    )
}

export default Notification;