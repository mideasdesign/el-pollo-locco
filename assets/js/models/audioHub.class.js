/**
 * Central audio management system for the game.
 * Handles all sound effects, background music, and mute functionality.
 * Provides static methods for playing, stopping, and managing audio.
 */
class AudioHub {
    /** @type {Audio} - Background music track */
    static background = new Audio('./assets/sound/tex-mex-delight-mexican-mariachi.mp3');
    /** @type {Audio} - Coin collection sound effect */
    static coinSound = new Audio('./assets/sound/sound-effects-coin.mp3');
    /** @type {Audio} - Bottle collection/throwing sound effect */
    static bottleSound = new Audio('./assets/sound/bottles-clanging-82557.mp3');
    /** @type {Audio} - Chicken clucking sound effect */
    static chickenSound = new Audio('./assets/sound/668804__mbpl__chicken-clucking-2.wav');
    /** @type {Audio} - Small chick chirping sound effect */
    static chicksSound = new Audio('./assets/sound/chick-chirping2-332878.mp3');
    /** @type {Audio} - Player hurt sound effect */
    static pepeSound = new Audio('./assets/sound/804622__qubodup__young-man-hurt-voice.wav');
    /** @type {Audio} - Game over sound effect */
    static gameoverSound = new Audio('./assets/sound/439890__simonbay__lushlife_gameover.wav');
    /** @type {Audio} - Victory sound effect */
    static youwinSound = new Audio('./assets/sound/youwin.mp3');
    /** @type {Audio} - Defeat sound effect */
    static youlooseSound = new Audio('./assets/sound/youloose.mp3');
    /** @type {Audio} - Game completion fanfare */
    static gamewinSound = new Audio('./assets/sound/brass-fanfare-with-timpani-and-winchimes-reverberated-146260.mp3');
    /** @type {Audio} - Attack/action sound effect */
    static attackSound = new Audio('./assets/sound/chase-8-bit-73312.mp3');
    /** @type {Audio} - Boss hurt sound effect */
    static endbossHurtSound = new Audio('./assets/sound/endboss-hurt.mp3');
    
    /** @type {Audio[]} - Array containing all audio objects for bulk operations */
    static allSounds = [
        AudioHub.background, AudioHub.coinSound, AudioHub.bottleSound, 
        AudioHub.chickenSound, AudioHub.chicksSound, AudioHub.pepeSound,
        AudioHub.gameoverSound, AudioHub.youwinSound, AudioHub.youlooseSound,
        AudioHub.gamewinSound, AudioHub.attackSound, AudioHub.endbossHurtSound
    ];
    
    /** @type {Map<Audio, number>} - Stores paused sounds and their playback positions */
    static pausedSounds = new Map();
    /** @type {boolean} - Global mute state flag */
    static isMuted = false;

    /**
     * Plays a single audio file with volume control and loop settings.
     * Respects the global mute state and handles background music looping.
     * @param {Audio} sound - The audio object to play
     */
    static playOne(sound) { 
        if (AudioHub.isMuted) return; // Nicht abspielen wenn stumm
        
        if (sound.readyState == 4) {
            sound.volume = 0.3;
            
            // Spezielle Behandlung für Hintergrundmusik
            if (sound === AudioHub.background) {
                sound.loop = true; // Endlosschleife für Hintergrundmusik
            }
            
            // Nur bei neuen Sounds auf 0 setzen, nicht bei fortgesetzten
            if (!AudioHub.pausedSounds.has(sound)) {
                sound.currentTime = 0;
            }
            sound.play();
        } 
    }

    /**
     * Stops and mutes all audio in the game.
     * Saves the current playback position of each sound for later resumption.
     */
    static stopAll() {
        AudioHub.isMuted = true;
        AudioHub.allSounds.forEach(sound => {
            if (!sound.paused) {
                // Speichere Position nur wenn Sound aktiv läuft
                AudioHub.pausedSounds.set(sound, sound.currentTime);
                sound.pause();
            }
        });
    }
    
    static startAll() {
        AudioHub.isMuted = false;
        AudioHub.pausedSounds.forEach((position, sound) => {
            if (sound.readyState == 4) {
                sound.currentTime = position; // Setze auf gespeicherte Position
                sound.play();
            }
        });
        // Lösche gespeicherte Positionen nach dem Fortsetzen
        AudioHub.pausedSounds.clear();
    }
    
    // Stoppt das Abspielen einer einzelnen Audiodatei
    static stopOne(sound) {
        sound.pause();
        sound.currentTime = 0; // Bei einzelnem Stop auf Anfang setzen
    }
}