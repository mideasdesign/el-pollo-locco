let world;
let keyboard = new Keyboard();
let canvas;

function init() {
    canvas = document.getElementById('canvas');
}

function startGame() {
            initLevel();
            world = new World(canvas, keyboard);
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('canvas').style.display = 'block';
            document.getElementById('start-button').style.display = 'none';
            document.getElementById('controls-box').style.display = 'block';

}
function endGame(){
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('restart-button').style.display = 'block';
    document.getElementById('controls-box').style.display = 'none';
    document.getElementById('instruction').style.display = 'block';
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('el-pollo').style.display = 'none';


}
function restartGame(){
    location.reload();
    init();
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
