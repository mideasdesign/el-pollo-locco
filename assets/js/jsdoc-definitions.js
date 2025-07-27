/**
 * @fileoverview El Pollo Loco - Jump'n'Run Game
 * @version 1.0.0
 * @author Markus Fischer
 * @description Ein 2D Jump'n'Run Spiel mit HTML5 Canvas, bei dem der Spieler als Pepe durch eine Wüstenlandschaft läuft, Hühner besiegt und den Endboss bekämpft.
 */

/**
 * @namespace Game
 * @description Hauptnamespace für alle Spielfunktionen
 */

/**
 * @namespace Classes
 * @description Alle Spielklassen für Charaktere, Objekte und Spiellogik
 */

/**
 * @typedef {Object} Keyboard
 * @description Tastatur-Input Handler
 * @property {boolean} left - Linke Pfeiltaste gedrückt
 * @property {boolean} right - Rechte Pfeiltaste gedrückt  
 * @property {boolean} space - Leertaste (Sprung) gedrückt
 * @property {boolean} d - D-Taste (Werfen) gedrückt
 */

/**
 * @typedef {Object} Level
 * @description Spiel-Level Datenstruktur
 * @property {Enemy[]} enemies - Array der Feinde im Level
 * @property {Cloud[]} clouds - Array der Wolken für den Hintergrund
 * @property {BackgroundObject[]} backgroundObjects - Hintergrundobjekte
 * @property {Coin[]} coins - Sammelbare Münzen
 * @property {Bottle[]} bottles - Sammelbare Flaschen
 * @property {number} level_end_x - X-Position des Level-Endes
 */

/**
 * @typedef {Object} CollisionBox
 * @description Kollisionsbox für präzise Kollisionserkennung
 * @property {number} top - Oberer Offset
 * @property {number} right - Rechter Offset
 * @property {number} bottom - Unterer Offset
 * @property {number} left - Linker Offset
 */
