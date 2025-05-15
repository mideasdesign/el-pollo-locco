class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    chicks;
    level_end_x = 3090;
    constructor(enemies, chicks, clouds, backgroundObjects, coins, bottles) {
      this.enemies = enemies;
      this.chicks = chicks;
      this.clouds = clouds;
      this.backgroundObjects = backgroundObjects;
      this.coins = coins;
      this.bottles = bottles;
    };
  }