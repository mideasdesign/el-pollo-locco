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
      'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
      'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
      'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
      'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
      'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
      'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];
    
    this.loadImages(this.images);
    this.img = this.imageCache[this.images[5]];
    this.x = 20;
    this.y = 10;
    this.width = 150;
    this.height = 40;
    this.setPercentage(100);
  }
}