// // Variable and constant declarations 
// const paddle_offset = 15; 
// Paddles
// Default Dimensions: 2x28, Speed: 4
class Paddle {
    static width = 5 * appScale; //2 * appScale;
    static height = 28 * appScale;
    static maxSpeed = 7 * appScale / fpsMult; //4 * appScale / fpsMult;
    static paddleOffset = 5 * appScale; //15 * appScale; 
    static yAcceleration = 2.4 * appScale / fpsMult;
    constructor(side = 'left', control = 'player') {
        this.control = control;
        if (side == 'left') {
            this.isLeft = true;
            this.x = Paddle.paddleOffset;
        } else {
            this.isLeft = false;
            // console.log(`appWidth: ${appWidth}, offset: ${Paddle.paddleOffset}, width: ${Paddle.width}`);
            this.x = appWidth - Paddle.paddleOffset - Paddle.width;
        }
        this.points = 0;
        this.reset();
    }
    left() { return this.x; }
    right() { return this.x + Paddle.width; }
    top() { return this.y; }
    bottom() { return this.y + Paddle.height; }
    xMidpoint() { return this.x + (Paddle.width / 2); }
    yMidpoint() { return this.y + (Paddle.height / 2); }
    reset() {
        this.y = appHeight / 2 - Paddle.height / 2;
        if (this.control == 'player') {
            this.y += 7;
        }
        this.ySpeed = 0;
    }
    collision(obj) {
        if ((this.top() <= obj.top() && obj.top() <= this.bottom()) || (this.top() <= obj.bottom() && obj.bottom() <= this.bottom())) {
            if ((this.left() <= obj.left() && obj.left() <= this.right()) || (this.left() <= obj.right() && obj.right() <= this.right())) {
                return true;
            }
        }
        return false;
    }
    update(ball) {
        if (this.control == 'player') {
            // console.log(`in Paddle, offset: ${this.paddleOffset}`);
            // console.log(`x: ${this.x}, y: ${this.y}`);
            // console.log(`width: ${this.width}, height: ${this.height}`);
            // console.log(`xSpeed: ${this.xSpeed}, ySpeed: ${this.ySpeed}`);
            if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
                this.ySpeed += Paddle.yAcceleration;
            } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
                this.ySpeed -= Paddle.yAcceleration;
            } else if (this.ySpeed > 0) {
                this.ySpeed -= Paddle.yAcceleration;
                this.ySpeed = constrain(this.ySpeed, 0, Paddle.maxSpeed);
            } else if (this.ySpeed < 0) {
                this.ySpeed += Paddle.yAcceleration;
                this.ySpeed = constrain(this.ySpeed, -Paddle.maxSpeed, 0);
            }
        } else {
            if (this.yMidpoint() > (ball.y + Paddle.height / 4)) {
                this.ySpeed += Paddle.yAcceleration;
            } else if (this.yMidpoint() < (ball.y - Paddle.height / 4)) {
                this.ySpeed -= Paddle.yAcceleration;
            } else if (this.ySpeed > 0) {
                this.ySpeed -= Paddle.yAcceleration;
                this.ySpeed = constrain(this.ySpeed, 0, Paddle.maxSpeed);
            } else if (this.ySpeed < 0) {
                this.ySpeed += Paddle.yAcceleration;
                this.ySpeed = constrain(this.ySpeed, -Paddle.maxSpeed, 0);
            }
        }
        this.ySpeed = constrain(this.ySpeed, -Paddle.maxSpeed, Paddle.maxSpeed);
        this.move(); // maybe put 'move()' above the 'if' statement 
        if (this.y <= 0 || this.bottom() >= appHeight) {
            this.y = constrain(this.y, 0, appHeight - Paddle.height);
            this.ySpeed = 0;
        }
        if (this.collision(ball) && ball.alive) {
            // if (this.isLeft) {
            //     console.log(`Collision on left paddle`);
            // } else {
            //     console.log(`Collision on right paddle`);
            // }
            ball.bounce(this);
        }
    }
    move() {
        this.y -= this.ySpeed;
    }
    show() {
        rect(this.x, this.y, Paddle.width, Paddle.height);
    }
}