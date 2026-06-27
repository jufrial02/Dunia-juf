import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

export function buatRumah() {
    const grupRumah = new THREE.Group();

    // 1. MATERIAL
    const matDinding = new THREE.MeshStandardMaterial({ color: 0xdfd3c3 }); // Warna krem semen
    const matAtap = new THREE.MeshStandardMaterial({ color: 0x8b0000 });    // Warna merah bata tua
    const matPintu = new THREE.MeshStandardMaterial({ color: 0x5c3a21 });   // Warna kayu cokelat tua

    // 2. DINDING UTAMA (Badan Rumah)
    const geoDinding = new THREE.BoxGeometry(3, 2.5, 4); // Lebar 3, Tinggi 2.5, Panjang 4
    const dinding = new THREE.Mesh(geoDinding, matDinding);
    dinding.position.y = 1.25; // Setengah dari tinggi agar pas di atas tanah
    grupRumah.add(dinding);

    // 3. ATAP SEGITIGA (Menggunakan ConeGeometry dengan 4 sisi agar jadi piramida)
    const geoAtap = new THREE.ConeGeometry(2.6, 1.5, 4);
    const atap = new THREE.Mesh(geoAtap, matAtap);
    // Putar sedikit agar sisi miringnya pas dengan kotak rumah
    atap.rotation.y = Math.PI / 4; 
    atap.position.y = 2.5 + 0.75; // Di atas dinding (tinggi dinding + setengah tinggi atap)
    grupRumah.add(atap);

    // 4. PINTU DEPAN
    const geoPintu = new THREE.BoxGeometry(0.6, 1.4, 0.05);
    const pintu = new THREE.Mesh(geoPintu, matPintu);
    pintu.position.set(0, 0.7, 2.01); // Di depan dinding (Z = panjang dinding/2 + sedikit offset)
    grupRumah.add(pintu);

    return grupRumah;
}

