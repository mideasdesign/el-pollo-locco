/**
 * Manages all collision detection and handling in the game world.
 * Coordinates different types of collisions between game entities.
 * Handles damage, item collection, and enemy defeat mechanics.
 */
class CollisionManager {
  /** @type {World} - Reference to the game world */
  world;

  /**
   * Creates a new CollisionManager instance.
   * @param {World} world - Game world instance
   */
  constructor(world) {
    this.world = world;
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
   * Main collision loop that handles ongoing collision detection.
   */
  runCollisionChecks() {
    gameIntervals(() => {
      this.checkCollisionsPepe();
      this.checkCollisionsBoss();
      this.checkThrowableObject();
      this.checkCollectibles();
      this.checkCollisionsBossPepe();
      this.checkCollisionsChicksPepe();
      this.checkBossAttack();
    }, 100);
  }

  /**
   * Checks for character jumping on enemies from above.
   * Handles enemy elimination when character lands on them while falling.
   */
  checkCollisionsFromTop() {
    gameIntervals(() => {
      this.world.level.enemies.forEach((enemy, index) => {
        this.processTopCollision(enemy);
      });
    }, 30);
  }
  /**
   * Processes collision between character and enemy from above
   * @param {MovableObject} enemy - The enemy to check collision with
   */
  processTopCollision(enemy) {
    this.world.character.getRealFrame();
    enemy.getRealFrame();
    if (this.isValidTopCollision(enemy)) {
      this.handleEnemyDefeat(enemy);
    }
  }

  /**
   * Checks if collision from top is valid for defeating enemy
   * @param {MovableObject} enemy - The enemy to check
   * @returns {boolean} True if valid top collision
   */
  isValidTopCollision(enemy) {
    return (
      this.world.character.isAboveGround() &&
      this.world.character.speedY < 0 &&
      this.world.character.isColliding(enemy) &&
      !enemy.dead
    );
  }

  /**
   * Handles enemy defeat with sound and removal
   * @param {MovableObject} enemy - The defeated enemy
   */
  handleEnemyDefeat(enemy) {
    enemy.deadChicken();
    AudioHub.playOne(AudioHub.chickenSound);
    setTimeout(() => {
      const currentIndex = this.world.level.enemies.indexOf(enemy);
      if (currentIndex > -1) {
        this.world.level.enemies.splice(currentIndex, 1);
      }
    }, 1000);
  }

  /**
   * Checks for collisions with small chickens from the top direction.
   * Allows character to defeat small chickens by jumping on them.
   * Instantly removes defeated chicks with sound effect.
   */
  checkCollisionChicksFromTop() {
    gameIntervals(() => {
      this.world.level.chicks.forEach((chick, index) => {
        this.processChickTopCollision(chick, index);
      });
    }, 30);
  }

  /**
   * Processes collision between character and chick from above.
   * @param {MovableObject} chick - The chick to check collision with
   * @param {number} index - Index of the chick in the array
   */
  processChickTopCollision(chick, index) {
    this.world.character.getRealFrame();
    chick.getRealFrame();
    if (
      this.world.character.isAboveGround() &&
      this.world.character.speedY < 0 &&
      this.world.character.isColliding(chick)
    ) {
      this.handleChickDefeat(chick, index);
    }
  }

  /**
   * Handles chick defeat with sound and removal.
   * @param {MovableObject} chick - The defeated chick
   * @param {number} index - Index of the chick in the array
   */
  handleChickDefeat(chick, index) {
    chick.speed = 0;
    AudioHub.playOne(AudioHub.chicksSound);
    this.world.level.chicks.splice(index, 1);
  }

  /**
   * Checks for standard collisions between Pepe and enemies.
   * Handles damage to character when hit by enemies with sound cooldown.
   * Updates health status bar after damage is taken.
   */
  checkCollisionsPepe() {
    this.world.level.enemies.forEach((enemy) => {
      this.processPepeEnemyCollision(enemy);
    });
  }

  /**
   * Processes collision between Pepe and an enemy.
   * @param {MovableObject} enemy - The enemy to check collision with
   */
  processPepeEnemyCollision(enemy) {
    this.world.character.getRealFrame();
    enemy.getRealFrame();
    if (this.world.character.isColliding(enemy) && !enemy.dead) {
      this.handlePepeDamage();
    }
  }

  /**
   * Handles damage to Pepe with sound and health bar update.
   */
  handlePepeDamage() {
    this.world.character.hitPepe();
    const currentTime = new Date().getTime();
    if (currentTime - this.world.character.lastHurtSound > 400) {
      AudioHub.playOne(AudioHub.pepeSound);
      this.world.character.lastHurtSound = currentTime;
    }
    this.world.statusBar.setPercentage(this.world.character.healthPepe);
  }

  /**
   * Checks for collisions between Pepe and small chickens.
   * Handles damage when character collides with small enemies.
   */
  checkCollisionsChicksPepe() {
    this.world.level.chicks.forEach((chick) => {
      this.processPepeChickCollision(chick);
    });
  }

  /**
   * Processes collision between Pepe and a chick.
   * @param {MovableObject} chick - The chick to check collision with
   */
  processPepeChickCollision(chick) {
    this.world.character.getRealFrame();
    chick.getRealFrame();
    if (this.world.character.isColliding(chick) && !chick.isDead()) {
      this.handlePepeChickDamage();
    }
  }

  /**
   * Handles damage to Pepe from chick collision.
   */
  handlePepeChickDamage() {
    this.world.character.hitPepe();
    const currentTime = new Date().getTime();
    if (currentTime - this.world.character.lastHurtSound > 400) {
      AudioHub.playOne(AudioHub.pepeSound);
      this.world.character.lastHurtSound = currentTime;
    }
    this.world.statusBar.setPercentage(this.world.character.healthPepe);
  }

  /**
   * Checks for collisions between Pepe and the boss enemy.
   * Handles damage when character collides with the end boss.
   * Updates health status bar and plays hurt sound with cooldown.
   */
  checkCollisionsBossPepe() {
    this.world.character.getRealFrame();
    this.world.endboss.getRealFrame();
    if (this.world.character.isColliding(this.world.endboss)) {
      this.world.character.hitPepe();
      const currentTime = new Date().getTime();
      if (currentTime - this.world.character.lastHurtSound > 400) {
        AudioHub.playOne(AudioHub.pepeSound);
        this.world.character.lastHurtSound = currentTime;
      }
      this.world.statusBar.setPercentage(this.world.character.healthPepe);
    }
  }

  /**
   * Checks if boss attack should be triggered based on character position.
   * Only triggers once when character reaches the boss area to prevent
   * multiple audio stops/starts during movement.
   */
  checkBossAttack() {
    if (this.world.character.rX > 2500 && !this.world.bossAttackTriggered) {
      this.world.bossAttackTriggered = true;
      this.world.isAttacking = true;
      AudioHub.stopOne(AudioHub.background);
      AudioHub.playOne(AudioHub.attackSound);
      this.world.endboss.startAttack();
    }
  }

  /**
   * Handles throwing bottles with cooldown system.
   * Prevents machine-gun style throwing by enforcing 500ms delay between throws.
   * Only allows throwing when player has bottles and cooldown period has passed.
   */
  checkThrowableObject() {
    const currentTime = new Date().getTime();
    const timeSinceLastThrow = currentTime - this.world.lastThrowTime;
    if (this.canThrowBottle(timeSinceLastThrow)) {
      this.executeBottleThrow(currentTime);
    }
  }

  /**
   * Checks if a bottle can be thrown based on conditions.
   * @param {number} timeSinceLastThrow - Time since last throw
   * @returns {boolean} True if bottle can be thrown
   */
  canThrowBottle(timeSinceLastThrow) {
    return (
      this.world.keyboard.t &&
      this.world.bottlesBar.percentage > 0 &&
      timeSinceLastThrow >= this.world.throwCooldown
    );
  }

  /**
   * Executes the bottle throwing action.
   * @param {number} currentTime - Current timestamp
   */
  executeBottleThrow(currentTime) {
    let x = this.world.character.rX + this.world.character.rW / 2.6;
    let y = this.world.character.rY + this.world.character.rH / 2.6;
    let bottle = new ThrowableObject(x, y);
    this.world.throwableObject.push(bottle);
    this.world.bottlesBar.setPercentage(this.world.bottlesBar.percentage - 10);
    this.world.lastThrowTime = currentTime;
    this.world.character.registerThrowAction();
  }

  /**
   * Checks for collisions between bottles and boss enemies.
   * Handles boss damage and bottle splash effect on impact.
   * Updates boss health bar when boss takes damage.
   */
  checkCollisionsBoss() {
    this.world.throwableObject.forEach((bottle) => {
      this.world.endboss.getRealFrame();
      bottle.getRealFrame();
      if (this.world.endboss.isColliding(bottle)) {
        this.world.endboss.hitBoss();
        this.world.bossBar.setPercentage(this.world.endboss.healthBoss);
        bottle.splash();
      }
    });
  }

  /**
   * Checks for collectible item interactions (coins and bottles).
   * Handles item collection, status bar updates, and sound effects.
   * Removes collected items from the level arrays.
   */
  checkCollectibles() {
    this.checkCoinCollection();
    this.checkBottleCollection();
  }

  /**
   * Checks for coin collection and handles pickup effects.
   */
  checkCoinCollection() {
    this.world.level.coins.forEach((coin, index) => {
      this.world.character.getRealFrame();
      coin.getRealFrame();
      if (this.world.character.isColliding(coin)) {
        this.collectCoin(index);
      }
    });
  }

  /**
   * Handles coin collection with status update and sound.
   * @param {number} index - Index of the coin in the array
   */
  collectCoin(index) {
    this.world.coinsBar.setPercentage(this.world.coinsBar.percentage + 10);
    AudioHub.playOne(AudioHub.coinSound);
    this.world.level.coins.splice(index, 1);
  }

  /**
   * Checks for bottle collection and handles pickup effects.
   */
  checkBottleCollection() {
    this.world.level.bottles.forEach((bottle, index) => {
      this.world.character.getRealFrame();
      bottle.getRealFrame();
      if (this.world.character.isColliding(bottle)) {
        this.collectBottle(index);
      }
    });
  }

  /**
   * Handles bottle collection with status update and sound.
   * @param {number} index - Index of the bottle in the array
   */
  collectBottle(index) {
    this.world.bottlesBar.setPercentage(this.world.bottlesBar.percentage + 10);
    AudioHub.playOne(AudioHub.bottleSound);
    this.world.level.bottles.splice(index, 1);
  }
}
