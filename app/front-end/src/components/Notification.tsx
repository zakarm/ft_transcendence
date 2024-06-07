import Toast from 'react-bootstrap/Toast';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface Notif
{
  notification_id: number;
	image_url: string;
	message: string;
	title: string;
	link: string;
}

interface Props 
{
  notification: Notif;
}

function Notification({notification}: Props) {
    return(
      <Toast>
      <Toast.Header>
        <Image
          src={notification.image_url}
          width={30}
          height={30}
          className="rounded me-2"
          alt=""
          style={{ height: '30px', width: '30px' }}
        />
        <strong className="me-auto">{notification.title}</strong>
        {/* <small>11 mins ago</small> */}
        </Toast.Header>
        <Toast.Body className="d-flex justify-content-between align-items-center">
          {notification.message}
          <div>
            <Button variant="success" className="me-2"><FaCheck /></Button>
            <Button variant="danger"><FaTimes /></Button>
          </div>
        </Toast.Body>
      </Toast>
    )
}

export default Notification;