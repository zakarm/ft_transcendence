import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Surface from './Surface';
import Boundary from './Boundary';
import Wall from './Wall';
import Ball from './Ball';
import Paddle from './Paddle';
import './PongGame.css';
import BoardItem from '../BoardItem/BoardItem';
import gsap from 'gsap';

interface ConnectionInfo {
    index: number;
    roomName: string;
    table_color: string;
    ball_color: string;
    paddle_color: string;
    table_position : string;
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
const convertHexColor = (hex: string): number => {
    const cleanedHex = hex.replace('#', '');
    return parseInt(cleanedHex, 16);
};
const convertStringToVector3 = (str: string): THREE.Vector3 => {
    const [x, y, z] = str.split(',').map((coord) => parseFloat(coord));
    return new THREE.Vector3(x, y, z);
}

const PongGame: React.FC<Props> = ({ webSocket, connectionInfo, players }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const animateIdRef = useRef<number | null>(null);
    const [user1score, setUser1Score] = useState<number>(0);
    const [user2score, setUser2Score] = useState<number>(0);

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
            sceneRef.current?.traverse((object: THREE.Object3D) => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();
                    if (object.material instanceof THREE.Material) {
                        object.material.dispose();
                    } else if (Array.isArray(object.material)) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach((material: THREE.Material) => material.dispose());
                        }
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
        const minFOV = 120;
        const maxFOV = 65;
        camera.fov = minFOV - fraction * (minFOV - maxFOV);
        camera.updateProjectionMatrix();
        // camera.position.set(5, 0, 5);
        camera.position.set(25, 15, 16);

        // const targetPosition = new THREE.Vector3(6, 8, 0);
        const targetPosition = convertStringToVector3(connectionInfo.table_position);
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

        const surface = new Surface(10, 5, 1, 1, convertHexColor(connectionInfo.table_color));
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
            const boundary = new Boundary(width, height, depth, positions, convertHexColor(connectionInfo.paddle_color));
            boundary.addToScene(scene);
        });

        const ball = new Ball(0.1, 46, 46, convertHexColor(connectionInfo.ball_color), [0, 0.1, 0], 0, 0);
        ball.addToScene(scene);

        const wall1 = new Wall(10, 0.5, 0.1, convertHexColor(connectionInfo.table_color), [0, 0.2, 2.6]);
        const wall2 = new Wall(10, 0.5, 0.1, convertHexColor(connectionInfo.table_color), [0, 0.2, -2.6]);
        wall1.addToScene(scene);
        wall2.addToScene(scene);

        const paddle1 = new Paddle(0.2, 0.2, 1, convertHexColor(connectionInfo.paddle_color), [-4.8, 0.15, 0]);
        const paddle2 = new Paddle(0.2, 0.2, 1, convertHexColor(connectionInfo.paddle_color), [4.8, 0.15, 0]);
        paddle1.addToScene(scene);
        paddle2.addToScene(scene);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(0, 10, 0);
        scene.add(directionalLight);

        const light = new THREE.PointLight(0xffffff, 0.6);
        light.position.copy(ball.mesh.position).y += 0.1;
        scene.add(light);

        const handleKeyDown = (event: KeyboardEvent) => {
            let i = connectionInfo.index;
            let speed = 0;
            switch (event.code) {
                case 'ArrowLeft':
                    speed = 0.1;
                    break;
                case 'ArrowRight':
                    speed = -0.1;
                    break;
                default:
                    break;
            }
            i = i === 1 ? 2 : 1;
            speed *= i === 1 ? -1 : 1;
            sendMessage({ action: 'paddle_move', match_id: connectionInfo.roomName , paddle: i, speed: speed });
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            let i = connectionInfo.index;
            switch (event.code) {
                case 'ArrowLeft':
                case 'ArrowRight':
                    break;
                case 'Space':
                    sendMessage({ action: 'pause', match_id: connectionInfo.roomName });
                    break;
                default:
                    break;
            }
            i = i === 1 ? 2 : 1;
            sendMessage({ action: 'paddle_stop', match_id: connectionInfo.roomName , paddle: i });
        };

        const handleResize = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            const maxWidth = 2500;
            const fraction = (width - 300) / (maxWidth - 300);
            const minFOV = 120;
            const maxFOV = 65;
            camera.fov = minFOV - fraction * (minFOV - maxFOV);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        const sendMessage = (data: Record<string, string | number>) => {
            if (webSocket && webSocket.readyState === WebSocket.OPEN) {
                const message = JSON.stringify(data);
                webSocket.send(message);
            }
        };

        const handleMessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.message.action === 'update') {
                const factor = connectionInfo.index === 1 ? 1 : -1;
                ball.update(
                    data.message.ball_position_x * factor,
                    data.message.ball_position_z * factor,
                    data.message.ball_velocity_x * factor,
                    data.message.ball_velocity_z * factor,
                );
                light.position.copy(ball.mesh.position).y += 0.1;
            }
            if (data.message.action === 'reset') {
                const factor = connectionInfo.index === 1 ? 1 : -1;
                ball.update(
                    0,
                    data.message.ball_position_z * factor,
                    data.message.ball_velocity_x * factor,
                    data.message.ball_velocity_z * factor,
                );
                light.position.copy(ball.mesh.position).y += 0.1;
                paddle1.reset();
                paddle2.reset();
            }
            if (data.message.action === 'paddle_update') {
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
            if (data.message.action === 'score') {
                setUser1Score(data.message.user1score);
                setUser2Score(data.message.user2score);
            }
        };

        webSocket.addEventListener('message', handleMessage);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        window.addEventListener('resize', handleResize);

        const animate = () => {
            animateIdRef.current = requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            webSocket.removeEventListener('message', handleMessage);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('resize', handleResize);
            controls.dispose();
            if (animateIdRef.current !== null) {
                cancelAnimationFrame(animateIdRef.current);
            }
            renderer.dispose();
            container.removeChild(renderer.domElement);

            sceneRef.current?.traverse((object: THREE.Object3D) => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();
                    if (object.material instanceof THREE.Material) {
                        object.material.dispose();
                    } else if (Array.isArray(object.material)) {
                        object.material.forEach((material: THREE.Material) => material.dispose());
                    }
                }
            });

            rendererRef.current = null;
            sceneRef.current = null;
            cameraRef.current = null;
            controlsRef.current = null;
            animateIdRef.current = null;
        };
    }, []);

    return (
        <div className="Pong_Game_container">
            <div className="board">
                <BoardItem
                    championName={players[0].name || 'Player 1'}
                    hashtag="#TheHacker007"
                    score={user1score}
                    imageSrc={players[0].imageUrl}
                />
                <BoardItem
                    championName={players[1].name || 'Player 2'}
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
