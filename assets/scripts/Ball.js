// Ball
// Default Dimensions: 5x5, Speed: 7 (in each direction)
class Ball {
    size = 5 * appScale; 
    maxSpeed = 7 * appScale / fpsMult;
    constructor() {
        this.reset('left'); 
    }
    reset(side = 'left') {
        this.y = appHeight/2; 
        this.ySpeed = 0; 
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
        // console.log(`AppHeight: ${appHeight}, AppWidth: ${appWidth}`);
        // console.log(`x: ${this.x}, y: ${this.y}`);
        // console.log(`xSpeed: ${this.xSpeed}, ySpeed: ${this.ySpeed}`);
        // if (this.left() < 0 || this.x > (appWidth - this.size/2)) { 
        if (this.left() < 0 || this.right() > appWidth) { 
            // TODO: Change from reflection to 'score point' 
            this.xSpeed *= -1; 
        }
        // if (this.y < (this.size/2) || this.y > (appHeight - this.size/2)) {
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
        circle(this.x, this.y, this.size); 
    }
}
// // Old, object literal implimentation
// var ball = {
//     size: 5,
//     x: appWidth/2, y: appHeight/2,
//     xSpeed: 0, ySpeed: 0, 
//     reset: function(left=false) {
//         this.y = appHeight/2; 
//         this.ySpeed = 0; 
//         if (left) {
//             this.x = paddle0.x + paddle0.width + 5;
//             this.xSpeed = -7; 
//         } else {
//             this.x = paddle1.x - 5;
//             this.xSpeed = 5; 
//         }
//     },
//     move: function() {
//         this.x += this.xSpeed; 
//         this.y += this.ySpeed; 
//     },
//     show: function() {
//         circle(x, y, size); 
//     }
// };