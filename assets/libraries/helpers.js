paused = false;
function pause() {
    if (paused) {
        loop();
    } else {
        noLoop();
    }
    paused = !paused;
}
// redraw(); makes draw execute once, can use for training? draw once everything is ready instead of waiting for fps?