/**
 * Bottle counter UI element that displays collected bottles for throwing.
 * Shows an orange-colored bar indicating how many bottles the player has collected.
 * Bottles serve as ammunition for attacking enemies.
 * @extends StatusBar
 */
class BottlesBar extends StatusBar {
  /**
   * Creates a new BottlesBar instance.
   * Initializes with bottle counter images and positions in the top UI area.
   * @constructor
   */
  constructor() {
    super();
    /** @type {string[]} - Array of image paths for different bottle count levels */
    this.images = [
      'assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',    // 0 bottles
      'assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',   // 1-2 bottles
      'assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',   // 3-4 bottles
      'assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',   // 5-6 bottles
      'assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',   // 7-8 bottles
      'assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'   // 9+ bottles
    ];
    this.loadImages(this.images);
    this.img = this.imageCache[this.images[0]];  // Start with no bottles
    this.x = 360;      // Position in top UI
    this.y = 10;       // Top margin
    this.width = 120;  // Bar width
    this.height = 40;  // Bar height
    this.setPercentage(0);  // Initialize with no bottles
  }
}
