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
    let id = setInterval(fn, time);
    intervalIds.push(id);
};
/**
 * Starts the game session with iOS audio support.
 * Initializes audio system, locks screen orientation, and begins gameplay.
 * Shows the game UI and begins gameplay.
 */
async function startGame() {
    try {
        await initializeAudioAndControls();
        await lockScreenOrientation();
        startGameplay();
    } catch (error) {
        startGameplayFallback();
    }
};
/**
 * Initializes audio system and input controls.
 */
async function initializeAudioAndControls() {
    initializeMuteState();
    await AudioHub.initializeIOSAudio();
    setupInputControls();
    setupResponsiveControls();
};
/**
 * Attempts to lock screen orientation to landscape.
 */
async function lockScreenOrientation() {
    await screen.orientation.lock('landscape').catch((err) => {});
};
/**
 * Starts the main gameplay sequence.
 */
function startGameplay() {
    initializeGame();
    showGameUI();
};
/**
 * Fallback gameplay start when audio initialization fails.
 */
function startGameplayFallback() {
    initializeMuteState();
    setupResponsiveControls();
    initializeGame();
    showGameUI();
};
/**
 * Initializes the game world and starts background music.
 * Creates the canvas context, level data, and world instance.
 * Called internally by startGame().
 */
function initializeGame() {
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
    AudioHub.playOne(AudioHub.background);
};
/**
 * Shows the game UI elements (canvas, controls, fullscreen button).
 * Removes the 'hide' class from game interface elements.
 * Called after game initialization.
 */
function showGameUI() {
    showGameElements();
    hideMenuElements();
};
/**
 * Shows game interface elements
 */
function showGameElements() {
    document.getElementById('fs-open').classList.remove('hide');
    document.getElementById('canvas').classList.remove('hide');
    document.getElementById('controls-box').classList.remove('hide');
    document.getElementById('restart-button').style.display = 'block';
};
/**
 * Hides menu and title elements
 */
function hideMenuElements() {
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('el-pollo-loco').style.display = 'none';
    document.getElementById('credits').style.display = 'none';
};
/**
 * Quits the game and returns to main menu.
 * Stops all sounds before reloading the page.
 */
function quitGame() {
    AudioHub.stopAll();
    location.reload();
};
/**
 * Handles game over (loss) state.
 * Stops all audio except endgame sounds, plays game over sound, and shows overlay.
 */
function gameLoose() {
    AudioHub.stopAllExceptEndgame();
    AudioHub.playOne(AudioHub.gameoverSound);
    document.getElementById('game-overlay').classList.remove('hide');
    document.getElementById('game-result-text').textContent = 'Game over!';
    intervalIds.forEach(clearInterval);
};
/**
 * Handles game won state.
 * Stops all audio except endgame sounds, plays victory sound, and shows overlay.
 */
function gameWon() {
    AudioHub.stopAllExceptEndgame();
    AudioHub.playOne(AudioHub.gamewinSound);
    document.getElementById('game-overlay').classList.remove('hide');
    document.getElementById('game-result-text').textContent = 'You win!';
    intervalIds.forEach(clearInterval);
};
/**
 * Restarts the game after game over.
 * Cleans up previous game state and starts fresh.
 * Preserves user's mute preference during restart.
 */
function restartGame() {
    stopAllGameAudio();
    clearCanvas();
    resetGameState();
    startGame();
};
/**
 * Stops all currently playing game audio.
 */
function stopAllGameAudio() {
    AudioHub.allSounds.forEach(sound => {
        if (!sound.paused) {
            sound.pause();
            sound.currentTime = 0;
        }
    });
};
/**
 * Clears the game canvas completely.
 */
function clearCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};
/**
 * Resets the game state for restart.
 * Hides overlay and clears world reference.
 */
function resetGameState() {
    document.getElementById('game-overlay').classList.add('hide');
    world = null;
    intervalIds.forEach(clearInterval);
    intervalIds = [];
};
/**
 * Enters fullscreen mode for the game container.
 * Triggers the openFullscreen function for the fullscreen element.
 */
function fullscreen() {
    let fs = document.getElementById('fullscreen');
    openFullscreen(fs);
};
/**
 * Opens fullscreen mode for the game.
 * Supports all major browsers with vendor prefixes.
 * Icon updates are handled by the fullscreenchange event listener.
 */
function openFullscreen() {
    if (fs.requestFullscreen) {
        fs.requestFullscreen();
    } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
    } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen();
    }
};
/**
 * Exits fullscreen mode.
 * Supports all major browsers with vendor prefixes.
 * Icon updates are handled by the fullscreenchange event listener.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
};
/**
 * Toggles the game's audio mute state.
 * Saves preference to localStorage and updates AudioHub settings.
 * Updates the mute button icon to reflect current state.
 */
