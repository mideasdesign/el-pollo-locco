let world;
let keyboard = new Keyboard();
let canvas;
let audio;
let intervalIds = [];

  function resize() {
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
  };

    function gameIntervals(fn, time) {
        let id = setInterval (fn, time);
        intervalIds.push(id);
        
    }

    function startGame() {
        canvas = document.getElementById('canvas');
        initLevel();
        world = new World(canvas, keyboard);
        AudioHub.playOne(AudioHub.background);
        document.getElementById('fs-open').classList.remove('hide');
        document.getElementById('canvas').style.display = 'flex';
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
        document.getElementById('game-overlay').classList.remove('hidden');
        document.getElementById('game-result-text').textContent = 'Game over!';
        intervalIds.forEach(clearInterval);
    }
    function gameWon() {
        AudioHub.stopOne(AudioHub.background);
        AudioHub.playOne(AudioHub.gamewinSound);
        document.getElementById('game-overlay').classList.remove('hidden');
        document.getElementById('game-result-text').textContent = 'You won!';
        intervalIds.forEach(clearInterval);
    }

    function restartGame() {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById('game-overlay').classList.add('hidden');    
        world = null;
        startGame(); 
    }

function fullscreen(){
    let fs = document.getElementById('fullscreen');
    openFullscreen(fs);
}

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

        document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.t = true;
        });

        document.getElementById('btn-throw').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.t = false;
        });

        document.getElementById('btn-mute').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.m = true;
        });

        document.getElementById('btn-mute').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.m = false;
        });
    }
