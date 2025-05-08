class ThrowableObject extends MovableObject {
 offset ={
  top: 5,
  right: 5,
  bottom: 7,
  left: 10
 }
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
    super().loadImage('assets/images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.height = 70;
    this.width = 50;
    this.loadImages(this.images_rotating_bottle);
    this.throw(x, y);
  };

  animate(){
    setInterval(() => {
      this.x += 15; 
        this.playAnimation(this.images_rotating_bottle);
    }, 1000 / 24);
}

  throw(x, y){
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 50;
    this.speedY = 30;
    this.getRealFrame();
    this.applyGravity();
    this.animate();
  };

}
