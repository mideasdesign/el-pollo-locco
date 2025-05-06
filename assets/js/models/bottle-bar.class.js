class BottlesBar extends StatusBar {
  constructor() {
    super();
    this.images = [
      'assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
      'assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
      'assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
      'assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
      'assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
      'assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];
    this.loadImages(this.images);
    this.img = this.imageCache[this.images[0]];
    this.x = 330;
    this.y = 10;
    this.width = 150;
    this.height = 40;
    this.setPercentage(0);
  }
}
