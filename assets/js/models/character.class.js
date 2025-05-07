class Character extends MovableObject{
    x = 160;
    y = 80;
    width = 120;
    height = 250;
    speed = 16;
    speedY = 0;
    offset = {
        top: 10,
        right: 40,
        bottom: 30,
        left: 40
    };
    
    healthPepe = 100;
    otherDirection = false;
    images_walking = [
        'assets/images/2_character_pepe/2_walk/W-21.png',
        'assets/images/2_character_pepe/2_walk/W-22.png',
        'assets/images/2_character_pepe/2_walk/W-23.png',
        'assets/images/2_character_pepe/2_walk/W-24.png',
        'assets/images/2_character_pepe/2_walk/W-25.png',
        'assets/images/2_character_pepe/2_walk/W-26.png'
    ];

    images_jumping = [
        'assets/images/2_character_pepe/3_jump/J-31.png',
        'assets/images/2_character_pepe/3_jump/J-32.png',
        'assets/images/2_character_pepe/3_jump/J-33.png',
        'assets/images/2_character_pepe/3_jump/J-34.png',
        'assets/images/2_character_pepe/3_jump/J-35.png',
        'assets/images/2_character_pepe/3_jump/J-36.png',
        'assets/images/2_character_pepe/3_jump/J-37.png',
        'assets/images/2_character_pepe/3_jump/J-38.png',
        'assets/images/2_character_pepe/3_jump/J-39.png'
    ];

    images_hurt = [
        'assets/images/2_character_pepe/4_hurt/H-41.png',
        'assets/images/2_character_pepe/4_hurt/H-42.png',
        'assets/images/2_character_pepe/4_hurt/H-43.png',

    ];

    images_dead = [
        'assets/images/2_character_pepe/5_dead/D-51.png',
        'assets/images/2_character_pepe/5_dead/D-52.png',
        'assets/images/2_character_pepe/5_dead/D-53.png',
        'assets/images/2_character_pepe/5_dead/D-54.png',
        'assets/images/2_character_pepe/5_dead/D-55.png',
        'assets/images/2_character_pepe/5_dead/D-56.png',
        'assets/images/2_character_pepe/5_dead/D-57.png',
    ];

  world;
    constructor(){
        super().loadImage('assets/images/2_character_pepe/1_idle/idle/I-10.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.getRealFrame();
        this.applyGravity();
        this.animate();
    };

    // let i = 0 % 6; => 0, Rest 0  -  let i = 1 % 6; 0 Rest 1  -  let i = 2 % 6; 0 Rest 2
    // i = 0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0
    animate(){
        setInterval(() => {
            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {    
                this.moveRight();
            } 
            if (this.world.keyboard.left && this.x > 66) {    
                this.moveLeft();
                this.otherDirection = true;
            }  

            if (this.world.keyboard.space && !this.isAboveGround()) {
                this.jump();
            }
            this.world.cameraX = -this.x + 60;
        }, 1000 / 30);
        
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.images_dead);
            } else if (this.ishurt()) {
                this.playAnimation(this.images_hurt);
            } else if (this.isJumping) {
                if (this.speedY > 0) {
                    if (!this.isAnimating) {
                        this.isAnimating = true;
                        this.playAnimationOnce(this.images_jumping, 120);
                    }
                } else {
                    if (!this.isAnimating) {
                        this.isAnimating = true;
                        this.playAnimationOnce(this.images_falling, 120);
                    }
                }
                if (!this.isAboveGround()) {
                    this.isJumping = false; // Sprung beendet
                    this.isAnimating = false;
                }
            } else if (this.world.keyboard.right || this.world.keyboard.left) {
                this.playAnimation(this.images_walking);
            }
        }, 1000 / 10);  
    };
    
    jump() {
        if (!this.isJumping) {
            this.speedY = 30;
            this.isJumping = true;
            this.playAnimationOnce(this.images_jumping, 120);
        }
    }
}