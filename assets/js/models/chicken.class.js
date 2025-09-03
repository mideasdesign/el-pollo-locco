/**
 * Represents an enemy chicken in the game.
 * Chickens walk left automatically and can be defeated by jumping on them.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    /** @type {number} - Width of the chicken sprite */
    width = 40;
    
    /** @type {number} - Height of the chicken sprite */
    height = 60;

    /** 
     * @type {Object} - Collision box offset for precise collision detection
     * @property {number} top - Top offset
     * @property {number} right - Right offset  
     * @property {number} bottom - Bottom offset
     * @property {number} left - Left offset
     */
    offset = {
        top: 7,
        right: 5,
        bottom: 6,
        left: 10
    };

    /** @type {string[]} - Array of image paths for walking animation */
    images_walking = [
        'assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/images/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/images/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /** @type {string[]} - Array of image paths for death state */
    images_dead = [
        'assets/images/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /** @type {number} - Current frame index for animations */
    currentImage = 0;
    /** @type {boolean} - True when chicken is dead */
    dead = false;

    /**
     * Creates a new Chicken instance.
     * Randomly positions the chicken and sets movement speed.
     * @constructor
     */
    constructor() {
        super().loadImage('assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 1500 + Math.random() * 1700;
        this.y = 430 - this.height;
        this.otherDirection = false;
        this.getRealFrame();
        this.loadImages(this.images_walking);
        this.loadImages(this.images_dead);
        this.speed = 0.15 + Math.random() * 0.40;
        this.animate();
    }

    /**
     * Starts the chicken's movement and animation loops.
     * Handles continuous left movement and walking animation.
     * Stops all animations when the chicken is dead.
     */
    animate() {
        this.moveLeftInterval = gameIntervals(() => {
            if (!this.dead) {
                this.moveLeft();
            }
        }, 1000 / 25);
        this.wakingInterval = gameIntervals(() => {
            if (!this.dead) {
                this.playAnimation(this.images_walking);
            }
        }, 100);
    }

    /**
     * Kills the chicken and changes it to death state.
     * Stops all movement and animations, displays death sprite.
     * Clears all running intervals to prevent further updates.
     */
    deadChicken() {
        this.dead = true;
        this.speed = 0;
        clearInterval(this.moveLeftInterval);
        clearInterval(this.wakingInterval);
        this.loadImage('assets/images/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        if (this.imageCache['assets/images/3_enemies_chicken/chicken_normal/2_dead/dead.png']) {
            this.img = this.imageCache['assets/images/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
        }
    }

    /**
     * Calculates the real collision frame based on chicken position.
     * Uses standard calculation since offsets are designed for left-facing sprites.
     */
    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width + this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

    /**
     * Moves the chicken to the left.
     * Uses the base implementation since direction doesn't change.
     */
    moveLeft() {
        this.x -= this.speed;
    }
}