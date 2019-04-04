// Alterable Parameters
appScale = 2;
console.log("started");
// speedSelector = new Iterator([2, 4, 8]); 
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
// var paused = false; 
//
function setup() {
    canvas = createCanvas(appWidth, appHeight);
    canvas.parent('p5Container');
    frameRate(30 * fpsMult);
    ball = new Ball();
    // player = new Paddle('left', 'player');
    player = new Paddle('left', 'computer_follow');
    // opponent = new Paddle('right', 'computer_follow');
    opponent = new Paddle('right', 'computer_predict');
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
    // ball.predict(30); 
    // if (ball.isTowards(opponent) && !ball.predCurrent) {
    //     console.log(`Ball is towards opponent.`);
    //     console.log(`Current x:${ball.x}, y:${ball.y}. Pred x:${ball.xPred}, y:${ball.yPred}`);
    //     ball.predict(opponent);
    //     console.log(`Current x:${ball.x}, y:${ball.y}. Pred x:${ball.xPred}, y:${ball.yPred}`);
    // }
    // console.log(`Current x:${ball.x}, y:${ball.y}. Pred x:${ball.xPred}, y:${ball.yPred}`);
    //
    ball.show();
    player.show();
    opponent.show();

    // Display Points 
    stroke(255);
    fill(255);
    drawDashedLine();
    scale(1, 2);
    textSize(40 * appScale);
    textAlign(CENTER, CENTER);
    text(str(player.points).padStart(2, '0'), appWidth / 4, appHeight / 9);
    text(str(opponent.points).padStart(2, '0'), 3 * appWidth / 4, appHeight / 9);
    textSize(6 * appScale);
    textAlign(LEFT, TOP);
    text(player.control.getClean(), 6, 3);
    textAlign(RIGHT);
    text(opponent.control.getClean(), appWidth-6, 3);
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
    if (key == '1') { // keyCode == 49
        player.control.next(); 
    } else if (key == '2') { // keyCode == 50
        opponent.control.next(); 
    } else if (key == 'p') {
        pause();
    }
}
