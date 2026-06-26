import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.128/build/three.module.js";
export function createTorso() {

    const group = new THREE.Group();

    const material = new THREE.MeshStandardMaterial({
        color: 0x444444
    });

    const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.45, 0.65, 0.25),
        material
    );

    body.position.y = 1.1;

    group.add(body);

    return group;
}
