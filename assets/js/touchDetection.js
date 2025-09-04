/**
 * @fileoverview Touch Detection and Device Capabilities Utility
 * @description Detects touch devices and activates corresponding UI elements
 */
/**
 * Detects if the device has touch capabilities
 * @returns {boolean} True if touch support is available
 */
function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0 ||
    ("onpointerdown" in window && navigator.maxTouchPoints > 0) ||
    (window.DocumentTouch && document instanceof DocumentTouch)
  );
}

/**
 * Detects if the device is a tablet (iPad, Android Tablet, etc.)
 * @returns {boolean} True if it's a tablet device
 */
function isTablet() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (
    /ipad/.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  ) {
    return true;
  }
  if (/android/.test(userAgent) && !/mobile/.test(userAgent)) {
    return true;
  }
  if (/windows/.test(userAgent) && /touch/.test(userAgent)) {
    return true;
  }
  if (
    isTouchDevice() &&
    window.innerWidth >= 768 &&
    window.innerWidth <= 2732
  ) {
    return true;
  }
  return false;
}

/**
 * Detects primary input method based on device characteristics
 * @returns {string} 'touch', 'mouse', or 'hybrid'
 */
function getPrimaryInputMethod() {
  if (isTablet()) {
    return "touch";
  }
  if (
    isTouchDevice() &&
    window.innerWidth > 1366 &&
    navigator.maxTouchPoints > 1
  ) {
    return "hybrid";
  }
  if (isTouchDevice() && window.innerWidth < 768) {
    return "touch";
  }
  if (!isTouchDevice()) {
    return "mouse";
  }
  return "touch";
}

/**
 * Activates/deactivates touch controls based on device detection
 */
function setupInputControls() {
  const inputMethod = getPrimaryInputMethod();
  const elements = getUIElements();
  switch (inputMethod) {
    case "touch":
      configureTouchMode(elements);
      break;
    case "hybrid":
      configureHybridMode(elements);
      break;
    case "mouse":
    default:
      configureMouseMode(elements);
      break;
  }
}

/**
 * Gets all UI elements needed for input configuration
 * @returns {Object} Object containing UI element references
 */
function getUIElements() {
  return {
    touchControls: document.getElementById("controls-box"),
    desktopInstructions: document.querySelector(".desktop-keys"),
    mobileInstructions: document.querySelector(".mobile-keys"),
  };
}

/**
 * Configures UI for touch-only devices
 * @param {Object} elements - UI element references
 */
function configureTouchMode(elements) {
  if (elements.touchControls)
    elements.touchControls.classList.add("show-touch-controls");
  if (elements.desktopInstructions)
    elements.desktopInstructions.style.display = "none";
  if (elements.mobileInstructions)
    elements.mobileInstructions.style.display = "flex";
  setupTouchControls();
}

/**
 * Configures UI for hybrid devices (touch + mouse)
 * @param {Object} elements - UI element references
 */
function configureHybridMode(elements) {
  if (elements.touchControls)
    elements.touchControls.classList.add("show-touch-controls");
  if (elements.desktopInstructions)
    elements.desktopInstructions.style.display = "flex";
  if (elements.mobileInstructions)
    elements.mobileInstructions.style.display = "flex";
  setupTouchControls();
}

/**
 * Configures UI for mouse-only devices
 * @param {Object} elements - UI element references
 */
function configureMouseMode(elements) {
  if (elements.touchControls)
    elements.touchControls.classList.remove("show-touch-controls");
  if (elements.desktopInstructions)
    elements.desktopInstructions.style.display = "flex";
  if (elements.mobileInstructions)
    elements.mobileInstructions.style.display = "none";
}

/**
 * Initializes touch event listeners for game controls
 */
function setupTouchControls() {
  const touchButtons = [
    { id: "btn-left", key: "left" },
    { id: "btn-right", key: "right" },
    { id: "btn-jump", key: "up" },
    { id: "btn-throw", key: "t" },
  ];
  touchButtons.forEach(({ id, key }) => {
    const button = document.getElementById(id);
    if (!button) return;
    setupSingleTouchButton(button, key);
  });
}

/**
 * Sets up touch and mouse event handlers for a single button
 * @param {HTMLElement} button - The button element to set up
 * @param {string} key - The keyboard key to simulate
 */
function setupSingleTouchButton(button, key) {
  removeExistingEventListeners(button);
  createEventHandlers(button, key);
  attachEventListeners(button);
}

/**
 * Removes existing event listeners from button
 * @param {HTMLElement} button - The button element
 */
function removeExistingEventListeners(button) {
  button.removeEventListener("touchstart", button._touchStartHandler);
  button.removeEventListener("touchend", button._touchEndHandler);
}

/**
 * Creates touch start and end event handlers for button
 * @param {HTMLElement} button - The button element
 * @param {string} key - The keyboard key to simulate
 */
function createEventHandlers(button, key) {
  button._touchStartHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    keyboard[key] = true;
    button.style.opacity = "0.7";
    button.style.transform = "scale(0.95)";
  };
  button._touchEndHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    keyboard[key] = false;
    button.style.opacity = "1";
    button.style.transform = "scale(1)";
  };
}

/**
 * Attaches all event listeners to the button
 * @param {HTMLElement} button - The button element
 */
function attachEventListeners(button) {
  button.addEventListener("touchstart", button._touchStartHandler, {
    passive: false,
  });
  button.addEventListener("touchend", button._touchEndHandler, {
    passive: false,
  });
  button.addEventListener("mousedown", button._touchStartHandler);
  button.addEventListener("mouseup", button._touchEndHandler);
  button.addEventListener("mouseleave", button._touchEndHandler);
}

/**
 * Monitors changes in screen orientation and size
 */
function setupResponsiveControls() {
  let resizeTimeout;

  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setupInputControls();
    }, 250);
  }
  window.addEventListener("resize", handleResize);
  if ("onorientationchange" in window) {
    window.addEventListener("orientationchange", () => {
      setTimeout(handleResize, 500);
    });
  }
}

/**
 * Node.js module export for testing and server-side usage.
 * Exports all touch detection functions for external use.
 */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    isTouchDevice,
    getPrimaryInputMethod,
    setupInputControls,
    setupTouchControls,
    setupResponsiveControls,
  };
}
