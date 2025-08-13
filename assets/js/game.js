/** @fileoverview Main game controller for El Pollo Loco jump'n'run game */

/** @type {World} - Global reference to the game world instance */
let world;
/** @type {Keyboard} - Global keyboard input handler */
let keyboard = new Keyboard();
/** @type {HTMLCanvasElement} - Game canvas element */
let canvas;
/** @type {AudioContext} - Web Audio API context (unused) */
let audio;
/** @type {number[]} - Array to track all game intervals for cleanup */
let intervalIds = [];
/** @type {Element} - Reference to document element for fullscreen */
let fs = document.documentElement;
/**
 * Creates a tracked interval that can be cleared when the game ends.
 * All intervals created with this function are automatically managed.
 * @param {Function} fn - Function to execute at each interval
 * @param {number} time - Interval time in milliseconds
 * @returns {number} The interval ID
 */
function gameIntervals(fn, time) {
    let id = setInterval (fn, time);
    intervalIds.push(id);
    
}

/**
 * Starts the game session with iOS audio support.
 * Initializes audio system, locks screen orientation, and begins gameplay.
 * Shows the game UI and begins gameplay.
 */
async function startGame() {
    try {
        // Initialize mute state from localStorage FIRST
        initializeMuteState();
        
        // Initialize iOS audio system
        await AudioHub.initializeIOSAudio();
        
        // Setup input controls based on device capabilities
        setupInputControls();
        setupResponsiveControls();
        
        // Lock screen orientation
        screen.orientation.lock('landscape').catch((err) => {
            // Orientation lock failed (not critical)
        });
        
        initializeGame();
        showGameUI();
    } catch (error) {
        // Game start warning - fallback: start game anyway
        initializeMuteState(); // Ensure mute state is set even in fallback
        setupInputControls();
        setupResponsiveControls();
        initializeGame();
        showGameUI();
    }
}

/**
 * Initializes the game world and starts background music.
 * Creates the canvas context, level data, and world instance.
 * Called internally by startGame().
 */
function initializeGame() {
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
    
    // Start background music (will be queued if iOS audio not ready)
    AudioHub.playOne(AudioHub.background);
}

/**
 * Shows the game UI elements (canvas, controls, fullscreen button).
 * Removes the 'hide' class from game interface elements.
 * Called after game initialization.
 */
function showGameUI() {
    document.getElementById('fs-open').classList.remove('hide');
    document.getElementById('canvas').classList.remove('hide');
    document.getElementById('controls-box').classList.remove('hide');        
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('restart-button').style.display = 'block';
    document.getElementById('el-pollo-loco').style.display = 'none';
    document.getElementById('credits').style.display = 'none';
}

/**
 * Quits the game and returns to main menu.
 * Stops all sounds before reloading the page.
 */
function quitGame() {
    // Stoppe alle Sounds vor dem Quit
    AudioHub.stopAll();
    
    // Seite neu laden (zurück zum Hauptmenü)
    location.reload();
}

/**
 * Handles game over (loss) state.
 * Stops all audio except endgame sounds, plays game over sound, and shows overlay.
 */
function gameLoose() {
    // Stoppe alle Sounds außer Endgame-Sounds
    AudioHub.stopAllExceptEndgame();
    
    // Spiele Game-Over-Sound direkt
    AudioHub.playOne(AudioHub.gameoverSound);
    
    // Zeige Game-Over-Overlay
    document.getElementById('game-overlay').classList.remove('hide');
    document.getElementById('game-result-text').textContent = 'Game over!';
    
    // Stoppe alle Spiel-Intervalle
    intervalIds.forEach(clearInterval);
}

/**
 * Handles game won state.
 * Stops all audio except endgame sounds, plays victory sound, and shows overlay.
 */
function gameWon() {
    // Stoppe alle Sounds außer Endgame-Sounds
    AudioHub.stopAllExceptEndgame();
    
    // Spiele Gewinn-Sound direkt
    AudioHub.playOne(AudioHub.gamewinSound);
    
    // Zeige Gewinn-Overlay
    document.getElementById('game-overlay').classList.remove('hide');
    document.getElementById('game-result-text').textContent = 'You win!';
    
    // Stoppe alle Spiel-Intervalle
    intervalIds.forEach(clearInterval);
}

/**
 * Restarts the game after game over.
 * Cleans up previous game state and starts fresh.
 * Preserves user's mute preference during restart.
 */
function restartGame() {
    // Stoppe alle aktuell spielenden Sounds vor Neustart
    AudioHub.allSounds.forEach(sound => {
        if (!sound.paused) {
            sound.pause();
            sound.currentTime = 0;
        }
    });
    
    clearCanvas();
    resetGameState();
    startGame(); 
}

/**
 * Clears the game canvas completely.
 */
function clearCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Resets the game state for restart.
 * Hides overlay and clears world reference.
 */
function resetGameState() {
    document.getElementById('game-overlay').classList.add('hide');    
    world = null;
    
    // Intervalle zurücksetzen für sauberen Neustart
    intervalIds.forEach(clearInterval);
    intervalIds = [];
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

/**
 * Initializes the mute state from localStorage and updates UI accordingly.
 * Sets the AudioHub mute state and button icon based on saved preferences.
 * Called at game start to restore user's audio preferences.
 */
function initializeMuteState() {
    const isMuted = JSON.parse(localStorage.getItem('mute')) === 'on';
    const btn = document.getElementById('btn-mute');
    
    // Set AudioHub mute state to match localStorage
    AudioHub.isMuted = isMuted;
    
    if (isMuted) {
        btn.innerHTML = `<img src="./assets/images/btn_mute_on.svg" alt="mute button">`;
    } else {
        btn.innerHTML = `<img src="./assets/images/btn_mute_off.svg" alt="mute button">`;
    }
}

// Initialisiere Mute-Status beim Laden der Seite
document.addEventListener('DOMContentLoaded', initializeMuteState);

/**
 * Handles start game button click with iOS audio initialization.
 * Unlocks audio system first, then starts the game.
 */
async function handleStartGame() {
    try {
        // Initialize iOS audio on user interaction
        await AudioHub.initializeIOSAudio();
        
        // Start the actual game
        startGame();
    } catch (error) {
        // Audio initialization failed, starting game anyway
        startGame();
    }
}

/**
 * Sets up global iOS audio unlock listeners.
 * Ensures audio is unlocked on any user interaction.
 */
function setupIOSAudioUnlock() {
    const unlockAudio = async () => {
        if (!AudioHub.audioUnlocked) {
            await AudioHub.initializeIOSAudio();
        }
    };

    // Add listeners for all possible user interactions
    document.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
    document.addEventListener('touchend', unlockAudio, { once: true, passive: true });
    document.addEventListener('click', unlockAudio, { once: true, passive: true });
    document.addEventListener('keydown', unlockAudio, { once: true, passive: true });
}

// Initialize iOS audio unlock on page load
document.addEventListener('DOMContentLoaded', setupIOSAudioUnlock);

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

    // Legacy touch function - now replaced by touchDetection.js
    // Kept for compatibility but functionality moved to setupTouchControls()
    function touchBtn(){
        // This function is now handled by setupInputControls() in touchDetection.js
    }
