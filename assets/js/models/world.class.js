/**
 * Main game world class that manages all game entities and game logic.
 * Delegates rendering and collision detection to specialized manager classes.
 */
class World {
  /** @type {Character} - The main player character */
  character = new Character();

  /** @type {StatusBar} - Health status bar UI element */
  statusBar = new StatusBar();

  /** @type {CoinsBar} - Coin counter UI element */
  coinsBar = new CoinsBar();

  /** @type {BottlesBar} - Bottle counter UI element */
  bottlesBar = new BottlesBar();

  /** @type {BossBar} - Boss health bar UI element */
  bossBar = new BossBar();

  /** @type {ThrowableObject[]} - Array of thrown bottle objects */
  throwableObject = [];

  /** @type {Endboss} - The final boss enemy */
  endboss = new Endboss();

  /** @type {HTMLCanvasElement} - The game canvas */
  canvas;

  /** @type {CanvasRenderingContext2D} - Canvas 2D rendering context */
  ctx;
  /** @type {Keyboard} - Keyboard input handler */
  keyboard;

  /** @type {number} - Camera X position for scrolling */
  cameraX = 0;

  /** @type {Level} - Current game level data */
  level = level1;

  /** @type {boolean} - True when boss attack sequence has been triggered */
  bossAttackTriggered = false;

  /** @type {number} - Timestamp of last bottle throw for cooldown control */
  lastThrowTime = 0;

  /** @type {number} - Minimum time between throws in milliseconds (500ms = 0.5 seconds) */
  throwCooldown = 500;

  /** @type {RenderingManager} - Handles all rendering operations */
  renderingManager;

  /** @type {CollisionManager} - Handles all collision detection */
  collisionManager;

  /**
   * Creates a new World instance.
   * @param {HTMLCanvasElement} canvas - The game canvas element
   * @param {Keyboard} keyboard - The keyboard input handler
   */
  constructor(canvas, keyboard) {
    this.initializeCanvas(canvas, keyboard);
    this.initializeManagers();
    this.initializeGame();
  };

  /**
   * Initializes canvas context and keyboard controls.
   * Sets up the 2D rendering context and touch controls.
   * @param {HTMLCanvasElement} canvas - The game canvas element
   * @param {Keyboard} keyboard - The keyboard input handler
   */
  initializeCanvas(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
  };

  /**
   * Initializes the manager classes for rendering and collision detection.
   */
  initializeManagers() {
    this.renderingManager = new RenderingManager(this.ctx, this.canvas, this);
    this.collisionManager = new CollisionManager(this);
  };

  /**
   * Initializes the game world and starts main game loops.
   * Sets up drawing, world references, collision detection, and game logic.
   */
  initializeGame() {
    this.draw();
    this.setWorld();
    this.collisionManager.startCollisionChecks();
    this.run();
  };

  /**
   * Establishes bidirectional reference between world and character.
   * Allows character to access world properties and starts character animation.
   */
  setWorld() {
    this.character.world = this;
    this.character.startAnimation();
  };

  /**
   * Main game loop that handles ongoing collision detection.
   */
  run() {
    this.collisionManager.runCollisionChecks();
  };

  /**
   * Main drawing method - delegates to rendering manager.
   */
  draw() {
    this.renderingManager.draw();
  }
};
