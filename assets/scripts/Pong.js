// Alterable Parameters
const appScale = 2;
const fpsMult = 2; 
// Variable & constant declarations 
var appHeight = 256 * appScale; 
var appWidth = 512 * appScale; 
var lastPoint = 'player'; 
// const ball, player, opponent; 
//
function setup() {
    canvas = createCanvas(appWidth, appHeight);
    canvas.parent('p5Container');
    frameRate(30 * fpsMult);
    ball = new Ball(); 
    player = new Paddle('left'); 
    opponent = new Paddle('right'); 
    console.log(`AppHeight: ${appHeight}, AppWidth: ${appWidth}`);
}
function draw() {
    frameRate(30);
    background(53); //0
    //
    ball.update();
    player.update();
    opponent.update();
    //
    ball.show();
    player.show();
    opponent.show();
}