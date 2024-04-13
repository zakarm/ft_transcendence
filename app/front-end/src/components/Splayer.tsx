import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './styles/Splayer.module.css'
import Image from 'next/image'

interface PlayerProps {
  nickname: string;
  id: number;
  image: string;
  isConnected: boolean;
}

interface CustomToggleProps {
  onClick: () => void;
  children: React.ReactNode;
}

const CustomToggle = React.forwardRef<HTMLDivElement, CustomToggleProps>(
  ({ children, onClick }, ref) => (
    <div ref={ref} onClick={onClick}>
      {children}
    </div>
  )
);
CustomToggle.displayName = 'CustomToggle';

export default function Player({ nickname, id, image, isConnected }: PlayerProps) {
  
  return (
    <div className={`${styles.usr_class1} row-inline`}>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            <Image
              className={`${styles.img_usr_class1}`}
              src={image}
              alt="Profile"
              width={60} height={60}
              style={{
                border: isConnected ? '3px solid #27B299' : '3px solid #7E7E8D',
                filter: isConnected ? '' : 'grayscale(100%)',
              }}
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
        <div className="p-2">
          <h5 className={`${styles.hold}`}>{nickname}</h5>
        </div>
      </div>
    </div>
  );
};