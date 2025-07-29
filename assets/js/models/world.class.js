/**
 * Main game world class that manages all game entities and game logic.
 * Handles rendering, collision detection, and game state management.
 */
class World {
  /** @type {Character} - The main player character */
  character = new Character();
  /** @type {StatusBar} - Health status bar UI element */
  statusBar = new StatusBar();
  /** @type {CoinsBar} - Coin counter UI element */
  coinsBar = new CoinsBar();
  /** @type {BottlesBar} - Bottle counter UI element */
  bottlesBar = new BottlesBar();
  /** @type {BossBar} - Boss health bar UI element */
  bossBar = new BossBar();
  /** @type {ThrowableObject[]} - Array of thrown bottle objects */
  throwableObject = [];
  /** @type {Endboss} - The final boss enemy */
  endboss = new Endboss();
  /** @type {HTMLCanvasElement} - The game canvas */
  canvas;
  /** @type {CanvasRenderingContext2D} - Canvas 2D rendering context */
  ctx;
  /** @type {Keyboard} - Keyboard input handler */
  keyboard;
  /** @type {number} - Camera X position for scrolling */
  cameraX = 0;
  /** @type {Level} - Current game level data */
  level = level1;

  /** @type {boolean} - True when boss attack sequence has been triggered */
  bossAttackTriggered = false;
  /** @type {number} - Timestamp of last bottle throw for cooldown control */
  lastThrowTime = 0;
  /** @type {number} - Minimum time between throws in milliseconds (500ms = 0.5 seconds) */
  throwCooldown = 500;

  /**
   * Creates a new World instance.
   * @param {HTMLCanvasElement} canvas - The game canvas element
   * @param {Keyboard} keyboard - The keyboard input handler
   */
  constructor(canvas, keyboard) {
    this.initializeCanvas(canvas, keyboard);
    this.initializeGame();
  }

  /**
   * Initializes canvas context and keyboard controls.
   * Sets up the 2D rendering context and touch controls.
   * @param {HTMLCanvasElement} canvas - The game canvas element
   * @param {Keyboard} keyboard - The keyboard input handler
   */
  initializeCanvas(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    touchBtn();
  }

  /**
   * Initializes the game world and starts main game loops.
   * Sets up drawing, world references, collision detection, and game logic.
   */
  initializeGame() {
    this.draw();
    this.setWorld();
    this.startCollisionChecks();
    this.run();
  }

  /**
   * Starts all collision detection intervals.
   * Sets up continuous checking for various types of collisions.
   */
  startCollisionChecks() {
    this.checkCollisionsFromTop();
    this.checkCollisionChicksFromTop();
    this.checkCollisionsPepe();
    this.checkCollisionsBoss();
    this.checkThrowableObject();
    this.checkBossAttack();
  }

  /**
   * Establishes bidirectional reference between world and character.
   * Allows character to access world properties and starts character animation.
   */
  setWorld() {
    this.character.world = this;
    this.character.startAnimation();
  }

  /**
   * Main game loop that handles ongoing collision detection.
   * Runs collision checks at 60 FPS for responsive gameplay.
   */
  run() {
    gameIntervals(() => {
      this.checkCollisionsPepe();
      this.checkCollisionsBoss();
      this.checkThrowableObject();
      this.checkCollectibles();
      this.checkCollisionsBossPepe();
      this.checkCollisionsChicksPepe();
      this.checkBossAttack();
      this.moveCoins();
    }, 100);
  }

  checkCollisionsFromTop() {
    gameIntervals(() => {
      this.level.enemies.forEach((enemy, index) => {
        if (this.character.isAboveGround() && this.character.speedY < 0 && this.character.isColliding(enemy) && !enemy.dead) {
          enemy.deadChicken();
          AudioHub.playOne(AudioHub.chickenSound);
          // Verzögerung für die Darstellung des toten Huhns
          setTimeout(() => {
            const currentIndex = this.level.enemies.indexOf(enemy);
            if (currentIndex > -1) {
              this.level.enemies.splice(currentIndex, 1);
            }
          }, 1000); // 1 Sekunde Verzögerung
        }
      });
    }, 30);
  }

