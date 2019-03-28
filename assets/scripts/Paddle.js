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
            this.x = this.appWidth - this.paddleOffset - this.width;
        }
        this.reset(); 
    }
    reset() {
        this.y = appHeight/2; 
        this.ySpeed = 0; 
    }
    update(ball) {
        if (this.player) {
            // console.log(`in Paddle, offset: ${this.paddleOffset}`);
            // console.log(`x: ${this.x}, y: ${this.y}`);
            // console.log(`width: ${this.width}, height: ${this.height}`);
            // // console.log(`xSpeed: ${this.xSpeed}, ySpeed: ${this.ySpeed}`);
            if (keyIsDown(UP_ARROW) || keyIsDown(119)) {
                this.ySpeed = this.maxSpeed; 
            } else if (keyIsDown(DOWN_ARROW) || keyIsDown(115)) {
                this.ySpeed = -1 * this.maxSpeed; 
            }
        }
        
        if (this.y < 0 || (this.y + this.height) > appHeight) {
            this.y = constrain(this.y, 0, appHeight-this.height); 
            this.ySpeed = 0; 
        }

        this.move();
    }
    move() {
        this.y += this.ySpeed; 
    }
    show() {
        // noStroke();
        color(255); //0
        rect(this.x, this.y, this.width, this.height);
    }
}
// // Old, object literal implimentation
// var paddle0 = {
//     width: 2, height: 28,
//     x: 3, y: appHeight/2 - height/2,
//     reset: function() {
//         this.y = appHeight/2 - height/2;
//     },
//     show: function() {
//         rect(x, y, width, height);
//     }
// };
// var paddle1 = {
//     width: 2, height: 28,
//     x: appWidth-3-width, y: 40,
//     reset: function() {
//         this.y = appHeight/2 - height/2;
//     },
//     show: function() {
//         rect(x, y, width, height);
//     }
// };