// // Variable and constant declarations 
// Paddles
// Default Dimensions: 2x28, Speed: 4
var allControls = {
    'player': 'Player-Controlled',
    'computer_follow': 'Naive Computer',
    'computer_predict': 'Predictive Computer'
}
class Paddle {
    static width = Ball.maxSpeed; //2 * appScale;
    // static width = 5 * appScale; //2 * appScale;
    static height = 28 * appScale;
    static maxSpeed = 7 * appScale * speed; //4 * appScale * speed;
    static paddleOffset = 5 * appScale; //15 * appScale; 
    static yAcceleration = 0.5 * this.maxSpeed; //2.4
    static delay = 2 * 1000; // half a second prediction delay 
    static refresh() {
        Paddle.maxSpeed = 7 * appScale * speed; 
        Paddle.yAcceleration = 0.5 * Paddle.maxSpeed;
        // console.log(`width: ${Paddle.width}`);
    }
    constructor(side = 'left', control = 'player') {
        // this.control = new Iterator(allControls, control);
        this.control = new Iterator(allControls, control);
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
    left() { 
        if (this.isLeft) { 
            return this.right() - Ball.maxSpeed; 
        }
        return this.x; }
    right() { 
        if (!this.isLeft) { 
            return this.x + Ball.maxSpeed; 
        }
        return this.x + Paddle.width; }
    top() { return this.y; }
    bottom() { return this.y + Paddle.height; }
    xMidpoint() { return this.x + (Paddle.width / 2); }
    yMidpoint() { return this.y + (Paddle.height / 2); }
    reset() {
        this.y = appHeight / 2 - Paddle.height / 2;
        if (this.isLeft) {
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
    moveTo(yLocation, margin = Paddle.height / 4) { // height / 2 is max
        if (this.yMidpoint() > (yLocation + margin)) {
            this.ySpeed += Paddle.yAcceleration;
        } else if (this.yMidpoint() < (yLocation - margin)) {
            this.ySpeed -= Paddle.yAcceleration;
        } else if (this.ySpeed > 0) {
            this.ySpeed -= Paddle.yAcceleration;
            this.ySpeed = constrain(this.ySpeed, 0, Paddle.maxSpeed);
        } else if (this.ySpeed < 0) {
            this.ySpeed += Paddle.yAcceleration;
            this.ySpeed = constrain(this.ySpeed, -Paddle.maxSpeed, 0);
        }
    }
    update(ball) {
        if (!ball.predCurrent && ball.isTowards(this)) {
            setTimeout(ball.predict(this), 2000);
        }
        if (this.control.value == 'player') {
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
        } else if (this.control.value == 'computer_follow') {
            this.moveTo(ball.y, Paddle.height / 4); //Paddle.height / 4
        } else { //this.control == 'computer_predict') {
            if (!ball.isTowards(this)) {
                this.moveTo(appHeight / 2);
            } else {
                // console.log(`move to ball, this: ${this.yMidpoint()}, ball: ${ball.yPred}`);
                this.moveTo(ball.yPred, Paddle.yAcceleration); // Paddle.yAcceleration minimum dist, any lower and it oscillates 
            }
        }
        this.ySpeed = constrain(this.ySpeed, -Paddle.maxSpeed, Paddle.maxSpeed);
        this.move(); // maybe put 'move()' above the 'if' statement 
        if (this.y <= 0 || this.bottom() >= appHeight) {
            this.y = constrain(this.y, 0, appHeight - Paddle.height);
            this.ySpeed = 0;
        }
        if (this.collision(ball) && ball.alive) {
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