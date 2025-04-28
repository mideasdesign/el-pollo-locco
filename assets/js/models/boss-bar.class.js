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
    this.x = 190;
    this.y = 10;
    this.width = 150;
    this.height = 40;
    this.setPercentage(0);
  }
}