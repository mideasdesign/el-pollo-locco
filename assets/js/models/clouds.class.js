class Clouds extends MovableObject {
  width = 1580;
  height = 450;
  speed = 0.35;
  constructor(imagePath, x){
    super().loadImage(imagePath);
    this.x = x;
    this.y = 400 - this.height;
    this.animate();
}

  animate(){
    setInterval(() => {
        this.moveLeft();
    }, 1000 / 30);
}
}
