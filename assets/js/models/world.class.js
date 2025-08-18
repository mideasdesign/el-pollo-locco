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
  };

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
    // Touch controls are now initialized by touchDetection.js in startGame()
  };

  /**
   * Initializes the game world and starts main game loops.
   * Sets up drawing, world references, collision detection, and game logic.
   */
  initializeGame() {
    this.draw();
    this.setWorld();
    this.startCollisionChecks();
    this.run();
  };

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
  };

  /**
   * Establishes bidirectional reference between world and character.
   * Allows character to access world properties and starts character animation.
   */
  setWorld() {
    this.character.world = this;
 this.character.startAnimation();
  };

  /**
   * Main game loop that handles ongoing collision detection.
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
  };

  /**
   * Checks for character jumping on enemies from above.
   * Handles enemy elimination when character lands on them while falling.
   */
  checkCollisionsFromTop() {
    gameIntervals(() => {
      this.level.enemies.forEach((enemy, index) => {
        this.character.getRealFrame();
        enemy.getRealFrame();
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

  };

  /**
   * Checks for collisions with small chickens from the top direction.
   * Allows character to defeat small chickens by jumping on them.
   * Instantly removes defeated chicks with sound effect.
   */
  checkCollisionChicksFromTop() {
    gameIntervals(() => {
      this.level.chicks.forEach((chick, index) => {
        this.character.getRealFrame();
        chick.getRealFrame();
        if (this.character.isAboveGround() && this.character.speedY < 0 && this.character.isColliding(chick)) {
          chick.speed = 0;
          AudioHub.playOne(AudioHub.chicksSound);
          this.level.chicks.splice(index, 1);
        }
      });
      
    }, 30);
  };

  /**
   * Checks for standard collisions between Pepe and enemies.
   * Handles damage to character when hit by enemies with sound cooldown.
   * Updates health status bar after damage is taken.
   */
  checkCollisionsPepe() {
    this.level.enemies.forEach((enemy) => {
      this.character.getRealFrame();
      enemy.getRealFrame();
      if (this.character.isColliding(enemy) && !enemy.dead) {
        this.character.hitPepe();
        // Only play hurt sound if enough time has passed since last hurt sound
        const currentTime = new Date().getTime();
        if (currentTime - this.character.lastHurtSound > 400) { // 400ms cooldown for sound
          AudioHub.playOne(AudioHub.pepeSound);
          this.character.lastHurtSound = currentTime;
        };
        this.statusBar.setPercentage(this.character.healthPepe);
      };
    });
  };

  /**
   * Checks for collisions between Pepe and small chickens.
   * Handles damage when character collides with small enemies.
   */
  checkCollisionsChicksPepe() {
    this.level.chicks.forEach((chick) => {
      this.character.getRealFrame();
      chick.getRealFrame();
      if (this.character.isColliding(chick) && !chick.isDead()) {
        this.character.hitPepe();
        // Only play hurt sound if enough time has passed since last hurt sound
        const currentTime = new Date().getTime();
        if (currentTime - this.character.lastHurtSound > 400) { // 400ms cooldown for sound
          AudioHub.playOne(AudioHub.pepeSound);
          this.character.lastHurtSound = currentTime;
        };
        this.statusBar.setPercentage(this.character.healthPepe);
      };
    });
  };

  /**
   * Checks for collisions between Pepe and the boss enemy.
   * Handles damage when character collides with the end boss.
   * Updates health status bar and plays hurt sound with cooldown.
   */
  checkCollisionsBossPepe() {
    this.character.getRealFrame();
    this.endboss.getRealFrame();
    if (this.character.isColliding(this.endboss)) {
      this.character.hitPepe();
      // Only play hurt sound if enough time has passed since last hurt sound
      const currentTime = new Date().getTime();
      if (currentTime - this.character.lastHurtSound > 400) { // 400ms cooldown for sound
        AudioHub.playOne(AudioHub.pepeSound);
        this.character.lastHurtSound = currentTime;
      }
      this.statusBar.setPercentage(this.character.healthPepe);
    };
  };

  /**
   * Checks if boss attack should be triggered based on character position.
   * Only triggers once when character reaches the boss area to prevent
   * multiple audio stops/starts during movement.
   */
  checkBossAttack() {
    if (this.character.rX > 2500 && !this.bossAttackTriggered) {
      this.bossAttackTriggered = true;  // Prevent multiple triggers
      this.isAttacking = true;
      AudioHub.stopOne(AudioHub.background);
      AudioHub.playOne(AudioHub.attackSound);
      this.endboss.startAttack();
    };
  };

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
      
      // Register throw action to prevent idle animation
      this.character.registerThrowAction();
    }
  }

  /**
   * Checks for collisions between bottles and boss enemies.
   * Handles boss damage and bottle splash effect on impact.
   * Updates boss health bar when boss takes damage.
   */
  checkCollisionsBoss() {
    this.throwableObject.forEach((bottle) => {
      this.endboss.getRealFrame();
      bottle.getRealFrame();
      if (this.endboss.isColliding(bottle)) {
        this.endboss.hitBoss();
        this.bossBar.setPercentage(this.endboss.healthBoss);
        bottle.splash();
      };
    });
  };

  /**
   * Checks for collectible item interactions (coins and bottles).
   * Handles item collection, status bar updates, and sound effects.
   * Removes collected items from the level arrays.
   */
  checkCollectibles() {
    this.level.coins.forEach((coin, index) => {
      this.character.getRealFrame();
      coin.getRealFrame();
      if (this.character.isColliding(coin)) {
        this.coinsBar.setPercentage(this.coinsBar.percentage + 10);
        AudioHub.playOne(AudioHub.coinSound);
        this.level.coins.splice(index, 1);
      };
    });
    this.level.bottles.forEach((bottle, index) => {
      this.character.getRealFrame();
      bottle.getRealFrame();
      if (this.character.isColliding(bottle)) {
        this.bottlesBar.setPercentage(this.bottlesBar.percentage + 10);
        AudioHub.playOne(AudioHub.bottleSound);
        this.level.bottles.splice(index, 1);
      };
    });
  };

  /**
   * Main drawing method that renders the entire game world.
   * Clears canvas, applies camera translation, and draws all game objects.
   * Coordinates all rendering operations in the correct order.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.drawUI();
    this.drawGameObjects();
    this.scheduleNextFrame();
  };

  /**
   * Draws the background layers with parallax scrolling effect.
   * Applies camera translation for scrolling background elements.
   */
  drawBackground() {
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.cameraX, 0);
  };

  /**
   * Draws the user interface elements (status bars).
   * Renders health, coins, bottles, and boss health bars.
   * UI elements are not affected by camera translation.
   */
  drawUI() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinsBar);
    this.addToMap(this.bottlesBar);
    this.addToMap(this.bossBar);
  };

  /**
   * Draws all interactive game objects with camera translation.
   * Renders character, enemies, collectibles, and throwable objects.
   */
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
  };

  /**
   * Schedules the next animation frame for smooth rendering.
   * Uses requestAnimationFrame for optimal performance and smooth gameplay.
   */
  scheduleNextFrame() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  };

  /**
   * Adds an array of objects to the rendering map.
   * Iterates through object arrays and renders each individual object.
   * @param {DrawableObject[]} objects - Array of objects to render
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  };

  /**
   * Adds a single movable object to the rendering context.
   * Handles direction changes, drawing, and debug frame rendering.
   * @param {MovableObject} mo - The movable object to render
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      mo.changeDirection(this.ctx);
    };
    mo.getRealFrame();
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    mo.drawRealFrame(this.ctx);
    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    };
  };
}
