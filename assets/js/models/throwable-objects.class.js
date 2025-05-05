class ThrowableObject extends MovableObject {
  height = 70;
  width = 50;
  images_rotating_bottle = [
    'assets/images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'assets/images/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'assets/images/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'assets/images/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png'
];

images_splash = [
  'assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
  'assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
  'assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
  'assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
  'assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
  'assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
];

  constructor(x, y) {
    super()
    this.loadImage('assets/images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.loadImages(this.images_rotating_bottle); 
    this.x = 100;
    this.y = 100;
    this.animate();

  };

  animate(){
    setInterval(() => {
      this.x += 24; 
        this.playAnimation(this.images_rotating_bottle);
    }, 1000 / 20);
}

  throw(x, y){
    this.x = x;
    this.y = y;
    this.speedY = 30;
    this.applyGravity();
    this.animate();
  };
}
