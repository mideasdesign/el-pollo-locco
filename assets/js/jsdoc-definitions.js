/**
 * @fileoverview El Pollo Loco - Jump'n'Run Game - JSDoc Type Definitions
 * @version 2.0.0
 * @author Markus Fischer
 * @description Ein 2D Jump'n'Run Spiel mit HTML5 Canvas, iOS-Audio-Support, Vollbild-Modus und Touch-Controls.
 * Features: Character-Animation, Kollisionserkennung, Sound-Management, Mobile-Responsive Design.
 */

/**
 * @namespace Game
 * @description Main namespace for all game functions and global variables
 */

/**
 * @namespace Classes
 * @description All game classes for characters, objects, UI elements and game logic
 */

/**
 * @namespace AudioSystem
 * @description Audio management system with iOS compatibility and mute functionality
 */

/**
 * @typedef {Object} Keyboard
 * @description Keyboard and touch input handler for game controls
 * @property {boolean} left - Left arrow key/touch button pressed
 * @property {boolean} right - Right arrow key/touch button pressed  
 * @property {boolean} up - Up arrow key pressed
 * @property {boolean} down - Down arrow key pressed
 * @property {boolean} space - Space key (jump)/touch jump pressed
 * @property {boolean} t - T key (throw)/touch throw pressed
 */

/**
 * @typedef {Object} Level
 * @description Game level data structure with all entities
 * @property {Chicken[]} enemies - Array of chicken enemies in the level
 * @property {Chicks[]} chicks - Array of small chick enemies
 * @property {Endboss} endboss - The final boss enemy
 * @property {Cloud[]} clouds - Array of moving clouds
 * @property {BackgroundObject[]} backgroundObjects - Static background objects
 * @property {Coins[]} coins - Collectible coins for points
 * @property {Bottles[]} bottles - Collectible bottles as throwing projectiles
 * @property {number} level_end_x - X-position of level end (boss area)
 */

/**
 * @typedef {Object} CollisionBox
 * @description Precise collision box for object interactions
 * @property {number} top - Oberer Offset von der Objekt-Grenze
 * @property {number} right - Rechter Offset von der Objekt-Grenze
 * @property {number} bottom - Unterer Offset von der Objekt-Grenze
 * @property {number} left - Linker Offset von der Objekt-Grenze
 */

/**
 * @typedef {Object} AnimationFrame
 * @description Frame data for sprite animations
 * @property {string} src - Path to image file
 * @property {number} duration - Display duration of frame in milliseconds
 * @property {boolean} [loop] - Whether the animation loops
 */

/**
 * @typedef {Object} AudioTrack
 * @description Audio track definition for sound management
 * @property {Audio} audio - HTML5 Audio element
 * @property {string} src - Path to audio file
 * @property {number} volume - Volume level (0.0 - 1.0)
 * @property {boolean} loop - Whether audio is looped
 * @property {string} type - Audio type (background|effect|voice|endgame)
 */

/**
 * @typedef {Object} GameState
 * @description Current game state
 * @property {boolean} isRunning - Whether the game is actively running
 * @property {boolean} isPaused - Whether the game is paused
 * @property {boolean} isGameOver - Whether the game is finished
 * @property {boolean} isWon - Whether the player has won
 * @property {number} score - Current score
 * @property {number} lives - Remaining lives
 * @property {number} coins - Collected coins
 * @property {number} bottles - Available throwing bottles
 */

/**
 * @typedef {Object} TouchControls
 * @description Touch button configuration for mobile
 * @property {string} buttonId - HTML element ID of touch button
 * @property {string} keyboardProperty - Corresponding keyboard property
 * @property {HTMLElement} element - DOM element of the button
 * @property {boolean} isPressed - Whether the button is currently pressed
 */

/**
 * @typedef {Object} CanvasContext
 * @description Canvas rendering context with helper functions
 * @property {HTMLCanvasElement} canvas - The canvas element
 * @property {CanvasRenderingContext2D} ctx - 2D rendering context
 * @property {number} width - Canvas width
 * @property {number} height - Canvas height
 * @property {number} cameraX - Camera X position for scrolling
 */

/**
 * @typedef {Object} IOSAudioConfig
 * @description iOS-specific audio configuration
 * @property {AudioContext} audioContext - WebAudio API context
 * @property {boolean} audioUnlocked - Whether audio is unlocked
 * @property {Audio[]} pendingAudioQueue - Queue for iOS audio
 * @property {boolean} isIOSDevice - iOS device detected
 */