function allSounds() {
    const isMuted = JSON.parse(localStorage.getItem('mute')) === 'on';
    if (isMuted) {
        unmuteSounds();
    } else {
        muteSounds();
    }
};
/**
 * Unmutes all game sounds and updates UI
 */
function unmuteSounds() {
    AudioHub.isMuted = false;
    localStorage.setItem('mute', JSON.stringify('off'));
    AudioHub.startAll();
    initializeMuteState();
};
/**
 * Mutes all game sounds and updates UI
 */
function muteSounds() {
    AudioHub.isMuted = true;
    localStorage.setItem('mute', JSON.stringify('on'));
    AudioHub.stopAll([], true);
    initializeMuteState();
};
/**
 * Initializes the mute state from localStorage and updates UI accordingly.
 * Sets the AudioHub mute state and button icon based on saved preferences.
 * Called at game start to restore user's audio preferences.
 */
function initializeMuteState() {
    const isMuted = JSON.parse(localStorage.getItem('mute')) === 'on';
    const btn = document.getElementById('btn-mute');
    AudioHub.isMuted = isMuted;
    updateMuteButtonIcon(btn, isMuted);
};
/**
 * Updates the mute button icon based on mute state.
 * @param {HTMLElement} btn - The mute button element
 * @param {boolean} isMuted - Current mute state
 */
function updateMuteButtonIcon(btn, isMuted) {
    if (isMuted) {
        btn.innerHTML = `<img src="./assets/images/btn_mute_on.svg" alt="mute button">`;
    } else {
        btn.innerHTML = `<img src="./assets/images/btn_mute_off.svg" alt="mute button">`;
    }
};
/**
 * Handles fullscreen state changes, including ESC key exits.
 * Updates the fullscreen button icons when fullscreen mode is entered or exited.
 * This ensures proper icon state even when ESC key is used to exit fullscreen.
 */
function handleFullscreenChange() {
    const isFullscreen = checkFullscreenState();
    updateFullscreenIcons(isFullscreen);
};
/**
 * Checks current fullscreen state across all browsers
 * @returns {boolean} True if currently in fullscreen mode
 */
function checkFullscreenState() {
    return !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    );
};
/**
 * Updates fullscreen button icons based on current state
 * @param {boolean} isFullscreen - Current fullscreen state
 */
function updateFullscreenIcons(isFullscreen) {
    if (isFullscreen) {
        document.getElementById('fs-open').classList.add('hide');
        document.getElementById('fs-close').classList.remove('hide');
    } else {
        document.getElementById('fs-open').classList.remove('hide');
        document.getElementById('fs-close').classList.add('hide');
    }
};
document.addEventListener('DOMContentLoaded', initializeMuteState);
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);
/**
 * Handles start game button click with iOS audio initialization.
 * Unlocks audio system first, then starts the game.
 */
async function handleStartGame() {
    try {
        await AudioHub.initializeIOSAudio();
        startGame();
    } catch (error) {
        startGame();
    };
};
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
    attachAudioUnlockListeners(unlockAudio);
};
/**
 * Attaches audio unlock event listeners to various user interactions.
 * @param {Function} unlockAudio - The audio unlock function
 */
function attachAudioUnlockListeners(unlockAudio) {
    const options = { once: true, passive: true };
    document.addEventListener('touchstart', unlockAudio, options);
    document.addEventListener('touchend', unlockAudio, options);
    document.addEventListener('click', unlockAudio, options);
    document.addEventListener('keyboard.m', unlockAudio, options);
};
document.addEventListener('DOMContentLoaded', setupIOSAudioUnlock);
/**
 * Handles keyboard key press events for game controls.
 * Sets keyboard state flags for movement and action keys.
 * Key mappings: 37=Left, 39=Right, 84=Throw, 32=Jump, 77=Mute
 * @param {KeyboardEvent} e - The keyboard event object
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 37) keyboard.left = true;
    if (e.keyCode == 39) keyboard.right = true;
    if (e.keyCode == 38) keyboard.up = true;
    if (e.keyCode == 84) keyboard.t = true;
    if (e.keyCode == 77) keyboard.m = true;
});
/**
 * Handles keyboard key release events for game controls.
 * Resets keyboard state flags when keys are released.
 * Special handling for mute key (M) which toggles sound on release.
 * @param {KeyboardEvent} e - The keyboard event object
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 37) keyboard.left = false;
    if (e.keyCode == 39) keyboard.right = false;
    if (e.keyCode == 38) keyboard.up = false;
    if (e.keyCode == 84) keyboard.t = false;
    if (e.keyCode == 77) {
        keyboard.m = false;
        allSounds();
    }
});
/**
 * Placeholder function for touch button controls.
 * Currently empty - intended for mobile device touch input handling.
 */
function touchBtn() {};