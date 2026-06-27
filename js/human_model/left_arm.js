import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

export function buatLenganKiri() {
    const pangkalBahu = new THREE.Group();
    const sendiSiku = new THREE.Group();
    const sendiPergelangan = new THREE.Group();

    pangkalBahu.add(sendiSiku);
    sendiSiku.add(sendiPergelangan);

    sendiSiku.position.set(0, -0.05, -0.18);          
    sendiPergelangan.position.set(0, -0.01, -0.16);  

    const matOtot = new THREE.MeshStandardMaterial({ color: 0xaa0000 });
    const matKulit = new THREE.MeshStandardMaterial({ color: 0xddaa88 });

    const geoOtotAtas = new THREE.CylinderGeometry(0.028, 0.035, 0.18, 8);
    geoOtotAtas.rotateX(Math.PI / 2); 
    const ototAtasMesh = new THREE.Mesh(geoOtotAtas, matOtot);
    ototAtasMesh.position.set(0, -0.025, -0.09); 
    pangkalBahu.add(ototAtasMesh);

    const geoOtotBawah = new THREE.CylinderGeometry(0.022, 0.032, 0.16, 8);
    geoOtotBawah.rotateX(Math.PI / 2);
    const ototBawahMesh = new THREE.Mesh(geoOtotBawah, matOtot);
    ototBawahMesh.position.set(0, -0.01, -0.08); 
    sendiSiku.add(ototBawahMesh);

    const geoTelapak = new THREE.BoxGeometry(0.06, 0.018, 0.11);
    const telapakMesh = new THREE.Mesh(geoTelapak, matKulit);
    telapakMesh.position.set(0, -0.01, -0.055);
    sendiPergelangan.add(telapakMesh);

    const geoJempol = new THREE.BoxGeometry(0.015, 0.015, 0.03);
    const jempolMesh = new THREE.Mesh(geoJempol, matKulit);
    jempolMesh.position.set(0.035, 0, -0.02); // Jempol kiri menghadap kanan
    jempolMesh.rotation.y = -0.4; 
    telapakMesh.add(jempolMesh);

    pangkalBahu.position.set(-0.13, 0.65, 0.15); // Diatur pas di pandangan FPS kiri
    pangkalBahu.rotation.set(0.1, 0.05, 0.0);

    return pangkalBahu;
}

