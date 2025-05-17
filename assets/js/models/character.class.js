class Character extends MovableObject {
  x = 160;
  y = 80;
  width = 120;
  height = 250;
  speed = 16;
  speedY = 0;
  offset = {
    top: 110,
    right: 70,
    bottom: 15,
    left: 20,
  };

  healthPepe = 120;
  otherDirection = false;
  lastMoveTime = 0;
  idleTimer = null;
  isLongIdle = false;

  images_idle = [
    "assets/images/2_character_pepe/1_idle/idle/I-1.png",
    "assets/images/2_character_pepe/1_idle/idle/I-2.png",
    "assets/images/2_character_pepe/1_idle/idle/I-3.png",
    "assets/images/2_character_pepe/1_idle/idle/I-4.png",
    "assets/images/2_character_pepe/1_idle/idle/I-5.png",
    "assets/images/2_character_pepe/1_idle/idle/I-6.png",
    "assets/images/2_character_pepe/1_idle/idle/I-7.png",
    "assets/images/2_character_pepe/1_idle/idle/I-8.png",
    "assets/images/2_character_pepe/1_idle/idle/I-9.png",
    "assets/images/2_character_pepe/1_idle/idle/I-10.png",
  ];

  images_long_idle = [
    "assets/images/2_character_pepe/1_idle/long_idle/I-11.png",
    "assets/images/2_character_pepe/1_idle/long_idle/I-12.png",
    "assets/images/2_character_pepe/1_idle/long_idle/I-13.png",
    "assets/images/2_character_pepe/1_idle/long_idle/I-14.png",
    "assets/images/2_character_pepe/1_idle/long_idle/I-15.png",
    "assets/images/2_character_pepe/1_idle/long_idle/I-17.png",
    "assets/images/2_character_pepe/1_idle/long_idle/I-18.png",
    "assets/images/2_character_pepe/1_idle/long_idle/I-19.png",
    "assets/images/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  images_walking = [
    "assets/images/2_character_pepe/2_walk/W-21.png",
    "assets/images/2_character_pepe/2_walk/W-22.png",
    "assets/images/2_character_pepe/2_walk/W-23.png",
    "assets/images/2_character_pepe/2_walk/W-24.png",
    "assets/images/2_character_pepe/2_walk/W-25.png",
    "assets/images/2_character_pepe/2_walk/W-26.png",
  ];

  images_jumping = [
    "assets/images/2_character_pepe/3_jump/J-31.png",
    "assets/images/2_character_pepe/3_jump/J-32.png",
    "assets/images/2_character_pepe/3_jump/J-33.png",
    "assets/images/2_character_pepe/3_jump/J-34.png",
    "assets/images/2_character_pepe/3_jump/J-35.png",
    "assets/images/2_character_pepe/3_jump/J-36.png",
    "assets/images/2_character_pepe/3_jump/J-37.png",
    "assets/images/2_character_pepe/3_jump/J-38.png",
    "assets/images/2_character_pepe/3_jump/J-39.png",
  ];

  images_hurt = [
    "assets/images/2_character_pepe/4_hurt/H-41.png", 
    "assets/images/2_character_pepe/4_hurt/H-42.png", 
    "assets/images/2_character_pepe/4_hurt/H-43.png"
  ];

  images_dead = [
    "assets/images/2_character_pepe/5_dead/D-51.png",
    "assets/images/2_character_pepe/5_dead/D-52.png",
    "assets/images/2_character_pepe/5_dead/D-53.png",
    "assets/images/2_character_pepe/5_dead/D-54.png",
    "assets/images/2_character_pepe/5_dead/D-55.png",
    "assets/images/2_character_pepe/5_dead/D-56.png",
    "assets/images/2_character_pepe/5_dead/D-57.png",
  ];

  world;
  constructor() {
    super().loadImage("assets/images/2_character_pepe/1_idle/idle/I-10.png");
    this.loadImages(this.images_idle);
    this.loadImages(this.images_long_idle);
    this.loadImages(this.images_walking);
    this.loadImages(this.images_jumping);
    this.loadImages(this.images_hurt);
    this.loadImages(this.images_dead);
    this.getRealFrame();
    this.applyGravity();
    this.animate();
  }

  animate() {
    // Don't animate if world or keyboard isn't available yet
    if (!this.world || !this.world.keyboard) {
      return;
    }

    const now = new Date().getTime();
    const k = this.world.keyboard;
    
    // Check if character is moving
    if (k.RIGHT || k.LEFT || k.UP || k.DOWN || k.SPACE) {
      this.lastMoveTime = now;
      this.isLongIdle = false;
      
      // Clear any existing idle timer
      if (this.idleTimer) {
        clearTimeout(this.idleTimer);
        this.idleTimer = null;
      }
      
      // Set up a new idle timer (5 seconds)
      this.idleTimer = setTimeout(() => {
        this.isLongIdle = true;
      }, 5000);
    }

    // Movement logic
    if (!this.isHurt() && !this.isDead) {
      if (k.RIGHT) {
        this.moveRight();
        this.otherDirection = false;
      }
      if (k.LEFT) {
        this.moveLeft();
        this.otherDirection = true;
      }
      if (k.SPACE && !this.isAboveGround()) {
        this.jump();
      }
      if (this.world.cameraX !== undefined) {
        this.world.cameraX = -this.x + 100; // Camera follow
      }
    }

    // Animation logic - only if we have images loaded
    if (this.isDead()) {
      this.playAnimation(this.images_dead);
    } else if (this.isHurt()) {
      this.playAnimation(this.images_hurt);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.images_jumping);
    } else if (k.RIGHT || k.LEFT) {
      this.playAnimation(this.images_walking);
    } else if (this.isLongIdle) {
      this.playAnimation(this.images_long_idle);
    } else if (this.images_idle) {
      this.playAnimation(this.images_idle);
    }
  }

  isLongIdleTime() {
    if (this.lastMoveTime === 0) return false;
    const idleTime = new Date().getTime() - this.lastMoveTime;
    return idleTime > 5000; // 5 seconds
  }

  hitPepe() {
    if (!this.isHurt()) {
      this.healthPepe -= 10;
      this.lastMoveTime = new Date().getTime();
      this.isLongIdle = false;
      if (this.idleTimer) {
        clearTimeout(this.idleTimer);
        this.idleTimer = null;
      }
      if (this.healthPepe <= 0) {
        this.healthPepe = 0;
        this.die();
      } else {
        this.hurt();
      }
    }
  }

  jump() {
    if (!this.isJumping) {
      this.speedY = 26;
      this.isJumping = true;
      this.playAnimationOnce(this.images_jumping, 80);
    }
  }

  startAnimation() {
    this.animate();
  }
}
