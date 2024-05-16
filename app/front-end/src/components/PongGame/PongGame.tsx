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
import gsap from "gsap";
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
  const [user1score, setUser1Score] = useState<number>(0);
  const [user2score, setUser2Score] = useState<number>(0);

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
    let minFOV = 120;
    let maxFOV = 65;
    newCamera.fov = minFOV - fraction * (minFOV - maxFOV);
    newCamera.updateProjectionMatrix();
    // newCamera.position.set(5, 0, 5);
    newCamera.position.set(25, 15, 16);
    const targetPosition = new THREE.Vector3(6, 8, 0);
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

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    newScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 10, 0);
    newScene.add(directionalLight);

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.copy(ball.mesh.position).y += 0.1;
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
        case "Space":
          sendMessage({ action: "pause" });
        default:
          break;
      }
      i = i === 1 ? 2 : 1;
      sendMessage({ action: "paddle_stop", paddle: i });
    };

    const handleResize = () => {
      let width = container.clientWidth;
      let height = container.clientHeight;
      let maxWidth = 2500;
      let fraction = (width - 300) / (maxWidth - 300);
      let minFOV = 120;
      let maxFOV = 65;
      newCamera.fov = minFOV - fraction * (minFOV - maxFOV);
      newCamera.aspect = width / height;
      newCamera.updateProjectionMatrix();
      newRenderer.setSize(width, height);
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
        const factor = connectionInfo.index === 1 ? 1 : -1;
        ball.update(
          data.message.ball_position_x * factor,
          data.message.ball_position_z * factor,
          data.message.ball_velocity_x * factor,
          data.message.ball_velocity_z * factor
        );
        light.position.copy(ball.mesh.position).y += 0.1;
      }
      if (data.message.action === "reset") {
        const factor = connectionInfo.index === 1 ? 1 : -1;
        ball.update(
          0,
          data.message.ball_position_z * factor,
          data.message.ball_velocity_x * factor,
          data.message.ball_velocity_z * factor
        );
        light.position.copy(ball.mesh.position).y += 0.1;
        paddle1.reset();
        paddle2.reset();
      }
      if (data.message.action === "paddle_update") {
        const factor = connectionInfo.index === 1 ? 1 : -1;
        const updatePaddle1 = connectionInfo.index === 1 ? paddle1 : paddle2;
        const updatePaddle2 = connectionInfo.index === 1 ? paddle2 : paddle1;
        if (data.message.paddle === 1) {
          updatePaddle1.update(data.message.paddle_position_z * factor);
        }
        if (data.message.paddle === 2) {
          updatePaddle2.update(data.message.paddle_position_z * factor);
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
      console.log("PongGame unmounted");
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
  }, []);

  return (
    <div className="Pong_Game_container">
      <div className="board">
        <BoardItem
          championName={players[0].name || "Player 1"}
          hashtag="#TheHacker007"
          score={user1score}
          imageSrc={players[0].imageUrl}
        />
        <BoardItem
          championName={players[1].name || "Player 2"}
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
