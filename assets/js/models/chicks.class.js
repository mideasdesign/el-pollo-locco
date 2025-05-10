class Chicks extends MovableObject{ 
    width = 30;
    height = 40;
    otherDirection = false;
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

    currentImage = 0;
    constructor(){
        super().loadImage('assets/images/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 1400 + Math.random() * 2000;
        this.y = 430 - this.height;
        this.getRealFrame();
        this.loadImages(this.images_walking);
        this.speed = 0.19 + Math.random() * 1.20;
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