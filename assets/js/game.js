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
    // Stop all sounds before quitting
    AudioHub.stopAll();
    
    // Reload page (return to main menu)
    location.reload();
}

/**
 * Handles game over (loss) state.
 * Stops all audio except endgame sounds, plays game over sound, and shows overlay.
 */
function gameLoose() {
    // Stop all sounds except endgame sounds
    AudioHub.stopAllExceptEndgame();
    
    // Play game over sound directly
    AudioHub.playOne(AudioHub.gameoverSound);
    
    // Show game over overlay
    document.getElementById('game-overlay').classList.remove('hide');
    document.getElementById('game-result-text').textContent = 'Game over!';
    
    // Stop all game intervals
    intervalIds.forEach(clearInterval);
}

/**
 * Handles game won state.
 * Stops all audio except endgame sounds, plays victory sound, and shows overlay.
 */
function gameWon() {
    // Stop all sounds except endgame sounds
    AudioHub.stopAllExceptEndgame();
    
    // Play victory sound directly
    AudioHub.playOne(AudioHub.gamewinSound);
    
    // Show victory overlay
    document.getElementById('game-overlay').classList.remove('hide');
    document.getElementById('game-result-text').textContent = 'You win!';
    
    // Stop all game intervals
    intervalIds.forEach(clearInterval);
}

/**
 * Restarts the game after game over.
 * Cleans up previous game state and starts fresh.
 * Preserves user's mute preference during restart.
 */
function restartGame() {
    // Stop all currently playing sounds before restart
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
    
    // Reset intervals for clean restart
    intervalIds.forEach(clearInterval);
    intervalIds = [];
}

function fullscreen(){
    let fs = document.getElementById('fullscreen');
    openFullscreen(fs);
}


/**
 * Opens fullscreen mode for the game.
 * Supports all major browsers with vendor prefixes.
 * Icon updates are handled by the fullscreenchange event listener.
 */
function openFullscreen() {    
  if (fs.requestFullscreen) {
    fs.requestFullscreen();
  } else if (fs.webkitRequestFullscreen) { /* Safari */
    fs.webkitRequestFullscreen();
  } else if (fs.msRequestFullscreen) { /* IE11 */
    fs.msRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode.
 * Supports all major browsers with vendor prefixes.
 * Icon updates are handled by the fullscreenchange event listener.
 */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

function allSounds() {
    // Toggle mute state
    const isMuted = JSON.parse(localStorage.getItem('mute')) === 'on';
    const btn = document.getElementById('btn-mute');

    if (isMuted) {
        console.log('[Mute-DEBUG] Unmute triggered');
        AudioHub.isMuted = false;
        localStorage.setItem('mute', JSON.stringify('off'));
        AudioHub.startAll();
        initializeMuteState();
    } else {
        console.log('[Mute-DEBUG] Mute triggered');
        AudioHub.isMuted = true;
        localStorage.setItem('mute', JSON.stringify('on'));
        AudioHub.stopAll([], true);
        initializeMuteState();
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

/**
 * Handles fullscreen state changes, including ESC key exits.
 * Updates the fullscreen button icons when fullscreen mode is entered or exited.
 * This ensures proper icon state even when ESC key is used to exit fullscreen.
 */
function handleFullscreenChange() {
    const isFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    );
    
    if (isFullscreen) {
        // In fullscreen mode - show close button
        document.getElementById('fs-open').classList.add('hide');
        document.getElementById('fs-close').classList.remove('hide');
    } else {
        // Not in fullscreen mode - show open button
        document.getElementById('fs-open').classList.remove('hide');
        document.getElementById('fs-close').classList.add('hide');
    }
}

// Initialize mute status when page loads
document.addEventListener('DOMContentLoaded', initializeMuteState);

// Monitor fullscreen changes (including ESC key)
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // Safari
document.addEventListener('mozfullscreenchange', handleFullscreenChange);    // Firefox
document.addEventListener('MSFullscreenChange', handleFullscreenChange);     // IE/Edge

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
    document.addEventListener('keyboard.m', unlockAudio, { once: true, passive: true });
}

// Initialize iOS audio unlock on page load
document.addEventListener('DOMContentLoaded', setupIOSAudioUnlock);

    window.addEventListener('keydown', (e) => { 
        
        if (e.keyCode == 37) keyboard.left = true;
        if (e.keyCode == 39) keyboard.right = true;
        if (e.keyCode == 84) keyboard.t = true;
        if (e.keyCode == 74) keyboard.j = true;
        if (e.keyCode == 77) keyboard.m = true;  // M-Key for Mute
    });

    window.addEventListener('keyup', (e) => {
        if (e.keyCode == 37) keyboard.left = false;
        if (e.keyCode == 39) keyboard.right = false;
        if (e.keyCode == 74) keyboard.j = false;
        if (e.keyCode == 84) keyboard.t = false;
        if (e.keyCode == 77) {keyboard.m = false;
            allSounds(); // Trigger mute toggle when M key is released
        }
    });

    // Legacy touch function - now replaced by touchDetection.js
    // Kept for compatibility but functionality moved to setupTouchControls()
    function touchBtn(){
        // This function is now handled by setupInputControls() in touchDetection.js
    }
