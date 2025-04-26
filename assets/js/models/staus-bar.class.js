class Statusbar extends DrawableObject{
    x = 100;
    y = 50;
    width = 100;
    height = 50;
    enemies;
    clouds;
    backgroundObjects;
    constructor(enemies, clouds, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;

   }
}