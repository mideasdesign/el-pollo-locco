class Chicken extends MovableObject{ 
    width = 40;
    height = 60;
    otherDirection = false;
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

    currentImage = 0;
    constructor(){
        super().loadImage('assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 1500 + Math.random() * 1700;
        this.y = 430 - this.height;
        this.getRealFrame();
        this.loadImages(this.images_walking);
        this.speed = 0.15 + Math.random() * 0.40;
        this.loadImage('assets/images/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        this.animate();
    };
    
    animate(){
        gameIntervals(() => {
            this.moveLeft();
        }, 1000 / 25);
        gameIntervals(() => {
            this.playAnimation(this.images_walking);
        }, 100);
    }
}