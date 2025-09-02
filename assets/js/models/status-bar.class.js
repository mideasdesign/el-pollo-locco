/**
 * Base status bar class for displaying player health and other metrics.
 * Provides the foundation for all UI bars (health, coins, bottles, boss health).
 * Uses percentage-based system to determine which image to display.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  /** @type {number} - Current percentage value (0-100) */
  percentage = 100;

  /** @type {string[]} - Array of health bar images for different health levels */
  images = [
    'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
    'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
    'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
    'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
    'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
    'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
  ];

  /**
   * Creates a new StatusBar instance.
   * Initializes with health bar images and positions in top-left corner.
   * @constructor
   */
  constructor() {
    super();
    this.loadImages(this.images);
    this.x = 40;
    this.y = 10;
    this.width = 120;
    this.height = 40;
    this.setPercentage(100);
  }

  /**
   * Updates the status bar percentage and changes the displayed image.
   * Automatically selects the appropriate image based on the percentage value.
   * @param {number} percentage - The new percentage value (0-100)
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines which image index to use based on current percentage.
   * Maps percentage ranges to specific image indices for visual feedback.
   * @returns {number} Image array index (0-5) corresponding to percentage range
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
