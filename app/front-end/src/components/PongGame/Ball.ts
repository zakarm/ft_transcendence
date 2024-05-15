import * as THREE from "three";

export default class Ball {
  radius: number;
  widthSegments: number;
  heightSegments: number;
  color: number;
  positions: number[];
  Velocityx: number;
  Velocityz: number;
  geometry: THREE.SphereGeometry;
  material: THREE.MeshStandardMaterial;
  mesh: THREE.Mesh;

  constructor(
    radius: number,
    widthSegments: number,
    heightSegments: number,
    color: number,
    positions: number[],
    Velocityx: number,
    Velocityz: number
  ) {
    this.radius = radius;
    this.widthSegments = widthSegments;
    this.heightSegments = heightSegments;
    this.color = color;
    this.positions = positions;
    this.Velocityx = Velocityx;
    this.Velocityz = Velocityz;

    this.geometry = new THREE.SphereGeometry(
      this.radius,
      this.widthSegments,
      this.heightSegments
    );
    this.material = new THREE.MeshStandardMaterial({ color: this.color });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = this.positions[0];
    this.mesh.position.y = this.positions[1];
    this.mesh.position.z = this.positions[2];
  }

  update(
    ball_position_x: number,
    ball_position_z: number,
    ball_velocity_x: number,
    ball_velocity_z: number
  ) {
    this.mesh.position.x = ball_position_x;
    this.mesh.position.z = ball_position_z;
    this.Velocityx = ball_velocity_x;
    this.Velocityz = ball_velocity_z;
  }

  addToScene(scene: THREE.Scene) {
    scene.add(this.mesh);
  }
}
