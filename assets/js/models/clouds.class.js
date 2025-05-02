class Clouds extends MovableObject {
  width = 1900;
  height = 300;
  speed = 0.25;

  constructor() {
    super().loadImage("assets/images/5_background/layers/4_clouds/full.png");
    this.x = 0;
    this.y = 10 + Math.random() * 2;
    this.animate();
  }

  animate(){
    setInterval(() => {
        this.moveLeft();
    }, 1000 / 12);
  }
}
