class Clouds extends MovableObject{ 

constructor(){
    super().loadImage('assets/images/5_background/layers/4_clouds/1.png');
    this.x = 0;
    this.y = 10  + Math.random() * 30;
    this.width = 450;
    this.height = 200;
}
}