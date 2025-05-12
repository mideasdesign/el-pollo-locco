class Character extends MovableObject{
    x = 160;
    y = 80;
    width = 120;
    height = 250;
    speed = 16;
    speedY = 0;
    offset = {
        top: 110,
        right: 70,
        bottom: 15,
        left: 20
    };

    healthPepe = 100;
    otherDirection = false;

    images_idle = [
        'assets/images/2_character_pepe/1_idle/idle/I-1.png',
        'assets/images/2_character_pepe/1_idle/idle/I-2.png',
        'assets/images/2_character_pepe/1_idle/idle/I-3.png',
        'assets/images/2_character_pepe/1_idle/idle/I-4.png',
        'assets/images/2_character_pepe/1_idle/idle/I-5.png',
        'assets/images/2_character_pepe/1_idle/idle/I-6.png',
        'assets/images/2_character_pepe/1_idle/idle/I-7.png',
        'assets/images/2_character_pepe/1_idle/idle/I-8.png',
        'assets/images/2_character_pepe/1_idle/idle/I-9.png',
        'assets/images/2_character_pepe/1_idle/idle/I-10.png',
    ];

    images_long_idle = [
        'assets/images/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/images/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/images/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/images/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/images/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/images/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/images/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/images/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/images/2_character_pepe/1_idle/long_idle/I-20.png'
    ];


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
        this.loadImages(this.images_idle);
        this.loadImages(this.images_long_idle);
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.getRealFrame();
        this.applyGravity();
    };

    animate(){
        gameIntervals(() => {
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
        
        gameIntervals(() => {
            if (this.isDead()) {
                this.playAnimationOnce(this.images_dead);
                 AudioHub.stopOne(AudioHub.pepeSound);
                 AudioHub.playOne(AudioHub.youlooseSound);
                gameLoose();
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

    startAnimation() {
        this.animate();
    }

}