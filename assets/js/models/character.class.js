class Character extends MovableObject{
    x = 10;
    y = 130;
    width = 150;
    height = 300;
    images_walking = [
        'assets/images/2_character_pepe/2_walk/W-21.png',
        'assets/images/2_character_pepe/2_walk/W-22.png',
        'assets/images/2_character_pepe/2_walk/W-23.png',
        'assets/images/2_character_pepe/2_walk/W-24.png',
        'assets/images/2_character_pepe/2_walk/W-25.png',
        'assets/images/2_character_pepe/2_walk/W-26.png'
    ];
    currentImage = 0;
    constructor(){
        super().loadImage('assets/images/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_walking);
        this.animate();
    }

    // let i = 0 % 6; => 0, Rest 0  -  let i = 1 % 6; 0 Rest 1  -  let i = 2 % 6; 0 Rest 2
    // i = 0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0
    animate(){
        setInterval(() => {
            let i = this.currentImage % this.images_walking.length;
            let path = this.images_walking[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
    }
    jump(){

    }
}