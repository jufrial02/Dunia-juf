import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

export function buatKepala() {
    const group = new THREE.Group();
    const geo = new THREE.BoxGeometry(0.12, 0.14, 0.13);
    const mat = new THREE.MeshStandardMaterial({ color: 0xddaa88 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = 0.07;
    group.add(mesh);
    return { group, mesh };
}
