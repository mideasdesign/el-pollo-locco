class Coins extends MovableObject {
    constructor(x, y) {
      super().loadImage('assets/images/8_coin/coin_1.png');
      this.x = x;
      this.y = y;
      this.width = 30;
      this.height = 30;
      this.images_coins = [
        'assets/images/8_coin/coin_1.png',
        'assets/images/8_coin/coin_2.png'
      ];
      this.loadImages(this.images_coins);
      this.animate();
    }
  
    animate() {
      setInterval(() => {
        this.playAnimation(this.images_coins);
      }, 200);
    }
  }