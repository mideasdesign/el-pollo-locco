class Endboss extends MovableObject {
  width = 200;
  height = 450;
  x = 3090;
  y = 30;
  offset = {
    top: 100,
    right: 30,
    bottom: 40,
    left: 16,
  };

  healthBoss = 100;
  isAttacking = false;

  images_idle = [
    "assets/images/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/images/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/images/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/images/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/images/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/images/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/images/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/images/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  images_boss_walking = [
    "assets/images/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/images/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/images/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/images/4_enemie_boss_chicken/1_walk/G3.png",
  ];

  images_boss_hurt = ["assets/images/4_enemie_boss_chicken/4_hurt/G21.png", "assets/images/4_enemie_boss_chicken/4_hurt/G22.png", "assets/images/4_enemie_boss_chicken/4_hurt/G23.png"];

  images_boss_dead = ["assets/images/4_enemie_boss_chicken/5_dead/G24.png", "assets/images/4_enemie_boss_chicken/5_dead/G25.png", "assets/images/4_enemie_boss_chicken/5_dead/G26.png"];

  images_boss_attack = [
    "assets/images/4_enemie_boss_chicken/3_attack/G13.png",
    "assets/images/4_enemie_boss_chicken/3_attack/G14.png",
    "assets/images/4_enemie_boss_chicken/3_attack/G15.png",
    "assets/images/4_enemie_boss_chicken/3_attack/G16.png",
    "assets/images/4_enemie_boss_chicken/3_attack/G17.png",
    "assets/images/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/images/4_enemie_boss_chicken/3_attack/G19.png",
    "assets/images/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  currentImage = 0;
  constructor() {
    super().loadImage("assets/images/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.images_idle);
    this.loadImages(this.images_boss_hurt);
    this.loadImages(this.images_boss_attack);
    this.loadImages(this.images_boss_dead);
    this.loadImages(this.images_boss_walking);
    this.getRealFrame();
    this.animate();
    this.startAttack();
  }

  animate() {
    gameIntervals(() => {
      if (this.isDead()) {
        this.playAnimationOnce(this.images_boss_dead);
        AudioHub.playOne(AudioHub.youwinSound);
        gameWon();
      } else if (this.ishurt()) {
        AudioHub.playOne(AudioHub.endbossHurtSound);
        this.playAnimation(this.images_boss_hurt);
      } else {
        this.playAnimation(this.images_idle);
      }
    }, 300);
  }
  startAttack() {
    gameIntervals(() => {
      AudioHub.playOne(AudioHub.attackSound);
      if (this.ishurt()) {
        this.playAnimation(this.images_boss_hurt);
      } else {
        this.moveLeft();
        this.playAnimation(this.images_boss_walking);
      }
    }, 300);
  }
}

