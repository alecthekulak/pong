// Ball
// Default Dimensions: 5x5, Speed: 7 (in each direction)
class Ball { // Consider doing ball as a square, as they did on the 1972 Atari 
    static size = 5 * appScale;
    static maxSpeed = 9 * appScale / fpsMult; //7 * appScale / fpsMult;
    static maxAngle = 70; //75; 
    constructor() {
        this.reset('mid');
    }
    reset(side = 'left') {
        this.y = appHeight / 2;
        this.ySpeed = 0;
        this.alive = true;
        if (side == 'left') {
            // console.log(`paddle off: ${Paddle.paddleOffset}, paddle width: ${Paddle.width}`);
            this.y -= 7;
            this.x = Paddle.paddleOffset + Paddle.width + 10;
            this.xSpeed = -Ball.maxSpeed;
        } else if (side == 'mid') {
            this.x = appWidth / 2;
            this.xSpeed = -Ball.maxSpeed;
        } else {
            this.x = appWidth - (Paddle.paddleOffset + Paddle.width + 10);
            this.xSpeed = Ball.maxSpeed;
        }
        this.xPred = this.x;
        this.yPred = this.y;
        this.ySpeedPred = this.ySpeed;
        this.predCurrent = false; 
    }
    left() { return this.x - (Ball.size / 2); }
    right() { return this.x + (Ball.size / 2); }
    top() { return this.y - (Ball.size / 2); }
    bottom() { return this.y + (Ball.size / 2); }
    update() {
        if (this.xSpeed == 0 && this.ySpeed == 0) {
            this.xSpeed = Ball.maxSpeed * 2 * (Math.floor(2 * Math.random()) - 0.5);
        }
        // console.log(`AppHeight: ${appHeight}, AppWidth: ${appWidth}`);
        // console.log(`x: ${this.x}, y: ${this.y}`);
        // console.log(`xSpeed: ${this.xSpeed}, ySpeed: ${this.ySpeed}`);
        if (this.left() < 0 || this.right() > appWidth) {
            this.alive = false;
        }
        if (this.top() < 0 || this.bottom() > appHeight) {
            this.y = constrain(this.y, Ball.size / 2, appHeight - Ball.size / 2);
            this.ySpeed *= -1;
        }
        this.move();
    }
    bounce(paddle) {
        this.predCurrent = false; 
        let displacement = 2 * (paddle.yMidpoint() - this.y) / Paddle.height; // abs()
        let bounceAngle = displacement * Ball.maxAngle * Math.PI / 180;
        // console.log(`Ball displacement: ${displacement.toFixed(2)}, bounceAngle: ${(bounceAngle * 180 / Math.PI).toFixed(2)}, left paddle?: ${paddle.isLeft}`);
        if (paddle.isLeft) {
            this.xSpeed = Ball.maxSpeed * Math.cos(bounceAngle);
            this.ySpeed = Ball.maxSpeed * -Math.sin(bounceAngle);
            this.x = paddle.right() + (Ball.size / 2) + 1;
        } else {
            this.xSpeed = Ball.maxSpeed * -Math.cos(bounceAngle);
            this.ySpeed = Ball.maxSpeed * Math.sin(bounceAngle);
            this.x = paddle.left() - (Ball.size / 2) - 1;
        }
    }
    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
    isTowards(paddle) {
        return (Math.sign(paddle.x - this.x) == Math.sign(this.xSpeed));
    }
    predict(paddle) {
        this.xPred = this.x;
        this.yPred = this.y;
        this.ySpeedPred = this.ySpeed;
        // console.log(`before pred, ball: ${this.yPred}`);
        // console.log(`ball x: ${this.xPred}, paddle x: ${paddle.x}    (max speed: ${Ball.maxSpeed})`);
        while (abs(this.xPred - paddle.x) > Ball.maxSpeed) {
            this.xPred += this.xSpeed;
            this.yPred += this.ySpeedPred;
            // console.log(`      ${(this.yPred + (this.height / 2))} and ${(this.yPred + this.height / 2)}`)
            if ((this.yPred + Ball.size / 2) < 0 || (this.yPred - Ball.size / 2) > appHeight) {
                // console.log(`predicting bounce, ball x: ${this.xPred}, ball y: ${this.yPred}, speed:: ${this.ySpeedPred}`);
                this.yPred = constrain(this.yPred, Ball.size / 2, appHeight - Ball.size / 2);
                this.ySpeedPred *= -1;
                // console.log(`after bounce, ball x: ${this.xPred}, ball y: ${this.yPred}, speed:: ${this.ySpeedPred}`);
            }
        }
        this.predCurrent = true; 
        // console.log(`after pred, ball: ${this.yPred}`);
    }
    show() {
        circle(this.x, this.y, Ball.size / 2);
    }
}