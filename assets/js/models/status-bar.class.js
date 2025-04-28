class StatusBar extends DrawableObject {
  percentage = 100;

  images = [
    "assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
    "assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
  ];
  constructor() {
    super();
    this.loadImages(this.images);
    this.x = 10;
    this.y = 10;
    this.width = 140;
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
