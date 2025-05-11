let world;
let keyboard = new Keyboard();
let canvas;
let audio;
let intervalIds = [];


    screen.orientation.addEventListener('change', () => {
    console.log(`The orientation of the screen is: ${screen.orientation}`);
    });
function gameIntervals(fn, time) {
    let id = setInterval (fn, time);
    intervalIds.push(id);
    
}
function startGame() {
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'flex';
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('restart-button').style.display = 'block';
    document.getElementById('el-pollo-loco').style.display = 'none';
    document.getElementById('controls-box').style.display = 'flex';
    resizeAndScaleCanvas();
}

function qutiGame() {
    location.reload();
}

function endGame(didWin) {
  // Zeige Overlay
  document.getElementById('game-overlay').classList.remove('hidden');
  document.getElementById('game-result-text').textContent = didWin ? 'You won!' : 'Game over!';
  intervalIds.forEach(clearInterval);
}


function resizeAndScaleCanvas() {
  const canvas = document.getElementById('canvas');
  const scaleX = window.innerWidth / 720;
  const scaleY = window.innerHeight / 480;
  const scale = Math.min(scaleX, scaleY);

  canvas.style.transform = `scale(${scale})`;
  canvas.style.transformOrigin = 'center center';
  canvas.style.width = `720px`;
  canvas.style.height = `480px`;
}

window.addEventListener('resize', resizeAndScaleCanvas);

function restartGame() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('game-overlay').classList.add('hidden');    
    world = null;
    startGame(); // oder startGame(), wie du es bei Spielstart verwendest
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 37) keyboard.left = true;
    if (e.keyCode == 39) keyboard.right = true;
    if (e.keyCode == 38) keyboard.up = true;
    if (e.keyCode == 40) keyboard.down = true;
    if (e.keyCode == 32) keyboard.space = true;
    if (e.keyCode == 84) keyboard.t = true;
    if (e.keyCode == 77) keyboard.m = true;
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 37) keyboard.left = false;
    if (e.keyCode == 39) keyboard.right = false;
    if (e.keyCode == 38) keyboard.up = false;
    if (e.keyCode == 40) keyboard.down = false;
    if (e.keyCode == 32) keyboard.space = false;
    if (e.keyCode == 84) keyboard.t = false;
    if (e.keyCode == 77) keyboard.m = false;
});
function touchBtn(){
    document.getElementById('btn-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.left = true;
    });
    document.getElementById('btn-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.left = false;
    });
    document.getElementById('btn-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.right = true;
    });
    document.getElementById('btn-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.right = false;
    });
    document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.space = true;
    });
    document.getElementById('btn-jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.space = false;
    });
    document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.space = true;
    });
    document.getElementById('btn-jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.space = false;
    });
}
