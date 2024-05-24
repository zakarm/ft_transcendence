import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Surface from "./Surface";
import Boundary from "./Boundary";
import Wall from "./Wall";
import Ball from "./Ball";
import Paddle from "./Paddle";
import gsap from "gsap";
import "./PongGame.css";

interface Props {
  paddleColor: number;
  TableColor: number;
  BallColor: number;
  Gameposition_x: number;
  Gameposition_y: number;
  Gameposition_z: number;
}

const GameContainer: React.FC<Props> = ({
  paddleColor,
  TableColor,
  BallColor,
  Gameposition_x,
  Gameposition_y,
  Gameposition_z,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animateIdRef = useRef<number | null>(null);

  useEffect(() => {
    const { current: container } = containerRef;
    if (!container) return;

    // Dispose of existing WebGL resources if they exist
    if (rendererRef.current) {
      rendererRef.current.dispose();
      container.removeChild(rendererRef.current.domElement);
    }
    if (controlsRef.current) {
      controlsRef.current.dispose();
    }
    if (sceneRef.current) {
      sceneRef.current.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          }
        }
      });
    }

    // Initialize scene, camera, and renderer
    const width = container.clientWidth;
    const height = container.clientHeight;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const maxWidth = 2500;
    const fraction = (width - 300) / (maxWidth - 300);
    const minFOV = 100;
    const maxFOV = 30;
    camera.fov = minFOV - fraction * (minFOV - maxFOV);
    camera.updateProjectionMatrix();
    camera.position.set(25, 15, 16);

    const targetPosition = new THREE.Vector3(
      Gameposition_x,
      Gameposition_y,
      Gameposition_z
    );
    gsap.to(camera.position, {
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      duration: 3,
      onUpdate: () => {
        camera.lookAt(new THREE.Vector3(0, 0, 0));
      },
    });

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.minDistance = 10;
    controls.maxDistance = 20;
    controls.update();

    // Store references to clean up later
    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;
    controlsRef.current = controls;

    const surface = new Surface(10, 5, 1, 1, TableColor);
    surface.addToScene(scene);

    const boundaries: {
      width: number;
      height: number;
      depth: number;
      positions: number[];
    }[] = [
      { width: 10, height: 0.02, depth: 0.05, positions: [0, 0.01, -2.5] },
      { width: 10, height: 0.02, depth: 0.05, positions: [0, 0.01, 2.5] },
      { width: 0.05, height: 0.02, depth: 5, positions: [-5, 0.01, 0] },
      { width: 0.05, height: 0.02, depth: 5, positions: [5, 0.01, 0] },
      { width: 0.05, height: 0.02, depth: 5, positions: [0, 0.01, 0] },
    ];
    boundaries.forEach(({ width, height, depth, positions }) => {
      const boundary = new Boundary(
        width,
        height,
        depth,
        positions,
        paddleColor
      );
      boundary.addToScene(scene);
    });

    const ball = new Ball(0.1, 46, 46, BallColor, [0, 0.1, 0], 0, 0);
    ball.addToScene(scene);

    const wall1 = new Wall(10, 0.5, 0.1, TableColor, [0, 0.2, 2.6]);
    const wall2 = new Wall(10, 0.5, 0.1, TableColor, [0, 0.2, -2.6]);
    wall1.addToScene(scene);
    wall2.addToScene(scene);

    const paddle1 = new Paddle(0.2, 0.2, 1, paddleColor, [-4.8, 0.15, 0]);
    const paddle2 = new Paddle(0.2, 0.2, 1, paddleColor, [4.8, 0.15, 0]);
    paddle1.addToScene(scene);
    paddle2.addToScene(scene);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 10, 0);
    scene.add(directionalLight);

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.copy(ball.mesh.position).y += 0.1;
    scene.add(light);

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const maxWidth = 2500;
      const fraction = (width - 300) / (maxWidth - 300);
      const minFOV = 100;
      const maxFOV = 30;
      camera.fov = minFOV - fraction * (minFOV - maxFOV);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      animateIdRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      if (animateIdRef.current !== null) {
        cancelAnimationFrame(animateIdRef.current);
      }
      renderer.dispose();
      container.removeChild(renderer.domElement);

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          }
        }
      });

      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      controlsRef.current = null;
      animateIdRef.current = null;
    };
  }, [
    BallColor,
    Gameposition_x,
    Gameposition_y,
    Gameposition_z,
    TableColor,
    paddleColor,
  ]);

  return <div className="canvas-div1" ref={containerRef} />;
};

export default GameContainer;
// ```

// ### Explanation of Key Changes

// 1. **Comprehensive Cleanup**:
//    - Disposing of geometries and materials within the scene to ensure all WebGL resources are properly cleaned up.
//    - Removing the renderer's DOM element from the container.
//    - Cancelling any ongoing animation frames.

// 2. **Scene and Camera References**:
//    - Keeping references to the scene, camera, controls, and animation frame ID to properly clean them up during component unmount or re-render.

// 3. **Conditional Cleanup**:
//    - Before creating new instances, checking and disposing of any existing instances.

// By ensuring thorough cleanup of all WebGL resources, this approach should prevent the accumulation of WebGL contexts and resolve the warning about too many active WebGL contexts.
