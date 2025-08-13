/**
 * Player health bar UI element that displays current health status.
 * Shows an orange-colored bar indicating player's remaining health points.
 * Updates dynamically as the player takes damage or heals.
 * @extends StatusBar
 */
class HealthBar extends StatusBar {
  /**
   * Creates a new HealthBar instance.
   * Initializes with health bar images and positions in the top-left UI area.
   * @constructor
   */
  constructor() {
    super();
    /** @type {string[]} - Array of image paths for different health levels */
    this.images = [
      'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',    // 0% health (critical)
      'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',   // 20% health (low)
      'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',   // 40% health (medium-low)
      'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',   // 60% health (medium)
      'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',   // 80% health (high)
      'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'   // 100% health (full)
    ];
    this.loadImages(this.images);
    this.img = this.imageCache[this.images[5]];  // Start with full health
    this.x = 20;       // Position slightly to the right of edge
    this.y = 10;       // Top margin
    this.width = 150;  // Bar width
    this.height = 40;  // Bar height
    this.setPercentage(100);  // Initialize with full health
  }
}