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
      "assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
      "assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
      "assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
      "assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
      "assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
      "assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
    ];

    this.loadImages(this.images);
    this.img = this.imageCache[this.images[0]];
    this.x = 360;
    this.y = 10;
    this.width = 120;
    this.height = 40;
    this.setPercentage(0);
  }
}
