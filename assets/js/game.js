let world;
let keyboard = new Keyboard();
let canvas;
let audio;
let intervalIds = [];
let fs = document.documentElement;

/*  function resize() {
// We are resizing for mobile devices only. For other devices, the
// dimensions will be stuck at 800 * 600. To change the default dimensions,
// change the height and width of the canvas and the width of the #container
let win = window,
    doc = document,
    w = win.innerWidth,
    h = win.innerHeight,
    container = doc.getElementById('wrapper'),
    canvas = doc.getElementById('canvas');

if( win.navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/i) ) {
    canvas.height = h;
    canvas.width  = w;
    container.style.height = h+"px";
    container.style.width = w+"px";
}
}; */
function gameIntervals(fn, time) {
    let id = setInterval (fn, time);
    intervalIds.push(id);
    
}

function startGame() {
    screen.orientation.lock('landscape').catch((err) => {
        console.warn('Orientation lock failed:', err);
    });
    initializeGame();
    showGameUI();
}

function initializeGame() {
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
    AudioHub.playOne(AudioHub.background);
}

function showGameUI() {
    document.getElementById('fs-open').classList.remove('hide');
    document.getElementById('canvas').classList.remove('hide');
    document.getElementById('controls-box').classList.remove('hide');        
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('restart-button').style.display = 'block';
    document.getElementById('el-pollo-loco').style.display = 'none';
    document.getElementById('credits').style.display = 'none';
}

function quitGame() {
    location.reload();
}

function gameLoose() {
    AudioHub.stopOne(AudioHub.background);
    AudioHub.playOne(AudioHub.gameoverSound);
    document.getElementById('game-overlay').classList.remove('hide');
    document.getElementById('game-result-text').textContent = 'Game over!';
    intervalIds.forEach(clearInterval);
}
function gameWon() {
    AudioHub.stopOne(AudioHub.background);
    AudioHub.playOne(AudioHub.gamewinSound);
    document.getElementById('game-overlay').classList.remove('hide');
    document.getElementById('game-result-text').textContent = 'You win!';
    intervalIds.forEach(clearInterval);
}

function restartGame() {
    clearCanvas();
    resetGameState();
    startGame(); 
}

function clearCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resetGameState() {
    document.getElementById('game-overlay').classList.add('hide');    
    world = null;
}

function fullscreen(){
    let fs = document.getElementById('fullscreen');
    openFullscreen(fs);
}


/* When the openFullscreen() function is executed, open the video in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen property yet */
function openFullscreen() {    
    document.getElementById('fs-open').classList.add('hide');
    document.getElementById('fs-close').classList.remove('hide');
  if (fs.requestFullscreen) {
    fs.requestFullscreen();
  } else if (fs.webkitRequestFullscreen) { /* Safari */
    fs.webkitRequestFullscreen();
  } else if (fs.msRequestFullscreen) { /* IE11 */
    fs.msRequestFullscreen();
  }
}

function closeFullscreen() {
    document.getElementById('fs-open').classList.remove('hide');
    document.getElementById('fs-close').classList.add('hide');
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

function allSounds() {
    const isMuted = JSON.parse(localStorage.getItem('mute')) === 'on';
    const btn = document.getElementById('btn-mute');

    if (isMuted) {
        btn.innerHTML = `<img src="./assets/images/btn_mute_off.svg" alt="mute button">`;
        AudioHub.startAll();
        localStorage.setItem('mute', JSON.stringify('off'));
    } else {
        btn.innerHTML = `<img src="./assets/images/btn_mute_on.svg" alt="mute button">`;
        AudioHub.stopAll();
        localStorage.setItem('mute', JSON.stringify('on'));
    }
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

    function touchBtn(){
        addTouchListener('btn-left', 'left');
        addTouchListener('btn-right', 'right');
        addTouchListener('btn-jump', 'space');
        addTouchListener('btn-throw', 't');
    }

    function addTouchListener(buttonId, keyboardProperty) {
        const button = document.getElementById(buttonId);
        
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard[keyboardProperty] = true;
        });

        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard[keyboardProperty] = false;
        });
    }
