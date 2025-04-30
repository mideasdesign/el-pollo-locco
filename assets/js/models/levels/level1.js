let level1;

function initLevel(){
    level1 = new Level(
      [new Chicken(), new Chicken(), new Chicken(), new Endboss()],
      [new Clouds('assets/images/5_background/layers/4_clouds/full.png', 0)],
      [
        new Coins(400, 330),
        new Coins(600, 330),
        new Coins(800, 330)
      ],
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
      new BackgroundObject("assets/images/5_background/layers/1_first_layer/1.png", 719 * 4),
    ]

  );
}
