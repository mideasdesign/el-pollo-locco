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

    // Array, das alle definierten Audio-Dateien enthält
    static allSounds = [AudioHub.background, AudioHub.coinSound, AudioHub.bottleSound, AudioHub.chickenSound, AudioHub.chicksSound,  AudioHub.pepeSound, AudioHub.youwinSound, AudioHub.youlooseSound, AudioHub.attackSound,];


    // Spielt eine einzelne Audiodatei ab
        static playOne(sound) { 
        if (sound.readyState == 4) {
            sound.volume = 0.3;  // Setzt die Lautstärke auf 0.2 = 20% / 1 = 100%
            sound.currentTime = 0;  // Startet ab einer bestimmten stelle (0=Anfang/ 5 = 5 sec.)
            sound.play();  // Spielt das übergebene Sound-Objekt ab
        } 
       
    }

    static stopAll() {
        AudioHub.allSounds.forEach(sound => {
            sound.pause();  // Pausiert jedes Audio in der Liste
        });
    }
    static startAll() {
        AudioHub.allSounds.forEach(sound => {
            sound.play();  // Spiel jedes Audio in der Liste
        });
    }
    // Stoppt das Abspielen einer einzelnen Audiodatei
    static stopOne(sound) {
        sound.pause();  // Pausiert das übergebene Audio
    }
}