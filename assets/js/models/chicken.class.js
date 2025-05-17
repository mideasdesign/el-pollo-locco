class Chicken extends MovableObject{ 
    width = 40;
    height = 60;
    otherDirection = false;
    isDead = false;
    offset = {
        top: 7,
        right: 10,
        bottom: 6,
        left: 5
    };

    images_walking = [
        'assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/images/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/images/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    image_dead = 'assets/images/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    currentImage = 0;
    dead = false;

    constructor(){
        super().loadImage('assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 1500 + Math.random() * 1700;
        this.y = 430 - this.height;
        this.getRealFrame();
        this.loadImages(this.images_walking);
        this.loadImage(this.image_dead);
        this.speed = 0.15 + Math.random() * 0.40;
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
        this.isDead = true;
        this.loadImage(this.image_dead);
        clearInterval(this.moveLeftInterval);
        clearInterval(this.walkingInterval);
        
        // Remove the chicken after a delay
        setTimeout(() => {
            const index = world.level.enemies.indexOf(this);
            if (index > -1) {
                world.level.enemies.splice(index, 1);
            }
        }, 1000);
    }
}