  checkCollisionChicksFromTop() {
    gameIntervals(() => {
      this.level.chicks.forEach((chick, index) => {
        if (this.character.isAboveGround() && this.character.speedY < 0 && this.character.isColliding(chick)) {
          chick.speed = 0;
          AudioHub.playOne(AudioHub.chicksSound);
          this.level.chicks.splice(index, 1);
        }
      });
    }, 30);
  }

  checkCollisionsPepe() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.dead) {
        this.character.hitPepe();
        AudioHub.playOne(AudioHub.pepeSound);
        this.statusBar.setPercentage(this.character.healthPepe);
      }
    });
  }

  checkCollisionsChicksPepe() {
    this.level.chicks.forEach((chick) => {
      if (this.character.isColliding(chick) && !chick.isDead()) {
        this.character.hitPepe();
        AudioHub.playOne(AudioHub.pepeSound);
        this.statusBar.setPercentage(this.character.healthPepe);
      }
    });
  }

  checkCollisionsBossPepe() {
    if (this.character.isColliding(this.endboss)) {
      this.character.hitPepe();
      AudioHub.playOne(AudioHub.pepeSound);
      this.statusBar.setPercentage(this.character.healthPepe);
    }
  }

  /**
   * Checks if boss attack should be triggered based on character position.
   * Only triggers once when character reaches the boss area to prevent
   * multiple audio stops/starts during movement.
   */
  checkBossAttack() {
    if (this.character.rX > 2350 && !this.bossAttackTriggered) {
      this.bossAttackTriggered = true;  // Prevent multiple triggers
      this.isAttacking = true;
      AudioHub.stopOne(AudioHub.background);
      AudioHub.playOne(AudioHub.attackSound);
      this.endboss.startAttack();
    }
  }

  /**
   * Handles throwing bottles with cooldown system.
   * Prevents machine-gun style throwing by enforcing 500ms delay between throws.
   * Only allows throwing when player has bottles and cooldown period has passed.
   */
  checkThrowableObject() {
    const currentTime = new Date().getTime();
    const timeSinceLastThrow = currentTime - this.lastThrowTime;
    
    if (this.keyboard.t && 
        this.bottlesBar.percentage > 0 && 
        timeSinceLastThrow >= this.throwCooldown) {
      
      let x = this.character.rX + this.character.rW / 2.6;
      let y = this.character.rY + this.character.rH / 2.6;
      let bottle = new ThrowableObject(x, y);
      this.throwableObject.push(bottle);
      this.bottlesBar.setPercentage(this.bottlesBar.percentage - 10);
      
      // Update last throw time to start cooldown
      this.lastThrowTime = currentTime;
    }
  }

  checkCollisionsBoss() {
    this.throwableObject.forEach((bottle) => {
      if (this.endboss.isColliding(bottle)) {
        this.endboss.hitBoss();
        this.bossBar.setPercentage(this.endboss.healthBoss);
        bottle.splash();
      }
    });
  }

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
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.drawUI();
    this.drawGameObjects();
    this.scheduleNextFrame();
  }

  drawBackground() {
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.cameraX, 0);
  }

  drawUI() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinsBar);
    this.addToMap(this.bottlesBar);
    this.addToMap(this.bossBar);
  }

  drawGameObjects() {
    this.ctx.translate(this.cameraX, 0);
    this.addToMap(this.character);
    this.addToMap(this.endboss);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.chicks);
    this.addObjectsToMap(this.level.enemies);
    this.ctx.translate(-this.cameraX, 0);
  }

  scheduleNextFrame() {
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
  moveCoins(){
    if (this.coinsBar >= 100 && this.statusBar < 100) {
      this.coinsBar.setPercentage(this.coinsBar.percentage - 10);
      this.statusBar.setPercentage(this.statusBar.percentage + 10);
    }
  }
}
