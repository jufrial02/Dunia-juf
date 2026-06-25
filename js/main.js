// --- 1. SETUP DUNIA 3D (SCENE, CAMERA, RENDERER) ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Warna langit biru asli

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Tinggi kamera diset 1.6 meter (setara tinggi badan karakter manusia asli)
camera.position.set(0, 1.6, 0); 

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- 2. PENCAHAYAAN (LIGHTING) ---
const cahayaMatahari = new THREE.DirectionalLight(0xffffff, 1);
cahayaMatahari.position.set(5, 10, 7);
scene.add(cahayaMatahari);
const cahayaLingkungan = new THREE.AmbientLight(0x404040, 1.5);
scene.add(cahayaLingkungan);

// --- 3. MEMBUAT MAP DASAR (Tanah & Rumah Sederhana) ---
// Tanah Hijau Luas
const geoTanah = new THREE.PlaneGeometry(200, 200);
const matTanah = new THREE.MeshStandardMaterial({ color: 0x4CAF50 });
const tanah = new THREE.Mesh(geoTanah, matTanah);
tanah.rotation.x = -Math.PI / 2; // Ditidurkan agar datar
scene.add(tanah);

// Simulasi Rumah Sederhana (Kotak Cokelat)
const geoRumah = new THREE.BoxGeometry(6, 4, 6);
const matRumah = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
const rumah = new THREE.Mesh(geoRumah, matRumah);
rumah.position.set(0, 2, -15); // Berada 15 meter di depan posisi start player
scene.add(rumah);

// Atap Rumah (Segitiga/Prisma)
const geoAtap = new THREE.ConeGeometry(5, 2, 4);
const matAtap = new THREE.MeshStandardMaterial({ color: 0xCD5C5C });
const atap = new THREE.Mesh(geoAtap, matAtap);
atap.position.set(0, 5, -15);
atap.rotation.y = Math.PI / 4;
scene.add(atap);

// --- 4. LOGIKA KONTROL SENTUH HP (TOUCH LOOK & MOVE) ---
let sudutPandangX = 0; // Rotasi kiri-kanan
let sudutPandangY = 0; // Rotasi atas-bawah

const sentuhan = {
    kiriId: null, kiriStart: {x: 0, y: 0}, kiriMove: {x: 0, y: 0},
    kananId: null, kananStart: {x: 0, y: 0}, kananMove: {x: 0, y: 0}
};

window.addEventListener('touchstart', (e) => {
    for(let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        // Jika menyentuh layar sebelah kiri (Kontrol Jalan)
        if (touch.clientX < window.innerWidth / 2 && sentuhan.kiriId === null) {
            sentuhan.kiriId = touch.identifier;
            sentuhan.kiriStart.x = touch.clientX;
            sentuhan.kiriStart.y = touch.clientY;
            sentuhan.kiriMove.x = touch.clientX;
            sentuhan.kiriMove.y = touch.clientY;
        } 
        // Jika menyentuh layar sebelah kanan (Kontrol Kamera/Menengok)
        else if (touch.clientX >= window.innerWidth / 2 && sentuhan.kananId === null) {
            sentuhan.kananId = touch.identifier;
            sentuhan.kananStart.x = touch.clientX;
            sentuhan.kananStart.y = touch.clientY;
        }
    }
}, {passive: false});

window.addEventListener('touchmove', (e) => {
    for(let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        if (touch.identifier === sentuhan.kiriId) {
            sentuhan.kiriMove.x = touch.clientX;
            sentuhan.kiriMove.y = touch.clientY;
        } else if (touch.identifier === sentuhan.kananId) {
            const deltaX = touch.clientX - sentuhan.kananStart.x;
            const deltaY = touch.clientY - sentuhan.kananStart.y;
            
            // Putar sudut pandang kamera berdasarkan usapan jari kanan
            sudutPandangX -= deltaX * 0.005;
            sudutPandangY -= deltaY * 0.005;
            
            // Batasi pandangan atas-bawah agar tidak patah leher (90 derajat)
            sudutPandangY = Math.max(-Math.PI/2.2, Math.min(Math.PI/2.2, sudutPandangY));
            
            sentuhan.kananStart.x = touch.clientX;
            sentuhan.kananStart.y = touch.clientY;
        }
    }
});

window.addEventListener('touchend', (e) => {
    for(let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        if (touch.identifier === sentuhan.kiriId) {
            sentuhan.kiriId = null;
            sentuhan.kiriMove.x = sentuhan.kiriStart.x;
            sentuhan.kiriMove.y = sentuhan.kiriStart.y;
        } else if (touch.identifier === sentuhan.kananId) {
            sentuhan.kananId = null;
        }
    }
});

// --- 5. GAME LOOP & PERGERAKAN HALUS (UPDATE) ---
const kecepatanJalan = 0.08;

function animate() {
    requestAnimationFrame(animate);

    // Update Arah Pandangan Mata Kamera
    const targetRotasiKamera = new THREE.Quaternion();
    const urutanRotasi = new THREE.Euler(sudutPandangY, sudutPandangX, 0, 'YXZ');
    targetRotasiKamera.setFromEuler(urutanRotasi);
    camera.quaternion.slerp(targetRotasiKamera, 0.2); // Slerp membuat pergerakan kamera halus

    // Update Pergerakan Langkah Kaki (Analog Kiri)
    if (sentuhan.kiriId !== null) {
        const dX = sentuhan.kiriMove.x - sentuhan.kiriStart.x;
        const dY = sentuhan.kiriMove.y - sentuhan.kiriStart.y;
        const totalDist = Math.sqrt(dX*dX + dY*dY);

        if (totalDist > 10) {
            // Hitung arah gerak relatif terhadap sudut hadap kamera
            const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
            forward.y = 0; // Kunci koordinat Y agar tidak bisa terbang ke langit
            forward.normalize();

            const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
            right.y = 0;
            right.normalize();

            // Gerakkan kamera maju/mundur/kiri/kanan
            camera.position.addScaledVector(forward, (-dY / totalDist) * kecepatanJalan);
            camera.position.addScaledVector(right, (dX / totalDist) * kecepatanJalan);
        }
    }

    renderer.render(scene, camera);
}

animate();

// Responsif saat layar berubah orientasi
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
