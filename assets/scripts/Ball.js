// Ball
// Default Dimensions: 5x5, Speed: 7 (in each direction)
class Ball { // Consider doing ball as a square, as they did on the 1972 Atari 
    static size = 5 * appScale; 
    static maxSpeed = 8 * appScale / fpsMult; //7 * appScale / fpsMult;
    static maxAngle = 75; //75; 
    constructor() {
        this.reset('mid'); 
    }
    reset(side = 'left') {
        this.y = appHeight/2; 
        this.ySpeed = 0; 
        this.alive = true; 
        if (side == 'left') {
            // console.log(`paddle off: ${Paddle.paddleOffset}, paddle width: ${Paddle.width}`);
            this.x = Paddle.paddleOffset + Paddle.width + 10;
            this.xSpeed = -Ball.maxSpeed; 
        } else if (side == 'mid') {
            this.x = appWidth / 2;
            this.xSpeed = -Ball.maxSpeed; 
        } else {
            this.x = appWidth - (Paddle.paddleOffset + Paddle.width + 10);
            this.xSpeed = Ball.maxSpeed; 
        }
    }
    left() { 
        return this.x - (Ball.size/2); 
    }
    right() {
        return this.x + (Ball.size/2); 
    }
    top() {
        return this.y - (Ball.size/2); 
    }
    bottom() {
        return this.y + (Ball.size/2); 
    }
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
            this.y = constrain(this.y, Ball.size/2, appHeight - Ball.size/2);
            this.ySpeed *= -1; 
        }
        this.move(); 
    }
    move() {
        this.x += this.xSpeed; 
        this.y += this.ySpeed; 
    }
    bounce(paddle) {
        let displacement = 2 * abs(paddle.yMidpoint() - this.y) / Paddle.height;
        let bounceAngle = displacement * Ball.maxAngle;
        console.log(`displacement: ${displacement}, bounceAngle: ${bounceAngle}, left: ${paddle.isLeft}`);
        if (paddle.isLeft) {
            this.xSpeed = Ball.maxSpeed * Math.cos(bounceAngle);
            this.ySpeed = Ball.maxSpeed * -Math.sin(bounceAngle);
            this.x = paddle.right() + (Ball.size/2) + 1; 
        } else {
            this.xSpeed = Ball.maxSpeed * -Math.cos(bounceAngle);
            this.ySpeed = Ball.maxSpeed * Math.sin(bounceAngle);
            this.x = paddle () - (Ball.size/2) - 1; 
        }
    }
    show() {
        circle(this.x, this.y, Ball.size/2); 
    }
}