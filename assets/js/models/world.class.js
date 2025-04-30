class World {
  character = new Character();
  enemies = [new Chicken()];
  endboss = new Endboss();  
  coins = [new Coins()];
  clouds = [new Clouds()];
  statusBar = new StatusBar();
  coinsBar = new CoinsBar();
  bottlesBar = new BottlesBar();
  bossBar = new BossBar();
  thowableObject = [];
  backgroundObjects = [];
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  level = level1;
  coinSound = new Audio('./assets/sound/sound-effects-coin.mp3');

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisionsPepe();
    this.checkCollisionsBoss();
    this.checkCollisionsCoins();
    this.checkCollisionsBoss();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  };

  checkCollisionsPepe(){
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hitPepe();
        this.statusBar.setPercentage(this.character.energyLevel);
      }
    });
  };


  run() {
    setInterval(() => {
      this.checkCollisionsPepe(); 
      this.checkCollisionsBoss();
      this.checkCollisionsCoins();
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
        this.bossBar.setPercentage(this.endboss.bossLevel);
      }
    });
  };
  checkCollisionsCoins(){
    this.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.coinSound.play();
        this.coinsBar.setPercentage(this.coinsBar.percentage + 10);
        const index = this.coins.indexOf(coin);
        if (index > -1) this.coins.splice(index, 1);
      }
    });
  };

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.cameraX, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinsBar);
    this.addToMap(this.bottlesBar);
    this.addToMap(this.bossBar);
    this.addObjectsToMap(this.thowableObject);
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.coins);
    this.addToMap(this.character);  
    this.addToMap(this.endboss); 
    this.addObjectsToMap(this.level.enemies);  
    this.addObjectsToMap(this.level.clouds);  
    this.ctx.translate(-this.cameraX, 0);
  
    //draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  };

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  };

  addToMap(mo) {
    if (typeof mo.draw !== 'function') {
      console.warn('Warnung: Objekt ohne draw()-Funktion übersprungen:', mo);
      return;
    }

    if (mo.otherDirection) {
      mo.changeDirection(this.ctx);
    }
    mo.draw(this.ctx);
    if (typeof mo.drawFrame === 'function') {
      mo.drawFrame(this.ctx);
    }
    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }
}
