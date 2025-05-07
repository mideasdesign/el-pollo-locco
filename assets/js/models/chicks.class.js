class Chicks extends MovableObject{ 

    width = 20;
    height = 40;
    images_walking = [
        'assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/images/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/images/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    currentImage = 0;
    constructor(){
        super().loadImage('assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 1200 + Math.random() * 1200;
        this.y = 430 - this.height;
        this.loadImages(this.images_walking);
        this.getRealFrame();
        this.speed = 0.15 + Math.random() * 0.35;
        this.animate();
    };
    animate(){
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.images_walking);
        }, 100);
    }
}