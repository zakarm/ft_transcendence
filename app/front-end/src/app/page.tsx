'use client';

import Link from 'next/link';
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import styles from './styles/LandingPage.module.css';

const AnimatedTitle = () => {
  const titleRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (titleRef.current) {
      titleRef.current.position.y = Math.sin(elapsedTime) * 0.5;
      titleRef.current.rotation.y = Math.sin(elapsedTime * 0.5);
    }
  });

  return (
    <Text
      ref={titleRef}
      fontSize={1}
      color="#ff4755"
      font="/valorax.otf" // Specify your custom font path here
      position={[0, 0, 0]}
    >
      FT_TRANSCENDENCE
    </Text>
  );
};

const CameraAnimation = () => {
  const { camera } = useThree();
  const clock = useRef(new THREE.Clock());

  useEffect(() => {
    const initialPosition = new THREE.Vector3(0, 0, 30); // Start further back
    const targetPosition = new THREE.Vector3(0, 0, 10); // End closer but not too close
    const duration = 2; // Duration of the zoom in seconds

    const animate = () => {
      const elapsedTime = clock.current.getElapsedTime();
      if (elapsedTime < duration) {
        const t = elapsedTime / duration;
        camera.position.lerpVectors(initialPosition, targetPosition, t);
        camera.updateProjectionMatrix();
        requestAnimationFrame(animate);
      } else {
        camera.position.copy(targetPosition);
        camera.updateProjectionMatrix();
      }
    };

    animate();
  }, [camera]);

  return null;
};

const LandingPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Canvas className={styles.threeScene}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars />
        <AnimatedTitle />
        <CameraAnimation />
        <OrbitControls />
      </Canvas>
      <div className={styles.content}>
        <div className={styles.buttonContainer}>
          <Link className={`${styles.button} valo-font`} href='sign-in'>SIGN IN</Link>
          <Link className={`${styles.button} valo-font`} href='sign-up'>SIGN UP</Link>
        </div>
      </div>
      <div className={styles.footer}>
        <p className={styles.copyright}>© 2024 ft_transcendence. All rights reserved.</p>
        <a className={styles.githubLink} href="https://github.com/zakarm/ft_transcendence" target="_blank" rel="noopener noreferrer">
          Created by @zmrabet @ael-mouz @mfouadi @onouakch
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
