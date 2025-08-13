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
    if (this instanceof ThrowableObject){ //ThowableOblject always fall!
      return true;
    }else{
      return this.y < 180;
    };
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
};

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
  };

  /**
   * Moves the object to the right.
   * Updates position and sets direction flag.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  };

  moveLeft() {
    this.x -= this.speed;
  };

  jump() {
    this.speedY = 24;
  };

  isColliding(mo) {
    return this.rX + this.rW > mo.rX && 
    this.rY + this.rH > mo.rY && 
    this.rX < mo.rX + mo.rW && 
    this.rY < mo.rY + mo.rH;
  }; 

  hitPepe() {
    this.healthPepe -= 4;
    if (this.healthPepe < 0) {
      this.healthPepe = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  };

  hitBoss() {
    this.healthBoss -= 4;
    if (this.healthBoss < 0) {
    this.healthBoss = 0;
    } else {
    this.lastHit = new Date().getTime();
    }
  };

  ishurt() {
    let timespassed = new Date().getTime() - this.lastHit;
    timespassed = timespassed / 1000;
    return timespassed < 0.8;
  };

  isDead() {
    return this.healthPepe == 0 || this.healthBoss == 0 || this.enemy == 0 || this.chick == 0;
  };
}
