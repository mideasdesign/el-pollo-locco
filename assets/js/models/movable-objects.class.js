class MovableObject {
    x = 100;
    y = 100;
    img;
    width = 100;
    height = 250;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
 

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