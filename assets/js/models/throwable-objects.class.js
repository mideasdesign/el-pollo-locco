class ThrowableObject extends MovableObject {
 height = 70;
 width = 50;
 offset = {
  top: 7,
  right: 10,
  bottom: 6,
  left: 5,
};
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
    this.loadImages(this.images_rotating_bottle);
    this.loadImages(this.images_splash);
    this.throw(x, y);
    this.animate();
  };

  animate(){
    gameIntervals(() => {
      this.x += 20; 
      this.playAnimation(this.images_rotating_bottle);
    },80);

}

  throw(x, y){
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 50;
    this.speedY = 25;
    this.getRealFrame();
    this.applyGravity();
    this.animate();
  };

splash() {
  if (this.hasHit) return;
  this.hasHit = true;
  this.isSplashing = true;
  this.speedY = 0;
  this.speed = 0;
  let splashAnimation = gameIntervals(() => {
    this.playAnimation(this.images_splash);
  }, 80);

  setTimeout(() => {
    clearInterval(splashAnimation);
    let index = world.throwableObject.indexOf(this);
    if (index > -1) {
      world.throwableObject.splice(index, 1);
    }
  }, this.images_splash.length * 30);
}

}
