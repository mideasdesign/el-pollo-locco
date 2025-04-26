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
    acceleration = 2;
    offsetX = 0;
    offsetY = 0;
    energyLevel = 100

    applyGravity(){
        setInterval(() =>{
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            };
        }, 1000 / 24);
    }
    isAboveGround (){
        return this.y < 180;
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

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    drawFrame(ctx){
        if (this instanceof Character || this instanceof Chicken){
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
    changeDirection(ctx){
        ctx.save();
        ctx.translate(this.width, 0);
        ctx.scale(-1, 1);
        this.x = this.x * -1;

    }
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
    moveRight(){
        this.x += this.speed;
        this.otherDirection = false;
    };

    moveLeft(){
        this.x -= this.speed;
    };

    jump(){
        this.speedY = 22;
    }
    isColliding(mo) {
        return  (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) && (this.y + this.offsetY + this.height) >= mo.y && (this.y + this.offsetY) <= (mo.y + mo.height)
    }

}