class MovableObject extends DrawableObject {
  x = 100;
  y = 100;
  img;
  width = 100;
  height = 250;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  acceleration = 2;
  offsetX = 0;
  offsetY = 0;
  lastHit = 0;

  applyGravity() {
    gameIntervals(() => {
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
  if (!images || images.length === 0) return;
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
  };

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  };

  moveLeft() {
    this.x -= this.speed;
  };

  jump() {
    this.speedY = 22;
  };

  isColliding(mo) {
    return this.rX + this.rW > mo.rX && 
    this.rY + this.rH > mo.rY && 
    this.rX < mo.rX + mo.rW && 
    this.rY < mo.rY + mo.rH;
  }; 

  hitPepe() {
    this.healthPepe -= 4;
    if (this.healthPepe < 0) {
      this.healthPepe = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  };

  hitBoss() {
    this.healthBoss -= 4;
    if (this.healthBoss < 0) {
    this.healthBoss = 0;
    } else {
    this.lastHit = new Date().getTime();
    }
  };

  ishurt() {
    let timespassed = new Date().getTime() - this.lastHit;
    timespassed = timespassed / 1000;
    return timespassed < 0.8;
  }

  isDead() {
    return this.healthPepe == 0 || this.healthBoss == 0 || this.enemy == 0 || this.chick == 0;
  }
}
