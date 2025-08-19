/**
 * Cloud objects that create atmospheric background movement.
 * Clouds slowly drift from right to left to enhance the visual depth.
 * Multiple clouds are positioned across the level for continuous atmosphere.
 * @extends MovableObject
 */
class Clouds extends MovableObject {
  /** @type {number} - Width of the cloud sprite (very wide for coverage) */
  width = 1580;
  /** @type {number} - Height of the cloud sprite */
  height = 450;
  /** @type {number} - Slow movement speed for realistic cloud drift */
  speed = 0.35;

  /**
   * Creates a new Clouds instance at specified position.
   * Positions cloud in the sky area and starts drifting animation.
   * @param {string} imagePath - Path to the cloud image file
   * @param {number} x - Initial X position of the cloud
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 400 - this.height;  // Position in sky area (negative Y)
    this.animate();
  }

  /**
   * Starts the cloud's slow drift animation.
   * Moves clouds continuously left at 30 FPS for smooth motion.
   */
  animate() {
    gameIntervals(() => {
      this.moveLeft();
    }, 1000 / 30);  // 30 FPS for smooth cloud movement
  }
}
