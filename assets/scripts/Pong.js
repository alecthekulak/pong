// Alterable Parameters
const appScale = 1.8;
// Variable & constant declarations 
const appHeight = 256 * appScale, appWidth = 512 * appScale; 
var lastPoint = 'player'; 
// const ball, player, opponent; 
//
function setup() {
    canvas = createCanvas(appWidth, appHeight);
    canvas.parent('p5Container');
    frameRate(30);
    ball = new Ball(); 
    player = new Paddle(); 
    opponent = new Paddle(); 
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