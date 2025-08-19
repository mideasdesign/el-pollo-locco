/**
 * @fileoverview Collision Detection System for El Pollo Loco
 * @description Handles all collision detection logic between game objects
 * @author Markus Fischer
 * @version 1.0.0
 */

/**
 * Collision Detection Manager
 * Provides static methods for handling various types of collisions in the game.
 * Separated from World class to maintain single responsibility principle.
 */
class CollisionManager {

  /**
   * Checks for character jumping on enemies from above.
   * Handles enemy elimination when character lands on them while falling.
   * @param {World} world - Reference to the game world instance
   */
  static checkCollisionsFromTop(world) {
    gameIntervals(() => {
      world.level.enemies.forEach((enemy, index) => {
        world.character.getRealFrame();
        enemy.getRealFrame();
        if (world.character.isAboveGround() && world.character.speedY < 0 && world.character.isColliding(enemy) && !enemy.dead) {
          enemy.deadChicken();
          AudioHub.playOne(AudioHub.chickenSound);
          // Delay for displaying the dead chicken
          setTimeout(() => {
            const currentIndex = world.level.enemies.indexOf(enemy);
            if (currentIndex > -1) {
              world.level.enemies.splice(currentIndex, 1);
            }
          }, 1000); // 1 second delay
        }
      });
    }, 30);
  }

  /**
   * Checks for collisions with small chickens from the top direction.
   * Allows character to defeat small chickens by jumping on them.
   * @param {World} world - Reference to the game world instance
   */
  static checkCollisionChicksFromTop(world) {
    gameIntervals(() => {
      world.level.chicks.forEach((chick, index) => {
        world.character.getRealFrame();
        chick.getRealFrame();
        if (world.character.isAboveGround() && world.character.speedY < 0 && world.character.isColliding(chick)) {
          chick.speed = 0;
          AudioHub.playOne(AudioHub.chicksSound);
          world.level.chicks.splice(index, 1);
        }
      });
    }, 30);
  }

  /**
   * Checks for standard collisions between Pepe and enemies.
   * Handles damage to character when hit by enemies with sound cooldown.
   * @param {World} world - Reference to the game world instance
   */
  static checkCollisionsPepe(world) {
    world.level.enemies.forEach((enemy) => {
      world.character.getRealFrame();
      enemy.getRealFrame();
      if (world.character.isColliding(enemy) && !enemy.dead) {
        world.character.hitPepe();
        // Only play hurt sound if enough time has passed since last hurt sound
        const currentTime = new Date().getTime();
        if (currentTime - world.character.lastHurtSound > 400) { // 400ms cooldown for sound
          AudioHub.playOne(AudioHub.pepeSound);
          world.character.lastHurtSound = currentTime;
        }
        world.statusBar.setPercentage(world.character.healthPepe);
      }
    });
  }

  /**
   * Checks for collisions between Pepe and small chickens.
   * Handles damage when character collides with small enemies.
   * @param {World} world - Reference to the game world instance
   */
  static checkCollisionsChicksPepe(world) {
    world.level.chicks.forEach((chick) => {
      world.character.getRealFrame();
      chick.getRealFrame();
      if (world.character.isColliding(chick)) {
        world.character.hitPepe();
        // Only play hurt sound if enough time has passed since last hurt sound
        const currentTime = new Date().getTime();
        if (currentTime - world.character.lastHurtSound > 400) { // 400ms cooldown for sound
          AudioHub.playOne(AudioHub.pepeSound);
          world.character.lastHurtSound = currentTime;
        }
        world.statusBar.setPercentage(world.character.healthPepe);
      }
    });
  }

  /**
   * Checks for collisions between Pepe and the boss enemy.
   * Handles damage when character collides with the end boss.
   * @param {World} world - Reference to the game world instance
   */
  static checkCollisionsBossPepe(world) {
    world.level.endboss.forEach((boss) => {
      world.character.getRealFrame();
      boss.getRealFrame();
      if (world.character.isColliding(boss)) {
        world.character.hitPepe();
        // Only play hurt sound if enough time has passed since last hurt sound
        const currentTime = new Date().getTime();
        if (currentTime - world.character.lastHurtSound > 400) { // 400ms cooldown for sound
          AudioHub.playOne(AudioHub.pepeSound);
          world.character.lastHurtSound = currentTime;
        }
        world.statusBar.setPercentage(world.character.healthPepe);
      }
    });
  }

  /**
   * Checks for boss attack patterns and proximity to character.
   * Triggers boss behavior when character approaches.
   * @param {World} world - Reference to the game world instance
   */
  static checkBossAttack(world) {
    world.level.endboss.forEach((boss) => {
      if (world.character.x >= 1900) {
        boss.endbossAttack();
      }
    });
  }

  /**
   * Checks for collisions between bottles and boss enemies.
   * Handles boss damage and bottle removal on impact.
   * @param {World} world - Reference to the game world instance
   */
  static checkCollisionsBoss(world) {
    world.level.endboss.forEach((boss) => {
      world.throwableObjects.forEach((bottle, index) => {
        if (bottle.isColliding(boss)) {
          boss.hitBoss();
          world.statusBarEndboss.setPercentage(boss.energy);
          world.throwableObjects.splice(index, 1);
        }
      });
    });
  }

  /**
   * Checks for collectible item interactions (coins and bottles).
   * Handles item collection and status bar updates.
   * @param {World} world - Reference to the game world instance
   */
  static checkCollectibles(world) {
    world.level.coins.forEach((coin, index) => {
      if (world.character.isColliding(coin)) {
        world.character.coins++;
        world.statusBarCoins.setPercentage(world.character.coins);
        world.level.coins.splice(index, 1);
        AudioHub.playOne(AudioHub.coinSound);
      }
    });

    world.level.bottles.forEach((bottle, index) => {
      if (world.character.isColliding(bottle)) {
        world.character.bottles++;
        world.statusBarBottles.setPercentage(world.character.bottles);
        world.level.bottles.splice(index, 1);
        AudioHub.playOne(AudioHub.bottleSound);
      }
    });
  }

  /**
   * Checks for throwable object collisions and interactions.
   * Handles bottle throwing mechanics and character throw action registration.
   * @param {World} world - Reference to the game world instance
   */
  static checkThrowableObject(world) {
    if (world.keyboard.THROW && world.character.bottles > 0) {
      let bottle = new ThrowableObject(world.character.x + 100, world.character.y + 100);
      world.throwableObjects.push(bottle);
      world.character.bottles--;
      world.statusBarBottles.setPercentage(world.character.bottles);
      // Register throwing action to prevent idle animation
      world.character.registerThrowAction();
      world.keyboard.THROW = false;
    }
  }

  /**
   * Animates coin objects with floating movement.
   * Provides visual feedback and makes coins more noticeable.
   * @param {World} world - Reference to the game world instance
   */
  static moveCoins(world) {
    if (world.level && world.level.coins) {
      world.level.coins.forEach((coin) => {
        // Simple floating animation for coins
        coin.y += Math.sin(Date.now() * 0.002 + coin.x * 0.01) * 0.5;
      });
    }
  }
}
