// --- 1. SETUP DUNIA 3D (SCENE, CAMERA, RENDERER) ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Warna langit biru asli

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Kamera ditaruh agak mundur (z = 5) dan agak tinggi agar langsung bisa melihat ke bawah
camera.position.set(0, 2, 5); 

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- 2. PENCAHAYAAN KUAT (Mencegah Layar Hitam) ---
// Kita pakai AmbientLight yang super terang agar semua sudut objek kelihatan tanpa bayangan gelap
const cahayaSemesta = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(cahayaSemesta);

const cahayaArah = new THREE.DirectionalLight(0xffffff, 1);
cahayaArah.position.set(5, 10, 7);
scene.add(cahayaArah);

// --- 3. MEMBUAT MAP DASAR (Tanah & Rumah Terlihat Jelas) ---
// Tanah Hijau Luas
const geoTanah = new THREE.PlaneGeometry(200, 200);
const matTanah = new THREE.MeshStandardMaterial({ color: 0x4CAF50, side: THREE.DoubleSide });
const tanah = new THREE.Mesh(geoTanah, matTanah);
tanah.rotation.x = -Math.PI / 2; // Ditidurkan
scene.add(tanah);

// Rumah Kotak Cokelat (Ditaruh tepat di titik pusat depan kamera agar langsung kelihatan)
const geoRumah = new THREE.BoxGeometry(4, 4, 4);
const matRumah = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
const rumah = new THREE.Mesh(geoRumah, matRumah);
rumah.position.set(0, 2, -5); // Hanya 5 meter di depan kamera
scene.add(rumah);

// Atap Rumah Merah
const geoAtap = new THREE.ConeGeometry(3.5, 2, 4);
const matAtap = new THREE.MeshStandardMaterial({ color: 0xCD5C5C });
const atap = new THREE.Mesh(geoAtap, matAtap);
atap.position.set(0, 5, -5);
atap.rotation.y = Math.PI / 4;
scene.add(atap);

// --- 4. LOGIKA KONTROL SENTUH HP (TOUCH LOOK & MOVE) ---
let sudutPandangX = 0;
let sudutPandangY = 0;

const sentuhan = {
    kiriId: null, kiriStart: {x: 0, y: 0}, kiriMove: {x: 0, y: 0},
    kananId: null, kananStart: {x: 0, y: 0}, kananMove: {x: 0, y: 0}
};

window.addEventListener('touchstart', (e) => {
    for(let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        if (touch.clientX < window.innerWidth / 2 && sentuhan.kiriId === null) {
            sentuhan.kiriId = touch.identifier;
            sentuhan.kiriStart.x = touch.clientX;
            sentuhan.kiriStart.y = touch.clientY;
            sentuhan.kiriMove.x = touch.clientX;
            sentuhan.kiriMove.y = touch.clientY;
        } else if (touch.clientX >= window.innerWidth / 2 && sentuhan.kananId === null) {
            sentuhan.kananId = touch.identifier;
            sentuhan.kananStart.x = touch.clientX;
            sentuhan.kananStart.y = touch.clientY;
        }
    }
});

window.addEventListener('touchmove', (e) => {
    for(let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        if (touch.identifier === sentuhan.kiriId) {
            sentuhan.kiriMove.x = touch.clientX;
            sentuhan.kiriMove.y = touch.clientY;
        } else if (touch.identifier === sentuhan.kananId) {
            const deltaX = touch.clientX - sentuhan.kananStart.x;
            const deltaY = touch.clientY - sentuhan.kananStart.y;
            
            sudutPandangX -= deltaX * 0.005;
            sudutPandangY -= deltaY * 0.005;
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
        } else if (touch.identifier === sentuhan.kananId) {
            sentuhan.kananId = null;
        }
    }
});

// --- 5. GAME LOOP ---
const kecepatanJalan = 0.08;

function animate() {
    requestAnimationFrame(animate);

    // Rotasi Kamera Halus
    const targetRotasiKamera = new THREE.Quaternion();
    const urutanRotasi = new THREE.Euler(sudutPandangY, sudutPandangX, 0, 'YXZ');
    targetRotasiKamera.setFromEuler(urutanRotasi);
    camera.quaternion.slerp(targetRotasiKamera, 0.2);

    // Gerak Langkah Kaki (Analog Kiri)
    if (sentuhan.kiriId !== null) {
        const dX = sentuhan.kiriMove.x - sentuhan.kiriStart.x;
        const dY = sentuhan.kiriMove.y - sentuhan.kiriStart.y;
        const totalDist = Math.sqrt(dX*dX + dY*dY);

        if (totalDist > 10) {
            const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
            forward.y = 0;
            forward.normalize();

            const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
            right.y = 0;
            right.normalize();

            camera.position.addScaledVector(forward, (-dY / totalDist) * kecepatanJalan);
            camera.position.addScaledVector(right, (dX / totalDist) * kecepatanJalan);
        }
    }

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
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
