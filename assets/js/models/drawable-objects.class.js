class DrawableObject {
    x = 10;
    y = 10;
    img;
    width = 100;
    height = 50;
    rX;
    rY;
    rW;
    rH;
    imageCache = {};
    currentImage = 0;
    offset = {};
  
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    };

    getRealFrame(){
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width + this.offset.left - this.offset.right;
        this.rH = this.height + this.offset.top - this.offset.bottom;
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
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coins || this instanceof Bottles){
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    };

    drawRealFrame(ctx){
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coins || this instanceof Bottles){
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect(this.rX, this.rY, this.rW, this.rH);
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