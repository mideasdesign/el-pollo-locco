class Character extends MovableObject{
    x = 160;
    y = 80;
    width = 100;
    height = 250;
    speed = 16;
    otherDirection = false;
    images_walking = [
        'assets/images/2_character_pepe/2_walk/W-21.png',
        'assets/images/2_character_pepe/2_walk/W-22.png',
        'assets/images/2_character_pepe/2_walk/W-23.png',
        'assets/images/2_character_pepe/2_walk/W-24.png',
        'assets/images/2_character_pepe/2_walk/W-25.png',
        'assets/images/2_character_pepe/2_walk/W-26.png'
    ];
  world;
    constructor(){
        super().loadImage('assets/images/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_walking);
        this.applyGravity();
        this.animate();
    }

    // let i = 0 % 6; => 0, Rest 0  -  let i = 1 % 6; 0 Rest 1  -  let i = 2 % 6; 0 Rest 2
    // i = 0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0
    animate(){
        setInterval(() => {
            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {    
                this.x += this.speed;
  
                this.otherDirection = false;
                } 
            if (this.world.keyboard.left && this.x > 66) {    
                this.x -= this.speed;
                this.otherDirection = true;
                }               
                this.world.cameraX = -this.x + 60;
        }, 1000 / 30);

        setInterval(() => {
            if (this.world.keyboard.right || this.world.keyboard.left) {    
                this.playAnimation(this.images_walking);
            } 
        }, 60);  
    }
    jump(){

    }
}