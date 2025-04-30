class BossBar extends StatusBar {
  constructor() {
    super();
    this.images = [
      'assets/images/7_statusbars/2_statusbar_endboss/orange/orange0.png',
      'assets/images/7_statusbars/2_statusbar_endboss/orange/orange20.png',
      'assets/images/7_statusbars/2_statusbar_endboss/orange/orange40.png',
      'assets/images/7_statusbars/2_statusbar_endboss/orange/orange60.png',
      'assets/images/7_statusbars/2_statusbar_endboss/orange/orange80.png',
      'assets/images/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];
    this.loadImages(this.images);
    this.img = this.imageCache[this.images[5]];
    this.x = 510;
    this.y = 13;
    this.width = 140;
    this.height = 40;
    this.setPercentage(100);
  }
}