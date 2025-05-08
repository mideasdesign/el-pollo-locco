let world;
let keyboard = new Keyboard();
let canvas;
let audio;
function init() {
    canvas = document.getElementById('canvas');
}

function startGame() {
            canvas = document.getElementById('canvas');
            initLevel();
            world = new World(canvas, keyboard);
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('canvas').style.display = 'block';
            document.getElementById('start-button').style.display = 'none';
}

function endGame(){
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('start-button').style.display = 'block';
    document.getElementById('instruction').style.display = 'block';
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
