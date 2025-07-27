/**
 * Represents the main character (Pepe) in the game.
 * Handles movement, animations, jumping, and health management.
 * @extends MovableObject
 */
class Character extends MovableObject {
  /** @type {number} - Initial x position of the character */
  x = 160;
  /** @type {number} - Initial y position of the character */
  y = 80;
  /** @type {number} - Width of the character sprite */
  width = 120;
  /** @type {number} - Height of the character sprite */
  height = 250;
  /** @type {number} - Movement speed of the character */
  speed = 16;
  /** @type {number} - Vertical movement speed (for jumping/falling) */
  speedY = 0;
  /** 
   * @type {Object} - Collision box offset for more precise collision detection
   * @property {number} top - Top offset
   * @property {number} right - Right offset  
   * @property {number} bottom - Bottom offset
   * @property {number} left - Left offset
   */
  offset = {
    top: 110,
    right: 70,
    bottom: 15,
    left: 20,
  };

  /** @type {number} - Character's health points */
  healthPepe = 1000;
  /** @type {boolean} - True when character is facing left */
  otherDirection = false;
  /** @type {number} - Timestamp of last movement for idle animation */
  lastMove = new Date().getTime();

  /** @type {string[]} - Array of image paths for idle animation */
  images_idle = [
    "assets/images/2_character_pepe/1_idle/idle/I-1.png",
    "assets/images/2_character_pepe/1_idle/idle/I-2.png",
    "assets/images/2_character_pepe/1_idle/idle/I-3.png",
    "assets/images/2_character_pepe/1_idle/idle/I-4.png",
    "assets/images/2_character_pepe/1_idle/idle/I-5.png",
    "assets/images/2_character_pepe/1_idle/idle/I-6.png",
    "assets/images/2_character_pepe/1_idle/idle/I-7.png",
    "assets/images/2_character_pepe/1_idle/idle/I-8.png",
    "assets/images/2_character_pepe/1_idle/idle/I-9.png",
    "assets/images/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /** @type {string[]} - Array of image paths for long idle animation */
  images_long_idle = [
    "assets/images/2_character_pepe/1_idle/long_idle/I-11.png",
    "assets/images/2_character_pepe/1_idle/long_idle/I-12.png",
    "assets/images/2_character_pepe/1_idle/long_idle/I-13.png",
    "assets/images/2_character_pepe/1_idle/long_idle/I-14.png",
    "assets/images/2_character_pepe/1_idle/long_idle/I-15.png",
    "assets/images/2_character_pepe/1_idle/long_idle/I-17.png",
    "assets/images/2_character_pepe/1_idle/long_idle/I-18.png",
    "assets/images/2_character_pepe/1_idle/long_idle/I-19.png",
    "assets/images/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /** @type {string[]} - Array of image paths for walking animation */
  images_walking = [
    "assets/images/2_character_pepe/2_walk/W-21.png",
    "assets/images/2_character_pepe/2_walk/W-22.png",
    "assets/images/2_character_pepe/2_walk/W-23.png",
    "assets/images/2_character_pepe/2_walk/W-24.png",
    "assets/images/2_character_pepe/2_walk/W-25.png",
    "assets/images/2_character_pepe/2_walk/W-26.png",
  ];

  /** @type {string[]} - Array of image paths for jumping animation */
  images_jumping = [
    "assets/images/2_character_pepe/3_jump/J-31.png",
    "assets/images/2_character_pepe/3_jump/J-32.png",
    "assets/images/2_character_pepe/3_jump/J-33.png",
    "assets/images/2_character_pepe/3_jump/J-34.png",
    "assets/images/2_character_pepe/3_jump/J-35.png",
    "assets/images/2_character_pepe/3_jump/J-36.png",
    "assets/images/2_character_pepe/3_jump/J-37.png",
    "assets/images/2_character_pepe/3_jump/J-38.png",
    "assets/images/2_character_pepe/3_jump/J-39.png",
  ];

  /** @type {string[]} - Array of image paths for hurt animation */
  images_hurt = ["assets/images/2_character_pepe/4_hurt/H-41.png", "assets/images/2_character_pepe/4_hurt/H-42.png", "assets/images/2_character_pepe/4_hurt/H-43.png"];

  /** @type {string[]} - Array of image paths for death animation */
  images_dead = [
    "assets/images/2_character_pepe/5_dead/D-51.png",
    "assets/images/2_character_pepe/5_dead/D-52.png",
    "assets/images/2_character_pepe/5_dead/D-53.png",
    "assets/images/2_character_pepe/5_dead/D-54.png",
    "assets/images/2_character_pepe/5_dead/D-55.png",
    "assets/images/2_character_pepe/5_dead/D-56.png",
    "assets/images/2_character_pepe/5_dead/D-57.png",
  ];

  /** @type {World} - Reference to the game world instance */
  world;
  
  /**
   * Creates a new Character instance.
   * Loads all image assets and initializes animations and physics.
   * @constructor
   */
  constructor() {
    super().loadImage("assets/images/2_character_pepe/1_idle/idle/I-10.png");
    this.loadImages(this.images_idle);
    this.loadImages(this.images_long_idle);
    this.loadImages(this.images_walking);
    this.loadImages(this.images_jumping);
    this.loadImages(this.images_hurt);
    this.loadImages(this.images_dead);
    this.getRealFrame();
    this.applyGravity();
    this.animate();
  }

  /**
   * Calculates how long the character has been inactive.
   * @returns {number} Time in seconds since last movement
   */
  wasInactive() {
    return (new Date().getTime() - this.lastMove) / 1000;
  }

  /**
   * Main animation controller that starts all animation loops.
   * Coordinates visual animations, movement, and state changes.
   */
  animate() {
    this.animateVisuals();
    this.animateMovement();
    this.animateStates();
  }

  /**
   * Handles visual sprite animations based on character state.
   * Manages idle, walking, and state-specific animations.
   * Runs every 120ms for smooth animation.
   */
  animateVisuals() {
    gameIntervals(() => {
      const k = this.world.keyboard;
      const inactive = this.wasInactive();
      const isMoving = k.right || k.left;

      if (this.isDead() || this.ishurt() || this.isJumping) return;

      if (isMoving) {
        this.lastMove = new Date().getTime();
        this.playAnimation(this.images_walking);
      } else {
        if (inactive < 6) {
          this.playAnimation(this.images_idle, 160);
        } else {
          this.playAnimation(this.images_long_idle, 160);
        }
      }
    }, 120); 
  }

  /**
   * Handles character movement and camera positioning.
   * Processes keyboard input for left/right movement and jumping.
   * Runs at 20 FPS (50ms intervals) for smooth movement.
   */
  animateMovement() {
    gameIntervals(() => {
      if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
        this.moveRight();
      }
      if (this.world.keyboard.left && this.x > 66) {
        this.moveLeft();
        this.otherDirection = true;
      }
      if (this.world.keyboard.space && !this.isAboveGround()) {
        this.jump();
      }
      this.world.cameraX = -this.x + 60;
    }, 1000 / 20);
  }

  /**
   * Manages character state animations (dead, hurt, jumping).
   * Handles special animations that override normal movement animations.
   * Runs every 200ms to check state changes.
   */
  animateStates() {
    gameIntervals(() => {
      if (this.isDead()) {
        this.handleDeathAnimation();
      } else if (this.ishurt()) {
        this.playAnimation(this.images_hurt);
      } else if (this.isJumping) {
        this.handleJumpAnimation();
      }
    }, 200);
  }

  /**
   * Handles the character's death animation sequence.
   * Plays death animation, stops character sounds, plays game over sound,
   * and triggers the game lose state.
   */
  handleDeathAnimation() {
    this.playAnimationOnce(this.images_dead);
    AudioHub.stopOne(AudioHub.pepeSound);
    AudioHub.playOne(AudioHub.youlooseSound);
    gameLoose();
  }

  /**
   * Manages the jumping animation sequence.
   * Handles both ascending and landing phases of the jump.
   * Ensures animation only plays once per jump cycle.
   */
  handleJumpAnimation() {
    if (this.speedY > 0) {
      if (!this.isAnimating) {
        this.isAnimating = true;
        this.playAnimationOnce(this.images_jumping, 120);
      }
    }
    if (!this.isAboveGround()) {
      this.isJumping = false; // Sprung beendet
      this.isAnimating = false;
    }
  }

  /**
   * Initiates a jump if the character is not already jumping.
   * Sets vertical speed and triggers jump animation.
   * Prevents double jumping by checking jump state.
   */
  jump() {
    if (!this.isJumping) {
      this.speedY = 26;
      this.isJumping = true;
      this.playAnimationOnce(this.images_jumping, 80);
    }
  }

  /**
   * Starts the character's animation loops.
   * Used to initialize or restart character animations.
   * @deprecated Use animate() directly instead
   */
  startAnimation() {
    this.animate();
  }
}
