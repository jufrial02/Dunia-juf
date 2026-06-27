import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

export function buatTorso() {
    const group = new THREE.Group();
    const geo = new THREE.BoxGeometry(0.18, 0.14, 0.11);
    const mat = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = 0.07;
    group.add(mesh);
    return { group, dada: mesh };
}
