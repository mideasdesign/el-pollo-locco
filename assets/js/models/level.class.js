/**
 * Represents a game level containing all entities and objects.
 * Manages the complete structure of a level including enemies, 
 * background elements, collectibles, and level boundaries.
 */
class Level {
  /** @type {Enemy[]} - Array of main enemy objects (chickens) */
  enemies;
  /** @type {Cloud[]} - Array of cloud objects for atmosphere */
  clouds;
  /** @type {BackgroundObject[]} - Array of background layer objects */
  backgroundObjects;
  /** @type {Coin[]} - Array of collectible coin objects */
  coins;
  /** @type {Bottle[]} - Array of collectible bottle objects */
  bottles;
  /** @type {Chicks[]} - Array of small enemy objects (chicks) */
  chicks;
  /** @type {number} - X coordinate where the level ends (triggers boss or completion) */
  level_end_x = 3090;
  /**
   * Creates a new Level instance with all game entities.
   * @param {Enemy[]} enemies - Array of main enemy objects
   * @param {Chicks[]} chicks - Array of small enemy objects  
   * @param {Cloud[]} clouds - Array of cloud objects
   * @param {BackgroundObject[]} backgroundObjects - Array of background elements
   * @param {Coin[]} coins - Array of collectible coins
   * @param {Bottle[]} bottles - Array of collectible bottles
   */
  constructor(enemies, chicks, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.chicks = chicks;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  };
}