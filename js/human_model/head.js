import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

export function buatKepala() {
    // Group sebagai sendi kepala (bisa menggeleng/menunduk nanti)
    const headGroup = new THREE.Group();

    // Bentuk kepala manusia realistis awal (agak lonjong ke atas dan memanjang ke belakang)
    const geoKepala = new THREE.BoxGeometry(0.12, 0.14, 0.13);
    const matKepala = new THREE.MeshBasicMaterial({ color: 0xddaa88 }); // Warna kulit dasar
    const kepalaMesh = new THREE.Mesh(geoKepala, matKepala);
    
    // Naikkan posisi kepala di atas sendinya
    kepalaMesh.position.y = 0.07;
    headGroup.add(kepalaMesh);

    return {
        group: headGroup,
        mesh: kepalaMesh
    };
}

