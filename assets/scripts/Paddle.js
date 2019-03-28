// // Variable and constant declarations 
// const paddle_offset = 15; 
// Paddles
// Default Dimensions: 2x28, Speed: 4
class Paddle {
    static width = 2 * appScale;
    static height = 28 * appScale; 
    static maxSpeed = 4 * appScale / fpsMult;
    static paddleOffset = 15 * appScale; 
    constructor(side = 'left') {
        if (side == 'left') {
            this.player = true;
            this.x = Paddle.paddleOffset;
        } else {
            this.player = false; 
            console.log(`appWidth: ${appWidth}, offset: ${Paddle.paddleOffset}, width: ${Paddle.width}`);
            this.x = appWidth - Paddle.paddleOffset - Paddle.width;
        }
        this.points = 0; 
        this.reset(); 
    }
    left() {
        return this.x; 
    }
    right() {
        return this.x + Paddle.width; 
    }
    top() {
        return this.y;
    }
    bottom() {
        return this.y + Paddle.height; 
    }
    yMidpoint() {
        return this.y + (Paddle.height/2); 
    }
    reset() {
        this.y = appHeight/2 - Paddle.height/2; 
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
        this.ySpeed = 0;
        if (this.player) {
            // console.log(`in Paddle, offset: ${this.paddleOffset}`);
            // console.log(`x: ${this.x}, y: ${this.y}`);
            // console.log(`width: ${this.width}, height: ${this.height}`);
            // // console.log(`xSpeed: ${this.xSpeed}, ySpeed: ${this.ySpeed}`);
            if (keyIsDown(UP_ARROW) || keyIsDown(87)) { //119
                this.ySpeed = Paddle.maxSpeed; // Move up 
            } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { //115
                this.ySpeed = -Paddle.maxSpeed; // Move up 
            } 
        } else {
            if (this.yMidpoint() > ball.y) {
                this.ySpeed = Paddle.maxSpeed; // Move up 
            } else if (this.yMidpoint() < ball.y) { 
                this.ySpeed = -Paddle.maxSpeed; // Move down
            }
        }
        if (this.y < 0 || (this.y + Paddle.height) > appHeight) {
            this.y = constrain(this.y, 0, appHeight - Paddle.height); 
            this.ySpeed = 0; 
        }
        this.move();
        if (this.collision(ball)) {
            ball.bounce(this.ySpeed);
            // ball.xSpeed *= -1; 
        }
    }
    move() {
        this.y -= this.ySpeed; 
    }
    show() {
        // color(255); //0
        rect(this.x, this.y, Paddle.width, Paddle.height);
    }
}