import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.128/build/three.module.js";
import { createTorso } from "./torso.js";

export function createHuman() {

    const human = new THREE.Group();

    const torso = createTorso();
    human.add(torso);

    return human;

}
