class ThrowableObject extends MovableObject {

  otherDirection = false;
  images_rotaiting_bottle = [
      'assets/images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
      'assets/images/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
      'assets/images/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
      'assets/images/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png'
  ];
  currentImage = 0;
  constructor(x, y) {
    super().loadImage('assets/images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.x = 100;
    this.y = 100;
    this.loadImages(this.images_rotaiting_bottle);
    this.animate();
    this.throw(100, 300);

    

  };
  animate(){
    setInterval(() => {
      this.x += 30;
      this.playAnimation(this.images_rotaiting_bottle);
  }, 100);
  }

  throw(x, y){
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width= 90;
    this.speedY = 20;
    this.applyGravity();
    this.animate();
  };
}