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
            this.clean = clean;
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
}
// toggleAmount = new Iterator([2, 2, 0.4]);
// function toggleSpeed() {
//     frameRate(frameRate() * toggleAmount.value); 
//     toggleAmount.next(); 
// }
// redraw(); makes draw execute once, can use for training? draw once everything is ready instead of waiting for fps?