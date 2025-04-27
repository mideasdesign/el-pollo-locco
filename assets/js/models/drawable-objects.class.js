class DrawableObject {
    x = 10;
    y = 10;
    img;
    width = 100;
    height = 50;
    imageCache = {};
    currentImage = 0;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    };

    draw(ctx){
        if (this.img && this.img.complete) {
            try{
                 ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            }
           catch(e){
            console.log('ERror loading image', e);
            console.log('Could not load image', this.img);
           }
        }
    };
    drawFrame(ctx){
        if (this instanceof Character || this instanceof Chicken){
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
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
}