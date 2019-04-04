// Alterable Parameters
appScale = 2;
console.log("started");
const fpsMult = 2;
function preload() {
    font = loadFont('assets/fonts/bit5x3.ttf'); //bit5x3 //bit5x5 //bit9x9
    if (windowHeight <= 512 || windowWidth <= 1024) {
        appScale = 1;
    }
}
// Variable & constant declarations 
var appHeight = 256 * appScale;
var appWidth = 512 * appScale;
const dashes = 30; const dashSize = 0.6;
//
function setup() {
    canvas = createCanvas(appWidth, appHeight);
    canvas.parent('p5Container');
    frameRate(30 * fpsMult);
    ball = new Ball();
    player = new Paddle('left', 'player');
    opponent = new Paddle('right', 'computer');
    textFont(font);
    textSize(40 * appScale);
    textAlign(CENTER);
    console.log(`AppHeight: ${appHeight}, AppWidth: ${appWidth}`);
}
function draw() {
    frameRate(30);
    background(0); //53
    noStroke();
    // Determine if game is still going 
    if (!ball.alive) {
        resetAll();
    }
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
    // scale(2);
    scale(1, 2);
    text(player.points, appWidth / 4, appHeight / 8);
    text(opponent.points, 3 * appWidth / 4, appHeight / 8);
}
function resetAll() {
    player.reset();
    opponent.reset();
    if (ball.right() <= 0) { // Off to the left
        opponent.points += 1;
        ball.reset('right');
    } else {
        player.points += 1;
        ball.reset('left');
    }
}
function drawDashedLine() {
    const dashLength = appHeight / dashes;
    for (let i = 0; i < dashes; i++) {
        line(appWidth / 2, i * dashLength, appWidth / 2, i * dashLength + dashSize * dashLength)
    }
}
function keyPressed() {
    if (keyCode == 49) {
        if (player.control == 'player') {
            player.control = 'computer';
        } else if (player.control == 'computer') {
            player.control = 'player';
        }
    } else if (keyCode == 50) {
        if (opponent.control == 'player') {
            opponent.control = 'computer';
        } else if (opponent.control == 'computer') {
            opponent.control = 'player';
        }

    }
}