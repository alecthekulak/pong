// // Variable and constant declarations 
// const paddle_offset = 15; 
// Paddles
// Default Dimensions: 2x28, Speed: 4
class Paddle {
    width = 2;
    height = 28; 
    maxSpeed = 4;
    paddleOffset = 15; 
    constructor(side = 'left') {
        switch (side) {
            case 'left': 
                this.player = true;
                this.x = this.paddle_offset;
            default: 
                this.player = false; 
                this.x = this.appWidth - this.paddle_offset - this.width;
        }
        this.reset(); 
    }
    reset() {
        this.y = appHeight/2; 
        this.ySpeed = 0; 
    }
    update() {
        if (keyIsDown(UP_ARROW) || keyIsDown(119)) {
            this.ySpeed = this.maxSpeed; 
        } else if (keyIsDown(DOWN_ARROW) || keyIsDown(115)) {
            this.ySpeed = -1 * this.maxSpeed; 
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