'use client'

import Link from 'next/link';
import React, { useRef } from 'react';
import styles from './LandingPage.module.css';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, PerspectiveCamera, Mesh, MeshBasicMaterial, BoxGeometry } from '@react-three/drei';

// const Scene: React.FC = () => {
//   const meshRef = useRef<Mesh>(null!);

//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x += 0.01;
//       meshRef.current.rotation.y += 0.01;
//     }
//   });

//   return (
//     <>
//       <PerspectiveCamera position={[0, 0, 5]} makeDefault />
//       <OrbitControls />
//       <mesh ref={meshRef}>
//         <boxGeometry args={[1, 1, 1]} />
//         <meshBasicMaterial color="#ff4d4d" />
//       </mesh>
//     </>
//   );
// };

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