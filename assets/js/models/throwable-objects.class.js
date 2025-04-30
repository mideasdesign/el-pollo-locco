class ThrowableObject extends MovableObject {

  otherDirection = false;
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
  currentImage = 0;
  constructor(x, y) {
    super().loadImage(this.images_rotating_bottle[0]);
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 50;
    this.loadImages(this.images_rotating_bottle);
    this.loadImages(this.images_splash);
    this.animate();
    this.throw(100, 300);
/*     this.splashSound = new Audio('assets/audio/bottle-splash.mp3'); */

  };

animate() {
  let interval = setInterval(() => {
    if (this.isColliding(world.endboss) && !this.isAnimating) {
      this.isAnimating = true;
      this.speed = 0;
      this.speedY = 0;
/*       this.splashSound.play(); */
      this.playAnimationOnce(this.images_splash, 80);
      clearInterval(interval);
      setTimeout(() => {
        const index = world.thowableObject.indexOf(this);
        if (index > -1) {
          world.thowableObject.splice(index, 1);
        }
      }, this.images_splash.length * 80 + 100);
    } else if (!this.isAnimating) {
      this.x += 10;
      this.playAnimation(this.images_rotating_bottle);
    }
  }, 1000 / 24);
}

  throw(x, y){
    this.x = x;
    this.y = y;
    this.speedY = 20;
    this.speed = 30;
    this.applyGravity();
    this.animate();
  };
}