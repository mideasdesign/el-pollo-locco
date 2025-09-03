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
        CollisionManager.processTopCollision(world, enemy);
      });
    }, 30);
  };
  /**
   * Processes collision between character and enemy from above
   * @param {World} world - The game world instance
   * @param {MovableObject} enemy - The enemy to check collision with
   */
  static processTopCollision(world, enemy) {
    world.character.getRealFrame();
    enemy.getRealFrame();
    
    if (CollisionManager.isValidTopCollision(world.character, enemy)) {
      CollisionManager.handleEnemyDefeat(world, enemy);
    }
  };
  /**
   * Checks if collision from top is valid for defeating enemy
   * @param {Character} character - The player character
   * @param {MovableObject} enemy - The enemy to check
   * @returns {boolean} True if valid top collision
   */
  static isValidTopCollision(character, enemy) {
    return character.isAboveGround() && 
           character.speedY < 0 && 
           character.isColliding(enemy) && 
           !enemy.dead;
  };
  /**
   * Handles enemy defeat with sound and removal
   * @param {World} world - The game world instance
   * @param {MovableObject} enemy - The defeated enemy
   */
  static handleEnemyDefeat(world, enemy) {
    enemy.deadChicken();
    AudioHub.playOne(AudioHub.chickenSound);
    setTimeout(() => {
      const currentIndex = world.level.enemies.indexOf(enemy);
      if (currentIndex > -1) {
        world.level.enemies.splice(currentIndex, 1);
      }
    }, 1000);
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
  };
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
        const currentTime = new Date().getTime();
        if (currentTime - world.character.lastHurtSound > 400) { 
          AudioHub.playOne(AudioHub.pepeSound);
          world.character.lastHurtSound = currentTime;
        }
        world.statusBar.setPercentage(world.character.healthPepe);
      }
    });
  };
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
        const currentTime = new Date().getTime();
        if (currentTime - world.character.lastHurtSound > 400) { 
          AudioHub.playOne(AudioHub.pepeSound);
          world.character.lastHurtSound = currentTime;
        }
        world.statusBar.setPercentage(world.character.healthPepe);
      }
    });
  };
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
        const currentTime = new Date().getTime();
        if (currentTime - world.character.lastHurtSound > 400) { 
          AudioHub.playOne(AudioHub.pepeSound);
          world.character.lastHurtSound = currentTime;
        }
        world.statusBar.setPercentage(world.character.healthPepe);
      }
    });
  };
  /**
   * Checks for boss attack patterns and proximity to character.
   * Triggers boss behavior when character approaches.
   * @param {World} world - Reference to the game world instance
   */
  static checkBossAttack(world) {
    world.level.endboss.forEach((boss) => {
      if (world.character.x >= 2000) {
        boss.endbossAttack();
      }
    });
  };
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
  }:
  /**
   * Checks for collectible item interactions (coins and bottles).
   * Handles item collection and status bar updates.
   * @param {World} world - Reference to the game world instance
   */
  static checkCollectibles(world) {
    CollisionManager.checkCoinCollection(world);
    CollisionManager.checkBottleCollection(world);
  };
  /**
   * Handles coin collection interactions
   * @param {World} world - Reference to the game world instance
   */
  static checkCoinCollection(world) {
    world.level.coins.forEach((coin, index) => {
      if (world.character.isColliding(coin)) {
        world.character.coins++;
        world.statusBarCoins.setPercentage(world.character.coins);
        world.level.coins.splice(index, 1);
        AudioHub.playOne(AudioHub.coinSound);
      }
    });
  };
  /**
   * Handles bottle collection interactions
   * @param {World} world - Reference to the game world instance
   */
  static checkBottleCollection(world) {
    world.level.bottles.forEach((bottle, index) => {
      if (world.character.isColliding(bottle)) {
        world.character.bottles++;
        world.statusBarBottles.setPercentage(world.character.bottles);
        world.level.bottles.splice(index, 1);
        AudioHub.playOne(AudioHub.bottleSound);
      }
    });
  };
  /**
   * Checks for throwable object collisions and interactions.
   * Handles bottle throwing mechanics and character throw action registration.
   * @param {World} world - Reference to the game world instance
   */
  static checkThrowableObject(world) {
    if (world.keyboard.THROW && world.character.bottles > 0) {
      CollisionManager.createAndThrowBottle(world);
      CollisionManager.updateThrowState(world);
    }
  };
  /**
   * Creates and throws a new bottle object
   * @param {World} world - Reference to the game world instance
   */
  static createAndThrowBottle(world) {
    let bottle = new ThrowableObject(world.character.x + 100, world.character.y + 100);
    world.throwableObjects.push(bottle);
  };
  /**
   * Updates character state after throwing
   * @param {World} world - Reference to the game world instance
   */
  static updateThrowState(world) {
    world.character.bottles--;
    world.statusBarBottles.setPercentage(world.character.bottles);
    world.character.registerThrowAction();
    world.keyboard.THROW = false;
  };
  /**
   * Animates coin objects with floating movement.
   * Provides visual feedback and makes coins more noticeable.
   * @param {World} world - Reference to the game world instance
   */
  static moveCoins(world) {
    if (world.level && world.level.coins) {
      world.level.coins.forEach((coin) => {
        coin.y += Math.sin(Date.now() * 0.002 + coin.x * 0.01) * 0.5;
      });
    }
  }
}