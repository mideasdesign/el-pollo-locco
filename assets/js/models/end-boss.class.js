class Endboss extends MovableObject{ 
    width = 200;
    height = 450;
    x = 3090;
    y = 30;
    healthBoss = 100;
    images_idle = [
        'assets/images/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/images/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/images/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/images/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/images/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/images/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/images/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/images/4_enemie_boss_chicken/2_alert/G12.png',
        
    ];
    images_boss_hurt = [
        'assets/images/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/images/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/images/4_enemie_boss_chicken/4_hurt/G23.png'
        
    ];
    images_boss_dead = [
        'assets/images/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/images/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/images/4_enemie_boss_chicken/5_dead/G24.png'
        
    ];
    images_boss_attack = [
        'assets/images/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/images/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/images/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/images/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/images/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/images/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/images/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/images/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    currentImage = 0;
    constructor(){
        super();
        this.loadImage('assets/images/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.images_idle);
        this.loadImages(this.images_boss_hurt);
        this.loadImages(this.images_boss_attack);
        this.loadImages(this.images_boss_dead);
        this.animate();
        this.healthBoss = 100;
        console.log('Initial boss health:', this.healthBoss);
    }

    animate(){
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimationOnce(this.images_boss_dead);
            } else if (this.ishurt()) {
                this.playAnimation(this.images_boss_hurt);
            } else {
                this.playAnimation(this.images_idle);
            }
        }, 300);  
    };

    hitBoss() {
        console.log("Boss hit!");
        this.healthBoss -= 5;
        if (this.healthBoss < 0) {
            endGame();
            this.healthBoss = 0;
        } else {
          this.lastHit = new Date().getTime();
          console.log(this.healthBoss);
        }
      
        // Aktualisiere die BossBar
        world.bossBar.setPercentage(this.healthBoss);
      }

}
