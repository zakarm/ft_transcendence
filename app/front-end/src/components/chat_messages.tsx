
import styles from './styles/chat_messages.module.css';
import { InputGroup } from 'react-bootstrap';
import Image from 'next/image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FaTableTennisPaddleBall } from 'react-icons/fa6';
import { ImUserMinus } from 'react-icons/im';
import { IoIosSend } from "react-icons/io";

export default function ChatMessages( ) {

  return (
      <>
        <div className='vh-100 d-flex flex-column border border-dark' >
          <div className='row p-0 m-0 d-flex justify-content-center ' style={{fontFamily: 'itim', color: '#FFEBEB'}}>
              <div className='col-2 py-3 text-end' style={{backgroundColor: '#161625', borderBottomLeftRadius: '25px'}}>
                  <Image className={`${styles.chat_img}`} width={200} height={200} src="/profile.jpeg" alt='welcome'/>
              </div>
              <div className='col-5 py-3 d-flex flex-column justify-content-evenly' style={{backgroundColor: '#161625'}}>
                <div><span>!Snake_007</span></div>
                <div><span>Online</span></div>
              </div>
              <div className='col-3 py-3 d-flex align-items-center justify-content-end' style={{backgroundColor: '#161625', borderBottomRightRadius: '25px'}}>
                <FaTableTennisPaddleBall className='mx-2' size='1.8em' style={{cursor: 'pointer'}}/>
                <ImUserMinus className='mx-2' size='1.8em' style={{cursor: 'pointer'}}/>
              </div>
          </div>
          <div className='flex-grow-1 valo-font d-flex justify-content-center align-items-center'>CHAT</div>
          <div className='p-4 mx-2' style={{backgroundColor: '#181B20', borderTopRightRadius: '25px', borderTopLeftRadius: '25px'}}> 
            <InputGroup size="lg" style={{fontFamily: 'itim'}}>
              <Form.Control
                placeholder="Type..."
                aria-label="Type..."
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" id="button-addon2">
                <IoIosSend className='mx-2' size='1.8em' color='#FF4755' style={{cursor: 'pointer'}}/>
              </Button>
            </InputGroup>
          </div>
        </div>
      </>
  );
}