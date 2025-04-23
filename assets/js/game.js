let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
   world = new World(canvas);
    
   console.log('My Character', world.character);
   
}
window.addEventListener('keypress', (e) => {
    console.log(e);
    
})

document.onkeydown = function (e) {
    console.log('key down');
    console.log(e);
  };