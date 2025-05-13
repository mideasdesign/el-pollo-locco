class Endboss extends MovableObject{ 
    width = 200;
    height = 450;
    x = 3090;
    y = 30;
     offset = {
        top: 100,
        right: 30,
        bottom: 40,
        left: 16
    };

    healthBoss = 100;
    isAttacking = true;

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
        'assets/images/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/images/4_enemie_boss_chicken/5_dead/G26.png'
        
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
        super().loadImage('assets/images/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.images_idle);
        this.loadImages(this.images_boss_hurt);
        this.loadImages(this.images_boss_attack);
        this.loadImages(this.images_boss_dead);
        this.getRealFrame();
        this.animate();
        this.startAttackt();
    };

    animate(){
        gameIntervals(() => {
            if (this.isDead()) {
                this.playAnimationOnce(this.images_boss_dead);
                AudioHub.playOne(AudioHub.youwinSound);
                gameWon();
            } else if (this.ishurt()) {
                AudioHub.playOne(AudioHub.endbossHurtSound);
                this.playAnimation(this.images_boss_hurt);
            } else {
                this.playAnimation(this.images_idle);
            }
        }, 300);  
    };
    startAttackt(){
        AudioHub.playOne(AudioHub.attackSound);
        gameIntervals(() => {
            this.isAttacking = true;
            this.playAnimation(this.images_boss_attack);
            this.moveLeft();
            setTimeout(() => {
                this.isAttacking = false;
            }, 1600);
        }, 100);
        }
}
