/**
 * @fileoverview Documentation completion status for El Pollo Loco project
 * This file tracks which components have been documented with JSDoc
 */

/**
 * @namespace Documentation
 * @description JSDoc documentation status tracking
 */

/**
 * List of fully documented files with JSDoc comments
 * @type {string[]}
 * @memberof Documentation
 */
const DOCUMENTED_FILES = [
  // Core Game Classes
  'character.class.js',           // Player character with movement and animation
  'world.class.js',              // Game world manager and collision detection  
  'movable-objects.class.js',    // Base class for all movable objects
  'drawable-objects.class.js',   // Base class for all drawable objects
  'level.class.js',              // Level data structure
  'audioHub.class.js',           // Central audio management system
  
  // Enemy Classes  
  'chicken.class.js',            // Normal chicken enemies
  'chicks.class.js',             // Small chick enemies
  'end-boss.class.js',           // Final boss enemy
  
  // Collectible Objects
  'coins.class.js',              // Collectible coins
  'bottles.class.js',            // Collectible bottles
  'throwable-objects.class.js',  // Throwable bottle projectiles
  
  // UI Elements
  'status-bar.class.js',         // Base status bar
  'coins-bar.class.js',          // Coin counter UI
  'bottle-bar.class.js',         // Bottle counter UI
  'boss-bar.class.js',           // Boss health bar UI
  
  // Background Elements
  'background.class.js',         // Static background objects
  'clouds.class.js',             // Animated cloud objects
  
  // Input/Control
  'keyboard.class.js',           // Keyboard input handler
  
  // Game Management
  'game.js',                     // Main game functions
  'level1.js',                   // Level 1 configuration
  'new_game.js',                 // Game startup sequence
  
  // Configuration
  'jsdoc.conf.json',             // JSDoc configuration
  'jsdoc-definitions.js'         // Custom type definitions
];

/**
 * Total number of documented files
 * @type {number}
 * @memberof Documentation  
 */
const TOTAL_DOCUMENTED = DOCUMENTED_FILES.length;

/**
 * Documentation completion summary
 * @type {Object}
 * @memberof Documentation
 * @property {number} totalFiles - Total files documented
 * @property {string} status - Documentation status
 * @property {string} lastUpdated - Last update date
 */
const DOCUMENTATION_STATUS = {
  totalFiles: TOTAL_DOCUMENTED,
  status: 'Complete - All core game files documented',
  lastUpdated: '2025-07-27',
  coverage: '100% of identified game files'
};
