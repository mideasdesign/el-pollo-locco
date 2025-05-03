class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    endboss;
    bottles;
    level_end_x = 3090;
    constructor(enemies, clouds, backgroundObjects, coins, bottles, endboss) {
      this.enemies = enemies;
      this.clouds = clouds;
      this.backgroundObjects = backgroundObjects;
      this.coins = coins;
      this.bottles = bottles;
      this.endboss = endboss;
    }
  }