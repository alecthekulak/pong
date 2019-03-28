// Alterable Parameters
const appScale = 2;
const fpsMult = 2; 
// Variable & constant declarations 
var appHeight = 256 * appScale; 
var appWidth = 512 * appScale; 
const dashes = 30; const dashSize = 0.7;
var lastPoint = 'player'; 
// const ball, player, opponent; 
//
function preload() {
    font = loadFont('assets/fonts/bit5x3.ttf');
    // font = loadFont('assets/fonts/bit5x5.ttf');
    // font = loadFont('assets/fonts/bit9x9.ttf');
}
function setup() {
    canvas = createCanvas(appWidth, appHeight);
    canvas.parent('p5Container');
    frameRate(30 * fpsMult);
    ball = new Ball(); 
    player = new Paddle('left'); 
    opponent = new Paddle('right'); 
    textFont(font);
    textSize(65);
    console.log(`AppHeight: ${appHeight}, AppWidth: ${appWidth}`);
}
function draw() {
    frameRate(30);
    background(0); //53
    noStroke();
    //
    ball.update();
    player.update(ball);
    opponent.update(ball);
    //
    ball.show();
    player.show();
    opponent.show();
    // Display Points 
    stroke(255);
    fill(255);
    drawDashedLine();
    scale(1,2);
    text(player.points, appWidth/4, 60);
    text(opponent.points, 3*appWidth/4, 60);
}
function drawDashedLine() {
    const dashLength = appHeight / dashes; 
    for (let i = 0; i < dashes; i++) {
        line(appWidth/2, i * dashLength, appWidth/2, i * dashLength + dashSize * dashLength)
    }

}