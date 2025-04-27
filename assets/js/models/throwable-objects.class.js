class ThrowableObject extends MovableObject {
/*   width = 1900;
  height = 300;
  speed = 0.15; */

  constructor(x, y) {
    super().loadImage('assets/images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.x = 100;
    this.y = 100;
    this.throw(100, 300);
    

  };

  throw(x, y){
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width= 90;
    this.speedY = 20;
    this.applyGravity();
    setInterval(() => {
      this.x += 20;
    }, 25)
  };

}
