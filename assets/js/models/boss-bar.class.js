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
    this.width = 120;
    this.height = 40;
    this.setPercentage(100);
   
  }
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}