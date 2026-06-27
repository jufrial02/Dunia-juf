import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

export function buatPelvis() {
    const group = new THREE.Group();
    const geo = new THREE.BoxGeometry(0.16, 0.06, 0.1);
    const mat = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const mesh = new THREE.Mesh(geo, mat);
    group.add(mesh);
    return { group, mesh };
}
