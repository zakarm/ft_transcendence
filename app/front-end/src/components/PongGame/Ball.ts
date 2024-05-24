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

  ballUpdate() {
    this.mesh.position.x += this.Velocityx;
    this.mesh.position.z += this.Velocityz;
    this.Velocityx *= 1.00005;
    this.Velocityz *= 1.00005;
  }
  intersect(
    wall1: { mesh: THREE.Mesh },
    wall2: { mesh: THREE.Mesh },
    paddle1: { mesh: THREE.Mesh; depth: number; width: number },
    paddle2: { mesh: THREE.Mesh; depth: number; width: number }
  ) {
    var ballSphere = new THREE.Sphere(this.mesh.position, this.radius);
    var wall1Box = new THREE.Box3().setFromObject(wall1.mesh);
    var wall2Box = new THREE.Box3().setFromObject(wall2.mesh);
    var paddle1Box = new THREE.Box3().setFromObject(paddle1.mesh);
    var paddle2Box = new THREE.Box3().setFromObject(paddle2.mesh);
    if (paddle1Box.intersectsSphere(ballSphere)) {
      if (
        this.mesh.position.z > paddle1.mesh.position.z + paddle1.depth / 2 &&
        this.mesh.position.x < paddle1.mesh.position.x + paddle1.width / 2
      ) {
        this.mesh.position.z =
          paddle1.mesh.position.z + paddle1.depth / 2 + this.radius + 0.05;
        this.Velocityz *= -1;
      } else if (
        this.mesh.position.z < paddle1.mesh.position.z - paddle1.depth / 2 &&
        this.mesh.position.x < paddle1.mesh.position.x + paddle1.width / 2
      ) {
        this.mesh.position.z =
          paddle1.mesh.position.z - paddle1.depth / 2 - this.radius - 0.05;
        this.Velocityz *= -1;
      } else {
        this.mesh.position.x =
          paddle1.mesh.position.x + paddle1.width / 2 + this.radius + 0.05;
        this.Velocityx *= -1;
      }
    }
    if (paddle2Box.intersectsSphere(ballSphere)) {
      if (
        this.mesh.position.z > paddle2.mesh.position.z + paddle2.depth / 2 &&
        this.mesh.position.x > paddle2.mesh.position.x - paddle2.width / 2
      ) {
        this.mesh.position.z =
          paddle2.mesh.position.z + paddle2.depth / 2 + this.radius + 0.05;
        this.Velocityz *= -1;
      } else if (
        this.mesh.position.z < paddle2.mesh.position.z - paddle2.depth / 2 &&
        this.mesh.position.x > paddle2.mesh.position.x - paddle2.width / 2
      ) {
        this.mesh.position.z =
          paddle2.mesh.position.z - paddle2.depth / 2 - this.radius - 0.05;
        this.Velocityz *= -1;
      } else {
        this.mesh.position.x =
          paddle2.mesh.position.x - paddle2.width / 2 - this.radius - 0.05;
        this.Velocityx *= -1;
      }
    }
    if (
      wall1Box.intersectsSphere(ballSphere) ||
      wall2Box.intersectsSphere(ballSphere)
    ) {
      this.Velocityz *= -1;
    }
  }

  addToScene(scene: THREE.Scene) {
    scene.add(this.mesh);
  }
}
