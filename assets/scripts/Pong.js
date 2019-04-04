// Alterable Parameters
appScale = 2;
console.log("started");
// speedSelector = new Iterator([2, 4, 8]); 
speed = 0.5;
function preload() {
    scoreFont = loadFont('assets/fonts/bit5x3.ttf'); //bit5x3 //bit5x5 //bit9x9
    // labelFont = loadFont('assets/fonts/bit9x9.ttf'); //bit5x3 //bit5x5 //bit9x9
    labelFont = 'Helvetica';
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
    frameRate(30);
    ball = new Ball();
    // player = new Paddle('left', 'player');
    player = new Paddle('left', 'computer_follow');
    // opponent = new Paddle('right', 'computer_follow');
    opponent = new Paddle('right', 'computer_predict');
    console.log(`AppHeight: ${appHeight}, AppWidth: ${appWidth}`);
}
function draw() {
    background(0); //53
    noStroke();
    // Determine if game is still going 
    if (!ball.alive) {
        resetAll();
    }

    // Update positions and display objects
    ball.update();
    player.update(ball);
    opponent.update(ball);
    ball.show();
    player.show();
    opponent.show();

    // Display Points 
    stroke(255);
    fill(255);
    textFont(labelFont);
    textSize(8 * appScale);
    textAlign(LEFT, TOP);
    text(player.control.getClean().toUpperCase(), 6, 3);
    textAlign(RIGHT);
    text(opponent.control.getClean().toUpperCase(), appWidth - 6, 3);
    drawDashedLine();
    scale(1, 2);
    textFont(scoreFont);
    textSize(38 * appScale);
    textAlign(CENTER, CENTER);
    text(str(player.points).padStart(2, '0'), appWidth / 4, appHeight / 9);
    text(str(opponent.points).padStart(2, '0'), 3 * appWidth / 4, appHeight / 9);
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
    if (key == '1') { // keyCode == 49 // Toggle control of left paddle
        player.control.next();
    } else if (key == '2') { // keyCode == 50 // Toggle control of right paddle
        opponent.control.next();
    } else if (key == 'p') { // Pause 
        pause();
    } else if (key == 's') { // Toggle speed 
        speed = toggleSpeed(speed);
        console.log(`new speed: ${speed}`);
        Ball.refresh();
        Paddle.refresh();
    }
}
