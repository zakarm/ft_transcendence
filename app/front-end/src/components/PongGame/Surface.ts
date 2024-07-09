import * as THREE from 'three';

export default class Surface {
  width: number;
  height: number;
  widthSegments: number;
  heightSegments: number;
  color: number;
  geometry: THREE.PlaneGeometry;
  material: THREE.MeshPhongMaterial;
  mesh: THREE.Mesh;

  constructor(width: number, height: number, widthSegments: number, heightSegments: number, color: number) {
    this.width = width;
    this.height = height;
    this.widthSegments = widthSegments;
    this.heightSegments = heightSegments;
    this.color = color;

    this.geometry = new THREE.PlaneGeometry(this.width, this.height, this.widthSegments, this.heightSegments);
    this.material = new THREE.MeshPhongMaterial({
      color: this.color,
      emissive: this.color,
      emissiveIntensity: 0.2,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
  }

  addToScene(scene: THREE.Scene) {
    scene.add(this.mesh);
  }
}
