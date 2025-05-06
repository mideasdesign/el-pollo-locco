class DrawableObject {
    x = 10;
    y = 10;
    img;
    width = 100;
    height = 50;
    imageCache = {};
    currentImage = 0;
    offset = {};
  
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    };

    draw(ctx){
        try{
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        catch(e){
        console.warn('Error loading Image', e);
        console.log('Could not not load Image', this.img);
        }
    };

    drawFrame(ctx){
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coins || this instanceof Bottles || this instanceof ThrowableObject){
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
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
    playAnimationOnce(images, frameRate = 100) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        let i = 0;

        const step = () => {
            if (i < images.length) {
                this.img = this.imageCache[images[i]];
                i++;
                setTimeout(step, frameRate);
            } else {
                this.isAnimating = false;
            }
        };

        step();
    }
}