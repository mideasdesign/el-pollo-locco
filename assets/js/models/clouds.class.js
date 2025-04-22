class Clouds extends MovableObject{ 
    width = 450;
    height = 260;
    
constructor(){
    super().loadImage('assets/images/5_background/layers/4_clouds/1.png');
    this.x = 0;
    this.y = 10  + Math.random() * 20;
    this.width = 450;
    this.height = 260;
}
}