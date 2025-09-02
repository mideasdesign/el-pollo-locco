/**
 * Throwable bottle objects that serve as projectile weapons.
 * Players can throw bottles at enemies to defeat them.
 * Features rotation animation during flight and splash animation on impact.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  /** @type {number} - Height of the throwable bottle sprite */
  height = 70;
  /** @type {number} - Width of the throwable bottle sprite */
  width = 50;
  /** 
   * @type {Object} - Collision box offset for impact detection
   * @property {number} top - Top offset
   * @property {number} right - Right offset  
   * @property {number} bottom - Bottom offset
   * @property {number} left - Left offset
   */
  offset = {
    top: 7,
    right: 10,
    bottom: 6,
    left: 5,
  };

  /** @type {string[]} - Array of bottle rotation images for flight animation */
  images_rotating_bottle = [
    'assets/images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'assets/images/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'assets/images/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'assets/images/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png'
  ];

  /** @type {string[]} - Array of splash images for impact animation */
  images_splash = [
    'assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'

  ];

  /**
   * Creates a new ThrowableObject at specified position.
   * Initializes with rotation animation and physics properties.
   * @param {number} x - Starting X position (usually character position)
   * @param {number} y - Starting Y position (usually character position)
   */
  constructor(x, y) {
    super().loadImage('assets/images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.loadImages(this.images_rotating_bottle);
    this.loadImages(this.images_splash);
    this.throw(x, y);
    this.animate();
  };

  /**
   * Animates the bottle rotation during flight.
   * Moves the bottle horizontally and plays rotation animation at 80ms intervals.
   */
  animate() {
    gameIntervals(() => {
      this.x += 20;
      this.playAnimation(this.images_rotating_bottle);
    }, 80);

  };

  /**
   * Initializes the throwing motion with physics properties.
   * Sets position, dimensions, upward velocity and applies gravity.
   * @param {number} x - Starting X coordinate for the throw
   * @param {number} y - Starting Y coordinate for the throw
   */
  throw(x, y) {
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 50;
    this.speedY = 25;
    this.getRealFrame();
    this.applyGravity();
    this.animate();
  };

  /**
   * Handles bottle impact animation and cleanup.
   * Stops movement, plays splash animation, and removes bottle from world.
   * Prevents multiple splash animations with hasHit flag.
   */
  splash() {
    if (this.hasHit) return;
    this.hasHit = true;
    this.isSplashing = true;
    this.speedY = 0;
    this.speed = 0;
    let splashAnimation = gameIntervals(() => {
      this.playAnimation(this.images_splash);
    }, 80);

    setTimeout(() => {
      clearInterval(splashAnimation);
      let index = world.throwableObject.indexOf(this);
      if (index > -1) {
        world.throwableObject.splice(index, 1);
      }
    }, this.images_splash.length * 30);
  };

};
