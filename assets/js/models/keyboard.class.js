/**
 * Keyboard input handler that tracks the state of game control keys.
 * Monitors key press and release events for player movement and actions.
 * Used by the character and world classes for responsive controls.
 */
class Keyboard {
    /** @type {boolean} - True when left arrow key is pressed */
    left = false;
    /** @type {boolean} - True when right arrow key is pressed */
    right = false;
    /** @type {boolean} - True when up arrow key is pressed (unused) */
    up = false;
    /** @type {boolean} - True when down arrow key is pressed (unused) */
    down = false;
    /** @type {boolean} - True when space bar is pressed (jump action) */
    space = false;
    /** @type {boolean} - True when 'T' key is pressed (throw action) */
    t = false;
    /** @type {boolean} - True when 'M' key is pressed (mute toggle) */
    m = false;
    /** @type {boolean} - True when 'J' key is pressed (mute toggle) */
    j = false;
} 