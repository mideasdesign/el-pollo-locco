class AudioHub {
    // Audiodateien für Piano, Guitar, DRUMS
    static background = new Audio('./assets/sound/tex-mex-delight-mexican-mariachi.mp3');
    static coinSound = new Audio('./assets/sound/sound-effects-coin.mp3');
    static bottleSound = new Audio('./assets/sound/bottles-clanging-82557.mp3');
    static chickenSound = new Audio('./assets/sound/668804__mbpl__chicken-clucking-2.wav');
    static chicksSound = new Audio('./assets/sound/chick-chirping2-332878.mp3');
    static pepeSound = new Audio('./assets/sound/804622__qubodup__young-man-hurt-voice.wav');
    static gameoverSound = new Audio('./assets/sound/439890__simonbay__lushlife_gameover.wav');
    static youwinSound = new Audio('./assets/sound/youwin.mp3');
    static youlooseSound = new Audio('./assets/sound/youloose.mp3');
    static gamewinSound = new Audio('./assets/sound/brass-fanfare-with-timpani-and-winchimes-reverberated-146260.mp3');
    static attackSound = new Audio('./assets/sound/chase-8-bit-73312.mp3');
    static endbossHurtSound = new Audio('./assets/sound/endboss-hurt.mp3');
    
    // Alle Audio-Dateien für Mute-Funktionalität
    static allSounds = [
        AudioHub.background, AudioHub.coinSound, AudioHub.bottleSound, 
        AudioHub.chickenSound, AudioHub.chicksSound, AudioHub.pepeSound,
        AudioHub.gameoverSound, AudioHub.youwinSound, AudioHub.youlooseSound,
        AudioHub.gamewinSound, AudioHub.attackSound, AudioHub.endbossHurtSound
    ];
    
    // Speichert pausierte Sounds und ihre Positionen
    static pausedSounds = new Map();
    static isMuted = false;

    // Spielt eine einzelne Audiodatei ab
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