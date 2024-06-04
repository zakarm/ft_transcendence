'use client';
import React, { useState, useEffect, useRef, use } from 'react';
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

type SetScore = (
    side: 'side1' | 'side2',
    round: 'quarterfinals' | 'semifinals' | 'finals',
    matchIndex: number,
    userIndex: 0 | 1,
    newscore: number,
) => void;

type PromoteWinner = (
    side: 'side1' | 'side2',
    round: 'quarterfinals' | 'semifinals' | 'finals',
    matchIndex: number,
    userIndex: 0 | 1,
) => void;
type SetPageState = (pageState: string) => void;
interface LocalGame {
    data: {
        user1name: string;
        user2name: string;
        user1image: string;
        user2image: string;
        side: 'side1' | 'side2';
        round: 'quarterfinals' | 'semifinals' | 'finals';
        matchIndex: number;
        user1Index: 0 | 1;
        user2Index: 0 | 1;
        setScore: SetScore;
        promoteWinner: PromoteWinner;
        setPageState_: SetPageState;
    };
}

const PongGameLocal: React.FC<LocalGame> = ({ data }: LocalGame) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const animateIdRef = useRef<number | null>(null);
    const [user1score, setUser1Score] = useState<number>(0);
    const [user2score, setUser2Score] = useState<number>(0);
    useEffect(() => {
        var gameStatus = 'loading';
        setUser1Score(0);
        setUser2Score(0);
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
        camera.position.set(0, 25, 0);
        // camera.position.set(10, 25, 15);

        // const targetPosition = new THREE.Vector3(1, 10, 0);
        const targetPosition = new THREE.Vector3(0, 10, 0);
        // const targetPosition = new THREE.Vector3(8, 6, 0);
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

        const surface = new Surface(10, 5, 1, 1, 0x161625);
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
            const boundary = new Boundary(width, height, depth, positions, 0xff4655);
            boundary.addToScene(scene);
        });

        const ball = new Ball(0.1, 46, 46, 0xffffff, [0, 0.1, 0], 0.05, 0.05);
        ball.addToScene(scene);

        const wall1 = new Wall(10, 0.5, 0.1, 0x161625, [0, 0.2, 2.6]);
        const wall2 = new Wall(10, 0.5, 0.1, 0x161625, [0, 0.2, -2.6]);
        wall1.addToScene(scene);
        wall2.addToScene(scene);

        const paddle1 = new Paddle(0.2, 0.2, 1, 0xff4655, [-4.8, 0.15, 0]);
        const paddle2 = new Paddle(0.2, 0.2, 1, 0xff4655, [4.8, 0.15, 0]);
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

        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.code) {
                case 'KeyA':
                    paddle1.move(0.1);
                    break;
                case 'KeyD':
                    paddle1.move(-0.1);
                    break;
                case 'ArrowLeft':
                    paddle2.move(0.1);
                    break;
                case 'ArrowRight':
                    paddle2.move(-0.1);
                    break;
                case 'Space':
                    console.log(camera.position, camera.rotation);
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            switch (event.code) {
                case 'KeyA':
                case 'KeyD':
                    paddle1.stop();
                    break;
                case 'ArrowLeft':
                case 'ArrowRight':
                    paddle2.stop();
                    break;
                default:
                    break;
            }
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

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        window.addEventListener('resize', handleResize);

        setTimeout(() => {
            gameStatus = 'playing';
        }, 4000);
        const animate = () => {
            animateIdRef.current = requestAnimationFrame(animate);
            renderer.render(scene, camera);
            if (gameStatus === 'gameover') {
                handleGameOver();
                cancelAnimationFrame(animateIdRef.current);
            }
            if (gameStatus !== 'playing') return;
            ball.intersect(wall1, wall2, paddle1, paddle2);
            ball.ballUpdate();
            paddle1.paddleUpdate();
            paddle2.paddleUpdate();
            const z = Math.random() * 2.2;
            if (ball.mesh.position.x < -5) {
                ball.Velocityx *= -1;
                ball.mesh.position.set(0, 0.1, z);
                paddle1.mesh.position.set(-4.8, 0.15, 0);
                paddle2.mesh.position.set(4.8, 0.15, 0);
                setUser1Score((prevScore: number) => {
                    const newscore = prevScore + 1;
                    if (newscore === 7 && gameStatus != 'gameover') gameStatus = 'gameover';
                    if (newscore > 7) return prevScore;
                    return newscore;
                });
            }
            if (ball.mesh.position.x > 5) {
                ball.Velocityx *= -1;
                ball.mesh.position.set(0, 0.1, z);
                paddle1.mesh.position.set(-4.8, 0.15, 0);
                paddle2.mesh.position.set(4.8, 0.15, 0);
                setUser2Score((prevScore: number) => {
                    const newscore = prevScore + 1;
                    if (newscore === 7 && gameStatus != 'gameover') gameStatus = 'gameover';
                    if (newscore > 7) return prevScore;
                    return newscore;
                });
            }
            light.position.copy(ball.mesh.position);
        };
        animate();
        let pageStateSet = false;

        const handleGameOver = () => {
            if (!pageStateSet) {
                data.setPageState_('Tournamentlobby');
                pageStateSet = true;
            }
        };
        return () => {
            console.log('PongGameLocal unmounted');
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

    useEffect(() => {
        let intervalId1: NodeJS.Timeout;
        let intervalId2: NodeJS.Timeout;
        setUser1Score((prevScore: number) => {
            intervalId1 = setInterval(() => {
                data.setScore(data.side, data.round, data.matchIndex, data.user1Index, prevScore);
                if (prevScore === 7) data.promoteWinner(data.side, data.round, data.matchIndex, data.user1Index);
            }, 0);
            return prevScore;
        });
        setUser2Score((prevScore: number) => {
            intervalId2 = setInterval(() => {
                const side = data.round != 'finals' ? data.side : 'side2';
                const userIndex = data.round != 'finals' ? data.user2Index : data.user1Index;
                data.setScore(side, data.round, data.matchIndex, userIndex, prevScore);
                if (prevScore === 7) data.promoteWinner(side, data.round, data.matchIndex, userIndex);
            }, 0);
            return prevScore;
        });
        return () => {
            clearInterval(intervalId1);
            clearInterval(intervalId2);
        };
    }, [user1score, user2score]);

    return (
        <div className="Pong_Game_container">
            <div className="board">
                <BoardItem
                    championName={data.user1name}
                    hashtag="#TheHacker007"
                    score={user1score}
                    imageSrc={data.user1image}
                />
                <BoardItem
                    championName={data.user2name}
                    hashtag="#TheHacker007"
                    score={user2score}
                    imageSrc={data.user2image}
                />
            </div>
            <div className="canvas_div" ref={containerRef} />
        </div>
    );
};

export default PongGameLocal;
