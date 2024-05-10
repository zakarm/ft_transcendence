"use client";
import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Surface from "./Surface";
import Boundary from "./Boundary";
import Wall from "./Wall";
import Ball from "./Ball";
import Paddle from "./Paddle";
import "./PongGame.css";
import BoardItem from "../BoardItem/BoardItem";

interface ConnectionInfo {
  index: number;
  roomName: string;
}

interface Player {
  name: string;
  imageUrl: string;
  stats: {
    adaptation: number;
    agility: number;
    winStreaks: number;
    endurance: number;
    eliteTierRanking: number;
  };
  index: number;
}
interface Props {
  webSocket: WebSocket;
  connectionInfo: ConnectionInfo;
  players: Player[];
}

const PongGame: React.FC<Props> = ({
  webSocket,
  connectionInfo,
  players,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: window.innerHeight,
  });
  const [user1score, setUser1Score] = useState<number>(0);
  const [user2score, setUser2Score] = useState<number>(0);
  const yoruImage = "/yoru.jpeg";
  const omenImage = "/omen.jpeg";

  useEffect(() => {
    function updateDimensions() {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: window.innerHeight,
        });
      }
    }

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    const newScene = new THREE.Scene();
    newScene.background = new THREE.Color(0x000000);
    const newCamera = new THREE.PerspectiveCamera(
      75,
      dimensions.width / window.innerHeight,
      0.1,
      1000
    );
    if (dimensions.width < 600) newCamera.fov = 100;
    else if (dimensions.width >= 600 && dimensions.width < 1024)
      newCamera.fov = 90;
    else newCamera.fov = 75;
    // newCamera.position.set(0, 5, 0);
    newCamera.position.set(6, 8, 0);
    newCamera.lookAt(new THREE.Vector3(9, 9, 0));
    const newRenderer = new THREE.WebGLRenderer();
    newRenderer.setSize(dimensions.width, window.innerHeight);
    const { current: container } = containerRef;
    if (container) container.appendChild(newRenderer.domElement);

    const controls = new OrbitControls(newCamera, newRenderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.minDistance = 10;
    controls.maxDistance = 160;
    controls.update();

    const surface = new Surface(10, 5, 1, 1, 0x161625);
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
      const boundary = new Boundary(width, height, depth, positions, 0xff4655);
      boundary.addToScene(newScene);
    });

    const ball = new Ball(0.1, 46, 46, 0xffffff, [0, 0.1, 0], 0, 0);
    ball.addToScene(newScene);

    const wall1 = new Wall(10, 0.5, 0.1, 0x161625, [0, 0.2, 2.6]);
    const wall2 = new Wall(10, 0.5, 0.1, 0x161625, [0, 0.2, -2.6]);
    wall1.addToScene(newScene);
    wall2.addToScene(newScene);

    const paddle1 = new Paddle(0.2, 0.2, 1, 0xff4655, [-4.8, 0.15, 0]);
    const paddle2 = new Paddle(0.2, 0.2, 1, 0xff4655, [4.8, 0.15, 0]);
    paddle1.addToScene(newScene);
    paddle2.addToScene(newScene);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    newScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 10, 0);
    newScene.add(directionalLight);

    const light = new THREE.PointLight(0xffffff, 0.5);
    light.position.set(
      ball.mesh.position.x,
      ball.mesh.position.y + 0.1,
      ball.mesh.position.z
    );
    newScene.add(light);

    const handleKeyDown = (event: KeyboardEvent) => {
      let i = connectionInfo.index;
      let speed = 0;
      switch (event.code) {
        case "ArrowLeft":
          speed = 0.1;
          break;
        case "ArrowRight":
          speed = -0.1;
          break;
        default:
          break;
      }
      i = i === 1 ? 2 : 1;
      speed *= i === 1 ? -1 : 1;
      sendMessage({ action: "paddle_move", paddle: i, speed: speed });
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      let i = connectionInfo.index;
      switch (event.code) {
        case "ArrowLeft":
        case "ArrowRight":
          break;
        default:
          break;
      }
      i = i === 1 ? 2 : 1;
      sendMessage({ action: "paddle_stop", paddle: i });
    };

    const handleResize = () => {
      if (dimensions.width < 600) newCamera.fov = 100;
      else if (dimensions.width >= 600 && dimensions.width < 1024)
        newCamera.fov = 90;
      else newCamera.fov = 75;
      newCamera.aspect = dimensions.width / dimensions.height;
      newCamera.updateProjectionMatrix();
      newRenderer.setSize(dimensions.width, dimensions.height);
    };

    const sendMessage = (data: Record<string, any>) => {
      if (webSocket && webSocket.readyState === WebSocket.OPEN) {
        const message = JSON.stringify(data);
        webSocket.send(message);
      }
    };

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.message.action === "update") {
        if (connectionInfo.index === 1)
          ball.update(
            data.message.ball_position_x,
            data.message.ball_position_z,
            data.message.ball_velocity_x,
            data.message.ball_velocity_z
          );
        else
          ball.update(
            data.message.ball_position_x * -1,
            data.message.ball_position_z * -1,
            data.message.ball_velocity_x * -1,
            data.message.ball_velocity_z * -1
          );
        light.position.copy(ball.mesh.position);
      }
      if (data.message.action === "reset") {
        if (connectionInfo.index === 1)
          ball.update(
            0,
            data.message.ball_position_z,
            data.message.ball_velocity_x,
            data.message.ball_velocity_z
          );
        else
          ball.update(
            0,
            data.message.ball_position_z * -1,
            data.message.ball_velocity_x * -1,
            data.message.ball_velocity_z * -1
          );
        light.position.copy(ball.mesh.position);
        paddle1.reset();
        paddle2.reset();
      }
      if (data.message.action === "paddle_update") {
        if (connectionInfo.index === 1) {
          if (data.message.paddle === 1)
            paddle1.update(data.message.paddle_position_z);
          if (data.message.paddle === 2)
            paddle2.update(data.message.paddle_position_z);
        } else {
          if (data.message.paddle === 1)
            paddle2.update(data.message.paddle_position_z * -1);
          if (data.message.paddle === 2)
            paddle1.update(data.message.paddle_position_z * -1);
        }
      }
      if (data.message.action === "score") {
        setUser1Score(data.message.user1score);
        setUser2Score(data.message.user2score);
      }
    };

    webSocket.addEventListener("message", handleMessage);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      newRenderer.render(newScene, newCamera);
    };
    animate();

    return () => {
      webSocket.removeEventListener("message", handleMessage);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", handleResize);
      newRenderer.dispose();
      if (container && newRenderer) {
        if (container.contains(newRenderer.domElement)) {
          container.removeChild(newRenderer.domElement);
        }
      }
    };
  }, [dimensions, connectionInfo, webSocket, user1score, user2score]);

  return (
    <div className="Pong_Game_container">
      <div className="board">
        <BoardItem
          championName={players[0].name}
          hashtag="#TheHacker007"
          score={user1score}
          imageSrc={players[0].imageUrl}
        />
        <BoardItem
          championName={players[1].name}
          hashtag="#TheHacker007"
          score={user2score}
          imageSrc={players[1].imageUrl}
        />
      </div>
      <div className="canvas_div" ref={containerRef} />
    </div>
  );
};

export default PongGame;
