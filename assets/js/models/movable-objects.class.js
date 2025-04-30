class MovableObject extends DrawableObject {
  x = 100;
  y = 100;
  img;
  width = 100;
  height = 250;
  imageCache = {};
  currentImage = 0;
  speed = 0.25;
  speedY = 0;
  acceleration = 2;
  offsetX = 0;
  offsetY = 0;
  energyLevel = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject){ //ThowableOblject always fall!
      return true;
    }else{
      return this.y < 180;
    };
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  changeDirection(ctx) {
    ctx.save();
    ctx.translate(this.width, 0);
    ctx.scale(-1, 1);
    this.x = this.x * -1;
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 24;
  }

  playAnimationOnce(images, frameRate = 110) {
    if (this.isAnimating) return;

    this.isAnimating = true;
    let i = 0;

    const step = () => {
        if (i < images.length) {
            this.img = this.imageCache[images[i]];
            i++;
            setTimeout(step, frameRate);
        } else {
            this.isAnimating = false;
        }
    };

    step();
}

  isColliding(mo) {
    return this.x + this.width >= mo.x && 
    this.x <= mo.x + mo.width && 
    this.y + this.offsetY + this.height >= mo.y && 
    this.y + this.offsetY <= mo.y + mo.height;
  }
  isCollidingBoss(mo) {
    return this.rX + this.rW >= mo.rX && 
    this.rY + this.rH >= mo.rY && 
    this.rX < mo.rX + mo.rW &&
    this.rY < this.rY >= mo.rH 
  }

  hit() {
    this.energyLevel -= 4;
    if (this.energyLevel < 0) {
      this.energyLevel = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  ishurt() {
    let timespassed = new Date().getTime() - this.lastHit;
    timespassed = timespassed / 1000;
    return timespassed < 0.5;
  }

  isDead() {
    return this.energyLevel == 0;

  }
}
