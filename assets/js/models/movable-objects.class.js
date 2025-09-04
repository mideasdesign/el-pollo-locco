/**
 * Base class for all movable game objects.
 * Provides common functionality for movement, animation, physics, and collision detection.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  /** @type {number} - X position in the game world */
  x = 100;

  /** @type {number} - Y position in the game world */
  y = 100;

  /** @type {HTMLImageElement} - Current image being displayed */
  img;

  /** @type {number} - Width of the object */
  width = 100;

  /** @type {number} - Height of the object */
  height = 250;

  /** @type {Object.<string, HTMLImageElement>} - Cache of loaded images */
  imageCache = {};

  /** @type {number} - Current frame index for animations */
  currentImage = 0;

  /** @type {number} - Horizontal movement speed */
  speed = 0.23;

  /** @type {number} - Gravity acceleration value */
  acceleration = 2;

  /** @type {number} - X offset for positioning (unused) */
  offsetX = 0;

  /** @type {number} - Y offset for positioning (unused) */
  offsetY = 0;

  /** @type {number} - Timestamp of last hit for damage cooldown */
  lastHit = 0;

  /**
   * Applies gravity physics to the object.
   * Makes objects fall when above ground level.
   * Runs at 40 FPS (25ms intervals) for smooth physics.
   */
  applyGravity() {
    gameIntervals(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground level.
   * Special handling for ThrowableObject which always falls.
   * @returns {boolean} True if object is above ground level (y < 180)
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  /**
   * Plays an animation by cycling through an array of images.
   * Automatically loops when reaching the end of the image array.
   * @param {string[]} images - Array of image paths for the animation
   */
  playAnimation(images) {
    if (!images || images.length === 0) return;
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Flips the object horizontally for rendering in opposite direction.
   * Modifies the canvas transformation matrix and object position.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
   */
  changeDirection(ctx) {
    ctx.save();
    ctx.translate(this.width, 0);
    ctx.scale(-1, 1);
    this.x = this.x * -1;
  }

  /**
   * Moves the object to the right.
   * Updates position and sets direction flag.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the object to the left.
   * Updates position by subtracting speed from x coordinate.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting upward velocity.
   * Sets speedY to 24 for upward movement against gravity.
   */
  jump() {
    this.speedY = 24;
  }

  /**
   * Checks collision between this object and another movable object.
   * Uses rectangular collision detection with real frame boundaries.
   * @param {MovableObject} mo - The other movable object to check collision with
   * @returns {boolean} True if objects are colliding
   */
  isColliding(mo) {
    return (
      this.rX + this.rW > mo.rX &&
      this.rY + this.rH > mo.rY &&
      this.rX < mo.rX + mo.rW &&
      this.rY < mo.rY + mo.rH
    );
  }

  /**
   * Reduces Pepe's health when hit by an enemy.
   * Applies 4 damage points and sets hit timestamp for hurt animation.
   * Ensures health doesn't go below 0.
   */
  hitPepe() {
    this.healthPepe -= 4;
    if (this.healthPepe < 0) {
      this.healthPepe = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Reduces boss health when hit by a throwable object.
   * Applies 4 damage points and sets hit timestamp for hurt animation.
   * Ensures health doesn't go below 0.
   */
  hitBoss() {
    this.healthBoss -= 4;
    if (this.healthBoss < 0) {
      this.healthBoss = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is currently in hurt state.
   * Object is hurt for 0.8 seconds after being hit.
   * @returns {boolean} True if object was hit within the last 0.8 seconds
   */
  ishurt() {
    let timespassed = new Date().getTime() - this.lastHit;
    timespassed = timespassed / 1000;
    return timespassed < 0.8;
  }

  /**
   * Checks if the object is dead (health reached 0).
   * Covers all possible health properties: Pepe, Boss, enemies, and chicks.
   * @returns {boolean} True if any health value equals 0
   */
  isDead() {
    return (
      this.healthPepe == 0 ||
      this.healthBoss == 0 ||
      this.enemy == 0 ||
      this.chick == 0
    );
  }
}
