class HealthBar extends StatusBar {
  constructor() {
    super();
    this.images = [
      'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
      'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
      'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
      'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
      'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
      'assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];
    this.loadImages(this.images);
    this.img = this.imageCache[this.images[5]];
    this.x = 20;  // ← HealthBar sitzt etwas weiter rechts
    this.y = 10;
    this.width = 150;
    this.height = 40;
    this.setPercentage(100);
  }
}