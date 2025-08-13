/**
 * Small chicken enemy (chicks) that provides variety in enemy types.
 * Chicks are smaller, faster versions of regular chickens with similar behavior.
 * They move left automatically and can be defeated by jumping on them.
 * @extends MovableObject
 */
class Chicks extends MovableObject{ 
    /** @type {number} - Width of the chick sprite (smaller than regular chickens) */
    width = 40;
    /** @type {number} - Height of the chick sprite (smaller than regular chickens) */
    height = 50;
    /** 
     * @type {Object} - Collision box offset for precise collision detection
     * @property {number} top - Top offset
     * @property {number} right - Right offset  
     * @property {number} bottom - Bottom offset
     * @property {number} left - Left offset
     */
    offset = {
        top: 7,
        right: 5,    // Vertausche left/right für nach links schauende Sprites
        bottom: 6,
        left: 10
    };

    /** @type {string[]} - Array of image paths for walking animation */
    images_walking = [
        'assets/images/3_enemies_chicken/chicken_small/1_walk/1_w.png',  // Walk frame 1
        'assets/images/3_enemies_chicken/chicken_small/1_walk/2_w.png',  // Walk frame 2
        'assets/images/3_enemies_chicken/chicken_small/1_walk/3_w.png'   // Walk frame 3
    ];

    /** @type {number} - Current frame index for animations */
    currentImage = 0;
    
    /**
     * Creates a new Chicks instance with random positioning and speed.
     * Spawns in the later part of the level with variable movement speed.
     * @constructor
     */
    constructor() {
        super().loadImage('assets/images/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 1400 + Math.random() * 2000;  // Random position in later level area
        this.y = 430 - this.height;            // Ground level positioning
        this.otherDirection = false; // Küken-Sprites schauen bereits nach links
        this.getRealFrame();
        this.loadImages(this.images_walking);
        this.speed = 0.19 + Math.random() * 1.20;  // Variable speed (faster than chickens)
        this.animate();
    }

    /**
     * Starts the chick's movement and animation loops.
     * Handles continuous left movement and walking animation.
     * Chicks move faster than regular chickens for increased challenge.
     */
    animate() {
        // Movement loop - moves left continuously at 40 FPS
        gameIntervals(() => {
            this.moveLeft();
        }, 1000 / 25);

        // Animation loop - cycles through walking frames every 100ms
        gameIntervals(() => {
            this.playAnimation(this.images_walking);
        }, 100);
    }

    /**
     * Calculates the real collision frame based on chick position.
     * Uses standard calculation since offsets are designed for left-facing sprites.
     */
    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width + this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

    /**
     * Moves the chick to the left.
     * Uses the base implementation since direction doesn't change.
     */
    moveLeft() {
        this.x -= this.speed;
    }
}