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
    // toggle(list, selection=0, clean=list){
    //     this.constructor(list, selection, clean); 
    //     this.addInvProd(); 
    // }
    next() {
        this.i = (this.i + 1) % (this.list.length);
        this.value = this.list[this.i];
    }
    getClean() {
        return this.clean[this.i];
    }
    asToggle() {
        let cumProd = this.list.reduce((total, val) => total * val);
        this.list.push(1 / cumProd);
        this.clean.push(1 / cumProd);
        return this;
    }
}
// speedToggler = new Iterator([0.5, 0.5]).asToggle();
speedToggler = new Iterator([1, 2, 2]).asToggle();
function toggleSpeed(speed) {
    if (speedToggler.value <= 1) {
        toggleFrames(); 
    }
    let newSpeed = speed * speedToggler.value;
    speedToggler.next(); 
    return newSpeed; 
} // 'frameRate()' doesn't work any more for some reason 
targetRate = 30;
function toggleFrames() { // Fps can't go over 60 usually 
    if (targetRate == 30) {
        targetRate = 60;
    } else {
        targetRate = 30;
    }
    frameRate(targetRate); 
}
// redraw(); makes draw execute once, can use for training? draw once everything is ready instead of waiting for fps?