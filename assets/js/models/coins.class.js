/**
 * Collectible coin objects that provide score and progression tracking.
 * Coins are strategically placed throughout the level to encourage exploration.
 * They feature a spinning animation to attract player attention.
 * @extends MovableObject
 */
class Coins extends MovableObject {
  /** @type {number} - Width of the coin sprite */
  width = 70;
  /** @type {number} - Height of the coin sprite */
  height = 70;
  /** 
   * @type {Object} - Collision box offset for collection detection
   * @property {number} top - Top offset
   * @property {number} right - Right offset  
   * @property {number} bottom - Bottom offset
   * @property {number} left - Left offset
   */
  offset = {
    top: 20,
    right: 60,
    bottom: 20,
    left: 20
  };
  /** @type {number} - Current coin level/state (unused) */
  coinsLevel = 0;

  /** @type {string[]} - Array of coin image frames for spinning animation */
  images_coins = [
    'assets/images/8_coin/coin_1.png',  // Coin frame 1 (spinning animation)
    'assets/images/8_coin/coin_2.png'   // Coin frame 2 (spinning animation)
  ];

  /**
   * Creates a new Coins instance at specified position.
   * Sets up spinning animation and collision detection.
   * @param {number} x - X position of the coin
   * @param {number} y - Y position of the coin
   */
  constructor(x, y) {
    super().loadImage('assets/images/8_coin/coin_1.png');
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 70;
    this.loadImages(this.images_coins);
    this.getRealFrame();
    this.animate();
  }

  /**
   * Starts the coin's spinning animation.
   * Creates an attractive visual effect by cycling through coin frames.
   * Animation runs every 200ms for a smooth spinning effect.
   */
  animate() {
    gameIntervals(() => {
      this.playAnimation(this.images_coins);
    }, 200);  // Spin every 200ms for attractive effect
  }

  /**
   * Calculates collision frame for coins using original formula.
   * Coins need larger collision boxes for easier collection.
   */
  getRealFrame() {
    this.rX = this.x + this.offset.left;
    this.rY = this.y + this.offset.top;
    this.rW = this.width + this.offset.left - this.offset.right;
    this.rH = this.height - this.offset.top - this.offset.bottom;
  }
}