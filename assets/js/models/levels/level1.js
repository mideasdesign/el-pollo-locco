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
    // Enemies - Array of normal chickens (primary threats)
    [new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken()],
    
    // Small enemies - Mix of chicks and chickens (secondary threats)
    // Small enemies - Mix of chicks and chickens (secondary threats)
    [new Chicks(), new Chicks(), new Chicks(), new Chicken(), new Chicks(), new Chicks(), new Chicks(), new Chicks(), new Chicken(), new Chicks(), new Chicks(), new Chicks(), new Chicks(), new Chicken(), new Chicks()],
    
    // Clouds - Atmospheric background elements positioned across the level
    [
      new Clouds('assets/images/5_background/layers/4_clouds/1.png', 0),
      new Clouds('assets/images/5_background/layers/4_clouds/2.png', 500),
      new Clouds('assets/images/5_background/layers/4_clouds/1.png', 1000),
      new Clouds('assets/images/5_background/layers/4_clouds/2.png', 1600),
      new Clouds('assets/images/5_background/layers/4_clouds/1.png', 2000),
      new Clouds('assets/images/5_background/layers/4_clouds/2.png',2250),
      new Clouds('assets/images/5_background/layers/4_clouds/2.png', 2800),
      new Clouds('assets/images/5_background/layers/4_clouds/1.png',3100),
    ],
    
    // Background objects - Multi-layer parallax scrolling background
    // Creates seamless desert landscape with 4 layers (air, third, second, first) 
    // Each section is 719px wide, repeated 5 times for total level width
    [
      // Section 1 (0px) - Level start
      new BackgroundObject('assets/images/5_background/layers/air.png', 0),
      new BackgroundObject('assets/images/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('assets/images/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('assets/images/5_background/layers/1_first_layer/1.png', 0),
      
      // Section 2 (719px)
      new BackgroundObject('assets/images/5_background/layers/air.png', 719),
      new BackgroundObject('assets/images/5_background/layers/3_third_layer/2.png', 719),
      new BackgroundObject('assets/images/5_background/layers/2_second_layer/2.png', 719),
      new BackgroundObject('assets/images/5_background/layers/1_first_layer/2.png', 719),
      
      // Section 3 (1438px)
      new BackgroundObject('assets/images/5_background/layers/air.png', 719 * 2),
      new BackgroundObject('assets/images/5_background/layers/3_third_layer/1.png', 719 * 2),
      new BackgroundObject('assets/images/5_background/layers/2_second_layer/1.png', 719 * 2),
      new BackgroundObject('assets/images/5_background/layers/1_first_layer/1.png', 719 * 2),
      
      // Section 4 (2157px)
      new BackgroundObject('assets/images/5_background/layers/air.png', 719 * 3),
      new BackgroundObject('assets/images/5_background/layers/3_third_layer/2.png', 719 * 3),
      new BackgroundObject('assets/images/5_background/layers/2_second_layer/2.png', 719 * 3),
      new BackgroundObject('assets/images/5_background/layers/1_first_layer/2.png', 719 * 3),
      
      // Section 5 (2876px) - Level end area
      new BackgroundObject('assets/images/5_background/layers/air.png', 719 * 4),
      new BackgroundObject('assets/images/5_background/layers/3_third_layer/1.png', 719 * 4),
      new BackgroundObject('assets/images/5_background/layers/2_second_layer/1.png', 719 * 4),
      new BackgroundObject('assets/images/5_background/layers/1_first_layer/1.png', 719 * 4),
      
      // Section 6 (3595px) - Extended area for boss fight
      new BackgroundObject('assets/images/5_background/layers/air.png', 719 * 5),
      new BackgroundObject('assets/images/5_background/layers/3_third_layer/2.png', 719 * 5),
      new BackgroundObject('assets/images/5_background/layers/2_second_layer/2.png', 719 * 5),
      new BackgroundObject('assets/images/5_background/layers/1_first_layer/2.png', 719 * 5),
    ],
    
    // Collectible coins - Strategic placement for encouraging exploration
    // Positioned at varying heights to require jumping and skillful movement
    [
      new Coins(450, 130),   // Early game coins
      new Coins(630, 150),
      new Coins(950, 130),
      new Coins(1020, 160),
      new Coins(1110, 190),  // Higher placement requires jumping
      new Coins(1190, 130),
      new Coins(1290, 160),
      new Coins(1390, 150),
      new Coins(1500, 130),  // Mid-level coins
      new Coins(1600, 150),
      new Coins(1820, 130),
      new Coins(2000, 160),
      new Coins(2100, 190),  // Challenging high placement
      new Coins(2200, 180),
      new Coins(2290, 160),
      new Coins(2400, 150)   // End-level coins
    ],

    // Collectible bottles - Ammunition for throwing at enemies
    // Ground-level placement for easy collection during movement
    [
      new Bottles(680, 330),   // Early game bottles
      new Bottles(830, 350),
      new Bottles(1050, 330),
      new Bottles(1120, 360),
      new Bottles(1200, 350),
      new Bottles(1420, 330),  // Mid-level bottles
      new Bottles(1450, 360),
      new Bottles(1650, 350),
      new Bottles(1650, 350),  // Duplicate for increased availability
      new Bottles(1800, 330),
      new Bottles(1880, 350),
      new Bottles(2050, 330),  // Late-game bottles for boss preparation
      new Bottles(2150, 360),
      new Bottles(2300, 350),
      new Bottles(2400, 330),
      new Bottles(2600, 360),
      new Bottles(2690, 350),
      new Bottles(2710, 350)   // Final bottles before boss area
    ]
  );
}