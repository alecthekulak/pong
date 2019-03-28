// Ball
// Default Dimensions: 5x5, Speed: 7 (in each direction)
class Ball {
    size = 5; 
    maxSpeed = 7;
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
    update() {
        console.log(`Key: ${key}`);
        console.log(`KeyCode: ${keyCode}`);
        if (this.x < (this.size/2) || this.x > (appHeight - this.size/2)) { 
            // TODO: Change from reflection to 'score point' 
            this.xSpeed *= -1; 
        }
        if (this.y < (this.size/2) || this.y > (appWidth - this.size/2)) {
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