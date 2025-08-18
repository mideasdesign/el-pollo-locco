/**
 * @fileoverview Touch Detection and Device Capabilities Utility
 * @description Detects touch devices and activates corresponding UI elements
 */

/**
 * Detects if the device has touch capabilities
 * @returns {boolean} True if touch support is available
 */
function isTouchDevice() {
    // Check multiple touch APIs for maximum compatibility
    return (
        // Standard Touch Events API
        ('ontouchstart' in window) ||
        
        // Microsoft Touch Events (IE/Edge)
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0) ||
        
        // Pointer Events API
        ('onpointerdown' in window && navigator.maxTouchPoints > 0) ||
        
        // DocumentTouch API (older browsers)
        (window.DocumentTouch && document instanceof DocumentTouch)
    );
}

/**
 * Detects if the device is a tablet (iPad, Android Tablet, etc.)
 * @returns {boolean} True if it's a tablet device
 */
function isTablet() {
    const userAgent = navigator.userAgent.toLowerCase();
    
    // iPad Detection (all variants)
    if (/ipad/.test(userAgent) || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
        return true;
    }
    
    // Android Tablet Detection
    if (/android/.test(userAgent) && !/mobile/.test(userAgent)) {
        return true;
    }
    
    // Windows Tablet Detection
    if (/windows/.test(userAgent) && /touch/.test(userAgent)) {
        return true;
    }
    
    // Fallback: Large touch devices
    if (isTouchDevice() && window.innerWidth >= 768 && window.innerWidth <= 2732) {
        return true;
    }
    
    return false;
}

/**
 * Detects primary input method based on device characteristics
 * @returns {string} 'touch', 'mouse', or 'hybrid'
 */
function getPrimaryInputMethod() {
    // Explicit iPad/Tablet detection (always touch)
    if (isTablet()) {
        return 'touch';
    }
    
    // Hybrid devices (touch laptops with large screens)
    if (isTouchDevice() && window.innerWidth > 1366 && navigator.maxTouchPoints > 1) {
        return 'hybrid';
    }
    
    // Smartphones and small touch devices
    if (isTouchDevice() && window.innerWidth < 768) {
        return 'touch';
    }
    
    // Desktop without touch
    if (!isTouchDevice()) {
        return 'mouse';
    }
    
    // Fallback for unknown touch devices
    return 'touch';
}

/**
 * Activates/deactivates touch controls based on device detection
 */
function setupInputControls() {
    const inputMethod = getPrimaryInputMethod();
    const touchControls = document.getElementById('controls-box');
    const desktopInstructions = document.querySelector('.desktop-keys');
    const mobileInstructions = document.querySelector('.mobile-keys');
    
    switch (inputMethod) {
        case 'touch':
            // Zeige nur Touch-Controls
            if (touchControls) touchControls.classList.add('show-touch-controls');
            if (desktopInstructions) desktopInstructions.style.display = 'none';
            if (mobileInstructions) mobileInstructions.style.display = 'flex';
            setupTouchControls();
            break;
            
        case 'hybrid':
            // Zeige beide Control-Optionen
            if (touchControls) touchControls.classList.add('show-touch-controls');
            if (desktopInstructions) desktopInstructions.style.display = 'flex';
            if (mobileInstructions) mobileInstructions.style.display = 'flex';
            setupTouchControls();
            break;
            
        case 'mouse':
        default:
            // Zeige nur Desktop-Controls (Touch-Controls bleiben versteckt)
            if (touchControls) touchControls.classList.remove('show-touch-controls');
            if (desktopInstructions) desktopInstructions.style.display = 'flex';
            if (mobileInstructions) mobileInstructions.style.display = 'none';
            break;
    }
}

/**
 * Initializes touch event listeners for game controls
 */
function setupTouchControls() {
    const touchButtons = [
        { id: 'btn-left', key: 'left' },
        { id: 'btn-right', key: 'right' },
        { id: 'btn-jump', key: 'space' },
        { id: 'btn-throw', key: 't' }
    ];
    
    touchButtons.forEach(({ id, key }) => {
        const button = document.getElementById(id);
        if (!button) return;
        
        // Entferne alte Event-Listener falls vorhanden
        button.removeEventListener('touchstart', button._touchStartHandler);
        button.removeEventListener('touchend', button._touchEndHandler);
        
        // Neue Event-Listener mit verbessertem Feedback
        button._touchStartHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            keyboard[key] = true;
            button.style.opacity = '0.7';
            button.style.transform = 'scale(0.95)';
        };
        
        button._touchEndHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            keyboard[key] = false;
            button.style.opacity = '1';
            button.style.transform = 'scale(1)';
        };
        
        // Add event listeners
        button.addEventListener('touchstart', button._touchStartHandler, { passive: false });
        button.addEventListener('touchend', button._touchEndHandler, { passive: false });
        
        // Additionally: Mouse events for hybrid devices
        button.addEventListener('mousedown', button._touchStartHandler);
        button.addEventListener('mouseup', button._touchEndHandler);
        button.addEventListener('mouseleave', button._touchEndHandler);
    });
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
    
    // Monitor size changes
    window.addEventListener('resize', handleResize);
    
    // Monitor orientation changes (mobile)
    if ('onorientationchange' in window) {
        window.addEventListener('orientationchange', () => {
            setTimeout(handleResize, 500); // Delay for orientation change
        });
    }
}

// Export for other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isTouchDevice,
        getPrimaryInputMethod,
        setupInputControls,
        setupTouchControls,
        setupResponsiveControls
    };
}
