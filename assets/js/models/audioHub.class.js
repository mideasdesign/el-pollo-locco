class AudioHub {
    // Audiodateien für Piano, Guitar, DRUMS
    static background = new Audio('./assets/sound/tex-mex-delight-mexican-mariachi-113044.mp3');
    static coinSound = new Audio('./assets/sound/sound-effects-coin.mp3');
    static bottleSound = new Audio('./assets/sound/bottles-clanging-82557.mp3');
    static chickenSound = new Audio('./assets/sound/668804__mbpl__chicken-clucking-2.wav');
    static chicksSound = new Audio('./assets/sound/chick-chirping2-332878.mp3');
    static pepeSound = new Audio('./assets/sound/804622__qubodup__young-man-hurt-voice.wav');

    // Array, das alle definierten Audio-Dateien enthält
    static allSounds = [AudioHub.background, AudioHub.coinSound, AudioHub.bottleSound, AudioHub.chickenSound, AudioHub.pepeSound];


    // Spielt eine einzelne Audiodatei ab
        static playOne(sound) { 
        if (sound.readyState == 4) {
            sound.volume = 0.3;  // Setzt die Lautstärke auf 0.2 = 20% / 1 = 100%
            sound.currentTime = 0;  // Startet ab einer bestimmten stelle (0=Anfang/ 5 = 5 sec.)
            sound.play();  // Spielt das übergebene Sound-Objekt ab
        } 
       
    }




    // Stoppt das Abspielen aller Audiodateien
    static stopAll() {
        AudioHub.allSounds.forEach(sound => {
            sound.pause();  // Pausiert jedes Audio in der Liste
        });
        document.getElementById('volume').value = 0.2;  // Setzt den Sound-Slider wieder auf 0.2
    }


    // Stoppt das Abspielen einer einzelnen Audiodatei
    static stopOne(sound) {
        sound.pause();  // Pausiert das übergebene Audio
    }


    // ##########################################################################################################################
    // ################################################  Sound Slider - BONUS !  ################################################
    // Setzt die Lautstärke für alle Audiodateien
    static objSetVolume(volumeSlider) {
        let volumeValue = document.getElementById('volume').value;  // Holt den aktuellen Lautstärkewert aus dem Inputfeld
        volumeSlider.forEach(sound => {
            sound.volume = volumeValue;  // Setzt die Lautstärke für jedes Audio wie im Slider angegeben
        });
    }
}