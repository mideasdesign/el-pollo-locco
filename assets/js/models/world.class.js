class World {
  character = new Character();
  statusBar = new StatusBar();
  coinsBar = new CoinsBar();
  bottlesBar = new BottlesBar();
  bossBar = new BossBar();
  throwableObject = []; 
  endboss = new Endboss();
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  level = level1;
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    touchBtn();
    this.draw();
    this.setWorld();  
    this.checkCollisionsFromTop();
    this.checkCollisionChicksFromTop();
    this.checkCollisionsPepe();
    this.checkCollisionsBoss();
    this.checkThrowableObject();
    this.run();
  };

  setWorld() {
    this.character.world = this;
    this.character.startAnimation();
  };


  run() {
    gameIntervals(() => {
      this.checkCollisionsPepe(); 
      this.checkCollisionsBoss();
      this.checkThrowableObject();
      this.checkCollectibles();
    }, 100);
  };

  checkCollisionsFromTop(){
    gameIntervals(() => {
      this.level.enemies.forEach((enemy, index) => {
        if (this.character.isAboveGround() && this.character.speedY < 0 && this.character.isColliding(enemy) ){
          enemy.isDead();
          enemy.speed = 0;
          AudioHub.playOne(AudioHub.chickenSound);
          this.level.enemies.splice(index, 1);
        }
      });
    }, 30);
  };

  checkCollisionChicksFromTop(){
    gameIntervals(() => {
      this.level.chicks.forEach((chick, index) => {
        if (this.character.isAboveGround() && this.character.speedY < 0 && this.character.isColliding(chick) ){
          chick.isDead();
          chick.speed = 0;
        AudioHub.playOne(AudioHub.chicksSound);
          this.level.chicks.splice(index, 1);
        }
      });
    }, 30);
  };

  checkCollisionChicksFromTop(){
    gameIntervals(() => {
      this.level.chicks.forEach((chick, index) => {
        if (this.character.isAboveGround() && this.character.speedY < 0 && this.character.isColliding(chick) ){
          chick.isDead();
          chick.speed = 0;
         AudioHub.playOne(AudioHub.chicksSound);
          this.level.chicks.splice(index, 1);
        }
      });
    }, 50);
  }
 
  checkCollisionsPepe(){
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hitPepe();
        AudioHub.playOne(AudioHub.pepeSound);
        this.statusBar.setPercentage(this.character.healthPepe);
      }
    });
  };

  checkThrowableObject(){
    if (this.keyboard.t && this.bottlesBar.percentage > 0) {
      let x = this.character.rX + this.character.rW / 2.60;
      let y = this.character.rY + this.character.rH / 2.60;
      let bottle = new ThrowableObject(x, y);
      this.throwableObject.push(bottle); 
      this.bottlesBar.setPercentage(this.bottlesBar.percentage - 10);
    }
   
  };

  checkCollisionsBoss(){
    this.throwableObject.forEach((bottle) => {
      if (this.endboss.isColliding(bottle)) {
        this.endboss.hitBoss();
        this.bossBar.setPercentage(this.endboss.healthBoss);
      }
    });
  };

  checkCollectibles() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.coinsBar.setPercentage(this.coinsBar.percentage + 10);
         AudioHub.playOne(AudioHub.coinSound);
        this.level.coins.splice(index, 1);
      }
    });
  
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.bottlesBar.setPercentage(this.bottlesBar.percentage + 10);
          AudioHub.playOne(AudioHub.bottleSound);
        this.level.bottles.splice(index, 1);
      }
    });
  };

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.backgroundObjects);   
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.cameraX, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinsBar);
    this.addToMap(this.bottlesBar);
    this.addToMap(this.bossBar);
    this.ctx.translate(this.cameraX, 0);   
    this.addToMap(this.character); 
    this.addToMap(this.endboss);     
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.chicks);
    this.addObjectsToMap(this.level.enemies);
    this.ctx.translate(-this.cameraX, 0);
    //draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      mo.changeDirection(this.ctx);
    }
    mo.getRealFrame();
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    mo.drawRealFrame(this.ctx);
    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }
}
