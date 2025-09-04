/**
 * Final boss enemy that appears at the end of the level.
 * Large, powerful chicken with multiple attack patterns and high health.
 * Provides the ultimate challenge and culmination of the game.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  /** @type {number} - Width of the boss sprite (much larger than regular enemies) */
  width = 200;

  /** @type {number} - Height of the boss sprite (much larger than regular enemies) */
  height = 450;

  /** @type {number} - X position at the end of the level */
  x = 3190;

  /** @type {number} - Y position (elevated compared to ground enemies) */
  y = 30;

  /**
   * @type {Object} - Collision box offset for boss combat
   * @property {number} top - Top offset
   * @property {number} right - Right offset
   * @property {number} bottom - Bottom offset
   * @property {number} left - Left offset
   */
  offset = {
    top: 100,
    right: 30,
    bottom: 40,
    left: 16,
  };

  /** @type {number} - Boss health points (much higher than regular enemies) */
  healthBoss = 95;
  /** @type {boolean} - True when boss is currently attacking */
  isAttacking = false;
  /** @type {string[]} - Animation frames for boss idle/alert state */
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

  /** @type {string[]} - Animation frames for boss walking movement */
  images_boss_walking = [
    "assets/images/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/images/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/images/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/images/4_enemie_boss_chicken/1_walk/G3.png",
  ];

  /** @type {string[]} - Animation frames for boss taking damage */
  images_boss_hurt = [
    "assets/images/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/images/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/images/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  /** @type {string[]} - Animation frames for boss death sequence */
  images_boss_dead = [
    "assets/images/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/images/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/images/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  /** @type {string[]} - Animation frames for boss attack sequence */
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

  /** @type {number} - Current frame index for animations */
  currentImage = 0;

  /**
   * Creates a new Endboss instance.
   * Initializes all animations and starts boss behavior patterns.
   */
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

  /**
   * Calculates time elapsed since last attack.
   * @returns {number} Time in seconds since last attack
   */
  lastAttack() {
    return (new Date().getTime() - this.lastMove) / 1000;
  }

  /**
   * Controls boss animation states based on health and status.
   * Plays appropriate animations for dead, hurt, or idle states.
   */
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
        this.playAnimation(this.images_boss_idle);
      }
    }, 300);
  }

  /**
   * Initiates boss attack pattern with alternating movement and attack phases.
   * Creates a cycling pattern between walking towards player and attacking.
   */
  startAttack() {
    let attackPhase = false;
    let attackStart = Date.now();
    gameIntervals(() => {
      if (this.isDead() || this.ishurt()) return;
      const now = Date.now();
      const time = now - attackStart;
      const result = this.handleAttackPhase(attackPhase, time, now);
      attackPhase = result.attackPhase;
      attackStart = result.attackStart;
    }, 300);
  }

  /**
   * Handles the current attack phase logic.
   * Switches between movement and attack phases based on timing.
   * @param {boolean} attackPhase - Current phase state
   * @param {number} time - Time elapsed in current phase
   * @param {number} now - Current timestamp
   * @returns {Object} Updated phase state and timing
   */
  handleAttackPhase(attackPhase, time, now) {
    if (!attackPhase) {
      return this.handleMovementPhase(time, now);
    } else {
      return this.handleAttackingPhase(time, now);
    }
  }
  /**
   * Handles the movement phase where boss walks towards player.
   * @param {number} time - Time elapsed in current phase
   * @param {number} now - Current timestamp
   * @returns {Object} Updated phase state and timing
   */
  handleMovementPhase(time, now) {
    this.speed = 10;
    this.playAnimation(this.images_boss_walking, 180);
    this.moveLeft();
    if (time >= 900) {
      this.stopMoving();
      return { attackPhase: true, attackStart: now };
    }
    return { attackPhase: false, attackStart: now - time };
  }

  /**
   * Handles the attacking phase where boss performs attack animation.
   * @param {number} time - Time elapsed in current phase
   * @param {number} now - Current timestamp
   * @returns {Object} Updated phase state and timing
   */
  handleAttackingPhase(time, now) {
    this.playAnimation(this.images_boss_attack, 180);
    if (time >= 1000) {
      return { attackPhase: false, attackStart: now };
    }
    return { attackPhase: true, attackStart: now - time };
  }

  /**
   * Stops boss movement by setting speed to zero.
   * Used during attack phases when boss should remain stationary.
   */
  stopMoving() {
    this.speed = 0;
  }
}
