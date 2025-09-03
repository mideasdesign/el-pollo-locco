/**
 * @fileoverview Game initialization and startup sequence management
 * Handles the transition from start screen to gameplay
 */
/** @type {World} - Global reference to the game world instance */
let world;
/** @type {Keyboard} - Global keyboard input handler */
let keyboard = new Keyboard();
/** @type {HTMLCanvasElement} - Game canvas element */
let canvas;
/**
 * Initializes the game canvas reference.
 * Called when the page loads to prepare the canvas element.
 */
function init() {
    canvas = document.getElementById('canvas');
};
/**
 * Starts a new game with animated transition sequence.
 * Handles the fade-out of start screen and initiates loading sequence.
 */
function startGame() {
    const startScreen = document.getElementById('start-screen');
    startScreen.style.animation = 'fadeOut 1s forwards';
    setTimeout(() => {
        hideStartScreenAndShowLoading(startScreen);
    }, 1000);
};
/**
 * Hides the start screen and displays the loading screen.
 * Initiates the game initialization after loading delay.
 * @param {HTMLElement} startScreen - The start screen element to hide
 */
function hideStartScreenAndShowLoading(startScreen) {
    startScreen.style.display = 'none';
    document.getElementById('loading-screen').style.display = 'block';
    setTimeout(() => {
        initializeGameWorld();
    }, 1000);
};
/**
 * Initializes the game world and displays the game canvas.
 * Creates the world instance and hides the loading screen.
 */
function initializeGameWorld() {
    initLevel();
    world = new World(canvas, keyboard);
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
};
/**
 * Handles keyboard key press events for game controls.
 * Sets keyboard state flags for movement and action keys.
 * Key mappings: 37=Left, 39=Right, 84=Throw, 74=Jump, 77=Mute
 * @param {KeyboardEvent} e - The keyboard event object
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 37) keyboard.left = true;
    if (e.keyCode == 39) keyboard.right = true;
    if (e.keyCode == 84) keyboard.t = true;
    if (e.keyCode == 38) keyboard.up = true;
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
