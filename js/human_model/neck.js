import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

export function buatLeher() {
    // Group ini sebagai sendi leher bagian bawah
    const neckGroup = new THREE.Group();

    // Bentuk leher silinder/balok proporsional manusia
    const geoLeher = new THREE.CylinderGeometry(0.018, 0.022, 0.05, 8);
    const matLeher = new THREE.MeshBasicMaterial({ color: 0xddaa88 }); // Warna kulit dasar
    const leherMesh = new THREE.Mesh(geoLeher, matLeher);
    
    // Naikkan posisi mesh agar pivot sendinya pas di pangkal leher
    leherMesh.position.y = 0.025;
    neckGroup.add(leherMesh);

    return {
        group: neckGroup,
        mesh: leherMesh
    };
}

