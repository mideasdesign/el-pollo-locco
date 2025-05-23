class Coins extends MovableObject {
  width = 70;
  height = 70;
  offset = {
    top: 20,
    right: 60,
    bottom: 20,
    left: 20
};
coinsLevel = 0;

  images_coins = [
        'assets/images/8_coin/coin_1.png',
        'assets/images/8_coin/coin_2.png'
      ];  
  constructor(x, y) {
      super().loadImage('assets/images/8_coin/coin_1.png');
      this.x = x;
      this.y = y;
      this.width = 70;
      this.height = 70;
      this.loadImages(this.images_coins);
      this.getRealFrame();
      this.animate();
    }
  
    animate() {
      gameIntervals(() => {
        this.playAnimation(this.images_coins);
      }, 200);
    }
  }