import Toast from 'react-bootstrap/Toast';

function Notification() {
    return(
        <Toast>
          <Toast.Header>
            <img src="/char3.png" className="rounded me-2" alt="" style={{height: '30px', width: '30px'}}/>
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
    )
}

export default Notification;