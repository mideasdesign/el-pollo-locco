/**
 * @fileoverview Touch Detection und Device Capabilities Utility
 * @description Erkennt Touch-Geräte und aktiviert entsprechende UI-Elemente
 */

/**
 * Erkennt ob das Gerät Touch-Fähigkeiten hat
 * @returns {boolean} True wenn Touch-Unterstützung vorhanden ist
 */
function isTouchDevice() {
    // Prüfe mehrere Touch-APIs für maximale Kompatibilität
    return (
        // Standard Touch Events API
        ('ontouchstart' in window) ||
        
        // Microsoft Touch Events (IE/Edge)
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0) ||
        
        // Pointer Events API
        ('onpointerdown' in window && navigator.maxTouchPoints > 0) ||
        
        // DocumentTouch API (ältere Browser)
        (window.DocumentTouch && document instanceof DocumentTouch)
    );
}

/**
 * Erkennt ob das Gerät ein Tablet ist (iPad, Android Tablet, etc.)
 * @returns {boolean} True wenn es sich um ein Tablet handelt
 */
function isTablet() {
    const userAgent = navigator.userAgent.toLowerCase();
    
    // iPad Detection (alle Varianten)
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
    
    // Fallback: Große Touch-Geräte
    if (isTouchDevice() && window.innerWidth >= 768 && window.innerWidth <= 2732) {
        return true;
    }
    
    return false;
}

/**
 * Erkennt primäre Eingabemethode basierend auf Device-Charakteristiken
 * @returns {string} 'touch', 'mouse', oder 'hybrid'
 */
function getPrimaryInputMethod() {
    // Explizite iPad/Tablet-Erkennung (immer Touch)
    if (isTablet()) {
        return 'touch';
    }
    
    // Hybrid-Geräte (Touch-Laptops mit großem Bildschirm)
    if (isTouchDevice() && window.innerWidth > 1366 && navigator.maxTouchPoints > 1) {
        return 'hybrid';
    }
    
    // Smartphones und kleine Touch-Geräte
    if (isTouchDevice() && window.innerWidth < 768) {
        return 'touch';
    }
    
    // Desktop ohne Touch
    if (!isTouchDevice()) {
        return 'mouse';
    }
    
    // Fallback für unbekannte Touch-Geräte
    return 'touch';
}

/**
 * Aktiviert/deaktiviert Touch-Controls basierend auf Device-Erkennung
 */
function setupInputControls() {
    const inputMethod = getPrimaryInputMethod();
    const touchControls = document.getElementById('controls-box');
    const desktopInstructions = document.querySelector('.desktop-keys');
    const mobileInstructions = document.querySelector('.mobile-keys');
    
    // Erweiterte Debug-Informationen
    console.log(`🎮 Touch Detection Debug:
    - Input Method: ${inputMethod}
    - Is Touch Device: ${isTouchDevice()}
    - Is Tablet: ${isTablet()}
    - Screen Size: ${window.innerWidth}x${window.innerHeight}
    - Max Touch Points: ${navigator.maxTouchPoints}
    - User Agent: ${navigator.userAgent}
    - Platform: ${navigator.platform}`);
    
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
 * Initialisiert Touch-Event-Listener für die Spiel-Controls
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
        
        // Event-Listener hinzufügen
        button.addEventListener('touchstart', button._touchStartHandler, { passive: false });
        button.addEventListener('touchend', button._touchEndHandler, { passive: false });
        
        // Zusätzlich: Mouse-Events für Hybrid-Geräte
        button.addEventListener('mousedown', button._touchStartHandler);
        button.addEventListener('mouseup', button._touchEndHandler);
        button.addEventListener('mouseleave', button._touchEndHandler);
    });
    
    console.log('🎮 Touch controls initialized');
}

/**
 * Überwacht Änderungen der Bildschirmausrichtung und -größe
 */
function setupResponsiveControls() {
    let resizeTimeout;
    
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            console.log('📱 Screen orientation/size changed, reconfiguring controls...');
            setupInputControls();
        }, 250);
    }
    
    // Überwache Größenänderungen
    window.addEventListener('resize', handleResize);
    
    // Überwache Orientierungsänderungen (Mobile)
    if ('onorientationchange' in window) {
        window.addEventListener('orientationchange', () => {
            setTimeout(handleResize, 500); // Verzögerung für Orientierungsänderung
        });
    }
}

// Export für andere Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isTouchDevice,
        getPrimaryInputMethod,
        setupInputControls,
        setupTouchControls,
        setupResponsiveControls
    };
}
