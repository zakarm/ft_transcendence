import Link from 'next/link';
import React from 'react';
import styles from './LandingPage.module.css';

const LandingPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={`${styles.title} valo-font`}>VAL-PONG</h1>
        <div className={styles.buttonContainer}>
          <Link className={`${styles.button} valo-font`} href='sign-in'>SIGN IN</Link>
          <Link className={`${styles.button} valo-font`} href='sign-up'>SIGN UP</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
