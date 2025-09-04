/**
 * Represents a background object for creating parallax scrolling effects.
 * Background objects are static decorative elements that create depth and atmosphere.
 * Multiple layers can be used together to create a rich visual environment.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
  /** @type {number} - Width of the background element (720px for seamless tiling) */
  width = 720;

  /** @type {number} - Height of the background element (full canvas height) */
  height = 480;

  /**
   * Creates a new BackgroundObject instance.
   * Positions the background element at the bottom of the canvas.
   * @param {string} imagePath - Path to the background image file
   * @param {number} x - X position where this background section should be placed
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
