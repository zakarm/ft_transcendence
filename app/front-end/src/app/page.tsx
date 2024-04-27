// 'use client'

import Link from 'next/link';
import React, { useRef } from 'react';
import styles from './LandingPage.module.css';

const LandingPage: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* <Canvas>
        <Scene />
      </Canvas> */}
      <div className={styles.content}>
        <h1 className={`${styles.title} valo-font`}>VALO-PONG</h1>
        <div className={styles.buttonContainer}>
          <Link className={`${styles.button} valo-font`} href='sign-in'>SIGN IN</Link>
          <Link className={`${styles.button} valo-font`} href='sign-up'>SIGN UP</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;