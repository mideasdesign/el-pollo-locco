/**
 * Sky background layer for atmospheric depth and visual appeal.
 * Provides the blue sky background that fills the upper portion of the game screen.
 * Part of the layered background system for visual depth.
 * @extends MovableObject
 */
class Sky extends MovableObject {
    /** @type {number} - X position (starts at left edge) */
    x = 0;
    /** @type {number} - Y position (starts at top) */
    y = 0;
    /** @type {number} - Width covers full screen width */
    width = 720;
    /** @type {number} - Height covers full screen height */
    height = 480;

    /**
     * Creates a new Sky instance.
     * Loads the sky background image and positions it to cover the screen.
     * @constructor
     */
    constructor() {
        super().loadImage('assets/images/5_background/layers/air.png');
    }
}