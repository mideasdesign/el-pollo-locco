class Chicken extends MovableObject{ 
    width = 40;
    height = 60;
    otherDirection = false;
    offset = {
        top: 7,
        right: 10,
        bottom: 6,
        left: 5
    };

    images_walking = [
        'assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/images/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/images/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    images_dead = [
        'assets/images/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    currentImage = 0;
    dead = false;

    constructor(){
        super().loadImage('assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 1500 + Math.random() * 1700;
        this.y = 430 - this.height;
        this.getRealFrame();
        this.loadImages(this.images_walking);
        this.loadImages(this.images_dead); // Lade auch das tote Bild
        this.speed = 0.15 + Math.random() * 0.40;
        this.animate();
    };
    
    animate(){
             this.moveLeftInterval = gameIntervals(() => {
                if (!this.dead) { // Nur bewegen wenn nicht tot
                    this.moveLeft();
                }
            }, 1000 / 25);
           this.wakingInterval = gameIntervals(() => {
                if (!this.dead) { // Nur animieren wenn nicht tot
                    this.playAnimation(this.images_walking);
                }
            }, 100);

    }

    deadChicken() {
        this.dead = true;
        this.speed = 0; // Stoppe Bewegung
        clearInterval(this.moveLeftInterval);
        clearInterval(this.wakingInterval);
        
        // Direkte und sichere Bildladung
        this.loadImage('assets/images/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        
        // Zusätzlich: Stelle sicher, dass das Bild sofort gesetzt wird
        if (this.imageCache['assets/images/3_enemies_chicken/chicken_normal/2_dead/dead.png']) {
            this.img = this.imageCache['assets/images/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
        }
    }
}