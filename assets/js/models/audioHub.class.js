/**
 * Central audio management system for the game.
 * Handles all sound effects, background music, and mute functionality.
 * Provides static methods for playing, stopping, and managing audio.
 * Includes iOS-specific audio handling and WebAudio context management.
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
    /** @type {boolean} - Global mute state flag (initialized from localStorage) */
    static isMuted = AudioHub.loadMuteState();

    /** @type {AudioContext|null} - WebAudio context for iOS compatibility */
    static audioContext = null;
    /** @type {boolean} - Flag indicating if audio system is unlocked for iOS */
    static audioUnlocked = false;
    /** @type {Audio[]} - Queue of sounds waiting to be played after iOS unlock */
    static pendingAudioQueue = [];

    /**
     * Loads the mute state from localStorage.
     * @returns {boolean} True if audio should be muted
     */
    static loadMuteState() {
        try {
            const muteState = localStorage.getItem('mute');
            return muteState ? JSON.parse(muteState) === 'on' : false;
        } catch (error) {
            return false; // Default to unmuted if localStorage fails
        }
    }

    /**
     * Initializes iOS-compatible audio system.
     * Must be called after user interaction to unlock audio on iOS.
     * @returns {Promise<boolean>} Promise resolving to true if audio was successfully initialized
     */
    static async initializeIOSAudio() {
        try {
            // Check if we're on iOS
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

            if (!isIOS) {
                AudioHub.audioUnlocked = true;
                return true;
            }

            // Create AudioContext for iOS
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass && !AudioHub.audioContext) {
                AudioHub.audioContext = new AudioContextClass();
            }

            // Prepare all audio files for iOS
            AudioHub.allSounds.forEach(sound => {
                sound.preload = 'auto';
                sound.muted = false;
                sound.load();
            });

            // Resume AudioContext if suspended
            if (AudioHub.audioContext && AudioHub.audioContext.state === 'suspended') {
                await AudioHub.audioContext.resume();
            }

            // Test audio with a silent sound
            const testAudio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMZBjWH1/LNeCwFJHPD8N2QQAoUXrXp66hVFApGnt/yv2UaB');

            try {
                await testAudio.play();
                testAudio.pause();
                testAudio.currentTime = 0;
                AudioHub.audioUnlocked = true;

                // Process any queued audio
                AudioHub.processAudioQueue();
                return true;
            } catch (error) {
                return false;
            }

        } catch (error) {
            return false;
        }
    }

    /**
     * Processes queued audio that was waiting for iOS unlock.
     */
    static processAudioQueue() {
        AudioHub.pendingAudioQueue.forEach(sound => {
            if (!AudioHub.isMuted) {
                AudioHub.playOne(sound);
            }
        });
        AudioHub.pendingAudioQueue = [];
    }

    /**
     * Plays a single audio file with iOS compatibility.
     * Queues audio for later playback if iOS audio hasn't been unlocked yet.
     * @param {Audio} sound - The audio object to play
     */
    static playOne(sound) {
        if (AudioHub.isMuted) return;

        // If iOS audio hasn't been unlocked yet, queue the sound
        if (!AudioHub.audioUnlocked) {
            if (!AudioHub.pendingAudioQueue.includes(sound)) {
                AudioHub.pendingAudioQueue.push(sound);
            }
            return;
        }

        try {
            // Prepare audio for playback
            sound.volume = 0.3;
            sound.currentTime = 0;

            // Special handling for background music
            if (sound === AudioHub.background) {
                sound.loop = true;
            }

            // Play with promise handling for iOS
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Audio playing successfully
                }).catch(error => {
                    // Audio playback failed - retry once
                    setTimeout(() => {
                        sound.play().catch(e => {
                            // Audio retry failed
                        });
                    }, 100);
                });
            }
        } catch (error) {
            // Audio play error
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
                // Save position only if sound is actively playing
                AudioHub.pausedSounds.set(sound, sound.currentTime);
                sound.pause();
            } else if (sound === AudioHub.background && sound.currentTime > 0) {
                // Special handling for paused background music
                AudioHub.pausedSounds.set(sound, sound.currentTime);
            }
        });
    }

    static startAll() {
        AudioHub.isMuted = false;
        AudioHub.pausedSounds.forEach((position, sound) => {
            if (sound.readyState == 4) {
                sound.currentTime = position; // Set to saved position
                sound.play().catch(error => {
                    // If normal start fails, try from beginning
                    sound.currentTime = 0;
                    sound.play().catch(e => {
                        // Restart also failed
                    });
                });
            }
        });

        // Special handling for background music if it wasn't in pausedSounds
        if (!AudioHub.pausedSounds.has(AudioHub.background) &&
            AudioHub.background.paused &&
            AudioHub.background.readyState == 4) {
            AudioHub.background.currentTime = 0;
            AudioHub.background.loop = true;
            AudioHub.background.volume = 0.3;
            AudioHub.background.play().catch(error => {
                // Background music start failed
            });
        }

        // Clear saved positions after resuming
        AudioHub.pausedSounds.clear();
    }

    /**
     * Stops all running sounds and resets them to the beginning.
     * Ideal for game end (win/loss) to stop all audio playback.
     * @param {Audio[]} exceptions - Optional: Sounds that should not be stopped
     */
    static stopAll(exceptions = []) {
        AudioHub.allSounds.forEach((sound) => {
            // Skip sounds in exception list
            if (!exceptions.includes(sound)) {
                sound.pause();
                sound.currentTime = 0; // Reset all sounds to beginning
            }
        });

        // Clear the queue for iOS
        AudioHub.pendingAudioQueue = [];

        // Clear paused sounds
        AudioHub.pausedSounds.clear();
    }

    /**
     * Stops all sounds except game-over and win sounds.
     * Special method for game end.
     */
    static stopAllExceptEndgame() {
        const endgameSounds = [AudioHub.gameoverSound, AudioHub.gamewinSound, AudioHub.youwinSound, AudioHub.youlooseSound];
        AudioHub.stopAll(endgameSounds);
    }

    /**
     * Stoppt das Abspielen einer einzelnen Audiodatei.
     * @param {Audio} sound - Das zu stoppende Audio-Element
     */
    static stopOne(sound) {
        sound.pause();
        sound.currentTime = 0; // Bei einzelnem Stop auf Anfang setzen
    }
}