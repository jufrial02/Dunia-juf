import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

export function buatLeher() {
    const group = new THREE.Group();
    const geo = new THREE.CylinderGeometry(0.018, 0.022, 0.05, 8);
    const mat = new THREE.MeshStandardMaterial({ color: 0xddaa88 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = 0.025;
    group.add(mesh);
    return { group, mesh };
}
