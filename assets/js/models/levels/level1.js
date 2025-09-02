/**
 * @fileoverview Level 1 configuration for El Pollo Loco game
 * Defines all enemies, background elements, collectibles and level structure
 */

/** @type {Level} - Global reference to level 1 instance */
let level1;

/**
 * Initializes Level 1 with all game entities and objects.
 * Creates enemies, background layers, clouds, collectible items and sets level boundaries.
 * This function is called when starting a new game to set up the complete level structure.
 * 
 * Level structure includes:
 * - 19 normal chickens as primary enemies
 * - 15 small chicks mixed with chickens as secondary enemies  
 * - 8 cloud objects for atmospheric background
 * - Multi-layer parallax background (5 sections × 4 layers each)
 * - 16 collectible coins positioned throughout the level
 * - 18 collectible bottles for throwing mechanic
 * 
 * @function
 * @global
 */
function initLevel() {
  level1 = new Level(

    [new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken()],

    [new Chicks(), new Chicks(), new Chicks(), new Chicken(), new Chicks(), new Chicks(), new Chicks(), new Chicks(), new Chicken(), new Chicks(), new Chicks(), new Chicks(), new Chicks(), new Chicken(), new Chicks()],

    [
      new Clouds('assets/images/5_background/layers/4_clouds/1.png', 0),
      new Clouds('assets/images/5_background/layers/4_clouds/2.png', 500),
      new Clouds('assets/images/5_background/layers/4_clouds/1.png', 1000),
      new Clouds('assets/images/5_background/layers/4_clouds/2.png', 1600),
      new Clouds('assets/images/5_background/layers/4_clouds/1.png', 2000),
      new Clouds('assets/images/5_background/layers/4_clouds/2.png', 2250),
      new Clouds('assets/images/5_background/layers/4_clouds/2.png', 2800),
      new Clouds('assets/images/5_background/layers/4_clouds/1.png', 3100),
    ],

    [

      new BackgroundObject('assets/images/5_background/layers/air.png', 0),
      new BackgroundObject('assets/images/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('assets/images/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('assets/images/5_background/layers/1_first_layer/1.png', 0),

      new BackgroundObject('assets/images/5_background/layers/air.png', 719),
      new BackgroundObject('assets/images/5_background/layers/3_third_layer/2.png', 719),
      new BackgroundObject('assets/images/5_background/layers/2_second_layer/2.png', 719),
      new BackgroundObject('assets/images/5_background/layers/1_first_layer/2.png', 719),

      new BackgroundObject('assets/images/5_background/layers/air.png', 719 * 2),
      new BackgroundObject('assets/images/5_background/layers/3_third_layer/1.png', 719 * 2),
      new BackgroundObject('assets/images/5_background/layers/2_second_layer/1.png', 719 * 2),
      new BackgroundObject('assets/images/5_background/layers/1_first_layer/1.png', 719 * 2),

      new BackgroundObject('assets/images/5_background/layers/air.png', 719 * 3),
      new BackgroundObject('assets/images/5_background/layers/3_third_layer/2.png', 719 * 3),
      new BackgroundObject('assets/images/5_background/layers/2_second_layer/2.png', 719 * 3),
      new BackgroundObject('assets/images/5_background/layers/1_first_layer/2.png', 719 * 3),

      new BackgroundObject('assets/images/5_background/layers/air.png', 719 * 4),
      new BackgroundObject('assets/images/5_background/layers/3_third_layer/1.png', 719 * 4),
      new BackgroundObject('assets/images/5_background/layers/2_second_layer/1.png', 719 * 4),
      new BackgroundObject('assets/images/5_background/layers/1_first_layer/1.png', 719 * 4),

      new BackgroundObject('assets/images/5_background/layers/air.png', 719 * 5),
      new BackgroundObject('assets/images/5_background/layers/3_third_layer/2.png', 719 * 5),
      new BackgroundObject('assets/images/5_background/layers/2_second_layer/2.png', 719 * 5),
      new BackgroundObject('assets/images/5_background/layers/1_first_layer/2.png', 719 * 5),
    ],

    [
      new Coins(450, 130),
      new Coins(630, 150),
      new Coins(950, 130),
      new Coins(1020, 160),
      new Coins(1110, 190),
      new Coins(1190, 130),
      new Coins(1290, 160),
      new Coins(1390, 150),
      new Coins(1500, 130),
      new Coins(1600, 150),
      new Coins(1820, 130),
      new Coins(2000, 160),
      new Coins(2100, 190),
      new Coins(2200, 180),
      new Coins(2290, 160),
      new Coins(2400, 150)
    ],

    [
      new Bottles(680, 330),
      new Bottles(830, 350),
      new Bottles(1050, 330),
      new Bottles(1120, 360),
      new Bottles(1200, 350),
      new Bottles(1420, 330),
      new Bottles(1450, 360),
      new Bottles(1650, 350),
      new Bottles(1650, 350),
      new Bottles(1800, 330),
      new Bottles(1880, 350),
      new Bottles(2050, 330),
      new Bottles(2150, 360),
      new Bottles(2300, 350),
      new Bottles(2400, 330),
      new Bottles(2600, 360),
      new Bottles(2690, 350),
      new Bottles(2710, 350)
    ]
  );
}