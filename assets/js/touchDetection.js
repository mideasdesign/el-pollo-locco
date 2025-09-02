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

        ('ontouchstart' in window) ||
        

        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0) ||
        

        ('onpointerdown' in window && navigator.maxTouchPoints > 0) ||
        

        (window.DocumentTouch && document instanceof DocumentTouch)
    );
}

/**
 * Detects if the device is a tablet (iPad, Android Tablet, etc.)
 * @returns {boolean} True if it's a tablet device
 */
function isTablet() {
    const userAgent = navigator.userAgent.toLowerCase();
    

    if (/ipad/.test(userAgent) || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
        return true;
    }
    

    if (/android/.test(userAgent) && !/mobile/.test(userAgent)) {
        return true;
    }
    

    if (/windows/.test(userAgent) && /touch/.test(userAgent)) {
        return true;
    }
    

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

    if (isTablet()) {
        return 'touch';
    }
    

    if (isTouchDevice() && window.innerWidth > 1366 && navigator.maxTouchPoints > 1) {
        return 'hybrid';
    }
    

    if (isTouchDevice() && window.innerWidth < 768) {
        return 'touch';
    }
    

    if (!isTouchDevice()) {
        return 'mouse';
    }
    

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

            if (touchControls) touchControls.classList.add('show-touch-controls');
            if (desktopInstructions) desktopInstructions.style.display = 'none';
            if (mobileInstructions) mobileInstructions.style.display = 'flex';
            setupTouchControls();
            break;
            
        case 'hybrid':

            if (touchControls) touchControls.classList.add('show-touch-controls');
            if (desktopInstructions) desktopInstructions.style.display = 'flex';
            if (mobileInstructions) mobileInstructions.style.display = 'flex';
            setupTouchControls();
            break;
            
        case 'mouse':
        default:

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
        

        button.removeEventListener('touchstart', button._touchStartHandler);
        button.removeEventListener('touchend', button._touchEndHandler);
        

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
        

        button.addEventListener('touchstart', button._touchStartHandler, { passive: false });
        button.addEventListener('touchend', button._touchEndHandler, { passive: false });
        

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
    

    window.addEventListener('resize', handleResize);
    

    if ('onorientationchange' in window) {
        window.addEventListener('orientationchange', () => {
            setTimeout(handleResize, 500);
        });
    }
}

/**
 * Node.js module export for testing and server-side usage.
 * Exports all touch detection functions for external use.
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isTouchDevice,
        getPrimaryInputMethod,
        setupInputControls,
        setupTouchControls,
        setupResponsiveControls
    };
}
