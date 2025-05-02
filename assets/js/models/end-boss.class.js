class Endboss extends MovableObject{ 
    width = 200;
    height = 450;
    x = 3090;
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
        this.animate();
    };
    checkCollisions(){
        this.world.thowableObject.forEach((bottle) => {
          if (this.endboss.isColliding(bottle)) {
            this.endboss.hit();
            this.bossBar.setPercentage(this.endboss.bossEnergy);
          }
        });
      }; 
    animate(){
        setInterval(() => {
            this.playAnimation(this.images_idle);
        }, 200);
    }
}