class Bottles extends MovableObject {
  images_bottles = [
        'assets/images/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'assets/images/6_salsa_bottle/2_salsa_bottle_on_ground.png'
      ];  
  constructor(x, y) {
      super().loadImage('assets/images/6_salsa_bottle/1_salsa_bottle_on_ground.png');
      this.x = x;
      this.y = y;
      this.width = 70;
      this.height = 90;
      this.loadImages(this.images_bottles);

    }
  }