function initLevel() {
  level1 = new Level(
    [new Chicken(), new Chicken(), new Chicken(), new Endboss()],
    [new Clouds()],
    [
      new BackgroundObject("assets/images/5_background/layers/air.png", 0),
      new BackgroundObject("assets/images/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("assets/images/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("assets/images/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("assets/images/5_background/layers/air.png", 719),
      new BackgroundObject("assets/images/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("assets/images/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("assets/images/5_background/layers/1_first_layer/2.png", 719),
      new BackgroundObject("assets/images/5_background/layers/air.png", 719 * 2),
      new BackgroundObject("assets/images/5_background/layers/3_third_layer/1.png", 719 * 2),
      new BackgroundObject("assets/images/5_background/layers/2_second_layer/1.png", 719 * 2),
      new BackgroundObject("assets/images/5_background/layers/1_first_layer/1.png", 719 * 2),
      new BackgroundObject("assets/images/5_background/layers/air.png", 719 * 3),
      new BackgroundObject("assets/images/5_background/layers/3_third_layer/1.png", 719 * 3),
      new BackgroundObject("assets/images/5_background/layers/2_second_layer/1.png", 719 * 3),
      new BackgroundObject("assets/images/5_background/layers/1_first_layer/1.png", 719 * 3),
      new BackgroundObject("assets/images/5_background/layers/air.png", 719 * 4),
      new BackgroundObject("assets/images/5_background/layers/3_third_layer/1.png", 719 * 4),
      new BackgroundObject("assets/images/5_background/layers/2_second_layer/1.png", 719 * 4),
      new BackgroundObject("assets/images/5_background/layers/1_first_layer/1.png", 719 * 4)
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
      new Bottles(450, 330),
      new Bottles(630, 350),
      new Bottles(950, 330),
      new Bottles(1020, 360),
      new Bottles(1100, 350),
      new Bottles(1220, 330),
      new Bottles(1330, 360),
      new Bottles(1450, 350)
    ]
  );
}