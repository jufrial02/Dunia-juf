import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { buatPelvis } from './pelvis.js';
import { buatTorso } from './torso.js';
import { buatLeher } from './neck.js'; // Import leher
import { buatKepala } from './head.js'; // Import kepala

export function buatKarakterManusia() {
    const karakterGroup = new THREE.Group();

    // 1. Pinggul (Pelvis)
    const pelvis = buatPelvis();
    karakterGroup.add(pelvis.group);

    // 2. Tulang Belakang & Dada (Torso)
    const torso = buatTorso();
    torso.group.position.set(0, 0.03, 0); 
    pelvis.group.add(torso.group);

    // 3. Leher (Neck) -> Menempel di atas DadaMesh
    const leher = buatLeher();
    leher.group.position.set(0, 0.07, 0); // Di bagian atas balok dada
    torso.dada.add(leher.group);

    // 4. Kepala (Head) -> Menempel di atas LeherMesh
    const kepala = buatKepala();
    kepala.group.position.set(0, 0.05, 0); // Di ujung atas leher
    leher.mesh.add(kepala.group);

    return karakterGroup;
}
