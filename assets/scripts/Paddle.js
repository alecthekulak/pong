// // Variable and constant declarations 
// const paddle_offset = 15; 
// Paddles
// Default Dimensions: 2x28, Speed: 4
class Paddle {
    width = 2 * appScale;
    height = 28 * appScale; 
    maxSpeed = 4 * appScale / fpsMult;
    paddleOffset = 15 * appScale; 
    constructor(side = 'left') {
        if (side == 'left') {
            this.player = true;
            this.x = this.paddleOffset;
        } else {
            this.player = false; 
            console.log(`appWidth: ${appWidth}, offset: ${this.paddleOffset}, width: ${this.width}`);
            this.x = appWidth - this.paddleOffset - this.width;
        }
        this.points = 0; 
        this.reset(); 
    }
    left() {
        return this.x; 
    }
    right() {
        return this.x + this.width; 
    }
    top() {
        return this.y;
    }
    bottom() {
        return this.y + this.height; 
    }
    reset() {
        this.y = appHeight/2 - this.height/2; 
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
        if (this.player) {
            // console.log(`in Paddle, offset: ${this.paddleOffset}`);
            // console.log(`x: ${this.x}, y: ${this.y}`);
            // console.log(`width: ${this.width}, height: ${this.height}`);
            // // console.log(`xSpeed: ${this.xSpeed}, ySpeed: ${this.ySpeed}`);
            if (keyIsDown(UP_ARROW) || keyIsDown(87)) { //119
                this.ySpeed = -this.maxSpeed; 
            } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { //115
                this.ySpeed = this.maxSpeed; 
            } else {
                this.ySpeed = 0; 
            }
        } 
        if (this.y < 0 || (this.y + this.height) > appHeight) {
            this.y = constrain(this.y, 0, appHeight-this.height); 
            this.ySpeed = 0; 
        }
        this.move();
        if (this.collision(ball)) {
            ball.xSpeed *= -1; 
        }
    }
    move() {
        this.y += this.ySpeed; 
    }
    show() {
        // color(255); //0
        rect(this.x, this.y, this.width, this.height);
    }
}