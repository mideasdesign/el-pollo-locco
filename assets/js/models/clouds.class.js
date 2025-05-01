class Clouds extends MovableObject {
  width = 1900;
  height = 300;
  speed = 0.15;

  constructor() {
    super().loadImage("assets/images/5_background/layers/4_clouds/full.png");
    this.x = 10 + Math.random() * 50;
    this.y = 50;

  }
}
