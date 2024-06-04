import * as THREE from "three";

export default class Boundary {
  width: number;
  height: number;
  depth: number;
  positions: number[];
  color: number;
  geometry: THREE.BoxGeometry;
  material: THREE.MeshStandardMaterial;
  mesh: THREE.Mesh;

  constructor(
    width: number,
    height: number,
    depth: number,
    positions: number[],
    color: number
  ) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.positions = positions;
    this.color = color;

    this.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    this.material = new THREE.MeshStandardMaterial({ color: this.color });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = this.positions[0];
    this.mesh.position.y = this.positions[1];
    this.mesh.position.z = this.positions[2];
  }

  addToScene(scene: THREE.Scene) {
    scene.add(this.mesh);
  }
}
