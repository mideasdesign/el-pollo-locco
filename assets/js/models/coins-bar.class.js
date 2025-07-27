/**
 * Coin counter UI element that displays collected coins.
 * Shows an orange-colored bar indicating the player's coin collection progress.
 * Coins serve as collectible items that contribute to the player's score.
 * @extends StatusBar
 */
class CoinsBar extends StatusBar {
    /**
     * Creates a new CoinsBar instance.
     * Initializes with coin counter images and positions in the top UI area.
     * @constructor
     */
    constructor() {
      super();
      /** @type {string[]} - Array of image paths for different coin count levels */
      this.images = [
        'assets/images/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',    // 0 coins
        'assets/images/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',   // 20% of coins
        'assets/images/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',   // 40% of coins
        'assets/images/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',   // 60% of coins
        'assets/images/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',   // 80% of coins
        'assets/images/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'   // All coins collected
      ];
      this.loadImages(this.images);
      this.img = this.imageCache[this.images[0]];  // Start with no coins
      this.x = 200;      // Position in top UI area
      this.y = 10;       // Top margin
      this.width = 120;  // Bar width
      this.height = 40;  // Bar height
      this.setPercentage(0);  // Initialize with no coins
    }
  }
