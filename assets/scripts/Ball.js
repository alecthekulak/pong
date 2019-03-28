// Ball
// Default Dimensions: 5x5, Speed: 7 (in each direction)
class Ball { // Consider doing ball as a square, as they did on the 1972 Atari 
    size = 5 * appScale; 
    maxSpeed = 7 * appScale / fpsMult;
    constructor() {
        this.reset('left'); 
    }
    reset(side = 'left') {
        this.y = appHeight/2; 
        this.ySpeed = 0; 
        this.alive = true; 
        switch (side) {
            case 'left': 
                this.x = Paddle.paddleOffset + Paddle.width + 10;
                this.xSpeed = -1 * this.maxSpeed; 
            case 'right': 
                this.x = appWidth - (Paddle.paddleOffset + Paddle.width + 10);
                this.xSpeed = this.maxSpeed; 
            default: 
                this.x = appWidth/2;
                this.xSpeed = this.maxSpeed * Math.floor(2 * Math.random() - 1);; 
        }
    }
    left() {
        return this.x - (this.size/2); 
    }
    right() {
        return this.x + (this.size/2); 
    }
    top() {
        return this.y - (this.size/2); 
    }
    bottom() {
        return this.y + (this.size/2); 
    }
    update() { 
        if (this.xSpeed == 0 && this.ySpeed == 0) {
            this.xSpeed = this.maxSpeed * Math.floor(2 * Math.random() - 1);; 
            this.ySpeed = this.maxSpeed * Math.floor(2 * Math.random() - 1);; 
        }
        // console.log(`AppHeight: ${appHeight}, AppWidth: ${appWidth}`);
        // console.log(`x: ${this.x}, y: ${this.y}`);
        // console.log(`xSpeed: ${this.xSpeed}, ySpeed: ${this.ySpeed}`);
        if (this.left() < 0 || this.right() > appWidth) { 
            // TODO: Change from reflection to 'score point' 
            this.alive = false; 
            // this.xSpeed *= -1; 
        }
        if (this.top() < 0 || this.bottom() > appHeight) { 
            this.y = constrain(this.y, this.size/2, appHeight - this.size/2);
            this.ySpeed *= -1; 
        }
        this.move(); 
    }
    move() {
        this.x += this.xSpeed; 
        this.y += this.ySpeed; 
    }
    show() {
        circle(this.x, this.y, this.size/2); 
    }
}