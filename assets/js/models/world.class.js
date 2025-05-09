class World {
  character = new Character();
  statusBar = new StatusBar();
  coinsBar = new CoinsBar();
  bottlesBar = new BottlesBar();
  bossBar = new BossBar();
  throwableObject = [];
  coinSound = new Audio('./assets/sound/sound-effects-coin.mp3');
  bottleSound = new Audio('./assets/sound/bottles-clanging-82557.mp3');
  chickenSound = new Audio('./assets/sound/668804__mbpl__chicken-clucking-2.wav');
  pepeSound = new Audio('./assets/sound/804622__qubodup__young-man-hurt-voice.wav');
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
    this.draw();
    this.setWorld();    
    this.checkCollisionsFromTop();  
    this.checkCollisionsPepe();
    this.checkCollisionsBoss();
    this.checkThrowableObject(); 
    this.run();
  };

  setWorld() {
    this.character.world = this;
  };

 checkCollisionsFromTop(){
    setInterval(() => {
      this.level.enemies.forEach((enemy, index) => {
        if (this.character.isColliding(enemy) && this.character.speedY < 0){
          enemy.isDead();
          enemy.speed = 0;
          this.chickenSound.play();
          this.level.enemies.splice(index, 1);
        }
      });
    }, 50);
  };

  checkCollisionsPepe(){
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hitPepe();
        this.pepeSound.play();
        this.statusBar.setPercentage(this.character.healthPepe);
      }
    });
  };

  run() {
    setInterval(() => {
      this.checkCollisionsFromTop();  
      this.checkCollisionsPepe(); 
      this.checkCollisionsBoss();
      this.checkThrowableObject();
      this.checkCollectibles();
    }, 50);
  };

  checkThrowableObject(){
    if (this.keyboard.t && this.bottlesBar.percentage > 0) {
      let x = this.character.rX + this.character.rW / 2;
      let y = this.character.rY + this.character.rH / 2;
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
        this.coinSound.play();
        this.level.coins.splice(index, 1);
      }
    });
  
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.bottlesBar.setPercentage(this.bottlesBar.percentage + 10);
        this.bottleSound.play();
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
