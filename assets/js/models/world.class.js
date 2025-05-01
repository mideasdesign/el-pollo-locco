class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  backgroundObjects = [new BackgroundObject(),];
  clouds = [new Clouds()];
  statusBar = new StatusBar();
  coinsBar = new CoinsBar();
  bottlesBar = new BottlesBar();
  bossBar = new BossBar();
  coins = [new Coins()];
  endboss = new Endboss();
  thowableObject = [];
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  level = level1;
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisionsPepe();
    this.checkCollisionsBoss();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }
  checkCollisionsPepe(){
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hitPepe();
        this.statusBar.setPercentage(this.character.healthPepe);
      }
    });
  };

  run() {
    setInterval(() => {
      this.checkCollisionsPepe(); 
      this.checkCollisionsBoss();
      this.checkThrowableObject();
    }, 150);
  };

  checkThrowableObject(){
    if (this.keyboard.t) {
      let x = this.character.x + this.character.width / 2;
      let y = this.character.y + this.character.height / 2;
      let bottle = new ThrowableObject(x, y);
      this.thowableObject.push(bottle);
    }
  }

  checkCollisionsBoss(){
    this.thowableObject.forEach((bottle) => {
      if (this.endboss.isColliding(bottle)) {
        this.endboss.hitBoss();
        this.bossBar.setPercentage(this.endboss.healthBoss);
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
    this.addObjectsToMap(this.thowableObject);
    this.ctx.translate(this.cameraX, 0);
    this.addToMap(this.character); 
    this.addToMap(this.endboss);
    this.addObjectsToMap(this.level.coins);
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
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }
}
