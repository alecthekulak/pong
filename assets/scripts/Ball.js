// Ball
// Default Dimensions: 5x5, Speed: 7 (in each direction)
class Ball { // Consider doing ball as a square, as they did on the 1972 Atari 
    static size = 5 * appScale;
    static maxSpeed = 9 * appScale * speed; //7 * appScale * speed;
    static maxAngle = 65; //75; 
    static refresh() {
        Ball.maxSpeed = 9 * appScale * speed;
        console.log(`new max speed: ${Ball.maxSpeed}`);
    }
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
            this.x = Paddle.paddleOffset + Paddle.width + Ball.maxSpeed * 3;
            this.xSpeed = -Ball.maxSpeed;
        } else if (side == 'mid') {
            this.x = appWidth / 2;
            this.xSpeed = -Ball.maxSpeed;
        } else {
            this.x = appWidth - (Paddle.paddleOffset + Paddle.width + Ball.maxSpeed * 3);
            this.xSpeed = Ball.maxSpeed;
        }
        this.xPred = this.x;
        this.yPred = this.y;
        this.ySpeedPred = this.ySpeed;
        this.lastPred = -1;
    }
    left() { return this.x - (Ball.size / 2); }
    right() { return this.x + (Ball.size / 2); }
    top() { return this.y - (Ball.size / 2); }
    bottom() { return this.y + (Ball.size / 2); }
    update() {
        if (this.xSpeed == 0 && this.ySpeed == 0) {
            this.xSpeed = Ball.maxSpeed * 2 * (Math.floor(2 * Math.random()) - 0.5);
        }
        if (this.predCurrent == 1 && this.x > appWidth / 2) {
            console.log(`pred cur: ${this.predCurrent}`);
            this.predCurrent = 0;
        } else if (this.predCurrent == -1 && this.x < appWidth / 2) {
            this.predCurrent = 0;
            console.log(`pred cur: ${this.predCurrent}`);
        }
        // console.log(`AppHeight: ${appHeight}, AppWidth: ${appWidth}`);
        // console.log(`x: ${this.x}, y: ${this.y}`);
        // console.log(`xSpeed: ${this.xSpeed}, ySpeed: ${this.ySpeed}, maxSpeed: ${Ball.maxSpeed}`);
        if (this.left() < 0 || this.right() > appWidth) {
            this.alive = false;
        }
        if (this.top() < 0 || this.bottom() > appHeight) {
            this.y = constrain(this.y, Ball.size / 2, appHeight - Ball.size / 2);
            this.ySpeed *= -1;
        }
        this.move();
    }
    bounce(paddle) { // Redo the way that bounces happen, I don't think the angle is translating correctly 
        this.predCurrent = 0;
        let bounceAngle;
        if (paddle.control.value == 'wall') { 
            bounceAngle = Math.random() * 180 - 90; 
        } else {
            let displacement = 2 * (paddle.yMidpoint() - this.y) / paddle.height;
            bounceAngle = displacement * 90 * Math.PI / 180; 
        }
        console.log(`bounceAngle (bef const): ${round(bounceAngle,2)}`);
        if (bounceAngle < 0) {
            bounceAngle = constrain(bounceAngle, -Ball.maxAngle, Ball.maxAngle - 90);
        } else { 
            bounceAngle = constrain(bounceAngle, 90 - Ball.maxAngle, Ball.maxAngle);
        }
        console.log(`bounceAngle (aft const): ${round(bounceAngle,2)}`);
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
        // console.log(`making a prediction for (left: ${paddle.isLeft})`);
        this.xPred = this.x;
        this.yPred = this.y;
        this.ySpeedPred = this.ySpeed;
        while (abs(this.xPred - paddle.x) > Ball.maxSpeed) {
            this.xPred += this.xSpeed;
            this.yPred += this.ySpeedPred;
            if ((this.yPred + Ball.size / 2) < 0 || (this.yPred - Ball.size / 2) > appHeight) {
                this.yPred = constrain(this.yPred, Ball.size / 2, appHeight - Ball.size / 2);
                this.ySpeedPred *= -1;
            }
        }
        this.predCurrent = (this.x < appWidth / 2) ? 1 : -1;
    }
    show() {
        circle(this.x, this.y, Ball.size / 2);
    }
}