function hScroll(elementId) {
    e = window.event;
    let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    document.querySelector(`#${elementId}`).scrollLeft -= (delta*40); // Multiplied by 40
    e.preventDefault();
}
