import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

export function buatPohon() {
    const grupPohon = new THREE.Group();

    // 1. Batang Pohon
    const batangGeo = new THREE.CylinderGeometry(0.15, 0.2, 1.2, 8);
    const batangMat = new THREE.MeshStandardMaterial({ color: 0x5a3d28 });
    const batang = new THREE.Mesh(batangGeo, batangMat);
    batang.position.y = 0.6;
    grupPohon.add(batang);

    // 2. Daun Pohon (3 Tingkat Kerucut)
    const warnaDaun = 0x2e5c1e;
    const daunMat = new THREE.MeshStandardMaterial({ color: warnaDaun, roughness: 0.8 });

    const daun1 = new THREE.Mesh(new THREE.ConeGeometry(0.8, 1.2, 8), daunMat);
    daun1.position.y = 1.5;
    grupPohon.add(daun1);

    const daun2 = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.0, 8), daunMat);
    daun2.position.y = 2.1;
    grupPohon.add(daun2);

    const daun3 = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.8, 8), daunMat);
    daun3.position.y = 2.6;
    grupPohon.add(daun3);

    return grupPohon;
}
