/**
 * @fileoverview El Pollo Loco - Jump'n'Run Game - JSDoc Type Definitions
 * @version 2.0.0
 * @author Markus Fischer
 * @description Ein 2D Jump'n'Run Spiel mit HTML5 Canvas, iOS-Audio-Support, Vollbild-Modus und Touch-Controls.
 * Features: Character-Animation, Kollisionserkennung, Sound-Management, Mobile-Responsive Design.
 */

/**
 * @namespace Game
 * @description Hauptnamespace für alle Spielfunktionen und globale Variablen
 */

/**
 * @namespace Classes
 * @description Alle Spielklassen für Charaktere, Objekte, UI-Elemente und Spiellogik
 */

/**
 * @namespace AudioSystem
 * @description Audio-Management-System mit iOS-Kompatibilität und Mute-Funktionalität
 */

/**
 * @typedef {Object} Keyboard
 * @description Tastatur- und Touch-Input Handler für Spielsteuerung
 * @property {boolean} left - Linke Pfeiltaste/Touch-Button gedrückt
 * @property {boolean} right - Rechte Pfeiltaste/Touch-Button gedrückt  
 * @property {boolean} up - Obere Pfeiltaste gedrückt
 * @property {boolean} down - Untere Pfeiltaste gedrückt
 * @property {boolean} space - Leertaste (Sprung)/Touch-Jump gedrückt
 * @property {boolean} t - T-Taste (Werfen)/Touch-Throw gedrückt
 */

/**
 * @typedef {Object} Level
 * @description Spiel-Level Datenstruktur mit allen Entitäten
 * @property {Chicken[]} enemies - Array der Hühner-Feinde im Level
 * @property {Chicks[]} chicks - Array der kleinen Küken-Feinde
 * @property {Endboss} endboss - Der finale Boss-Gegner
 * @property {Cloud[]} clouds - Array der beweglichen Wolken
 * @property {BackgroundObject[]} backgroundObjects - Statische Hintergrundobjekte
 * @property {Coins[]} coins - Sammelbare Münzen für Punkte
 * @property {Bottles[]} bottles - Sammelbare Flaschen als Wurfgeschosse
 * @property {number} level_end_x - X-Position des Level-Endes (Boss-Bereich)
 */

/**
 * @typedef {Object} CollisionBox
 * @description Präzise Kollisionsbox für Objekt-Interaktionen
 * @property {number} top - Oberer Offset von der Objekt-Grenze
 * @property {number} right - Rechter Offset von der Objekt-Grenze
 * @property {number} bottom - Unterer Offset von der Objekt-Grenze
 * @property {number} left - Linker Offset von der Objekt-Grenze
 */

/**
 * @typedef {Object} AnimationFrame
 * @description Frame-Daten für Sprite-Animationen
 * @property {string} src - Pfad zur Bild-Datei
 * @property {number} duration - Anzeigedauer des Frames in Millisekunden
 * @property {boolean} [loop] - Ob die Animation in Schleife läuft
 */

/**
 * @typedef {Object} AudioTrack
 * @description Audio-Track-Definition für Sound-Management
 * @property {Audio} audio - HTML5 Audio-Element
 * @property {string} src - Pfad zur Audio-Datei
 * @property {number} volume - Lautstärke (0.0 - 1.0)
 * @property {boolean} loop - Ob Audio geloopt wird
 * @property {string} type - Audio-Typ (background|effect|voice|endgame)
 */

/**
 * @typedef {Object} GameState
 * @description Aktueller Spielzustand
 * @property {boolean} isRunning - Ob das Spiel aktiv läuft
 * @property {boolean} isPaused - Ob das Spiel pausiert ist
 * @property {boolean} isGameOver - Ob das Spiel beendet ist
 * @property {boolean} isWon - Ob der Spieler gewonnen hat
 * @property {number} score - Aktuelle Punktzahl
 * @property {number} lives - Verbleibende Leben
 * @property {number} coins - Gesammelte Münzen
 * @property {number} bottles - Verfügbare Wurfflaschen
 */

/**
 * @typedef {Object} TouchControls
 * @description Touch-Button Konfiguration für Mobile
 * @property {string} buttonId - HTML-Element ID des Touch-Buttons
 * @property {string} keyboardProperty - Entsprechende Keyboard-Eigenschaft
 * @property {HTMLElement} element - DOM-Element des Buttons
 * @property {boolean} isPressed - Ob der Button aktuell gedrückt ist
 */

/**
 * @typedef {Object} CanvasContext
 * @description Canvas-Rendering-Kontext mit Hilfsfunktionen
 * @property {HTMLCanvasElement} canvas - Das Canvas-Element
 * @property {CanvasRenderingContext2D} ctx - 2D-Rendering-Kontext
 * @property {number} width - Canvas-Breite
 * @property {number} height - Canvas-Höhe
 * @property {number} cameraX - Kamera X-Position für Scrolling
 */

/**
 * @typedef {Object} IOSAudioConfig
 * @description iOS-spezifische Audio-Konfiguration
 * @property {AudioContext} audioContext - WebAudio API Kontext
 * @property {boolean} audioUnlocked - Ob Audio entsperrt ist
 * @property {Audio[]} pendingAudioQueue - Warteschlange für iOS-Audio
 * @property {boolean} isIOSDevice - iOS-Gerät erkannt
 */

/**
 * @enum {string}
 * @description Spieler-Animations-Zustände
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
 * @description Gegner-Typen und -Zustände
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
 * @description Audio-Kategorien für Sound-Management
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
 * @description Kollisions-Typen für Gameplay-Logik
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
 * @description UI-Element-IDs für DOM-Manipulation
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
 * @description Konfiguration für bewegliche Objekte
 * @property {number} x - X-Position
 * @property {number} y - Y-Position
 * @property {number} width - Objekt-Breite
 * @property {number} height - Objekt-Höhe
 * @property {number} speed - Bewegungsgeschwindigkeit
 * @property {number} [speedY] - Vertikale Geschwindigkeit (für Sprünge/Fallen)
 * @property {boolean} [otherDirection] - Ob Objekt gespiegelt gezeichnet wird
 * @property {string[]} images - Array der Animations-Bild-Pfade
 * @property {CollisionBox} [offset] - Kollisionsbox-Offsets
 */

/**
 * @typedef {Object} StatusBarConfig
 * @description Konfiguration für UI-Status-Balken
 * @property {number} x - X-Position auf Canvas
 * @property {number} y - Y-Position auf Canvas
 * @property {number} width - Balken-Breite
 * @property {number} height - Balken-Höhe
 * @property {number} percentage - Aktueller Füllstand (0-100)
 * @property {string[]} images - Bild-Array für verschiedene Füllstände
 * @property {string} type - Balken-Typ (health|coins|bottles|boss)
 */

/**
 * @typedef {Object} ThrowableObjectConfig
 * @description Konfiguration für Wurfgeschosse
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
 * @description Array aller Spiel-Intervalle für Cleanup
 */
let intervalIds;
