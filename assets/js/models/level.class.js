class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    endboss;
    level_end_x = 2390;
    constructor(enemies, clouds, backgroundObjects, coins, endboss) {
      this.enemies = enemies;
      this.clouds = clouds;
      this.backgroundObjects = backgroundObjects;
      this.coins = coins;
      this.endboss = endboss;
    }
  }