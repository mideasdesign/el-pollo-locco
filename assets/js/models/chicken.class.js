class Chicken extends MovableObject{ 
    width = 40;
    height = 60;
    otherDirection = false;
    offset = {
        top: 40,
        right: 20,
        bottom: 30,
        left: 20
    };

    images_walking = [
        'assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/images/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/images/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    currentImage = 0;
    constructor(){
        super().loadImage('assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 300 + Math.random() * 500;
        this.y = 430 - this.height;
        this.loadImages(this.images_walking);
        this.speed = 0.15 + Math.random() * 0.35;
        this.animate();
    };
    
    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.images_walking);
        }, 100);
    }
}