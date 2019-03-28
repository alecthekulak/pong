const appScale = 1.8;
const appHeight = 256 * appScale, appWidth = 512 * appScale; 
function setup() {
    canvas = createCanvas(appWidth, appHeight);
    canvas.parent('p5Container');
}
function draw() {
    background(0);
}