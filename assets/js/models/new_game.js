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
}

/**
 * Starts a new game with animated transition sequence.
 * Handles the fade-out of start screen, loading screen display,
 * and initialization of the game world.
 */
function startGame() {
    const startScreen = document.getElementById('start-screen');
    // Entferne das Startbild und den Button mit einer Ausblend-Animation
    startScreen.style.animation = 'fadeOut 1s forwards';

    // Nach der Animation das Startscreen-Element ausblenden und das Laden starten
    setTimeout(() => {
        startScreen.style.display = 'none';
        document.getElementById('loading-screen').style.display = 'block';

        setTimeout(() => {
            initLevel();
            world = new World(canvas, keyboard);
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('canvas').style.display = 'block';
        }, 1000); // simuliertes kurzes Laden

    }, 1000);
}

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
    if (e.keyCode == 77) {
        keyboard.m = false;
        allSounds(); // Trigger mute toggle when M key is released
    }
});

// Legacy touch function - now replaced by touchDetection.js
// Kept for compatibility but functionality moved to setupTouchControls()
function touchBtn() {
    // This function is now handled by setupInputControls() in touchDetection.js
}
