class Chicks extends MovableObject{ 
    width = 40;
    height = 50;
    otherDirection = false;
    isDead = false;
    world; 
    offset = {
        top: 7,
        right: 10,
        bottom: 6,
        left: 5
    };

    images_walking = [
        'assets/images/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/images/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/images/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    image_dead = 'assets/images/3_enemies_chicken/chicken_small/2_dead/dead.png';
    currentImage = 0;

    constructor(world){
        super().loadImage('assets/images/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.world = world; 
        this.x = 1400 + Math.random() * 2000;
        this.y = 430 - this.height;
        this.getRealFrame();
        this.loadImages(this.images_walking);
        this.loadImage(this.image_dead);
        this.speed = 0.19 + Math.random() * 1.20;
        this.animate();
    };
    
    animate(){
        this.moveLeftInterval = gameIntervals(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 25);
        
        this.walkingInterval = gameIntervals(() => {
            if (!this.isDead) {
                this.playAnimation(this.images_walking);
            }
        }, 100);
    }

    die() {
        if (this.isDead) return; 
        
        this.isDead = true;
        this.loadImage(this.image_dead);
        clearInterval(this.moveLeftInterval);
        clearInterval(this.walkingInterval);
        
        // Remove the chick after a delay
        setTimeout(() => {
            if (this.world && this.world.level && this.world.level.chicks) {
                const index = this.world.level.chicks.indexOf(this);
                if (index > -1) {
                    this.world.level.chicks.splice(index, 1);
                }
            }
        }, 1000);
    }
}