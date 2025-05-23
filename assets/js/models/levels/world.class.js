class World {
  character = new Character();
  enemies = [new Chicken(),];
  clouds = [new Clouds()];
  statusBar = new StatusBar();
  coinsBar = new CoinsBar();
  bottleBar = new BottleBar();
  bossBar = new BossBar();
  thowableObject = [];
  backgroundObjects = [
    new BackgroundObject("assets/images/5_background/layers/air.png", 0),
    new BackgroundObject("assets/images/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("assets/images/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("assets/images/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("assets/images/5_background/layers/air.png", 720),
    new BackgroundObject("assets/images/5_background/layers/3_third_layer/2.png", 720),
    new BackgroundObject("assets/images/5_background/layers/2_second_layer/2.png", 720),
    new BackgroundObject("assets/images/5_background/layers/1_first_layer/2.png", 720),
    new BackgroundObject("assets/images/5_background/layers/air.png", 720 * 2),
    new BackgroundObject("assets/images/5_background/layers/3_third_layer/1.png", 720 * 2),
    new BackgroundObject("assets/images/5_background/layers/2_second_layer/1.png", 720 * 2),
    new BackgroundObject("assets/images/5_background/layers/1_first_layer/1.png", 720 * 2),
    new BackgroundObject("assets/images/5_background/layers/air.png", 720 * 3),
    new BackgroundObject("assets/images/5_background/layers/3_third_layer/1.png", 720 * 3),
    new BackgroundObject("assets/images/5_background/layers/2_second_layer/1.png", 720 * 3),
    new BackgroundObject("assets/images/5_background/layers/1_first_layer/1.png", 720 * 3),
    new BackgroundObject("assets/images/5_background/layers/air.png", 720 * 4),
    new BackgroundObject("assets/images/5_background/layers/3_third_layer/1.png", 720 * 4),
    new BackgroundObject("assets/images/5_background/layers/2_second_layer/1.png", 720 * 4),
    new BackgroundObject("assets/images/5_background/layers/1_first_layer/1.png", 720 * 4),
  ];
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
    this.checkCollisions();
    this.run();
  };

  setWorld() {
    this.character.world = this;
  }
  checkCollisions(){
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.healthPepe.setPercentage(this.character.energyLevel);
      }
    });
  };

  run() {
    setInterval(() => {
      this.checkCollisions(); 
      this.checkThrowableObject();
    }, 150);
  };

  checkThrowableObject(){
    if (this.keyboard.t) {
      let bottle = new ThrowableObject();
      this.thowableObject.push(bottle);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.cameraX, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinsBar);
    this.addToMap(this.bossBar);
    this.addObjectsToMap(this.thowableObject);
    this.ctx.translate(this.cameraX, 0);
    this.addToMap(this.character);  
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);    
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
