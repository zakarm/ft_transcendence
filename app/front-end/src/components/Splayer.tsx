import React , { forwardRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './styles/Splayer.module.css'
import Image from 'next/image'

interface PlayerProps {
  nickname: string;
  id: number;
  image: string;
  isConnected: boolean;
}

export default function Splayer({ nickname, id, image, isConnected }: PlayerProps) {

  return (
    <div className={`${styles.usr_class1} row-inline`}>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div>
              <img
                className={`${styles.img_usr_class1}`}
                src={image}
                alt="Profile"
                width={60} height={60}
                style={{
                  border: isConnected ? '3px solid #27B299' : '3px solid #7E7E8D',
                  filter: isConnected ? '' : 'grayscale(100%)',
                }}
              />
        </div>
        <div className="">
          <h5 className={`${styles.hold}`}>{nickname}</h5>
        </div>
      </div>
    </div>
  );
};
