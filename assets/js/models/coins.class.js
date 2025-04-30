class Endboss extends MovableObject{ 
    width = 200;
    height = 450;
    x = 1500;
    y = 30;
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
    constructor(){
        super().loadImage(this.images_idle[0]);
        this.loadImages(this.images_idle);
        this.animate();
    };
    
    animate(){
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.images_dead);
            }else if (this.ishurt()) {
                this.playAnimation(this.images_hurt);
            }
            else{
                this.playAnimation(this.images_idle);
            }
        }, 200);
    };
}