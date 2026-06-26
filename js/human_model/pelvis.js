import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

export function buatPelvis() {
    const pelvisGroup = new THREE.Group();

    const geoPelvis = new THREE.BoxGeometry(0.16, 0.06, 0.1);
    const matPelvis = new THREE.MeshStandardMaterial({ color: 0x333333 }); // Memakai MeshStandard agar merespon cahaya
    const pelvisMesh = new THREE.Mesh(geoPelvis, matPelvis);
    
    pelvisGroup.add(pelvisMesh);

    return {
        group: pelvisGroup,
        mesh: pelvisMesh
    };
}

