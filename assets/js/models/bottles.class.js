/**
 * Collectible bottle objects that serve as ammunition for the player.
 * Bottles can be picked up by the player and thrown at enemies.
 * They are placed throughout the level at ground level for easy collection.
 * @extends MovableObject
 */
class Bottles extends MovableObject {
  /** @type {number} - Width of the bottle sprite */
  width = 70;

  /** @type {number} - Height of the bottle sprite */
  height = 90;

  /**
   * @type {Object} - Collision box offset for precise collection detection
   * @property {number} top - Top offset
   * @property {number} right - Right offset
   * @property {number} bottom - Bottom offset
   * @property {number} left - Left offset
   */
  offset = {
    top: 17,
    right: 57,
    bottom: 10,
    left: 28,
  };

  /** @type {number} - Current bottle level/state (unused) */
  bottlesLevel = 0;
  /** @type {string[]} - Array of bottle image variations for visual diversity */
  images_bottles = [
    "assets/images/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "assets/images/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates a new Bottles instance at specified position.
   * Loads bottle images and sets up collision detection.
   * @param {number} x - X position of the bottle
   * @param {number} y - Y position of the bottle
   */
  constructor(x, y) {
    super().loadImage(
      "assets/images/6_salsa_bottle/1_salsa_bottle_on_ground.png"
    );
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 90;
    this.getRealFrame();
    this.loadImages(this.images_bottles);
  }

  /**
   * Calculates collision frame for bottles using original formula.
   * Bottles need larger collision boxes for easier collection.
   */
  getRealFrame() {
    this.rX = this.x + this.offset.left;
    this.rY = this.y + this.offset.top;
    this.rW = this.width + this.offset.left - this.offset.right;
    this.rH = this.height - this.offset.top - this.offset.bottom;
  }
}
