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
    /** @type {boolean} - True when chick is facing left */
    otherDirection = false;
    /** 
     * @type {Object} - Collision box offset for precise collision detection
     * @property {number} top - Top offset
     * @property {number} right - Right offset  
     * @property {number} bottom - Bottom offset
     * @property {number} left - Left offset
     */
    offset = {
        top: 7,
        right: 10,
        bottom: 6,
        left: 5
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
    constructor(){
        super().loadImage('assets/images/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 1400 + Math.random() * 2000;  // Random position in later level area
        this.y = 430 - this.height;            // Ground level positioning
        this.getRealFrame();
        this.loadImages(this.images_walking);
        this.speed = 0.19 + Math.random() * 1.20;  // Variable speed (faster than chickens)
        this.animate();
    };
    
    /**
     * Starts the chick's movement and animation loops.
     * Handles continuous left movement and walking animation.
     * Chicks move faster than regular chickens for increased challenge.
     */
    animate(){
        // Movement loop - moves left continuously at 40 FPS
        gameIntervals(() => {
            this.moveLeft();
        }, 1000 / 25);

        // Animation loop - cycles through walking frames every 100ms
        gameIntervals(() => {
            this.playAnimation(this.images_walking);
        }, 100);
    }
}