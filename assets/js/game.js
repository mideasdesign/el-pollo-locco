let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
   
}
window.addEventListener('keydown', (e) => {
    console.log(e);
  if (e.keyCode == 37) {
        keyboard.left = true;
    }
    if (e.keyCode == 39) {
        keyboard.right = true;
    }
    if (e.keyCode == 38) {
        keyboard.up = true;
    }
    if (e.keyCode == 40) {
        keyboard.down = true;
    }
    if (e.keyCode == 32) {
        keyboard.space = true;
    }
    if (e.keyCode == 84) {
        keyboard.t = true;
    }
});
window.addEventListener('keyup', (e) => {
    console.log(e);
  if (e.keyCode == 37) {
        keyboard.left = false;
    }
    if (e.keyCode == 39) {
        keyboard.right = false;
    }
    if (e.keyCode == 38) {
        keyboard.up = false;
    }
    if (e.keyCode == 40) {
        keyboard.down = false;
    }
    if (e.keyCode == 32) {
        keyboard.space = false;
    }
    if (e.keyCode == 84) {
        keyboard.t = false;
    }
});