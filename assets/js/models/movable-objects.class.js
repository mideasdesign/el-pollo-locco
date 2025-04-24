class MovableObject {
    x = 100;
    y = 100;
    img;
    width = 100;
    height = 250;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    speedY = 0;
    acceleration = 1;

    applyGravity(){
        setInterval(() =>{
            if (this.y < 172) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            };
        }, 1000 / 25);
    }

    playAnimation(images){
        let i = this.currentImage % this.images_walking.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    };
    /**
     * 
     * @param { Array
     * } arr - ['assets/images/img1.png, assets/images/img1.png, ....']
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

}