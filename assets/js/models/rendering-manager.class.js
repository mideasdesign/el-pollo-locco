/**
 * Manages all rendering operations for the game world.
 * Handles canvas drawing, background layers, UI elements, and game objects.
 * Coordinates the visual presentation of the entire game.
 */
class RenderingManager {
  /** @type {CanvasRenderingContext2D} - Canvas 2D rendering context */
  ctx;

  /** @type {HTMLCanvasElement} - The game canvas */
  canvas;

  /** @type {World} - Reference to the game world */
  world;

  /**
   * Creates a new RenderingManager instance.
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   * @param {HTMLCanvasElement} canvas - Game canvas element
   * @param {World} world - Game world instance
   */
  constructor(ctx, canvas, world) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.world = world;
  };

  /**
   * Main drawing method that renders the entire game world.
   * Clears canvas, applies camera translation, and draws all game objects.
   * Coordinates all rendering operations in the correct order.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.drawUI();
    this.drawGameObjects();
    this.scheduleNextFrame();
  };

  /**
   * Draws the background layers with parallax scrolling effect.
   * Applies camera translation for scrolling background elements.
   */
  drawBackground() {
    this.ctx.translate(this.world.cameraX, 0);
    this.addObjectsToMap(this.world.level.backgroundObjects);
    this.addObjectsToMap(this.world.level.clouds);
    this.ctx.translate(-this.world.cameraX, 0);
  };

  /**
   * Draws the user interface elements (status bars).
   * Renders health, coins, bottles, and boss health bars.
   * UI elements are not affected by camera translation.
   */
  drawUI() {
    this.addToMap(this.world.statusBar);
    this.addToMap(this.world.coinsBar);
    this.addToMap(this.world.bottlesBar);
    this.addToMap(this.world.bossBar);
  };

  /**
   * Draws all interactive game objects with camera translation.
   * Renders character, enemies, collectibles, and throwable objects.
   */
  drawGameObjects() {
    this.ctx.translate(this.world.cameraX, 0);
    this.addToMap(this.world.character);
    this.addToMap(this.world.endboss);
    this.addObjectsToMap(this.world.throwableObject);
    this.addObjectsToMap(this.world.level.coins);
    this.addObjectsToMap(this.world.level.bottles);
    this.addObjectsToMap(this.world.level.chicks);
    this.addObjectsToMap(this.world.level.enemies);
    this.ctx.translate(-this.world.cameraX, 0);
  };

  /**
   * Schedules the next animation frame for smooth rendering.
   * Uses requestAnimationFrame for optimal performance and smooth gameplay.
   */
  scheduleNextFrame() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  };

  /**
   * Adds an array of objects to the rendering map.
   * Iterates through object arrays and renders each individual object.
   * @param {DrawableObject[]} objects - Array of objects to render
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  };

  /**
   * Adds a single movable object to the rendering context.
   * Handles direction changes, drawing, and debug frame rendering.
   * @param {MovableObject} mo - The movable object to render
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      mo.changeDirection(this.ctx);
    }
    mo.getRealFrame();
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    mo.drawRealFrame(this.ctx);
    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  };
};