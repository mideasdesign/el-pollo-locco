function initLevel() {
  level1 = new Level(
    [new Chicken(), new Chicken(), new Chicken()],
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
      new Coins(450, 230),
      new Coins(630, 250),
      new Coins(950, 230),
      new Coins(1030, 260),
      new Coins(1050, 250),
      new Coins(1090, 230),
      new Coins(1130, 260),
      new Coins(1150, 250)
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
      new Bottles(1650, 350)
    ]
  );
}