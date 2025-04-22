class Chicken extends MovableObject{ 

    width = 50;
    height = 70;
    constructor(){
        super().loadImage('assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
        this.y = 430 - this.height;
    }
}