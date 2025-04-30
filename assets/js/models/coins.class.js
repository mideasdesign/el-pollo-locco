class Coins extends MovableObject{ 
    width = 30;
    height = 30;
    x = 200;
    y = 330;
    images_coins = [
        'assets/images/8_coin/coin-backside.svg',
        'assets/images/8_coin/coin-backside.svg'

        
    ];
    constructor(){
        super().loadImage(this.images_coins[0]);
        this.loadImages(this.images_coins);
        this.animate();
    };
    
    animate(){
        setInterval(() => {
                this.playAnimation(this.images_coins);
        }, 200);
    };
}