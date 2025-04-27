class Endboss extends MovableObject{ 
    width = 200;
    height = 450;
    x = 1500;
    y = 30;
    images_spawn = [
        'assets/images/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/images/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/images/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/images/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/images/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/images/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/images/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/images/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    images_walking = [
        'assets/images/4_enemie_boss_chicken/1_walk/G1.png',

        
    ];
    hadFirstContact = false;
    constructor(){
        super().loadImage(this.images_walking[0]);
        this.loadImages(this.images_spawn);
        this.loadImages(this.images_walking);
        this.animate();
    };
    animate(){
        let i = 0;
        setInterval(() => {
            if (i < 10) {
                this.playAnimation(this.images_spawn);
            }else{
                this.playAnimation(this.images_walking);
            }
          i++; 
          if (world.character.x > 2800 && !hadFirstContact)
           {
            i = 0;
            hadFirstContact = true;
          } 
        }, 150);
    }
}