const player = document.getElementById("player");

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

let targetX = x;
let targetY = y;

document.addEventListener("touchstart", (e) => {
    targetX = e.touches[0].clientX;
    targetY = e.touches[0].clientY;
});

function update() {

    x += (targetX - x) * 0.05;
    y += (targetY - y) * 0.05;

    player.style.left = x + "px";
    player.style.top = y + "px";

    requestAnimationFrame(update);
}

update();

