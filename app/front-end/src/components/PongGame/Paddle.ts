import * as THREE from "three";

export default class Paddle {
  width: number;
  height: number;
  depth: number;
  color: number;
  positions: number[];
  speed: number;
  geometry: THREE.BoxGeometry;
  material: THREE.MeshStandardMaterial;
  mesh: THREE.Mesh;

  constructor(
    width: number,
    height: number,
    depth: number,
    color: number,
    positions: number[]
  ) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;
    this.positions = positions;
    this.speed = 0;

    this.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    this.material = new THREE.MeshStandardMaterial({
      color: this.color,
      emissive: this.color,
      emissiveIntensity: 0.5,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = this.positions[0];
    this.mesh.position.y = this.positions[1];
    this.mesh.position.z = this.positions[2];
  }

  update(paddle_position_z: number) {
    this.mesh.position.z = paddle_position_z;
  }

  reset() {
    this.mesh.position.x = this.positions[0];
    this.mesh.position.y = this.positions[1];
    this.mesh.position.z = this.positions[2];
  }

  paddleUpdate() {
    let newPosition1 = this.mesh.position.z + this.speed;
    if (newPosition1 < -2.5 + this.depth / 2) {
      this.mesh.position.z = -2.5 + this.depth / 2;
      this.speed = 0;
    } else if (newPosition1 > 2.5 - this.depth / 2) {
      this.mesh.position.z = 2.5 - this.depth / 2;
      this.speed = 0;
    } else {
      this.mesh.position.z = newPosition1;
    }
  }

  move(paddleSpeed: number) {
    this.speed = paddleSpeed;
  }

  stop() {
    this.speed = 0;
  }

  addToScene(scene: THREE.Scene) {
    scene.add(this.mesh);
  }
}
