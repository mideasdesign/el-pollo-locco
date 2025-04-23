class Clouds extends MovableObject{ 
    width = 1900;
    height = 300;
    
    constructor(){
        super().loadImage('assets/images/5_background/layers/4_clouds/full.png');
        this.x = 0;
        this.y = 10  + Math.random() * 2;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }
}