let world;
let keyboard = new Keyboard();
let canvas;

function init() {
    canvas = document.getElementById('canvas');
}

function startGame() {
    const startScreen = document.getElementById('start-screen');
    // Entferne das Startbild und den Button mit einer Ausblend-Animation
    startScreen.style.animation = 'fadeOut 1s forwards';

    // Nach der Animation das Startscreen-Element ausblenden und das Laden starten
    setTimeout(() => {
        startScreen.style.display = 'none';
        document.getElementById('loading-screen').style.display = 'block';

        setTimeout(() => {
            initLevel();
            world = new World(canvas, keyboard);
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('canvas').style.display = 'block';
        }, 1000); // simuliertes kurzes Laden
    }, 1000);
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 37) keyboard.left = true;
    if (e.keyCode == 39) keyboard.right = true;
    if (e.keyCode == 38) keyboard.up = true;
    if (e.keyCode == 40) keyboard.down = true;
    if (e.keyCode == 32) keyboard.space = true;
    if (e.keyCode == 84) keyboard.t = true;
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 37) keyboard.left = false;
    if (e.keyCode == 39) keyboard.right = false;
    if (e.keyCode == 38) keyboard.up = false;
    if (e.keyCode == 40) keyboard.down = false;
    if (e.keyCode == 32) keyboard.space = false;
    if (e.keyCode == 84) keyboard.t = false;
});
