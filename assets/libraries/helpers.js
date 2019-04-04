paused = false;
function pause() {
    if (paused) {
        loop();
    } else {
        noLoop();
    }
    paused = !paused;
}
