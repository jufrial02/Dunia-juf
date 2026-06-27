import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { buatPelvis } from './pelvis.js';
import { buatTorso } from './torso.js';
import { buatLeher } from './neck.js';
import { buatKepala } from './head.js';
import { buatLenganKiri } from './left_arm.js';
import { buatLenganKanan } from './right_arm.js';

export function buatKarakterManusia() {
    const karakterGroup = new THREE.Group();

    // 1. Pasang Pinggul
    const pelvis = buatPelvis();
    karakterGroup.add(pelvis.group);

    // 2. Hubungkan Dada ke Pinggul
    const torso = buatTorso();
    torso.group.position.set(0, 0.03, 0);
    pelvis.group.add(torso.group);

    // 3. Hubungkan Leher ke Dada
    const leher = buatLeher();
    leher.group.position.set(0, 0.07, 0);
    torso.dada.add(leher.group);

    // 4. Hubungkan Kepala ke Leher
    const kepala = buatKepala();
    kepala.group.position.set(0, 0.05, 0);
    leher.mesh.add(kepala.group);

    // 5. Hubungkan Lengan Kiri & Kanan Langsung ke Kamera Player (FPS style)
    const lenganKiri = buatLenganKiri();
    const lenganKanan = buatLenganKanan();
    karakterGroup.add(lenganKiri);
    karakterGroup.add(lenganKanan);

    // Simpan referensi lengan ke dalam data karakter agar bisa digerakkan di index.html
    karakterGroup.userData = {
        lenganKiri: lenganKiri,
        lenganKanan: lenganKanan
    };

    return karakterGroup;
}
