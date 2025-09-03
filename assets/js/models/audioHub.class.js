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
            return false;
        }
    };

    /**
     * Initializes audio for iOS devices with required user interaction.
     * Handles iOS audio unlock requirements and context creation.
     * @returns {Promise<boolean>} True if audio was successfully initialized
     */
    static async initializeIOSAudio() {
        try {
            if (!AudioHub.isIOSDevice()) {
                AudioHub.audioUnlocked = true;
                return true;
            }
            AudioHub.createAudioContext();
            AudioHub.prepareAudioElements();
            await AudioHub.resumeAudioContext();
            return await AudioHub.testAudioPlayback();
        } catch (error) {
            return false;
        }
    };

    /**
     * Checks if the current device is iOS
     * @returns {boolean} True if device is iOS
     */
    static isIOSDevice() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    };

    /**
     * Creates audio context for iOS devices
     */
    static createAudioContext() {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass && !AudioHub.audioContext) {
            AudioHub.audioContext = new AudioContextClass();
        }
    }

    /**
     * Prepares all audio elements for playback
     */
    static prepareAudioElements() {
        AudioHub.allSounds.forEach(sound => {
            sound.preload = 'auto';
            sound.muted = false;
            sound.load();
        });
    }

    /**
     * Resumes suspended audio context
     */
    static async resumeAudioContext() {
        if (AudioHub.audioContext && AudioHub.audioContext.state === 'suspended') {
            await AudioHub.audioContext.resume();
        }
    }

    /**
     * Tests audio playback capability
     * @returns {Promise<boolean>} True if test audio played successfully
     */
    static async testAudioPlayback() {
        const testAudio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMZBjWH1/LNeCwFJHPD8N2QQAoUXrXp66hVFApGnt/yv2UaB');
        try {
            await testAudio.play();
            testAudio.pause();
            testAudio.currentTime = 0;
            AudioHub.audioUnlocked = true;
            AudioHub.processAudioQueue();
            return true;
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
        if (!AudioHub.audioUnlocked) {
            AudioHub.queueAudioForLater(sound);
            return;
        }
        AudioHub.attemptAudioPlayback(sound);
    }

    /**
     * Queues audio for later playback when iOS audio becomes available
     * @param {Audio} sound - The audio object to queue
     */
    static queueAudioForLater(sound) {
        if (!AudioHub.pendingAudioQueue.includes(sound)) {
            AudioHub.pendingAudioQueue.push(sound);
        }
    }

    /**
     * Attempts to play audio with error handling and retry logic
     * @param {Audio} sound - The audio object to play
     */
    static attemptAudioPlayback(sound) {
        try {
            AudioHub.configureAudioSettings(sound);
            AudioHub.executePlayback(sound);
        } catch (error) { }
    }

    /**
     * Configures audio settings before playback
     * @param {Audio} sound - The audio object to configure
     */
    static configureAudioSettings(sound) {
        sound.volume = 0.3;
        sound.currentTime = 0;
        if (sound === AudioHub.background) {
            sound.loop = true;
        }
    }

    /**
     * Executes audio playback with promise handling
     * @param {Audio} sound - The audio object to play
     */
    static executePlayback(sound) {
        const playPromise = sound.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
            }).catch(error => {
                AudioHub.retryPlayback(sound);
            });
        }
    }

    /**
     * Retries audio playback after a short delay
     * @param {Audio} sound - The audio object to retry
     */
    static retryPlayback(sound) {
        setTimeout(() => {
            sound.play().catch(e => {
            });
        }, 100);
    }

    /**
     * Stops and mutes all audio in the game.
     * Saves the current playback position of each sound for later resumption.
     */
    static stopAll() {
        AudioHub.isMuted = true;
        AudioHub.allSounds.forEach(sound => {
            if (!sound.paused) {
                AudioHub.pausedSounds.set(sound, sound.currentTime);
                sound.pause();
            } else if (sound === AudioHub.background && sound.currentTime > 0) {
                AudioHub.pausedSounds.set(sound, sound.currentTime);
            }
        });
    }

    static startAll() {
        AudioHub.isMuted = false;
        AudioHub.resumePausedSounds();
        AudioHub.handleBackgroundMusic();
        AudioHub.pausedSounds.clear();
    }

    /**
     * Resumes all previously paused sounds from their saved positions
     */
    static resumePausedSounds() {
        AudioHub.pausedSounds.forEach((position, sound) => {
            if (sound.readyState == 4) {
                AudioHub.resumeSoundAtPosition(sound, position);
            }
        });
    }

    /**
     * Resumes a specific sound at the given position with fallback
     * @param {Audio} sound - The audio object to resume
     * @param {number} position - The position to resume from
     */
    static resumeSoundAtPosition(sound, position) {
        sound.currentTime = position;
        sound.play().catch(error => {
            sound.currentTime = 0;
            sound.play().catch(e => {
                // Final retry failed, silent handling
            });
        });
    }

    /**
     * Handles background music resumption when not in paused sounds
     */
    static handleBackgroundMusic() {
        if (!AudioHub.pausedSounds.has(AudioHub.background) &&
            AudioHub.background.paused &&
            AudioHub.background.readyState == 4) {
            AudioHub.startBackgroundMusic();
        }
    }

    /**
     * Starts background music from the beginning
     */
    static startBackgroundMusic() {
        AudioHub.background.currentTime = 0;
        AudioHub.background.loop = true;
        AudioHub.background.volume = 0.3;
        AudioHub.background.play().catch(error => {
            // Silent error handling for background music
        });
    }

    /**
     * Stops all running sounds and resets them to the beginning.
     * Ideal for game end (win/loss) to stop all audio playback.
     * @param {Audio[]} exceptions - Optional: Sounds that should not be stopped
     */
    static stopAll(exceptions = []) {
        AudioHub.allSounds.forEach((sound) => {
            if (!exceptions.includes(sound)) {
                sound.pause();
                sound.currentTime = 0;
            }
        });
        AudioHub.pendingAudioQueue = [];
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
        sound.currentTime = 0;
    }
}