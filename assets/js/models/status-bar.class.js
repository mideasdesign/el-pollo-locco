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
    'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',    // 0% health (empty)
    'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',   // 20% health
    'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',   // 40% health
    'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',   // 60% health
    'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',   // 80% health
    'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',  // 100% health (full)
  ];

  /**
   * Creates a new StatusBar instance.
   * Initializes with health bar images and positions in top-left corner.
   * @constructor
   */
  constructor() {
    super();
    this.loadImages(this.images);
    this.x = 40;       // Top-left position
    this.y = 10;        // Top margin
    this.width = 120;   // Bar width
    this.height = 40;   // Bar height
    this.setPercentage(100);  // Start with full health
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

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
