'use client';
import { RxDotsVertical } from "react-icons/rx";
import { forwardRef, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './styles/Player.module.css';
import Image from 'next/image';

interface PlayerProps {
  nickname: string;
  id: number;
  image: string;
  isConnected: boolean;
}

interface CustomToggleProps {
  children: React.ReactNode;
  onClick: () => void;
}

const CustomToggle = forwardRef<HTMLDivElement, CustomToggleProps>(
  ({ children, onClick }, ref) => (
      <div ref={ref} onClick={onClick}>
      {children}
      </div>
  )
);

function Player({ nickname, id, image, isConnected }: PlayerProps) {
  const [isHoverd, setIsHoverd] = useState<boolean>(false);

  return (
    <div className={`${styles.usr_class} row-inline d-flex flex-row`}>
      <div className="col-9 d-flex flex-row align-items-center">
        <Image
          className={`${styles.img_usr_class} m-2`}
          src={image}
          alt='Profile'
          width={60} height={60}
          style={{
            border: isConnected ? "3px solid #27B299" : "3px solid #7E7E8D",
            filter: isConnected ? '' : "grayscale(100%)"
          }}
        />
        <div className="p-2">
          <h5 style={{ fontFamily: 'itim', color: '#FFEBEB' }}>{nickname}</h5>
          <h6 style={{ fontFamily: 'itim', color: '#FFEBEB' }}>#{id}</h6>
        </div>
      </div>
      <div className="col d-flex align-items-center justify-content-center">
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            <RxDotsVertical
              onMouseEnter={() => setIsHoverd(true)}
              onMouseLeave={() => setIsHoverd(false)}
              className={`${styles.opt_class}`}
              color={isHoverd ? "#27B299" : "#FFEBEB"}
              size='2em'
            />
          </Dropdown.Toggle>
          <Dropdown.Menu className="drop-class">
            <Dropdown.Item eventKey="1">opt 1</Dropdown.Item>
            <hr className="dropdown-divider" />
            <Dropdown.Item eventKey="2">opt 2</Dropdown.Item>
            <hr className="dropdown-divider" />
            <Dropdown.Item eventKey="3">opt 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Player;