/**
 * @enum {string}
 * @description Player animation states
 * @readonly
 */
const AnimationState = {
    IDLE: 'idle',
    WALKING: 'walking', 
    JUMPING: 'jumping',
    HURT: 'hurt',
    DEAD: 'dead',
    SLEEPING: 'sleeping'
};

/**
 * @enum {string}
 * @description Enemy types and states
 * @readonly
 */
const EnemyType = {
    CHICKEN_NORMAL: 'chicken_normal',
    CHICKEN_SMALL: 'chicken_small', 
    CHICKS: 'chicks',
    ENDBOSS: 'endboss'
};

/**
 * @enum {string}
 * @description Audio categories for sound management
 * @readonly
 */
const AudioType = {
    BACKGROUND: 'background',
    EFFECT: 'effect',
    VOICE: 'voice',
    ENDGAME: 'endgame'
};

/**
 * @enum {string}
 * @description Collision types for gameplay logic
 * @readonly
 */
const CollisionType = {
    PLAYER_ENEMY: 'player_enemy',
    PLAYER_COLLECTIBLE: 'player_collectible',
    PROJECTILE_ENEMY: 'projectile_enemy',
    PLAYER_BOSS: 'player_boss',
    COLLISION_FROM_TOP: 'collision_from_top'
};

/**
 * @enum {number}
 * @description Spiel-Konstanten und Konfigurationswerte
 * @readonly
 */
const GameConstants = {
    CANVAS_WIDTH: 720,
    CANVAS_HEIGHT: 480,
    GRAVITY: 2.5,
    JUMP_FORCE: 30,
    WALKING_SPEED: 2.5,
    THROW_COOLDOWN: 500,
    BOSS_TRIGGER_X: 2350,
    GAME_INTERVAL: 100,
    ANIMATION_INTERVAL: 120
};

/**
 * @enum {string}
 * @description UI element IDs for DOM manipulation
 * @readonly
 */
const UIElements = {
    CANVAS: 'canvas',
    START_BUTTON: 'start-button',
    RESTART_BUTTON: 'restart-button',
    QUIT_BUTTON: 'quit-button',
    MUTE_BUTTON: 'btn-mute',
    GAME_OVERLAY: 'game-overlay',
    GAME_RESULT_TEXT: 'game-result-text',
    CONTROLS_BOX: 'controls-box',
    FULLSCREEN_OPEN: 'fs-open',
    FULLSCREEN_CLOSE: 'fs-close'
};

/**
 * @typedef {Object} MovableObjectConfig
 * @description Configuration for movable objects
 * @property {number} x - X position
 * @property {number} y - Y position
 * @property {number} width - Object width
 * @property {number} height - Object height
 * @property {number} speed - Movement speed
 * @property {number} [speedY] - Vertical speed (for jumps/falling)
 * @property {boolean} [otherDirection] - Whether object is drawn mirrored
 * @property {string[]} images - Array of animation image paths
 * @property {CollisionBox} [offset] - Collision box offsets
 */

/**
 * @typedef {Object} StatusBarConfig
 * @description Configuration for UI status bars
 * @property {number} x - X position on canvas
 * @property {number} y - Y position on canvas
 * @property {number} width - Bar width
 * @property {number} height - Bar height
 * @property {number} percentage - Current fill level (0-100)
 * @property {string[]} images - Image array for different fill levels
 * @property {string} type - Bar type (health|coins|bottles|boss)
 */

/**
 * @typedef {Object} ThrowableObjectConfig
 * @description Configuration for projectiles
 * @property {number} x - Start X-Position
 * @property {number} y - Start Y-Position
 * @property {number} speedX - Horizontale Wurfgeschwindigkeit
 * @property {number} speedY - Vertikale Wurfgeschwindigkeit
 * @property {boolean} hasHit - Ob Geschoss getroffen hat
 * @property {boolean} isSplashing - Ob Geschoss gerade zerbricht
 */

/**
 * @global
 * @type {World}
 * @description Globale Referenz auf die Spielwelt-Instanz
 */
let world;

/**
 * @global
 * @type {Keyboard}
 * @description Globaler Keyboard-Input-Handler
 */
let keyboard;

/**
 * @global
 * @type {HTMLCanvasElement}
 * @description Globale Referenz auf das Spiel-Canvas
 */
let canvas;

/**
 * @global
 * @type {number[]}
 * @description Array of all game intervals for cleanup
 */
let intervalIds;
