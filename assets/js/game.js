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
    canvas = document.getElementById('canvas');
    try {
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape').catch((err) => {
                console.warn('Orientation lock failed:', err);
                showRotateHint();
            });
        } else {
            showRotateHint();
        }
    } catch (e) {
        console.warn('Orientation lock unsupported:', e);
        showRotateHint();
    }
    initLevel();
    world = new World(canvas, keyboard);
    AudioHub.playOne(AudioHub.background);
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
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('game-overlay').classList.add('hide');    
    world = null;
    startGame(); 
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

function showRotateHint() {
    if (window.matchMedia('(orientation: portrait)').matches) {
        document.getElementById('rotate').classList.remove('hide');
    } else {
        document.getElementById('rotate').classList.add('hide');
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

        document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.t = true;
        });

        document.getElementById('btn-throw').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.t = false;
        });
    }
