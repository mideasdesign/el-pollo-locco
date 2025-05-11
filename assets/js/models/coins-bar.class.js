class CoinsBar extends StatusBar {
    constructor() {
      super();
      this.images = [
        'assets/images/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'assets/images/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'assets/images/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'assets/images/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'assets/images/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'assets/images/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
      ];
      this.loadImages(this.images);
      this.img = this.imageCache[this.images[0]];
      this.x = 200;
      this.y = 10;
      this.width = 120;
      this.height = 40;
      this.setPercentage(0);
    }
  }
