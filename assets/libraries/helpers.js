paused = false;
function pause() {
    if (paused) {
        loop();
    } else {
        console.log('Pausing');
        noLoop();
    }
    paused = !paused;
}
class Iterator {
    constructor(list, selection = 0, clean = list) {
        if (list.constructor == Object) { // for passed dictionary 
            this.list = Object.keys(list);
            this.clean = this.list.map(key => list[key]);
        } else { // for passed lists 
            this.list = list;
            this.clean = Array.from(clean);
        }
        if (Number.isInteger(selection)) {
            this.i = selection;
        } else {
            this.i = this.list.findIndex(val => val == selection);
        }
        this.value = this.list[this.i];
    }
    next() {
        this.i = (this.i + 1) % (this.list.length);
        this.value = this.list[this.i];
    }
    getClean() {
        return this.clean[this.i];
    }
    // addInvProd() {
    //     let cumProd = this.list.reduce((total, val) => total * val);
    //     this.list.push(1 / cumProd);
    //     this.clean.push(1 / cumProd);
    // }
}
// toggleAmount = new Iterator([0.5, 0.5, 0.5]);
// function toggleSpeed(val) {
//     console.log(`list: ${toggleAmount.list}`);
//     let newVal = Math.round(val * toggleAmount.value);
//     toggleAmount.next(); 
//     return newVal; 
// } // 'frameRate()' doesn't work any more for some reason 
frameToggler = new Iterator([2, -1]); 
function toggleFrames(original) { // Fps can't go over 60 usually 
    console.log(`speed : ${frameRate()}`); 
    if (frameToggler.value < 0) {
        frameRate(original);
    } else {
        let newVal = Math.round(frameRate() * frameToggler.value);
        frameRate(newVal);
    }
    frameToggler.next();
}
// redraw(); makes draw execute once, can use for training? draw once everything is ready instead of waiting for fps?