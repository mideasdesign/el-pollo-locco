/**
 * Boss health bar UI element that displays the end boss's remaining health.
 * Shows an orange-colored health bar in the top-right corner during boss fights.
 * Updates dynamically as the boss takes damage.
 * @extends StatusBar
 */
class BossBar extends StatusBar {

  /**
   * Creates a new BossBar instance.
   * Initializes with orange health bar images and positions in top-right corner.
   * @constructor
   */
  constructor() {
    super();
    /** @type {string[]} - Array of image paths for different health levels (0-100%) */
    this.images = [
      'assets/images/7_statusbars/2_statusbar_endboss/orange/orange0.png',    // 0% health
      'assets/images/7_statusbars/2_statusbar_endboss/orange/orange20.png',   // 20% health
      'assets/images/7_statusbars/2_statusbar_endboss/orange/orange40.png',   // 40% health
      'assets/images/7_statusbars/2_statusbar_endboss/orange/orange60.png',   // 60% health
      'assets/images/7_statusbars/2_statusbar_endboss/orange/orange80.png',   // 80% health
      'assets/images/7_statusbars/2_statusbar_endboss/orange/orange100.png'   // 100% health
    ];
    this.loadImages(this.images);
    this.img = this.imageCache[this.images[5]];  // Start with full health
    this.x = 510;      // Top-right position
    this.y = 13;       // Top margin
    this.width = 120;  // Bar width
    this.height = 40;  // Bar height
    this.setPercentage(100);  // Initialize with full health

  }

  /**
   * Updates the boss health bar to reflect current health percentage.
   * Automatically selects the appropriate image based on health level.
   * @param {number} percentage - Health percentage (0-100)
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves which image index to use based on current health percentage.
   * Returns appropriate array index for the health bar image.
   * @returns {number} Image array index (0-5) corresponding to health level
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}