class BossBar extends StatusBar {
  constructor() {
    super();
    this.images = [
      'assets/images/7_statusbars/2_statusbar_endboss/orange/0.png',
      'assets/images/7_statusbars/2_statusbar_endboss/orange/20.png',
      'assets/images/7_statusbars/2_statusbar_endboss/orange/40.png',
      'assets/images/7_statusbars/2_statusbar_endboss/orange/60.png',
      'assets/images/7_statusbars/2_statusbar_endboss/orange/80.png',
      'assets/images/7_statusbars/2_statusbar_endboss/orange/100.png'
    ];
    this.loadImages(this.images);
    this.img = this.imageCache[this.images[5]];
    this.x = 15;
    this.y = 120;
    this.width = 200;
    this.height = 50;
    this.setPercentage(0);
  }
}