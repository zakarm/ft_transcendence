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

  useEffect(() => {
    const { current: container } = containerRef;
    if (!container) return;
    let width = container.clientWidth;
    let height = container.clientHeight;
    const newScene = new THREE.Scene();
    newScene.background = new THREE.Color(0x000000);
    const newCamera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    let maxWidth = 2500;
    let fraction = (width - 300) / (maxWidth - 300);
    let minFOV = 100;
    let maxFOV = 30;
    newCamera.fov = minFOV - fraction * (minFOV - maxFOV);
    newCamera.updateProjectionMatrix();
    // newCamera.position.set(5, 0, 5);
    newCamera.position.set(25, 15, 16);
    //   const targetPosition = new THREE.Vector3(6, 8, 0);
    const targetPosition = new THREE.Vector3(
      Gameposition_x,
      Gameposition_y,
      Gameposition_z
    );
    gsap.to(newCamera.position, {
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      duration: 3,
      onUpdate: () => {
        newCamera.lookAt(new THREE.Vector3(0, 0, 0));
      },
    });
    const newRenderer = new THREE.WebGLRenderer();
    newRenderer.setSize(width, height);
    container.appendChild(newRenderer.domElement);
    const controls = new OrbitControls(newCamera, newRenderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.minDistance = 10;
    controls.maxDistance = 20;
    controls.update();

    const surface = new Surface(10, 5, 1, 1, TableColor);
    surface.addToScene(newScene);

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
      boundary.addToScene(newScene);
    });

    const ball = new Ball(0.1, 46, 46, BallColor, [0, 0.1, 0], 0, 0);
    ball.addToScene(newScene);

    const wall1 = new Wall(10, 0.5, 0.1, TableColor, [0, 0.2, 2.6]);
    const wall2 = new Wall(10, 0.5, 0.1, TableColor, [0, 0.2, -2.6]);
    wall1.addToScene(newScene);
    wall2.addToScene(newScene);

    const paddle1 = new Paddle(0.2, 0.2, 1, paddleColor, [-4.8, 0.15, 0]);
    const paddle2 = new Paddle(0.2, 0.2, 1, paddleColor, [4.8, 0.15, 0]);
    paddle1.addToScene(newScene);
    paddle2.addToScene(newScene);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    newScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 10, 0);
    newScene.add(directionalLight);

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.copy(ball.mesh.position).y += 0.1;
    newScene.add(light);

    const handleResize = () => {
      let width = container.clientWidth;
      let height = container.clientHeight;
      let maxWidth = 2500;
      let fraction = (width - 300) / (maxWidth - 300);
      let minFOV = 100;
      let maxFOV = 30;
      newCamera.fov = minFOV - fraction * (minFOV - maxFOV);
      newCamera.aspect = width / height;
      newCamera.updateProjectionMatrix();
      newRenderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      newRenderer.render(newScene, newCamera);
      // ball.material.color.set(BallColor);
    };
    animate();

    return () => {
      console.log("GameContainer unmounted");
      window.removeEventListener("resize", handleResize);
      newRenderer.dispose();
      if (container && newRenderer) {
        if (container.contains(newRenderer.domElement)) {
          container.removeChild(newRenderer.domElement);
        }
      }
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
